import { categoryTypes } from "@/Array";
import UploadModal from "@/Components/UploadModals/UploadModal";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from "react-select";

export default function Edit ( { lang, categoryList, category, attributes, page } )
{
    const { t } = useLaravelReactI18n();
    const { back_url, active_languages, business_settings } = usePage().props
    let queryParams = usePage().props.ziggy.query;

    const [ activeCategoriesOptions, setActiveCategoriesOptions ] = useState( [] );
    const [ selectedCategory, setselectedCategory ] = useState();
    const [ physical, setPhysical ] = useState( { value: '0', label: 'Physical' } );
    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        _method: 'put',
        page: page,
        lang: lang,
        name: category.name,
        slug: category.slug,
        parent_id: category.parent_id,
        position: category.position,
        commision_rate: category.commision_rate,
        icon: category.icon,
        cover_image: category.cover_image,
        banner_image: category.banner_image,
        digital: category.digital,
        meta_title: category.meta_title,
        meta_description: category.meta_description,
        filtering_attributes: category.filtering_attributes
    } )


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
        processArray( categoryList );

        setActiveCategoriesOptions( options );

        let selected = [];
        let filter = options.filter( ( item ) => item.value == data.parent_id )
        filter.map( ( item ) =>
        {
            selected.push( { value: item.value, label: item.label } )
        } )
        setselectedCategory( selected[ 0 ] )
    }, [] );



    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.product.category.update', [ category.id, queryParams ] ) )
    }

    // Image and Modal funtionalities
    function onAddFile ( v )
    {
        if ( type == 'icon' )
        {
            setData( 'icon', v[ 0 ] );
        }
        else if ( type == 'cover_image' )
        {
            setData( 'cover_image', v[ 0 ] );
        }
        else
        {
            setData( 'banner_image', v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        if ( index == 'icon' )
        {
            if ( data.icon == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.icon ] )
            }
        }
        else if ( index == 'cover_image' )
        {
            if ( data.cover_image == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.cover_image ] )
            }
        }
        else if ( index == 'banner_image' )
        {
            if ( data.banner_image == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.banner_image ] )
            }
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    function removeIcon ()
    {
        setData( 'icon', '' );
    }
    function removeCoverImage ()
    {
        setData( 'cover_image', '' );
    }
    function removeBannerImage ()
    {
        setData( 'banner_image', '' );
    }

    // Type handler
    function handleTypeChange ( e )
    {
        setData( 'digital', e.value )
        setPhysical( e )
    }

    // Category change handler
    function handleCategoryChange ( e )
    {
        setselectedCategory( e )
        setData( 'parent_id', e.value )
    }

    // Filtering attributes handler
    function handleFilteringAttributes ( e )
    {

        setData( 'filtering_attributes', e.label )
    }


    return (
        <AdminLayout>
            <Head title={ "Edit" } />
            <div  className='p-4'>
                {/* Breadcrumbs */ }
                <div  className="flex items-center justify-between my-3">
                    <div  className="text-sm breadcrumbs text-slate-600 my-5">
                        <ul>
                            <li>
                                <a href={ route( 'admin.product.category.index' ) }  className="inline-flex gap-1 items-center">
                                    <CiBoxList  className="text-base text-slate-900" />
                                    <span>{ t( 'Category' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className='text-sm' />
                                    <span>{ t( 'Edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>


                    {/* Back button */ }
                    <Link href={ back_url }>
                        <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                    </Link>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-300 pb-5 w-7/12 mx-auto'>
                    <div>
                        <h2  className="text-lg font-medium m-4">{ t( 'Edit Category' ) }</h2>
                    </div>
                    {/* Language Tabs */ }
                    <div  className="flex items-center">
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.product.category_edit', { id: category.id, lang: language.code } ) }  className={ lang == language.code ? 'text-center border py-3 bg-[#3390F3] text-white duration-500 grow' : 'text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500 grow' }>{ language.name }</a>
                            ) )
                        }

                    </div>
                    {/* Tab English */ }

                    <form onSubmit={ handleSubmit }>
                        {/* <input type="hidden" name="lang" value={locale} /> */ }
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6 space-y-4'>


                            {/* name */ }
                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Category Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>

                            {/* Type*/ }
                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="digital">{ t( 'Type' ) }</label>
                                <Select
                                    id="digital"
                                    name="digital"
                                    placeholder={ t( 'Select Type' ) }
                                     className="w-full rounded-lg"
                                    classNamePrefix="react-select"
                                    value={ physical }
                                    onChange={ e => handleTypeChange( e ) }
                                    options={ categoryTypes }
                                />
                            </div>
                            {/* Parent */ }
                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="parent_id">{ t( 'Parent Category' ) }</label>
                                <Select
                                    value={ selectedCategory }
                                    id="parent_id"
                                    name="parent_id"
                                    placeholder={ t( 'Select Parent Category' ) }
                                     className="w-full rounded-lg"
                                    classNamePrefix="react-select"
                                    onChange={ e => handleCategoryChange( e ) }
                                    options={ activeCategoriesOptions }
                                />
                            </div>
                            {/* Position */ }
                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="position">{ t( 'Position' ) }</label>
                                <input onChange={ e => setData( 'position', e.target.value ) } value={ data.position } name='position' id='position' type="number" min={ 1 } step={ 1 }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" placeholder={ t( 'Enter Position' ) } />
                                { errors.position && <div  className="text-red-500 text-sm mt-1">{ errors.position }</div> }
                            </div>

                            {/* Icon, and Images */ }
                            { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                            {/* Icon */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Icon' ) } <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 1:1)</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal( 'icon' ) }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.icon ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { data.icon && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeIcon() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ data.icon } alt={ 'Icon' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                            {/* Cover Image */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Cover Image' ) } <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 6:1)</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal( 'cover_image' ) }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.cover_image ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { data.cover_image && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeCoverImage() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ data.cover_image } alt={ 'coverImage' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Banner Image */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Banner Image' ) } <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 4:3)</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal( 'banner_image' ) }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.banner_image ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { data.banner_image && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeBannerImage() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ data.banner_image } alt={ 'Banner Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Meta Title */ }
                        <div  className="w-full px-4">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="meta_title">{ t( 'Meta Title' ) }</label>
                            <input onChange={ e => setData( 'meta_title', e.target.value ) } value={ data.meta_title } name='meta_title' id='meta_title' type="text"  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" placeholder={ t( 'Enter Meta Title' ) } />
                            { errors.meta_title && <div  className="text-red-500 text-sm mt-1">{ errors.meta_title }</div> }
                        </div>
                        {/* Meta Description */ }
                        <div  className='px-4 py-6'>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="meta_description">{ t( 'Meta Description' ) }</label>
                            <textarea onChange={ e => setData( 'meta_description', e.target.value ) } value={ data.meta_description } name='meta_description' id='meta_description' type="text" placeholder={ t( 'Enter Meta Description' ) } rows="4"  className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white" />
                        </div>

                        {/* Commision Rate */ }
                        { business_settings.category_wise_commission && <div  className="w-full px-4 py-6">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="commision_rate">{ t( 'Commision Rate' ) }</label>
                            <div  className="grid grid-cols-12">
                                <input onChange={ e => setData( 'commision_rate', e.target.value ) } value={ data.commision_rate } name='meta_title' id='meta_title' type="number"  className="col-span-11 p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded-l-lg text-sm" placeholder={ t( 'Enter Commision Rate' ) } />
                                <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[13px] rounded-r-lg text-sm">
                                    <p  className="text-center">%</p>
                                </div>
                            </div>
                            { errors.commision_rate && <div  className="text-red-500 text-sm mt-1">{ errors.commision_rate }</div> }
                        </div> }

                        {/* Attributes */ }
                        <div  className="w-full px-4">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="filtering_attributes">{ t( 'Filtering Attributes' ) }</label>
                            <Select
                                isMulti
                                id="digital"
                                name="digital"
                                placeholder={ t( 'Select Filtering Attributes' ) }
                                 className="w-full rounded-lg z-30"
                                classNamePrefix="react-select"
                                value={ data.filtering_attributes }
                                onChange={ e => handleFilteringAttributes }
                                options={ attributes.map( attribute => ( { value: attribute.id, label: attribute.title } ) ) }
                            />
                        </div>
                        <div  className="flex justify-end m-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>

                </div>
            </div>
        </AdminLayout>
    )

}

