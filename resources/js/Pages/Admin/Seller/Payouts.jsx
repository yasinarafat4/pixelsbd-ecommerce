import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { toCamel } from "@/Helpers";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaHouseUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";


export default function Payouts ( { payments } )
{

    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={ "Payouts" } />
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
                                    <span>{ t( 'Payouts' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Seller Payments' ) }</h2>
                        </div>
                    </div>
                    <div  className="card-body">
                        { payments.meta.total > 0 ?
                            <>
                                <table  className="table">
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Date' ) }</th>
                                            <th align="left">{ t( 'Seller' ) }</th>
                                            <th align="left">{ t( 'Amount' ) }</th>
                                            <th align="left">{ t( 'Payment Details' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { payments.data.map( ( payment, i ) => (

                                            <tr key={ i }  className='text-slate-600'>
                                                <td data-label='#' align="left">{ ( i + 1 ) + ( ( payments.meta.current_page - 1 ) * ( payments.meta.per_page ) ) }</td>
                                                <td data-label='Date' align="left">{ moment( payment.created_at ).format( 'yyyy-MM-DD h:mm:ss a' ) }</td>
                                                <td data-label='Seller' align="left">{ payment.seller.name }</td>
                                                <td data-label='Amount' align="left">{ payment.amount }</td>
                                                <td data-label='Payment Details' align="left">{ toCamel( payment.payment_method ) }</td>
                                            </tr>
                                        ) )
                                        }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing { payments.meta.from || 0 } to { payments.meta.to || 0 } of { payments.meta.total }</p>
                                    <Pagination links={ payments.meta.links } />
                                </div>
                            </>
                            :
                            <NothingFound title={ "Nothing Found" } />
                        }
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
