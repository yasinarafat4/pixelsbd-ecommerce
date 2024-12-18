import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaBlog, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ blogs }) {
    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.blog.blogs.destroy', id))
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
            <Head title={"All Blogs"} />
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
                                    <FaBlog className="text-base text-slate-900" />
                                    <span>{t('Blogs')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <>
                        <Link href={route('admin.blog.blogs.create')}>
                            <button className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Add New Blog')}</span> <FaPlus className='text-sm' /></button>
                        </Link>
                    </>
                </div>
                <div className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div className="flex items-center justify-between border-b pb-3 px-6">
                        <h2 className="text-lg font-medium text-slate-600">{t('All Blog Posts')}</h2>

                        {/* Search*/}
                        {blogs.data.length > 0 && <>
                            <label className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text" className="grow" placeholder={t('search')} />
                            </label>
                        </>}
                    </div>
                    <div className='card-body'>
                        {blogs.data.length > 0 ?
                            <>
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{t('Thumbnail')}</th>
                                            <th align="left">{t('Title')}</th>
                                            <th align="left">{t('Category')}</th>
                                            <th align="left">{t('Short Description')}</th>
                                            <th align="left">{t('Status')}</th>
                                            <th align="right">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */}

                                        {blogs.data.map((blog, i) => (
                                            <tr key={i} className='text-slate-600'>
                                                <td align="left">{(i + 1) + ((blogs.current_page - 1) * (blogs.per_page))}</td>
                                                <td align="left">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={asset_url(blog.blog_banner || placeholder1_1())}
                                                                alt={blog.title} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="left">{blog.title}</td>
                                                <td align="left">{blog.blog_category.name}</td>
                                                <td align="left">{blog.short_description}</td>
                                                <td align="left">
                                                    <input type="checkbox" className="toggle toggle-sm toggle-success" />
                                                </td>
                                                <td align="center" className="space-x-2">
                                                    <Link href={route('admin.blog.blogs.edit', blog.id)}> <div data-tip={t('Edit')} className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        < BiSolidEdit className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={e => handleDelete(blog.id)}>
                                                        <div data-tip={t('Delete')} className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            < FaRegTrashAlt className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center mt-2">
                                    <p className='text-slate-600 text-sm'>Showing {blogs.from || 0} to {blogs.to || 0} of {blogs.total}</p>
                                    <Pagination links={blogs.links} />
                                </div>
                            </> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div >
            </div >
        </AdminLayout >
    )

}
