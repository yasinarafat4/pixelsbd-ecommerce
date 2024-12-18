import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import NotifiedCustomersModal from "@/Components/Popups/NotifiedCustomersModal";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineWorkHistory, MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function CustomNotificationHistory ()
{
    const { t } = useLaravelReactI18n();
    const { custom_notifications } = usePage().props
    const [ showModal, setShowModal ] = useState( false );
    const [ notifiedCustomersData, setNotifiedCustomersData ] = useState();

    // Modal Handlers
    function handelShowModal ( data )
    {
        axios.post( route( 'admin.marketing.notification.custom_notified_customers_list' ), {
            identifier: data.notificationType.id + '_' + data.created_at,
        } ).then( function ( response )
        {
            setNotifiedCustomersData( response.data );
        } )
        setShowModal( true )
    }

    function closeModal ()
    {
        setShowModal( false )
    };


    // Delete functionality
    const deleteNotificationData = ( data ) =>
    {
        router.get( route( 'admin.marketing.notification.custom_notification_delete', data.notificationType.id + '_' + data.created_at ) )
    }

    const handleNotificationDelete = ( data ) =>
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
                deleteNotificationData( data )
            }
        } );
    }

    return (
        <AdminLayout>
            <Head title={ "Custom Notification History" } />
            {/* Modal */ }
            { ( showModal && notifiedCustomersData ) && <NotifiedCustomersModal closeModal={ closeModal } showModal={ showModal } notifiedCustomersData={ notifiedCustomersData } /> }

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
                                    <MdOutlineWorkHistory  className="text-lg text-slate-900" />
                                    <span>{ t( 'Custom Notification History' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'All Custom Notification History' ) }</h2>
                        </div>
                        {/* Search*/ }
                        { custom_notifications.meta.total > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'search' ) } />
                            </label>
                        </div> }
                    </div>
                    <div  className='card-body'>

                        { custom_notifications.meta.total > 0 ? <div>
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{ t( 'Type' ) }</th>
                                        <th align="left">{ t( 'Date & Time' ) }</th>
                                        <th align="left">{ t( 'Notification' ) }</th>
                                        <th align="left">{ t( 'Link' ) }</th>
                                        <th align="right">{ t( 'Actions' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }
                                    { custom_notifications.data.map( ( notification, i ) => (
                                        <tr key={ i }  className='text-slate-600'>
                                            <td align="left">{ ( i + 1 ) + ( ( custom_notifications.meta.current_page - 1 ) * ( custom_notifications.meta.per_page ) ) }</td>
                                            <td align="left">{ notification.notificationType?.name }</td>
                                            <td align="left">{ moment( notification.created_at ).format( 'lll' ) }</td>
                                            <td align="left">{ notification.notificationType?.text }</td>
                                            <td align="left">{ notification.data.link }</td>
                                            <td align="center"  className="space-x-2">
                                                <a onClick={ e => handelShowModal( notification ) } > <div data-tip={ t( 'Users' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                    <FaUsers  className='text-sm' />
                                                </div></a>
                                                <Link onClick={ e => handleNotificationDelete( notification ) }>
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
                                <p  className='text-slate-700 text-sm'>Showing { custom_notifications.meta.from || 0 } to { custom_notifications.meta.to || 0 } of { custom_notifications.meta.total }</p>
                                <Pagination links={ custom_notifications.meta.links } />
                            </div>
                        </div> : <NothingFound title={ 'Nothing Found!' } /> }
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
