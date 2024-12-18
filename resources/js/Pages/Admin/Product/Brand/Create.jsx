import UploadModal from "@/Components/UploadModals/UploadModal";
import { placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { CiMedal } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Create ()
{
    const { t } = useLaravelReactI18n();

    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",
        logo: "",
        meta_title: "",
        meta_description: "",
    } )

    function handleChange ( e )
    {
        const key = e.target.id;
        const value = e.target.value
        setData( key, value )
    }

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.product.brand.store' ) )
    }

    // Image and Modal funtionalities
    function onAddFile ( v )
    {
        if ( type == 'logo' )
        {
            setData( 'logo', v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        if ( data.logo == "" )
        {
            setSelectedImg( [] )
        } else
        {
            setSelectedImg( [ data.logo ] )
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    function removeLogo ()
    {
        setData( 'logo', '' );
    }

    return (
        <AdminLayout>
            <Head title={ "Create" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.product.brand.index' ) }  className="inline-flex gap-1 items-center">
                                    <CiMedal  className="text-base" />
                                    <span>{ t( 'Brand' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{ t( 'Create' ) }</span>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Create New Brand' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Modal */ }
                            { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                            {/* name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Brand Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* logo */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Logo' ) } <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 1:1)</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal( 'logo' ) }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.logo ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { data.logo && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeLogo() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ data.logo || placeholder1_1() } alt={ 'Logo' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Meta Title */ }
                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="meta_title">{ t( 'Meta Title' ) }</label>
                                <input onChange={ e => setData( 'meta_title', e.target.value ) } value={ data.meta_title } name='meta_title' id='meta_title' type="text"  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" placeholder={ t( "Type here" ) } />
                                { errors.meta_title && <div  className="text-red-500 text-sm mt-1">{ errors.meta_title }</div> }
                            </div>
                            {/* Meta Description */ }
                            <div  className='py-6'>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="meta_description">{ t( 'Meta Description' ) }</label>
                                <textarea onChange={ e => handleChange( e ) } value={ data.meta_description } name='meta_description' id='meta_description' type="text" placeholder={ t( "Type here" ) } rows="4"  className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white" />
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Create' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
