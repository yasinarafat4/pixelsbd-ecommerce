/* eslint-disable */

import NothingFound from "@/Components/NothingFound";
import { toCamel } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";

import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ orders }) {
    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('seller.seller_orders_delete', id))
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

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }
    return (
        <SellerLayout>
            <Head title={"Seller Orders"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BsFillCartCheckFill  className="text-base text-slate-900" />
                                    <span>{t('Orders')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    {/* <div>
                        <Link href={route('orders.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div> */}
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">Orders</h2>
                        </div>
                        {/* Search*/}
                        {orders.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>

                        {orders.data.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Order Code')}</th>
                                        <th align="left">{t('Num. of Products')}</th>
                                        <th align="left">{t('Customer')}</th>
                                        <th align="left">{t('Seller')}</th>
                                        <th align="left">{t('Amount')}</th>
                                        <th align="left">{t('Delivery Status')}</th>
                                        <th align="left">{t('Payment Method')}</th>
                                        <th align="left">{t('Payment Status')}</th>
                                        <th align="center">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {orders.data.map((order, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td>{i + 1 + (orders.meta.current_page - 1) * orders.meta.per_page}</td>
                                            <td>{order.code}{order.viewed == 0 && <span  className="badge badge-secondary badge-sm ms-1">new</span>}</td>
                                            <td>{order.order_details.length}</td>
                                            <td>{order.user ? order.user.name : 'Guest' + order.guest_id}</td>
                                            <td>{order.seller.name}</td>
                                            <td>{order.grand_total + default_currency_symbol}</td>
                                            <td>{toCamel(order.delivery_status)}</td>
                                            <td>{toCamel(order.payment_type)}</td>
                                            <td><span  className={`px-[5px] py-[2px] text-white rounded ${order.payment_status == 'paid' ? 'bg-green-600' : 'bg-red-600'}`}>{toCamel(order.payment_status)}</span></td>
                                            <td align="center"  className="space-x-2">
                                                <Link href={route('seller.seller_orders_view', window.btoa(order.id))}><div data-tip={t('View')}  className="tooltip cursor-pointer p-[10px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                    <FaEye  className='text-sm' />
                                                </div></Link>
                                                <a href={route('seller.invoice_download', order.id)}> <div data-tip={t('Download Invoice')}  className="tooltip cursor-pointer p-[10px] text-violet-600 hover:text-violet-200 bg-[#F4EFFE] hover:bg-violet-600 duration-500 rounded-full">
                                                    <GrDownload  className='text-base font-bold' />
                                                </div></a>
                                                <Link >
                                                    <div onClick={e => handleDelete(window.btoa(order.id))} data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
