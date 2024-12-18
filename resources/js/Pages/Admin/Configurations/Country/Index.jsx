import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";

export default function Index ( { countries } )
{
    const { t } = useLaravelReactI18n();

    function OnCountryStatusChange ( e, id )
    {
        router.put( route( 'admin.configuration.shipping.country.status', id ), {
            status: e.target.checked,
        } )
    }

    return (
        <AdminLayout>
            <Head title={ "Title" } />
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
                                    <PiMapPinSimpleAreaBold  className="text-base text-slate-900" />
                                    <span>Countries</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 py-3'>
                    <div  className="flex items-center justify-between border-b border-slate-300 pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Countries' ) }</h2>
                        </div>
                        {/* Search*/ }
                        { countries.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                            </label>
                        </div> }
                    </div>

                    { countries.data.length > 0 ?
                        <div>
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr>
                                        <th  className="">#</th>
                                        <th align="left"  className="border-l border-slate-300 font-bold text-sm text-black">Name</th>
                                        <th align="left"  className="border-l border-slate-300 font-bold text-sm text-black">Code</th>
                                        <th align="center"  className="border-l border-slate-300 font-bold text-sm text-black">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table row */ }
                                    {
                                        countries.data.map( ( country, i ) => (
                                            <tr key={ i }>
                                                <td>{ ( i + 1 ) + ( ( countries.current_page - 1 ) * ( countries.per_page ) ) }</td>
                                                <td align="left">{ country.name }</td>
                                                <td align="left"> { country.iso2 }</td>
                                                <td align="center">
                                                    <input type="checkbox" onChange={ e => OnCountryStatusChange( e, country.id ) } checked={ country.status == 1 }  className="h-5 w-11 toggle toggle-success" />
                                                </td>
                                            </tr>
                                        ) )
                                    }


                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center m-4">
                                <p  className='text-slate-600 text-sm'>Showing { countries.from || 0 } to { countries.to || 0 } of { countries.total }</p>
                                <Pagination links={ countries.links } />
                            </div>
                        </div> : <NothingFound title={ "Nothing Found!" } /> }

                </div>
            </div>
        </AdminLayout>
    )

}
