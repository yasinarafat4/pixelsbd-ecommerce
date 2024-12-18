import UploadModal from "@/Components/UploadModals/UploadModal";
import { placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit ( { dynamic_popup } )
{
    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        title: dynamic_popup.title || "",
        summary: dynamic_popup.summary || "",
        image: dynamic_popup.image || "",
        link: dynamic_popup.link || "",
        background_color: dynamic_popup.background_color || "",
        text_color: dynamic_popup.text_color || "",
    } )

    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ selectedImg, setSelectedImg ] = useState( [] )


    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.marketing.dynamicpopup.update', dynamic_popup.id ) )
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
        setSelectedImg( [] )
        if ( index == 'image' && data.image )
        {
            setSelectedImg( [ data.image ] )
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
            <Head title={ "Edit" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.marketing.dynamicpopup.index' ) }  className="inline-flex gap-1 items-center">
                                    <FaArrowUpRightFromSquare  className="text-base text-slate-900" />
                                    <span>{ t( 'Dynamic Popups' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{ t( 'Edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link onClick={ e => window.history.back() }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Custom Dynamic Popup Information' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Title & Summary */ }
                            <div  className='grid grid-cols-2 gap-4'>
                                {/* Title */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title' ) }</label>
                                    <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( 'Enter Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                                </div>
                                {/* Summary */ }
                                <div  className='w-full mb-4'>
                                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="summary">{ t( 'Summary' ) } <span  className="text-xs text-blue-500">(Best within 100 characters)</span></label>

                                    <textarea
                                        onChange={ e => setData( 'summary', e.target.value ) }
                                        value={ data.summary }
                                        name='summary'
                                        id='summary'
                                        maxLength={100}
                                        type="text"
                                        placeholder={ t( 'Write Summary' ) }
                                        rows="3"
                                         className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white"
                                    />
                                    { errors.summary && <div  className="text-red-500 text-sm mt-1">{ errors.summary }</div> }
                                </div>
                            </div>

                            {/* Image & Link */ }
                            <div  className='grid grid-cols-2 items-start gap-4'>
                                {/* Image */ }
                                <div>
                                    {/* Modal */ }
                                    { showModal && <UploadModal selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                                    <div  className='flex flex-col w-full'>
                                        <label  className='label-text text-slate-600 text-sm'>
                                            { t( 'Image' ) } <span  className="text-xs text-blue-500">(Aspect ratio should be 2:3)</span>
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
                                                <div  className="relative">
                                                    <IoMdClose onClick={ e => { removeImage() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                    <img  className='h-32 border rounded-xl p-3 mt-3' src={ data.image || placeholder1_1() } alt={ 'image' } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Link */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm'>
                                        { t( 'Link' ) }
                                    </label>
                                    <input onChange={ e => setData( 'link', e.target.value ) } value={ data.link } name='link' id='link' type="url" placeholder={ t( 'Enter Link' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.link && <div  className="text-red-500 text-sm mt-1">{ errors.link }</div> }
                                </div>
                            </div>

                            {/* Background Color & Text Color  */ }
                            <div  className='grid grid-cols-2 items-center gap-4'>
                                {/* Background Color */ }
                                <div  className="flex flex-col items-start">
                                    <label  className="block text-sm font-medium text-slate-700">{ t( 'Background Color' ) }</label>
                                    <MuiColorInput size="small" format="hex" isAlphaHidden value={ data.background_color } onChange={ e => setData( 'background_color', e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                                </div>
                                {/* Text Color */ }
                                <div  className="flex flex-col items-start">
                                    <label  className="block text-sm font-medium text-slate-700">{ t( 'Text Color' ) }</label>
                                    <MuiColorInput size="small" format="hex" isAlphaHidden value={ data.text_color } onChange={ e => setData( 'text_color', e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                                </div>
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
