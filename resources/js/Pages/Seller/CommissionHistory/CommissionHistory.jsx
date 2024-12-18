import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import SellerLayout from '@/Layouts/SellerLayout';

import { Head, Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";

export default function CommissionHistory ( { commission_history } )
{
    const { t } = useLaravelReactI18n();

    return (
        <SellerLayout>
            <Head title={ "Commission History" } />
            <div  className='p-4'>
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
                                <FaHandHoldingUsd  className="text-lg text-slate-900" />
                                <span>{ t( 'Commission History' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 max-w-7xl mx-auto mt-4'>
                    <div  className="flex items-center justify-between border-b border-slate-300 py-2 px-6">
                        <div  className="basis-2/4">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Commission History' ) }</h2>
                        </div>
                        {/* Sort*/ }
                        { commission_history.meta.total > 0 && <div  className="basis-2/4 flex items-center">
                            <p  className="basis-2/4">{ t( 'Sort by Seller' ) }:</p>
                            <Select
                                id="sellers"
                                name="sellers"
                                placeholder={ t( 'Choose Seller' ) }
                                 className="basis-4/4 w-full rounded-lg z-10"
                                classNamePrefix="react-select"
                                options={ [ { value: 1, label: 'Seller' } ] }
                            />
                        </div> }
                    </div>
                    { commission_history.meta.total > 0 ?
                        <div  className="p-6">
                            <table  className="table">
                                <thead>
                                    <tr>
                                        <th  className="font-bold text-sm text-black">#</th>
                                        <th align="left"  className="font-bold text-sm text-black">{ t( 'Order Code' ) }</th>
                                        <th align="left"  className="font-bold text-sm text-black">{ t( 'Admin Commission' ) }</th>
                                        <th align="left"  className="font-bold text-sm text-black">{ t( 'Seller Earning' ) }</th>
                                        <th align="left"  className="font-bold text-sm text-black">{ t( 'Created At' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { commission_history.data.map( ( history, i ) => (

                                        <tr key={ i }>
                                            <td>{ ( i + 1 ) + ( ( commission_history.meta.current_page - 1 ) * ( commission_history.meta.per_page ) ) }</td>
                                            <td><Link  className="text-blue-600">{ history.order_code }</Link></td>
                                            <td>{ history.admin_commission }</td>
                                            <td>{ history.seller_earning }</td>
                                            <td>{ moment( history.created_at ).format( 'yyyy-MM-DD h:mm:ss a' ) }</td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center m-4">
                                <p  className='text-slate-600 text-sm'>Showing { commission_history.meta.from || 0 } to { commission_history.meta.to || 0 } of { commission_history.meta.total }</p>
                                <Pagination links={ commission_history.meta.links } />
                            </div>
                        </div>
                        :
                        <NothingFound title={ "Nothing Found!" } />
                    }
                </div>
            </div>
        </SellerLayout>
    )

}
