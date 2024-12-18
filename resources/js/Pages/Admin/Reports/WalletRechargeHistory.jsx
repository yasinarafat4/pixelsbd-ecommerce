import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { TbFileTime } from "react-icons/tb";
import Select from 'react-select';

export default function WalletRechargeHistory ( { users } )
{
    const { t } = useLaravelReactI18n();

    const [ data, setData ] = useState();
    const length = 0;


    // Category handler
    function handleSortUser ( e )
    {
        setData( e.value )
    }

    return (
        <AdminLayout>
            <Head title={ "Wallet Recharge History" } />
            <div  className='p-4'>
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
                                <TbFileTime  className="text-lg text-slate-900" />
                                <span>{ t( 'Wallet Recharge History' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 max-w-7xl mx-auto mt-4'>
                    <div  className="flex items-center justify-between border-b border-slate-300 py-2 px-6">
                        <div  className="basis-2/4">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Wallet Transaction Report' ) }</h2>
                        </div>
                        {/* Sort*/ }
                       { length > 0 && <div  className="basis-2/4 flex items-center">
                            <p  className="basis-1/4">{ t( 'Sort by User' ) }:</p>
                            <Select
                                id="users"
                                name="users"
                                placeholder={ t( 'Choose User' ) }
                                 className="basis-4/4 w-full rounded-lg z-10"
                                classNamePrefix="react-select"
                                defaultValue={ data }
                                onChange={ () => handleSortUser }
                                options={ users.map( user => ( { value: user.id, label: user.name } ) ) }
                            />
                        </div>}
                    </div>

                {length > 0 ?<div  className="p-6">
                    <table  className="table">
                        {/* head */ }
                        <thead>
                            <tr>
                                <th  className="border border-slate-300 font-bold text-sm text-black">#</th>
                                <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Customer' ) }:</th>
                                <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Date' ) }</th>
                                <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Amount' ) }</th>
                                <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Payment method' ) }</th>
                                <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Approval' ) }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table row */ }
                            <tr>
                                {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                <td  className="border border-slate-300" align="left">1</td>
                                <td  className="border border-slate-300" align="left">Yasin</td>
                                <td  className="border border-slate-300" align="left">05-06-2022</td>
                                <td  className="border border-slate-300" align="left">$17.3</td>
                                <td  className="border border-slate-300" align="left">Stripe</td>
                                <td  className="border border-slate-300" align="left">N/A</td>
                            </tr>
                            <tr>
                                {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                <td  className="border border-slate-300" align="left">2</td>
                                <td  className="border border-slate-300" align="left">John</td>
                                <td  className="border border-slate-300" align="left">7-06-2022</td>
                                <td  className="border border-slate-300" align="left">$10.5</td>
                                <td  className="border border-slate-300" align="left">Club Point Convert</td>
                                <td  className="border border-slate-300" align="left"><span  className="bg-purple-600 text-white text-xs py-1 px-2 rounded-full">Pending</span></td>
                            </tr>
                            <tr>
                                {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                <td  className="border border-slate-300" align="left">3</td>
                                <td  className="border border-slate-300" align="left">Jensen</td>
                                <td  className="border border-slate-300" align="left">09-06-2022</td>
                                <td  className="border border-slate-300" align="left">$30.5</td>
                                <td  className="border border-slate-300" align="left">Refund</td>
                                <td  className="border border-slate-300" align="left"><span  className="bg-green-600 text-white text-xs py-1 px-2 rounded-full">Approved</span></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div  className="flex justify-between items-center m-4">
                        <p  className='text-slate-600 text-sm'>Showing {countries.from || 0} to {countries.to || 0} of {countries.total}</p>
                        <Pagination links={countries.links} />
                    </div> */}
                </div>: <NothingFound title={'Nothing Found!'}/>}

                </div>
            </div>
        </AdminLayout>
    )

}
