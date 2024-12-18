import SellerLayout from "@/Layouts/SellerLayout";
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdSpaceDashboard } from "react-icons/md";

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import moment from "moment";
import { PiUsersFourFill } from "react-icons/pi";

export default function PaymentHistories ()
{

    const { t } = useLaravelReactI18n();
    const { payments } = usePage().props;


    return (
        <SellerLayout>
            <Head title={ "Payment Histories" } />
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
                                    <PiUsersFourFill  className="text-base text-slate-900" />
                                    <span>{ t( 'All Payment List' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Payment List' ) }</h2>
                        </div>
                    </div>
                    <div  className='card-body'>
                        { payments.total > 0 ? <div>
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{ t( 'Delivery Boy' ) }</th>
                                        <th align="left">{ t( 'Payment Amount' ) }</th>
                                        <th align="left">{ t( 'Created At' ) }</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }

                                    { payments.data.map( ( payment, i ) => (
                                        <tr key={ i }  className='text-slate-600'>
                                            <td align="left">{ i + 1 }</td>
                                            <td align="left">{ payment.deliveryboy.name }</td>
                                            <td align="left">{ payment.paid_amount }</td>
                                            <td align="left">{ moment( payment.created_at ).format( 'll, LT' ) }</td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-700 text-sm'>Showing { payments.from || 0 } to { payments.to || 0 } of { payments.total }</p>
                                <Pagination links={ payments.links } />
                            </div>
                        </div> : <NothingFound title={ "Nothing Found!" } /> }
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
};


