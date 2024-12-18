import { varificationOptions } from "@/Array";
import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";

export default function SellerProductsale ()
{
    const { t } = useLaravelReactI18n();

    const [ data, setData ] = useState();
    const length = 0;


    // Category handler
    function handleVarificationStatus ( e )
    {
        setData( e.value )
    }

    return (
        <AdminLayout>
            <Head title={ "Seller Product Sale" } />
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
                                <GiReceiveMoney  className="text-lg text-slate-900" />
                                <span>{ t( 'Seller Product Sale' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 max-w-7xl mx-auto mt-4'>
                    <div  className="flex items-center justify-between border-b border-slate-300 py-2 px-6">
                        <div  className="basis-2/4">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Seller Based Selling Report' ) }</h2>
                        </div>
                        {/* Sort*/ }
                       {length > 0 && <div  className="basis-2/4 flex items-center">
                            <p  className="basis-2/4">{ t( 'Sort by verificarion status' ) }:</p>
                            <Select
                                id="verification_status"
                                name="verification_status"
                                placeholder={ t( 'Choose Varification Status' ) }
                                 className="basis-4/4 w-full rounded-lg z-10"
                                classNamePrefix="react-select"
                                defaultValue={ data }
                                onChange={ () => handleVarificationStatus }
                                options={ varificationOptions }
                            />
                        </div>}
                    </div>

                   {length > 0 ? <div  className="p-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th  className="border border-slate-300 font-bold text-sm text-black">#</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Seller Name' ) }</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Shop Name' ) }</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Number of Product Sale' ) }</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Order Amount' ) }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                <tr>
                                    {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                    <td  className="border border-slate-300" align="left">1</td>
                                    <td  className="border border-slate-300" align="left">LOUIS VUITTON</td>
                                    <td  className="border border-slate-300" align="left"> --</td>
                                    <td  className="border border-slate-300" align="left"> 14</td>
                                    <td  className="border border-slate-300" align="left"> $556.000</td>
                                </tr>
                                <tr>
                                    {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                    <td  className="border border-slate-300" align="left">2</td>
                                    <td  className="border border-slate-300" align="left">Adidas</td>
                                    <td  className="border border-slate-300" align="left"> --</td>
                                    <td  className="border border-slate-300" align="left"> 14</td>
                                    <td  className="border border-slate-300" align="left"> $478.000</td>
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
