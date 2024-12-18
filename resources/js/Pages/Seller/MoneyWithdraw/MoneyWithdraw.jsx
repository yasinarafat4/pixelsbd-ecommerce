import NothingFound from '@/Components/NothingFound';
import Pagination from '@/Components/Pagination';
import WithdrawRequestPopup from '@/Components/WithdrawRequestPopup';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { useState } from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";

export default function MoneyWithdraw ( { seller_withdraw_requests } )
{
    const { t } = useLaravelReactI18n();
    const { auth, default_currency_symbol } = usePage().props
    const [ showModal, setShowModal ] = useState( false );

    // Modal Handlers
    function handelShowModal ( seller )
    {
        setShowModal( true )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    return (
        <SellerLayout>
            <Head title={ "Money Withdraw" } />
            {/* Modal */ }
            { showModal && <WithdrawRequestPopup closeModal={ closeModal } showModal={ showModal } /> }

            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'seller.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaMoneyBillTrendUp  className="text-base text-slate-900" />
                                    <span>{t('Money Withdraw')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2  className="text-lg font-medium text-slate-600">{ t( 'Money Withdraw' ) }</h2>
                </div>
                {/* Money Withdraw Balance */ }
                <div  className='grid grid-cols-2 gap-8 max-w-6xl my-8 mx-auto'>
                    <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-r from-[#B854A6] hover:from-[#DD4A8E] to-[#DD4A8E] hover:to-[#B854A6] duration-300 text-white p-4 rounded-md">
                        <HiCurrencyDollar  className='text-4xl' />
                        <h2 style={ { '-webkit-text-stroke': '2px white' } }  className='text-2xl  tracking-[1px]'>{ auth.seller.shop.admin_to_pay + default_currency_symbol }</h2>
                        <p  className='text-[13px] font-medium'>{t('Pending Balance')}</p>
                    </div>
                    <div onClick={ e => handelShowModal() } className="flex flex-col items-center justify-center gap-3 bg-white p-4 rounded-md border hover:drop-shadow-xl duration-300 cursor-pointer">
                        <BsFillPlusCircleFill  className='text-[#8F97AB] text-5xl' />
                        <p className='text-xl font-medium'>{t('Send Withdraw Request')}</p>
                    </div>
                </div>


                {/* Request History Table */ }
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Withdraw Request History' ) }</h2>
                        </div>
                    </div>
                    { seller_withdraw_requests.total > 0 ?
                        <div  className='card-body'>
                            <div>
                                <table  className="table">
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Date' ) }</th>
                                            <th align="left">{ t( 'Amount' ) }</th>
                                            <th align="left">{ t( 'Status' ) }</th>
                                            <th align="left">{ t( 'Message' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { seller_withdraw_requests.data.map( ( withdraw_request, i ) => (
                                            <tr key={ i }  className='text-slate-600'>
                                                <td data-label='#' align="left">{ ( i + 1 ) + ( ( seller_withdraw_requests.current_page - 1 ) * ( seller_withdraw_requests.per_page ) ) }</td>
                                                <td data-label='Date' align="left">{ moment( withdraw_request.created_at ).format( 'yyyy-MM-DD h:mm:ss a' ) }</td>
                                                <td data-label='Amount' align="left">{ withdraw_request.amount + default_currency_symbol }</td>
                                                <td data-label='Status' align="right"  className="">
                                                    { withdraw_request.status ? <span  className="btn btn-xs btn-success text-white rounded-full">{ t( 'Paid' ) }</span> : <span  className="btn btn-xs btn-warning text-white rounded-full">{ t( 'Pending' ) }</span> }

                                                </td>
                                                <td  className='w-full xl:w-8/12' data-label='Message' align="left">{ withdraw_request.message }</td>
                                            </tr>
                                        ) )
                                        }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing { seller_withdraw_requests.from || 0 } to { seller_withdraw_requests.to || 0 } of { seller_withdraw_requests.total }</p>
                                    <Pagination links={ seller_withdraw_requests.links } />
                                </div>
                            </div>
                        </div>
                        :
                        <NothingFound title={ "Nothing Found!" } />
                    }
                </div>
            </div>
        </SellerLayout >
    );
};
