import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import SellerPaymentPopup from "@/Components/Popups/SellerPaymentPopup";
import { asset_url, placeholder1_1, placeholder_user } from "@/Helpers";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { BiDotsVertical, BiLock, BiSolidEdit } from "react-icons/bi";
import { FaHouseUser, FaMoneyCheckAlt, FaPlus, FaRegMoneyBillAlt, FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoBan, IoLogInOutline } from "react-icons/io5";
import { MdOutlineVerifiedUser, MdSpaceDashboard } from "react-icons/md";


export default function Index({ sellers }) {


    const { t } = useLaravelReactI18n();
    const { default_currency_symbol } = usePage().props
    const [showModal, setShowModal] = useState(false);

    const [sellerData, setSellerData] = useState();

    // Modal Handlers
    function handelShowModal(seller) {
        setSellerData(seller)
        setShowModal(true)
    }

    function closeModal() {

        setShowModal(false)
    };

    return (
        <AdminLayout>
            <Head title={"Sellers"} />
            {/* Modal */}
            {showModal && <SellerPaymentPopup closeModal={closeModal} showModal={showModal} sellerData={sellerData} />}


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
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span>{t('Sellers')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.seller.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Sellers')}</h2>
                        </div>
                        {/* Search*/}
                        {sellers.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {sellers.data.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Sellers')}</th>
                                        <th align="left">{t('Email Address')}</th>
                                        <th align="left">{t('Shop Name')}</th>
                                        <th align="left">{t('Due to seller')}</th>
                                        <th align="left">{t('Num. of Products')}</th>
                                        <th align="left">{t('Verification')}</th>
                                        <th align="left">{t('Status')}</th>
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        sellers.data.map((seller, i) => (
                                            <tr key={i}  className='text-slate-600'>
                                                <td align="left">{(i + 1) + ((sellers.meta.current_page - 1) * (sellers.meta.per_page))}</td>
                                                <td align="left">
                                                    <div  className="flex items-center justify-start gap-1">
                                                        <div  className="border border-slate-400 rounded-full">
                                                            <img  className="w-8 h-8 rounded-full" src={asset_url(seller.image || placeholder_user())} alt={seller.name} />
                                                        </div>
                                                        <p>{seller.f_name} {seller.l_name}</p>
                                                        {seller.banned == 1 && <IoBan  className="text-base text-red-600" />}
                                                    </div>
                                                </td>
                                                <td align="left">
                                                    <div>
                                                        <p>{seller.email}</p>
                                                        <p>{seller.phone}</p>
                                                    </div>
                                                </td>
                                                <td align="left">
                                                    <div  className="flex items-center justify-start gap-1">
                                                        <div  className="border border-slate-400 rounded p-1">
                                                            <img  className="w-9" src={seller.shop.logo || placeholder1_1()} alt={seller.shop.name} />
                                                        </div>
                                                        <div>
                                                            {seller.shop.name}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="left">{Math.abs(seller.admin_to_pay) + default_currency_symbol + ' ( ' + seller.to_pay + ' ) '}</td>
                                                <td align="left">{seller.products_count}</td>
                                                <td align="left">
                                                    {seller.shop.verification_status == 1 ?
                                                        <div  className='cursor-pointer text-white bg-green-500 py-1 px-2 text-xs rounded-sm w-full text-center'>Verified</div>
                                                        : seller.shop.verification_status == 2 ?
                                                            <div  className='cursor-pointer text-white bg-red-600 py-1 px-2 text-xs rounded-sm w-full text-center'>Rejected</div>
                                                            :
                                                            <div  className='cursor-pointer text-white bg-orange-500 py-1 px-2 text-xs rounded-sm w-full text-center'>Pending</div>
                                                    }
                                                </td>
                                                <td align="left">
                                                    {seller.banned ?
                                                        <div  className='cursor-pointer text-white bg-red-600 py-1 px-2 text-xs rounded-sm w-full text-center'>Banned</div>
                                                        :
                                                        <div  className='cursor-pointer text-white bg-green-500 py-1 px-2 text-xs rounded-sm w-full text-center'>Active</div>
                                                    }
                                                </td>
                                                <td align="right">
                                                    <div  className="flex items-center justify-start gap-2">
                                                        <Link href={route('admin.seller.edit', window.btoa(seller.id))}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                            <BiSolidEdit  className='text-sm' />
                                                        </div></Link>
                                                        <div  className="dropdown dropdown-left dropdown-bottom">
                                                            <div tabIndex={0}><BiDotsVertical  className="text-2xl cursor-pointer mb-2" /></div>
                                                            <ul tabIndex={0}  className="dropdown-content menu z-50 p-2 border shadow bg-white rounded-box w-52">
                                                                <li><Link href={route('admin.seller.show', window.btoa(seller.id))}><FaUser  className="text-xs" /> {t('Profile')}</Link></li>
                                                                <li><a target="_blank" rel="noreferrer" href={route('admin.seller.login', window.btoa(seller.id))} ><IoLogInOutline  className="text-base" />{t('Login as Seller')}</a></li>
                                                                <li><button type="button" onClick={e => handelShowModal(seller)}><FaRegMoneyBillAlt  className="text-base" />{t('Go to Payment')}</button></li>
                                                                <li><Link href={route('admin.seller.payment_history', window.btoa(seller.id))}><FaMoneyCheckAlt  className="text-base" />{t('Payment History')}</Link></li>
                                                                <li><Link href={route('admin.seller.ban', window.btoa(seller.id))}><BiLock  className="text-base" />{seller.banned ? t('Unban This Seller') : t('Ban This Seller')}</Link></li>
                                                                <li><Link href={route('admin.seller.verification', window.btoa(seller.id))}><MdOutlineVerifiedUser  className="text-base" /> {seller.shop.verification_status == 1 ? t('View Verification Details') : t('Verify This Shop')}</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {sellers.meta.from || 0} to {sellers.meta.to || 0} of {sellers.meta.total}</p>
                                <Pagination links={sellers.meta.links} />
                            </div>
                        </div> : <NothingFound title={"Nothing Found"} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
