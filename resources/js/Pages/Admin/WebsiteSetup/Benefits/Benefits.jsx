import AdminLayout from "@/Layouts/AdminLayout";

import NothingFound from "@/Components/NothingFound";
import { asset_url, placeholder1_1 } from "@/Helpers";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

export default function Benefits ()
{
    const { t } = useLaravelReactI18n();
    const { benefits, active_locale } = usePage().props;

    // Contact Status
    function onStatusChange ( id )
    {
        router.put( route( 'admin.website.benefit_status', id ) )
    }

    return (
        <AdminLayout>
            <Head title={ "All Benefits" } />
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
                                    <FaHandsHoldingCircle  className="text-base text-slate-900" />
                                    <span>{ t( 'Benefits' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="border-b pb-3 px-6">
                        <h2  className="text-lg font-medium text-slate-600">{ t( 'All Benefits' ) }</h2>
                    </div>
                    <div  className='card-body'>
                        { benefits.length > 0 ?
                            <div>
                                <table  className="table">
                                    {/* head */ }
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Image' ) }</th>
                                            <th align="left">{ t( 'Title' ) }</th>
                                            <th align="left">{ t( 'Sub Title' ) }</th>
                                            <th align="left">{ t( 'Position' ) }</th>
                                            <th align="left">{ t( 'Status' ) }</th>
                                            <th align="right">{ t( 'Actions' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */ }

                                        { benefits.map( ( benefit, i ) => (
                                            <tr key={ i }  className='text-slate-600'>
                                                <td align="left">{ i + 1 }</td>
                                                <td align="left">
                                                    <div  className="avatar">
                                                        <div  className="mask mask-squircle h-16 w-16">
                                                            <img
                                                                src={ asset_url(benefit.image || placeholder1_1() )}
                                                                alt={ benefit.title } />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="left">{ benefit?.title[ active_locale ] }</td>
                                                <td align="left">{ benefit?.sub_title[ active_locale ] }</td>
                                                <td align="left">{ benefit.position }</td>
                                                <td align="left"><button onClick={ e => onStatusChange( benefit.id ) }  className={ `${ benefit.status == 0 ? 'btn btn-sm btn-error text-white' : 'btn btn-sm btn-success text-white' }` }>{ benefit.status == 0 ? 'InActive' : 'Active' }</button></td>
                                                <td align="center">
                                                    <Link href={ route( 'admin.website.benefit_edit', [ 'en', benefit.id ] ) }>
                                                        <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                            < BiSolidEdit  className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ) )
                                        }
                                    </tbody>
                                </table>
                            </div> : <NothingFound title={ 'Nothing Found!' } /> }
                    </div>
                </div >
            </div >
        </AdminLayout >
    )

}
