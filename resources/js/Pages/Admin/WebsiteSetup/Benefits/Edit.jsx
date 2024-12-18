import UploadModal from "@/Components/UploadModals/UploadModal";
import { placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit ()
{
    const { t } = useLaravelReactI18n();
    const { lang, active_languages, benefit } = usePage().props


    const [ showModal, setShowModal ] = useState( false );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        lang: lang,
        title: benefit.title[ lang ],
        sub_title: benefit.sub_title[ lang ],
        position: benefit.position,
        image: benefit.image,
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.website.benefit_update', benefit.id ) )
    }

    // Modal
    function onAddFile ( v )
    {
        setData( 'image', v[ 0 ] );
        closeModal();
    }

    function removeImage ()
    {
        setData( 'image', '' );
    }

    function handelShowModal ()
    {
        if ( data.image == "" )
        {
            setSelectedImg( [] )
        } else
        {
            setSelectedImg( [ data.image ] )
        }
        setShowModal( true )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    return (
        <AdminLayout>
            <Head title={ "Edit" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.website.benefits' ) }  className="inline-flex gap-1 items-center">
                                    <FaHandsHoldingCircle  className="text-base text-slate-900" />
                                    <span>{ t( 'Benefit' ) }</span>
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

                <div  className='card rounded shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Update Benefit' ) }</h2>
                        </div>
                    </div>
                    {/* Language Tabs */ }
                    <div  className={ active_languages.length < 7 ? `grid grid-cols-${ active_languages.length }` : "grid grid-cols-7" }>
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.website.benefit_edit', { lang: language.code, id: benefit.id } ) }  className={ lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500' }><span  className="text-sm"> { language.name }</span></a>
                            ) )
                        }
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Modal */ }
                            { showModal && <UploadModal selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                            {/* Title */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title' ) }</label>
                                <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( 'Enter Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                            </div>
                            {/* Sub Title */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="sub_title">{ t( 'Sub Title' ) }</label>
                                <input onChange={ e => setData( 'sub_title', e.target.value ) } value={ data.sub_title } name='sub_title' id='sub_title' type="text" placeholder={ t( 'Enter Sub Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                { errors.sub_title && <div  className="text-red-500 text-sm mt-1">{ errors.sub_title }</div> }
                            </div>
                            {/* Position */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="position">{ t( 'Position' ) }</label>
                                <input onChange={ e => setData( 'position', e.target.value ) } value={ data.position } name='position' id='position' type="number" placeholder={ t( 'Enter Position' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                { errors.position && <div  className="text-red-500 text-sm mt-1">{ errors.position }</div> }
                            </div>

                            {/* Image */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Image' ) } <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal() }
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
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
