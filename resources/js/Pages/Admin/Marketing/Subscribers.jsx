import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuBellPlus } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Subscribers ()
{

    const { t } = useLaravelReactI18n();
    const { subscribers } = usePage().props;

    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.marketing.subscriber_delete', id ) )
    }

    const handleDelete = ( id ) =>
    {
        Swal.fire( {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        } ).then( ( result ) =>
        {
            if ( result.isConfirmed )
            {
                deleteData( id )
            }
        } );
    }


    return (
        <AdminLayout>
            <Head title={ "Subscribers" } />
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
                                    <LuBellPlus  className="text-lg text-slate-900" />
                                    <span>{ t( 'Subscribers' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'All Subscribers' ) }</h2>
                        </div>
                    </div>
                    <div  className='card-body'>

                        { subscribers.total > 0 ? <div>
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{ t( 'Email' ) }</th>
                                        <th align="left">{ t( 'Date' ) }</th>
                                        <th align="right">{ t( 'Actions' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }
                                    { subscribers.data.map( ( subscriber, i ) => (
                                        <tr key={ i }  className='text-slate-600'>
                                            <td align="left">{ i + 1 }</td>
                                            <td align="left">{ subscriber.email }</td>
                                            <td align="left">{ moment( subscriber.created_at ).format( 'LLL' ) }</td>
                                            <td align="center"  className="space-x-2">
                                                <Link onClick={ () => handleDelete( subscriber.id ) }>
                                                    <div data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-700 text-sm'>Showing { subscribers.from || 0 } to { subscribers.to || 0 } of { subscribers.total }</p>
                                <Pagination links={ subscribers.links } />
                            </div>
                        </div> : <NothingFound title={ 'Nothing Found!' } /> }
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
