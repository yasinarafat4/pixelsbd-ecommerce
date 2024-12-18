import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ categoryList }) {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props;

    function onFeaturedStatusChange(id, e) {
        router.put(route('admin.product.category.featured_status', id), {
            status: e.target.checked,
        })
    }

    // function onHomeStatusChange(id, e) {
    //     router.put(route('admin.product.category.home_status', id), {
    //         status: e.target.checked,
    //     })
    // }

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.product.category.destroy', id), {
            preserveState: true,
            preserveScroll: true
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "If you delete this, the related subcategories and products will also be deleted.",
            iconColor: "red",
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
            <Head title={"Category"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <CiBoxList  className="text-base text-slate-900" />
                                    <span>{t('Category')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.product.category.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Categories')}</h2>
                        </div>
                        {/* Search*/}
                        {categoryList.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {categoryList.data.length > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">{t('Name')}</th>
                                        <th align="center">{t('Parent Category')}</th>
                                        <th align="center">{t('Position')}</th>
                                        <th align="center">{t('Icon')}</th>
                                        <th align="center">{t('Cover Image')}</th>
                                        <th align="center">{t('Banner')}</th>
                                        <th align="center">{t('Featured')}</th>
                                        {/* <th align="center">{t('Show on Home')}</th> */}
                                        {business_settings.category_wise_commission && <th align="center">{t('Commission')}</th>}
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {
                                        categoryList.data.map((category, index) => (
                                            <tr key={index}  className='text-slate-600'>
                                                <td align="left">{category.name}</td>
                                                <td align="center">{category.parent?.name}</td>
                                                <td align="center">{category.position}</td>
                                                <td align="center">
                                                    <div>
                                                        <div  className="avatar">
                                                            <div  className="mask mask-squircle w-6 h-6">
                                                                <img src={asset_url(category.icon || placeholder1_1())} alt={category.name} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center">
                                                    <div>
                                                        <div  className="avatar">
                                                            <div  className="mask mask-squircle w-12 h-12">
                                                                <img src={asset_url(category.cover_image || placeholder1_1())} alt={category.name} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center">
                                                    <div>
                                                        <div  className="avatar">
                                                            <div  className="mask mask-squircle w-16 h-16">
                                                                <img src={asset_url(category.banner_image || placeholder1_1())} alt={category.name} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center">
                                                    <input type="checkbox" onChange={(e) => onFeaturedStatusChange(category.id, e)} checked={category.featured}  className="toggle toggle-sm toggle-success" />
                                                </td>
                                                {/* <td align="center">
                                                    <input type="checkbox" onChange={(e) => onHomeStatusChange(category.id, e)} checked={category.home_status}  className="toggle toggle-sm toggle-info" />
                                                </td> */}
                                                {business_settings.category_wise_commission && <td>{category.commision_rate}%</td>}
                                                <td align="right"  className="space-x-2">
                                                    <Link href={route('admin.product.category_edit', { lang: 'en', id: category.id })} method="get" data={{ page: categoryList.meta.current_page }} preserveScroll preserveState>  <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={() => handleDelete(category.id)}>
                                                        <div data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <FaRegTrashAlt  className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {categoryList.meta.from || 0} to {categoryList.meta.to || 0} of {categoryList.meta.total}</p>
                                <Pagination links={categoryList.meta.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
