import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";

import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaHouseUser, FaMoneyCheckAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";


export default function PaymentHistory({ seller }) {

    const { t } = useLaravelReactI18n();


    return (
        <AdminLayout>
            <Head title={"Payment History"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <div href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <FaHouseUser  className="text-base" />
                                    <Link href={route('admin.seller.index')}>{t('Sellers')}</Link>
                                </div>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaMoneyCheckAlt  className="text-base text-slate-900" />
                                    <span>{t('Payment History')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    {/* Back button */}
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /><span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{seller.name} ({seller.shop.name})</h2>
                        </div>
                    </div>
                    <div  className="card-body">
                        <table  className="table">
                            {/* head */}
                            <thead>
                                <tr  className='text-slate-600'>
                                    <th align="left">#</th>
                                    <th align="left">{t('Date')}</th>
                                    <th align="left">{t('Amount')}</th>
                                    <th align="left">{t('Payment Details')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row */}
                                <tr  className='text-slate-600'>
                                    <td data-label='#' align="left">1</td>
                                    <td data-label='Date' align="left">2022-04-27 22:12:07</td>
                                    <td data-label='Amount' align="left">$28.000</td>
                                    <td data-label='Payment Details' align="left">Seller paid to admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
