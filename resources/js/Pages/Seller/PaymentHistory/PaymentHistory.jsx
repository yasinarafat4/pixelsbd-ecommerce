import NothingFound from '@/Components/NothingFound';
import Pagination from '@/Components/Pagination';
import { toCamel } from '@/Helpers';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { MdHistory, MdSpaceDashboard } from "react-icons/md";

export default function PaymentHistory ( { payments } )
{

    const { t } = useLaravelReactI18n();
    const { auth, default_currency_symbol } = usePage().props

    return (
        <SellerLayout>
            <Head title={ "Payment History" } />
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
                                    <MdHistory  className="text-base text-slate-900" />
                                    <span>{ t( 'Payment History' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Payment History' ) }</h2>
                        </div>
                    </div>
                    { payments.total > 0 ?
                        <div  className='card-body'>
                            <div>
                                <table  className="table">
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Date' ) }</th>
                                            <th align="left">{ t( 'Amount' ) }</th>
                                            <th align="left">{ t( 'Payment Method' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { payments.data.map( ( payment, i ) => (

                                            <tr key={ i }  className='text-slate-600'>
                                                <td data-label='#' align="left">{ ( i + 1 ) + ( ( payments.current_page - 1 ) * ( payments.per_page ) ) }</td>
                                                <td data-label='Date' align="left">{ moment( payment.created_at ).format( 'yyyy-MM-DD h:mm:ss a' ) }</td>
                                                <td data-label='Amount' align="left">{ payment.amount + default_currency_symbol }</td>
                                                <td data-label='Payment Method' align="left">{ toCamel( payment.payment_method ) }</td>
                                            </tr>
                                        ) )
                                        }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing { payments.from || 0 } to { payments.to || 0 } of { payments.total }</p>
                                    <Pagination links={ payments.links } />
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
