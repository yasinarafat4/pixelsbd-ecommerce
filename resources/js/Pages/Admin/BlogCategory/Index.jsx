import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ blogCategories }) {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.blog.blogcategory.store'), {
            onFinish: () => {
                reset();
            }
        })
    }

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.blog.blogcategory.destroy', id))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            }
        });
    }

    return (
        <AdminLayout>
            <Head title={"Blog Categories"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')} className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <CiBoxList className="text-base text-slate-900" />
                                    <span>{t('All Blog Categories')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                    <div className='col-span-7 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                            <h2 className="text-lg font-medium text-slate-600">{t('Blog Categories')}</h2>
                            {/* Search*/}
                            {blogCategories.data.length > 0 && <>
                                <label className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch className="text-xl text-slate-600" />
                                    <input autoFocus={true} name='search' type="text" className="grow" placeholder={t('search')} />
                                </label>
                            </>}
                        </div>
                        <div className='card-body'>

                            {blogCategories.data.length > 0 ? <>
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{t('Name')}</th>
                                            <th align="right">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */}
                                        {blogCategories.data.map((blogCategory, i) => (
                                            <tr width={'10%'} key={i} className='text-slate-600'>
                                                <td align="left">{(i + 1) + ((blogCategories.current_page - 1) * (blogCategories.per_page))}</td>
                                                <td width={'75%'} align="left">{blogCategory.name}</td>
                                                <td width={'15%'} align="center" className="space-x-2">
                                                    <Link href={route('admin.blog.blogcategory.edit', blogCategory.id)}> <div data-tip={t('Edit')} className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={e => handleDelete(blogCategory.id)}>
                                                        <div data-tip={t('Delete')} className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <FaRegTrashAlt className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-2">
                                    <p className='text-slate-700 text-sm'>Showing {blogCategories.from || 0} to {blogCategories.to || 0} of {blogCategories.total}</p>
                                    <Pagination links={blogCategories.links} />
                                </div>
                            </> : <NothingFound title={"Nothing Found"} />}
                        </div>
                    </div>

                    {/* Create Category */}
                    <div className='col-span-5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 h-60 w-full'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                                <h2 className="text-lg font-medium text-slate-600">{t('Create Blog Category')}</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* name */}
                                <>
                                    <label className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                    <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Category Name')} className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </>
                            </div>
                            <div className="flex justify-end mx-4">
                                <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Save')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
