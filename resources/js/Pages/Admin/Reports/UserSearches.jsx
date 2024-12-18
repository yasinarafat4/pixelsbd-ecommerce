import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdPersonSearch, MdSpaceDashboard } from "react-icons/md";

export default function UserSearches ()
{
    const { t } = useLaravelReactI18n();
    const length = 0;

    return (
        <AdminLayout>
            <Head title={ "User Searches" } />
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
                                <MdPersonSearch  className="text-lg text-slate-900" />
                                <span>{ t( 'User Searches' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 max-w-7xl mx-auto mt-4'>
                    <div  className="flex items-center justify-between border-b border-slate-300 py-2 px-6">
                        <div  className="basis-2/4">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'User Search Report' ) }</h2>
                        </div>
                    </div>

                   { length > 0 ?<div  className="p-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th  className="border border-slate-300 font-bold text-sm text-black">#</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Search By' ) }</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Number of Search' ) }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                <tr>
                                    {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                    <td  className="border border-slate-300" align="left">1</td>
                                    <td  className="border border-slate-300" align="left">car</td>
                                    <td  className="border border-slate-300" align="left"> 6</td>
                                </tr>
                                <tr>
                                    {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                    <td  className="border border-slate-300" align="left">2</td>
                                    <td  className="border border-slate-300" align="left">baby dress	</td>
                                    <td  className="border border-slate-300" align="left"> 13</td>
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
