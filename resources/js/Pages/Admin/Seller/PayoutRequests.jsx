import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import SellerWithdrawPaymentPopup from "@/Components/Popups/SellerWithdrawPaymentPopup";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { FaHistory, FaHouseUser, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";


export default function PayoutRequests ( { seller_withdraw_requests } )
{

    const { t } = useLaravelReactI18n();
    const { auth, default_currency_symbol } = usePage().props

    const [ showModal, setShowModal ] = useState( false );
    const [ withdrawRequestData, setWithdrawRequestData ] = useState();

    // Modal Handlers
    function handelShowModal ( withdraw_request )
    {
        setWithdrawRequestData( withdraw_request )

        setShowModal( true )
    }

    function closeModal ()
    {

        setShowModal( false )
    };

    return (
        <AdminLayout>
            <Head title={ "Payout Requests" } />
            { showModal && <SellerWithdrawPaymentPopup closeModal={ closeModal } showModal={ showModal } withdrawRequestData={ withdrawRequestData } /> }
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span>{ t( 'Payout Requests' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Seller Withdraw Request' ) }</h2>
                        </div>
                    </div>
                    <div  className="card-body">
                        { seller_withdraw_requests.meta.total > 0 ?
                            <>
                                <table  className="table">
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Date' ) }</th>
                                            <th align="left">{ t( 'Seller' ) }</th>
                                            <th align="left">{ t( 'Total Amount to Pay' ) }</th>
                                            <th align="left">{ t( 'Requested Amount' ) }</th>
                                            <th align="left">{ t( 'Message' ) }</th>
                                            <th align="left">{ t( 'Status' ) }</th>
                                            <th align="left">{ t( 'Options' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { seller_withdraw_requests.data.map( ( withdraw_request, i ) => (
                                            <tr key={ i }  className='text-slate-600'>
                                                <td data-label='#' align="left">{ ( i + 1 ) + ( ( seller_withdraw_requests.meta.current_page - 1 ) * ( seller_withdraw_requests.meta.per_page ) ) }</td>
                                                <td data-label='Date' align="left">{ moment( withdraw_request.created_at ).format( 'yyyy-MM-DD h:mm:ss a' ) }</td>
                                                <td data-label='Seller' align="left">{ withdraw_request.seller.name }</td>
                                                <td data-label='Total Amount to Pay' align="left">{ withdraw_request.seller.shop.admin_to_pay + default_currency_symbol }</td>
                                                <td data-label='Requested Amount' align="left">{ withdraw_request.amount + default_currency_symbol }</td>
                                                <td data-label='Payment Details' align="left">{ withdraw_request.message }</td>
                                                <td data-label='Payment Details' align="left">
                                                    { withdraw_request.status ? <span  className="badge badge-inline badge-success"> { t( 'Paid' ) }</span> : <span  className="badge badge-inline badge-info">{ t( 'Pending' ) }</span> }
                                                </td>
                                                <td data-label='Payment Details' align="left">
                                                    <div  className="flex gap-1">
                                                        <button type="button" onClick={ e => handelShowModal( withdraw_request ) }  className="btn btn-success btn-circle btn-sm" title={ t( 'Pay Now' ) }>
                                                            <FaRegMoneyBillAlt  className="text-white text-base" />
                                                        </button>
                                                        <a href="#"  className="btn btn-warning btn-circle btn-sm" title={ t( 'Payment History' ) }>
                                                            <FaHistory  className="text-white text-base" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing { seller_withdraw_requests.meta.from || 0 } to { seller_withdraw_requests.meta.to || 0 } of { seller_withdraw_requests.meta.total }</p>
                                    <Pagination links={ seller_withdraw_requests.meta.links } />
                                </div>
                            </>
                            :
                            <NothingFound title={ 'Nothing Found!' } />
                        }
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
