import { language_code } from "@/Array";
import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { BsTranslate } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdLanguage, MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Index ( { all_languages } )
{
    const { t } = useLaravelReactI18n();
    const { business_settings, active_languages } = usePage().props

    const [activeLanguage, setActiveLanguage] = useState([]);
    const [defaultLanguage, setDefaultLanguage] = useState([]);

    useEffect( () =>
    {
        var options = [];
        active_languages.forEach( lang =>
        {
            options.push( { value: lang.code, label: lang.name } );
        } );
        setActiveLanguage( options );

        let selected = options.find( item => item.value == business_settings.default_language );
        setDefaultLanguage( selected )
    }, [ active_languages ] );

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",
        rtl: "",
        code: ""
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.language.store' ), {
            onSuccess: () => { reset() }
        } )
    }

    function onCodeChange ( e )
    {
        let selected = language_code.filter( item => item.code == e.value );

        setData( data => ( { ...data, code: e.value } ) );
        setData( data => ( { ...data, rtl: selected[ 0 ].rtl } ) );
    }

    // Default Language submit handler
    function onDefaultLanguageChange ( e )
    {
        setDefaultLanguage( e );
    }

    // Default Language handler
    function handleDefaultLanguageSubmit ( e )
    {
        e.preventDefault()
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'default_language' ],
            default_language: defaultLanguage[ 'value' ],
        } )
    }



    function onStatusChange ( id, e )
    {
        router.put( route( 'admin.configuration.language.status', id ), {
            status: e.target.checked,
        }, {
            preserveScroll: true, preserveState: true
        } )
    }

    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.configuration.language.destroy', id ) )
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
            <Head title={ "Language" } />
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
                                    <MdLanguage  className="text-base text-slate-900" />
                                    <span>{ t( 'Language' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-12 gap-5">
                    <div  className="col-span-8">
                        <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-3 mb-6 h-40'>
                            <div  className="border-b pb-3 px-6">
                                <h2  className="text-[16px] font-medium">{ t( 'System Default Language' ) }</h2>
                            </div>
                            <form onSubmit={ handleDefaultLanguageSubmit }>
                                <div  className='grid grid-cols-1 items-center gap-4 px-6 py-6'>
                                    {/* Select*/ }
                                    <div  className="flex justify-around gap-6">
                                        <label  className='label-text text-slate-600 text-sm text-start'>{ t( 'Default Language' ) }</label>
                                        <Select
                                            name="default_language"
                                            placeholder={ t( 'Select Default Language' ) }
                                             className="w-80 rounded z-40"
                                            classNamePrefix="react-select"
                                            value={ defaultLanguage }
                                            onChange={ e => onDefaultLanguageChange( e ) }
                                            options={ activeLanguage }
                                        />
                                        <div>
                                            <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded text-white text-md">{ t( 'Save' ) }</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Language Table */ }
                        <div  className=' card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="flex items-center justify-between border-b pb-3 px-6">
                                <div>
                                    <h2  className="text-lg font-medium text-slate-600">{ t( 'Language' ) }</h2>
                                </div>
                                {/* Search*/ }
                                { all_languages.length > 0 && <div>
                                    <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                        <IoIosSearch  className="text-xl text-slate-600" />
                                        <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                                    </label>
                                </div> }
                            </div>
                            <div  className='card-body'>

                                { all_languages.length > 0 ? <div  className="">
                                    <table  className="table">
                                        {/* head */ }
                                        <thead>
                                            <tr  className='text-slate-600'>
                                                <th align="left">#</th>
                                                <th align="left">{ t( 'Name' ) }</th>
                                                <th align="center">{ t( 'Code' ) }</th>
                                                <th align="center">{ t( 'Direction' ) }</th>
                                                <th align="center">{ t( 'Status' ) }</th>
                                                <th align="right">{ t( 'Actions' ) }</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* row */ }
                                            { all_languages.map( ( language, i ) => (
                                                <tr key={ i }  className='text-slate-600'>
                                                    <td align="text-sm left">{ i + 1 }</td>
                                                    <td align="left">{ language.name }</td>
                                                    <td align="center">{ language.code }</td>
                                                    <td align="center">{ language.rtl ? 'Rtl' : 'Ltr' }</td>
                                                    <td align="center">
                                                        <input type="checkbox" onChange={ e => onStatusChange( language.id, e ) } checked={ language.status }  className="toggle toggle-sm toggle-success" />
                                                    </td>
                                                    <td align="center"  className="space-x-2">
                                                        <Link href={ route( 'admin.configuration.language.translate', language.code ) } ><div data-tip="Translate"  className="tooltip cursor-pointer p-[10px] text-blue-700 hover:text-slate-200 bg-blue-200 hover:bg-blue-600 duration-500 rounded-full">
                                                            <BsTranslate  className='text-sm' />
                                                        </div></Link>
                                                        <Link href={ route( 'admin.configuration.language.edit', language.id ) }>  <div data-tip="Edit"  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                            <BiSolidEdit  className='text-sm' />
                                                        </div></Link>
                                                        <Link> <div onClick={ () => handleDelete( language.id ) } data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <FaRegTrashAlt  className='text-sm' />
                                                        </div></Link>
                                                    </td>
                                                </tr>
                                            ) ) }
                                        </tbody>
                                    </table>
                                    {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                                </div> : <NothingFound title={ "Nothing Found!" } /> }
                            </div>
                        </div>
                    </div>
                    <div  className="col-span-4">
                        {/* Create New Language */ }
                        <div  className='card rounded-lg shadow-md bg-white border-[1px] border-slate-300 py-5 max-w-2xl mx-auto'>
                            <div  className="flex items-center justify-between border-b pb-3 px-6">
                                <div>
                                    <h2  className="text-lg font-medium text-slate-600">{ t( 'Create New Language' ) }</h2>
                                </div>
                            </div>
                            <form onSubmit={ handleSubmit }>
                                <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                    {/* name */ }
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                        <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Language Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                                    </div>

                                    {/* Code */ }
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="code">{ t( 'Language Code' ) }</label>
                                        <Select
                                            name="code"
                                            placeholder={ t( 'Select Language Code' ) }
                                             className="w-full rounded-lg"
                                            classNamePrefix="react-select"
                                            defaultValue={ data.code }
                                            onChange={ e => onCodeChange( e ) }
                                            options={ language_code.map( ( language ) => ( { value: language.code, label: language.name + ' ( ' + language.code + ' ) ' } ) ) }
                                        />
                                          { errors.code && <div  className="text-red-500 text-sm mt-1">{ errors.code }</div> }
                                    </div>
                                </div>
                                <div  className="flex justify-end mx-4">
                                    <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Create' ) }</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    )

}
