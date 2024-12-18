import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Index({ flashDeals }) {
    const { t } = useLaravelReactI18n();


    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.marketing.flashdeal.destroy', id))
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

    function onStatusChange(e, id) {
        router.put(route('admin.marketing.flash_deal_status', id), {
            status: e.target.checked,
        })
    }

    function onFeaturedChange(e, id) {
        router.put(route('admin.marketing.flash_deal_featured', id), {
            featured: e.target.checked,
        })
    }

    return (
        <AdminLayout>
            <Head title={"Flash Deals"} />
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
                                    <RiWaterFlashFill  className="text-lg text-slate-900" />
                                    <span>{t('Flash Deals')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.marketing.flashdeal.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New Flash Deal')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('All Flash Deals')}</h2>
                        </div>
                        {/* Search*/}
                        {flashDeals.total > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {flashDeals.total > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('title')}</th>
                                        <th align="left">{t('Banner')}</th>
                                        <th align="left">{t('Start Date')}</th>
                                        <th align="left">{t('End Date')}</th>
                                        <th align="left">{t('Status')}</th>
                                        <th align="left">{t('Featured')}</th>
                                        <th align="left">{t('Page Link')}</th>
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {flashDeals.data.map((flashDeal, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{i + 1}</td>
                                            <td align="left">{flashDeal.title}</td>
                                            <td align="left">
                                                <img
                                                     className="mask mask-square w-14 rounded-sm"
                                                    src={asset_url(flashDeal.banner)} />
                                            </td>
                                            <td align="left"> {moment(flashDeal.start_date).format('lll')}</td>
                                            <td align="left"> {moment(flashDeal.end_date).format('lll')}</td>
                                            <td align="left">
                                                <input checked={flashDeal.status} onChange={e => onStatusChange(e, flashDeal.id)} type="checkbox"  className="toggle toggle-sm toggle-success" />
                                            </td>
                                            <td align="left">
                                                <input checked={flashDeal.featured} onChange={e => onFeaturedChange(e, flashDeal.id)} type="checkbox"  className="toggle toggle-sm toggle-success" />
                                            </td>
                                            <td align="left">{route('flash_deal_details', flashDeal.slug)}</td>
                                            <td align="center"  className="space-x-2">
                                                <Link href={route('admin.marketing.flashdeal.edit', flashDeal.id)}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                    <BiSolidEdit  className='text-sm' />
                                                </div></Link>
                                                <Link onClick={e => handleDelete(flashDeal.id)}>
                                                    <div data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {flashDeals.from || 0} to {flashDeals.to || 0} of {flashDeals.total}</p>
                                <Pagination links={flashDeals.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
