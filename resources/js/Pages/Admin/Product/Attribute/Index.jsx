import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEditAttributes, MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Index ( { categories, attributes } )
{
    const { t } = useLaravelReactI18n();

    const [ activeCategoriesOptions, setActiveCategoriesOptions ] = useState( [] );
    const [ selectedCategory, setSelectedCategory ] = useState( [] );

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        title: "",
        category_id: []
    } )
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.product.attribute.store' ), {
            onFinish: () =>
            {
                reset()
            }
        } )
    }

    // Effect of category
    useEffect( () =>
    {
        var options = [];
        function processArray ( data )
        {
            data.forEach( ( element ) =>
            {
                options.push( { value: element.id, label: "-".repeat( element.depth ) + element.name } );
                if ( Array.isArray( element.children ) )
                {
                    processArray( element.children );
                }
            } )
        }
        processArray( categories );

        setActiveCategoriesOptions( options );

        let selected = [];
        let filter = options.filter( ( item ) => data.category_id.indexOf( item.value ) !== -1 )
        filter.map( ( item ) =>
        {
            selected.push( { value: item.value, label: item.label } )
        } )
        setSelectedCategory( selected )
    }, [] );

    // Category handler
    function handleCategoryChange ( e )
    {
        let cat = [];
        setSelectedCategory( e )
        e.map( ( item ) =>
        {
            cat.push( item.value )
        } )
        setData( 'category_id', cat )
    }
    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.product.attribute.destroy', id ) )
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
            <Head title={ "Attributes" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* {/ Breadcrumbs /} */ }
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
                                    <MdEditAttributes  className="text-2xl text-slate-900" />
                                    <span>{ t( 'Attribute' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-12 gap-4">
                    {/* {/ Attribute Table /} */ }
                    <div  className='col-span-8 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'All Attribute' ) }</h2>
                            </div>
                            {/* Search*/ }
                            { attributes.data.length > 0 && <div>
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                                </label>
                            </div> }
                        </div>
                        <div  className='card-body'>
                            { attributes.data.length > 0 ? <div>
                                <table  className="table">
                                    {/* {/ head /} */ }
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="center">{ t( 'Title' ) }</th>
                                            <th align="center">{ t( 'Values' ) }</th>
                                            <th align="center">{ t( 'Categories' ) }</th>
                                            <th align="right">{ t( 'Actions' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {/ row /} */ }
                                        { attributes.data.map( ( attribute, index ) => (

                                            <tr key={ index }  className='text-slate-600'>
                                                <td align="left">{ ( index + 1 ) + ( ( attributes.meta.current_page - 1 ) * ( attributes.meta.per_page ) ) }</td>
                                                <td align="center">{ attribute.title }</td>
                                                <td align="center">
                                                    { attribute.attributeValue.map( ( value, index ) => (
                                                        <p key={ index }  className="badge badge-lg bg-blue-500 text-white text-[13px] m-[1px]">{ value.value }</p>
                                                    ) ) }
                                                </td>
                                                <td align="center">
                                                    { attribute.categories.map( ( category, index ) => (
                                                        <p key={ index }  className="badge badge-lg bg-slate-200 text-slate-900 text-[13px] m-[2px]">{ category.name }</p>
                                                    ) ) }
                                                </td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.product.attribute_value', attribute.id ) }><div data-tip="Attribute Values"  className="tooltip cursor-pointer p-[8px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                        <IoSettingsSharp  className='text-base' />
                                                    </div></Link>
                                                    <Link href={ route( 'admin.product.attribute_edit', { lang: 'en', id: attribute.id } ) }> <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={ () => handleDelete( attribute.id ) }>
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
                                    <p  className='text-slate-600 text-sm'>Showing { attributes.meta.from || 0 } to { attributes.meta.to || 0 } of { attributes.meta.total }</p>
                                    <Pagination links={ attributes.meta.links } />
                                </div>
                            </div> : <NothingFound title={ 'Nothing Found!' } /> }
                        </div>
                    </div>
                    {/* {/ Create Attribute /} */ }
                    <div  className='col-span-4 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 w-full mx-auto'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'Create Attribute' ) }</h2>
                            </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                            <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* {/ title /} */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title' ) } *</label>
                                    <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( 'Enter Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                                </div>
                                {/* {/ Category /} */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="category_id">{ t( 'Category' ) }</label>
                                    <Select
                                        isMulti
                                        id="category_id"
                                        name="category_id"
                                        placeholder="Select category"
                                         className="w-full rounded-lg z-30"
                                        classNamePrefix="react-select"
                                        value={ selectedCategory }
                                        onChange={ e => handleCategoryChange( e ) }
                                        options={ activeCategoriesOptions }
                                    />
                                </div>
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Create' ) }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
