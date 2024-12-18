
import UploadModal from "@/Components/UploadModals/UploadModal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { TbBellPause } from "react-icons/tb";
import NotificationTypeTable from "./Partial/NotificationTypeTable";

export default function NotificationTypes ()
{

    const { t } = useLaravelReactI18n();
    let { tab, notifications } = usePage().props;
    let queryParams = usePage().props.ziggy.query;

    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );
    const [ index, setIndex ] = useState( tab ?? 'customer' );

    const handleTabChange = ( e ) =>
    {
        router.visit( route( 'admin.marketing.notification.notification_types', [ { tab: e } ] ), {
            preserveState: true,
            preserveScroll: true,
            replace: true
        } )
        setIndex( e )
    }


    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",
        image: "",
        text: "",
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.marketing.notification.notification_types.store', queryParams ), {
            onFinish: () =>
            {
                reset();
            }
        } )
    }

    // Modal
    function onAddFile ( v )
    {
        if ( type == 'image' )
        {
            setData( 'image', v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        if ( index == 'image' )
        {
            if ( data.image == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.image ] )
            }
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Romove Images
    function removeImage ()
    {
        setData( 'image', '' );
    }


    return (
        <AdminLayout>
            <Head title={ "Notification Types" } />
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
                                    <TbBellPause  className="text-lg text-slate-900" />
                                    <span>{ t( 'Notification Types' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className="grid grid-cols-12 gap-5">
                    <div  className='col-span-7 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="px-6">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'All Notification Types' ) }</h2>
                        </div>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            {/* Tab */ }
                            <div>
                                <ul  className="flex items-center gap-2 text-[13px]">
                                    <li
                                         className={ `text-slate-600 border border-dashed border-slate-400 py-1 px-3 rounded-full cursor-pointer ${ index == "customer" ? "bg-[#3692F3] text-white border-slate-400" : "hover:bg-[#3692F3] hover:text-white hover:border-slate-400 duration-300" }` }
                                        onClick={ ( e ) => handleTabChange( 'customer' ) }
                                    >{ t( 'Customer' ) }</li>
                                    <li
                                         className={ `text-slate-600 border border-dashed border-slate-400 py-1 px-3 rounded-full cursor-pointer ${ index == "seller" ? " bg-[#3692F3] text-white border-slate-400" : "hover:bg-[#3692F3] hover:text-white hover:border-slate-400 duration-300" }` }
                                        onClick={ ( e ) => handleTabChange( 'seller' ) }
                                    >{ t( 'Seller' ) }</li>
                                    <li
                                         className={ `text-slate-600 border border-dashed border-slate-400 py-1 px-3 rounded-full cursor-pointer ${ index == "admin" ? " bg-[#3692F3] text-white border-slate-400" : "hover:bg-[#3692F3] hover:text-white hover:border-slate-400 duration-300" }` }
                                        onClick={ ( e ) => handleTabChange( 'admin' ) }
                                    >{ t( 'Admin' ) }</li>
                                </ul>
                            </div>
                            {/* Search*/ }
                            { notifications.data.length > 0 && <div>
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'search' ) } />
                                </label>
                            </div> }
                        </div>
                        <div  className='card-body'>
                            {/* Customer Table */ }
                            {
                                index === "customer" && (
                                    <NotificationTypeTable
                                        notifications={ notifications } />
                                )
                            }

                            {/* Seller Table */ }
                            {
                                index === "seller" && (
                                    <NotificationTypeTable
                                        notifications={ notifications } />
                                )
                            }

                            {/* Admin Table */ }
                            {
                                index === "admin" && (
                                    <NotificationTypeTable
                                        notifications={ notifications } />
                                )
                            }
                        </div>
                    </div>

                    {/* Add Notification Type */ }
                    <div  className='col-span-5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 w-full'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'Add Notification Type' ) }</h2>
                            </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                            <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* Name */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name*' ) }</label>
                                    <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Notification type' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                                </div>

                                {/* Modal */ }
                                { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                                {/* Image */ }
                                <div  className='flex flex-col w-full'>
                                    <label  className='label-text text-slate-600 text-sm'>
                                        { t( 'Image' ) }
                                    </label>
                                    <div  className="w-full">
                                        <div
                                            onClick={ e => handelShowModal( 'image' ) }
                                             className="cursor-pointer grid grid-cols-12 items-center"
                                        >
                                            <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                <p  className="text-white text-sm uppercase">Choose File</p>
                                            </div>
                                            <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                <p  className="ps-4 font-medium">{ data.image ? '1 file chosen' : '0 file chosen' }</p>
                                            </div>
                                        </div>
                                        <div  className="flex items-center gap-3">
                                            { data.image && <div  className="relative">
                                                <IoMdClose onClick={e => { removeImage() }}  className="text-xl text_primary absolute top-0 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                <img  className='h-12 border rounded p-1 mt-1' src={data.image} alt={'Image'} />
                                            </div> }
                                        </div>
                                    </div>
                                </div>

                                {/* Default Text */ }
                                <div  className='w-full mb-4'>
                                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="text">{ t( 'Default Text*' ) }</label>
                                    <textarea
                                        onChange={ e => setData( 'text', e.target.value ) }
                                        value={ data.text }
                                        name='text'
                                        id='text'
                                        type="text"
                                        placeholder={ t( 'Write Default Text' ) }
                                        rows="2"
                                         className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                                    />
                                    { errors.text && <div  className="text-red-500 text-sm mt-1">{ errors.text }</div> }
                                </div>
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Save' ) }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
