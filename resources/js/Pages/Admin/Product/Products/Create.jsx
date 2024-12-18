import { flat_persent, shipping_fee_type, stock_visibility } from "@/Array";
import UploadModal from "@/Components/UploadModals/UploadModal";
import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import chroma from "chroma-js";
import cryptoRandomString from "crypto-random-string";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from "moment";
import { MuiChipsInput } from "mui-chips-input";
import { PickerModal } from "mui-daterange-picker-plus/dist";
import { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoSyncOutline } from "react-icons/io5";
import { LuFilePlus } from "react-icons/lu";
import { MdDateRange, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from 'react-select';



export default function Create ( { categoryList, attributeList, attributeValueList, colorsList, brandList } )
{
    const { t } = useLaravelReactI18n();

    const { active_locale, default_currency_symbol } = usePage().props

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        lang: active_locale,
        name: "",
        category_id: "",
        brand_id: "",
        unit: "",
        weight: "",
        min_qty: "1",
        barcode: "",
        tags: [],
        description: "",
        gallery_image: [],
        thumbnail_image: "",
        video_provider: "",
        video_link: "",
        unit_price: "",
        discount: "",
        discount_type: "",
        discount_start_date: "",
        discount_end_date: "",
        variant_product: false,
        low_stock_qty: "",
        stock_visibility_state: "",
        sku: "",
        current_stock: "0",
        tax: "",
        tax_type: "",
        shipping_type: "",
        shipping_cost: "",
        is_quantity_multiplied: false,
        cash_on_delivery: true,
        est_shipping_days: "",
        meta_title: "",
        meta_description: "",
        meta_image: "",
        colors: [],
        choice_no: [ 1 ],
        choice: [],
        choice_options_1: [],
    } );


    // States and props
    const [ activeTab, setActiveTab ] = useState( "general" );
    const [ activeCategoriesOptions, setActiveCategoriesOptions ] = useState( [] );
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ selectedBrands, setSelectedBrands ] = useState();
    const [ selectedVideoProvider, setSelectedVideoProvider ] = useState( { value: 'youtube', label: 'YouTube' } );
    const [ selectedDiscountType, setSelectedDiscountType ] = useState( { value: 'percent', label: 'Persent' } );
    const [ selectedStockVisibility, setSelectedStockVisibility ] = useState( { value: 'quantity', label: 'Visible with quantity' } );
    const [ selectedTaxType, setSelectedTaxType ] = useState( { value: 'percent', label: 'Persent' } );
    const [ selectedShippingFeeType, setSelectedShippingFeeType ] = useState( { value: 'free', label: 'Free Shipping' } );
    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );
    const [ anchorEl, setAnchorEl ] = useState();
    const [ open, setOpen ] = useState( false );
    const [ selectedColors, setSelectedColors ] = useState( [] );
    const [ selectedAttributes, setSelectedAttributes ] = useState( [] );
    const [ selectedAttributeValues, setSelectedAttributeValues ] = useState( [] );
    const [ dynamicInputsData, setDynamicInputsData ] = useState( "" );
    const [ dynamicInputActive, setDynamicInputActive ] = useState( false );
    const [ hasVariant, setHasVariant ] = useState( false );
    const [ changed, SetChanged ] = useState();

    // Select Colors styles
    const colourStyles = {
        control: ( styles ) => ( { ...styles, backgroundColor: 'white' } ),
        option: ( styles, { data, isDisabled, isFocused, isSelected } ) =>
        {
            const color = chroma( data.color );
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha( 0.1 ).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast( color, 'white' ) > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[ ':active' ],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha( 0.3 ).css()
                        : undefined,
                },
            };
        },
        multiValue: ( styles, { data } ) =>
        {

            const color = chroma( data.color );
            return {
                ...styles,
                backgroundColor: color.alpha( 0.1 ).css(),
            };
        },
        multiValueLabel: ( styles, { data } ) => ( {
            ...styles,
            color: data.color,
        } ),
        multiValueRemove: ( styles, { data } ) => ( {
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        } ),
    };

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

    }, [] );

    // Category handler
    function handleCategory ( e )
    {
        setSelectedCategory( e )
        setData( 'category_id', e.value )
    }

    // Brand handler
    function handleBrands ( e )
    {
        setSelectedBrands( e )
        setData( 'brand_id', e.value );
    }

    // Tags handler
    function handleTagsChange ( chips )
    {
        setData( 'tags', chips )
    }

    // Description handler
    function handleDescriptionChange ( html )
    {
        setData( prevData => ( { ...prevData, 'description': html } ) );
    }

    // Video Provider handler
    function handleVideoProvider ( e )
    {
        setSelectedVideoProvider( e )
        setData( 'video_provider', e.value );
    }


    // Discount type handler
    function handleDiscountType ( e )
    {
        setSelectedDiscountType( e )
        setData( 'discount_type', e.value )
    }

    // Stock Visibility handler
    function handleStockVisibility ( e )
    {
        setSelectedStockVisibility( e )
        setData( 'stock_visibility_state', e.value )
    }

    // Tax type handler
    function handleTaxType ( e )
    {
        setSelectedTaxType( e )
        setData( 'tax_type', e.value )
    }

    // Shipping Fee Type handler
    function handleShippingFeeType ( e )
    {
        setSelectedShippingFeeType( e )
        setData( 'shipping_type', e.value )
    }

    // Submit handler
    function handleSubmit ( e )
    {
        e.preventDefault();

        post( route( 'admin.product.products.store' ) );
    }


    // Colors Handler
    function handleColorsChange ( e )
    {
        let cData = [];
        e.forEach( element =>
        {
            cData.push( element.label );
        } );
        setSelectedColors( e );
        setData( prevData => ( { ...prevData, 'colors': cData } ) );

        if ( cData.length > 0 )
        {
            setData( prevData => ( { ...prevData, 'colors_active': 1 } ) );
        } else
        {
            setData( prevData => ( { ...prevData, 'colors_active': 0 } ) );
        }
    }

    function handleAttributesChange ( e )
    {
        var choice = [];
        var choice_no = [];
        var att = [];
        e.forEach( element =>
        {
            choice.push( element.label )
            choice_no.push( element.value )
            att.push( { attribute: element.label, values: [] } )
        } )
        setSelectedAttributes( e )
        setSelectedAttributeValues( att )
        setData( prevData => ( { ...prevData, 'choice': choice } ) );
        setData( prevData => ( { ...prevData, 'choice_no': choice_no } ) );



    }

    function handeAttributeValueChange ( e, attribute )
    {
        const attrList = [ ...selectedAttributeValues ];
        const attr = attrList?.find( a => a.attribute === attribute.label );
        if ( attr )
        {

            attr.values = e
        }
        setSelectedAttributeValues( attrList )

        if ( e.length > 0 )
        {
            setData( prevData => ( { ...prevData, [ 'choice_options_' + attribute.value ]: e } ) );

        } else
        {
            setData( prevData => ( { ...prevData, [ 'choice_options_' + attribute.value ]: '' } ) );
        }

        SetChanged( e )
    }


    useEffect( () =>
    {
        setDynamicInputActive( false )
        axios.post( route( 'admin.product.sku_combination' ), data )
            .then( function ( response )
            {

                setDynamicInputsData( response.data );

                response.data.combinations.map( ( combination, i ) =>
                {
                    let str = '';
                    combination.map( ( element, index ) =>
                    {
                        if ( index > 0 )
                        {

                            str += '-' + element;
                        } else
                        {
                            str += element;
                        }
                    } );

                    setData( prevData => ( { ...prevData, [ 'price_' + str ]: data.unit_price } ) );
                    setData( prevData => ( { ...prevData, [ 'sku_' + str ]: '' } ) );
                    setData( prevData => ( { ...prevData, [ 'qty_' + str ]: 10 } ) );
                } );
                if ( response.data.combinations.length > 0 )
                {
                    setDynamicInputActive( true )
                } else
                {
                    setDynamicInputActive( false )
                }
            } );
    }, [ data.colors, data.choice_no, changed ] )



    function handelCombinationInputChange ( e )
    {
        const key = e.target.name
        const value = e.target.value
        setData( key, value )
    }
    // Modal
    function onAddFile ( v )
    {
        if ( type == 'gallery_image' )
        {
            let galleryImg = [];
            v.forEach( ( img ) =>
            {
                galleryImg.push( img )
            } )
            setData( 'gallery_image', galleryImg );
        }
        else if ( type == 'thumbnail_image' )
        {
            setData( 'thumbnail_image', v[ 0 ] );
        }
        else if ( type == 'meta_image' )
        {
            setData( 'meta_image', v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        setSelectedImg( [] )
        if ( index == 'gallery_image' )
        {
            setSelectedImg( data.gallery_image )
        }
        else if ( index == 'thumbnail_image' && data.thumbnail_image )
        {
            setSelectedImg( [ data.thumbnail_image ] )
        }
        else if ( index == 'meta_image' && data.meta_image )
        {
            setSelectedImg( [ data.meta_image ] )
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Romove Images
    function removeGalleryImage ( img )
    {
        const filteredImages = data.gallery_image.filter( index => index !== img );
        setData( 'gallery_image', filteredImages );
    }

    function removeFile ( type )
    {
        if ( type == 'thumbnail_image' )
        {
            setData( 'thumbnail_image', '' );
        }
        else if ( type == 'meta_image' )
        {
            setData( 'meta_image', '' );
        }

    }

    // Date Range
    function handleClick ( e )
    {
        setAnchorEl( e.currentTarget )
        setOpen( !open );
    };

    function handleClose ()
    {
        setOpen( false );
    };

    function handleSetDateRangeOnSubmit ( dateRange )
    {
        setData( prevData => ( { ...prevData, 'discount_start_date': moment( dateRange.startDate ).format( 'YYYY-MM-DD' ) } ) );
        setData( prevData => ( { ...prevData, 'discount_end_date': moment( dateRange.endDate ).format( 'YYYY-MM-DD' ) } ) );
        handleClose();
    };

    return (
        <AdminLayout>

            <Head title={ "Create Product" } />
            <div  className='p-4 bg-[#F5F6FA]'>
                {/* Breadcrumbs */ }
                <div  className="flex items-center justify-between my-3">
                    <div  className="text-sm breadcrumbs text-slate-600 my-5">
                        <ul>
                            <li>
                                <a href={ route( 'admin.product.products.index' ) }  className="inline-flex gap-1 items-center">
                                    <BsHandbag  className="text-sm text-slate-900" />
                                    <span>{ t( 'Products' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{ t( 'Crerate' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <Link onClick={ e => window.history.back() }>
                        <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'>
                            <MdKeyboardDoubleArrowLeft  className='text-xl' />
                            <span>{ t( 'Back' ) }</span>
                        </button>
                    </Link>
                </div>

                <div  className='card rounded-lg shadow-md bg-white border-[1px] border-slate-300 pb-5 w-11/12 mx-auto'>
                    <div  className="border-b">
                        <h2  className="text-lg font-medium m-4">{ t( 'Create Product' ) }</h2>
                    </div>
                    <form  className="bg-[#F5F6FA]" onSubmit={ handleSubmit }>
                        {/* Modal */ }
                        { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                        {/* Tab List */ }
                        <div role="tablist"  className="tabs tabs-boxed px-8 py-4 bg-gray-100 rounded-t-lg">
                            <button
                                type="button"
                                 className={ `tab tab-bordered text-slate-600 ${ activeTab === "general" ? "bg_primary text-white" : "" }` }
                                onClick={ e => setActiveTab( "general" ) }
                            >
                                { t( 'General Information' ) }
                            </button>
                            <button
                                type="button"
                                 className={ `tab tab-bordered text-slate-600 ${ activeTab === "media" ? "bg_primary text-white" : "" }` }
                                onClick={ e => setActiveTab( "media" ) }
                            >
                                { t( ' Media & Files' ) }
                            </button>
                            <button
                                type="button"
                                 className={ `tab tab-bordered text-slate-600 ${ activeTab === "stock" ? "bg_primary text-white" : "" }` }
                                onClick={ e => setActiveTab( "stock" ) }
                            >
                                { t( 'Price & Stock' ) }
                            </button>
                            <button
                                type="button"
                                 className={ `tab tab-bordered text-slate-600 ${ activeTab === "shipping" ? "bg_primary text-white" : "" }` }
                                onClick={ e => setActiveTab( "shipping" ) }
                            >
                                { t( 'Shipping' ) }
                            </button>
                            <button
                                type="button"
                                 className={ `tab tab-bordered text-slate-600 ${ activeTab === "seo" ? "bg_primary text-white" : "" }` }
                                onClick={ e => setActiveTab( "seo" ) }
                            >
                                { t( 'SEO' ) }
                            </button>
                        </div>

                        {/* Tab contents */ }
                        <div  className="mb-8 mx-8">
                            {/* General Tab*/ }
                            { activeTab === "general" && (
                                <>
                                    <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                        {/* Name & Category */ }
                                        <div  className="px-9 flex items-center gap-4">
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="name">{ t( 'Name' ) }*</label>
                                                <input
                                                    onChange={ e => setData( 'name', e.target.value ) }
                                                    value={ data.name }
                                                    name='name'
                                                    id='name'
                                                    type="text"
                                                    placeholder={t('Enter Product Name')}
                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                />
                                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                                            </div>

                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="category_id">{ t( 'Category' ) }*</label>
                                                <Select
                                                    id="category_id"
                                                    name="category_id"
                                                    placeholder={ t( 'Select Category' ) }
                                                     className="w-full rounded-lg z-10"
                                                    classNamePrefix="react-select"
                                                    value={ selectedCategory }
                                                    onChange={ e => handleCategory( e ) }
                                                    options={ activeCategoriesOptions }
                                                />
                                                { errors.category_id && <div  className="text-red-500 text-sm mt-1">{ errors.category_id }</div> }
                                            </div>
                                        </div>

                                        {/* Brand & Unit */ }
                                        <div  className="px-9 flex items-center gap-4">
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="brands">{ t( 'Brand' ) }</label>
                                                <Select
                                                    id="brands"
                                                    name="brands"
                                                    placeholder={ t( 'Select Brand' ) }
                                                     className="w-full rounded-lg z-30"
                                                    classNamePrefix="react-select"
                                                    value={ selectedBrands }
                                                    onChange={ e => handleBrands( e ) }
                                                    options={ brandList.map( ( brand ) => ( { value: brand.id, label: brand.name } ) ) }
                                                />
                                            </div>

                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="unit">{ t( 'Unit' ) }*</label>
                                                <input
                                                    onChange={ e => setData( 'unit', e.target.value ) }
                                                    value={ data.unit }
                                                    name='unit'
                                                    id='unit'
                                                    type="text"
                                                    placeholder={t('Unit') + ' (e.g kg. pc. etc)'}
                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                />
                                                { errors.unit && <div  className="text-red-500 text-sm mt-1">{ errors.unit }</div> }
                                            </div>
                                        </div>

                                        {/* Weight & Min Quantity */ }
                                        <div  className="px-9 flex items-center gap-4">
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="weight">{ t( 'Weight' ) }</label>
                                                <div  className="grid grid-cols-11">
                                                    <div  className="col-span-10">
                                                        <input
                                                            onChange={ e => setData( 'weight', e.target.value ) }
                                                            value={ data.weight }
                                                            name='weight'
                                                            id='weight'
                                                            type="text"
                                                            placeholder="0.00"
                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded-l-lg text-sm"
                                                        /></div>
                                                    <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[13px] rounded-r-lg text-sm">
                                                        <p  className="text-center">KG</p>
                                                    </div>
                                                </div>
                                                { errors.weight && <div  className="text-red-500 text-sm mt-1">{ errors.weight }</div> }
                                            </div>
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="min_qty">{ t( 'Min Order Quantity' ) }* <span  className="text-blue-600 text-[12px]">{ ( '( The minimum quantity needs to be purchased by your customer.)' ) }</span></label>
                                                <input
                                                    onChange={ e => setData( 'min_qty', e.target.value ) }
                                                    value={ data.min_qty }
                                                    name='min_qty'
                                                    id='min_qty'
                                                    type="number"
                                                    min="0"
                                                    placeholder="0"
                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                />
                                                { errors.min_qty && <div  className="text-red-500 text-sm mt-1">{ errors.min_qty }</div> }
                                            </div>

                                        </div>

                                        {/* Barcode & Tags */ }
                                        <div  className="px-9 flex items-center gap-4">
                                            <div  className="w-full">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="barcode">{ t( 'Barcode' ) }</label>
                                                <div  className="w-full flex items-center">
                                                    <input
                                                        onChange={ ( e ) => setData( 'barcode', e.target.value ) }
                                                        value={ data.barcode }
                                                        name='barcode'
                                                        id='barcode'
                                                        type="number"
                                                        placeholder={t('Enter Product Barcode')}
                                                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                    />
                                                    { errors.barcode && <div  className="text-red-500 text-sm mt-1">{ errors.barcode }</div> }
                                                    <button  className="border bg-[#E9ECEF] py-[15px] px-[19px] rounded -ms-14" onClick={ () => setData( 'barcode', cryptoRandomString( { length: 10, type: 'numeric' } ) ) } type="button"><IoSyncOutline /></button>
                                                </div>
                                            </div>
                                            <div  className="w-full flex flex-col">
                                                <label  className='label-text text-slate-600 text-sm font-medium mb-[2px]' htmlFor="tags">{ t( 'Tags' ) } <span  className="text-blue-600 text-[12px]">{ ( '( Type and hit enter to add a tag)' ) }</span></label>
                                                <MuiChipsInput placeholder={ t( 'Type And Press Enter' ) } size="small" value={ data.tags } onChange={ e => handleTagsChange( e ) } />
                                                { errors.tags && <div  className="text-red-500 text-sm mt-1">{ errors.tags }</div> }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */ }
                                    <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                        <div  className="px-9">
                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="description">{ t( 'Description' ) }</label>
                                            <div  className='h-60'>
                                                <Wysiwyg defaultValue={ data.description } placeholder="Description" onWysiwygChange={ e => handleDescriptionChange( e ) } />
                                            </div >
                                            { errors.description && <div  className="text-red-600 font-medium mt-1">{ errors.description }</div> }
                                        </div >
                                    </div >
                                </>
                            )
                            }

                            {/* Media Tab*/ }
                            {
                                activeTab === "media" && (
                                    <>
                                        <div  className="px-8 py-6 mb-8 space-y-4 bg-white rounded-lg">

                                            <h2  className="text-start font-semibold text-lg">{ t( 'Product Images' ) }</h2>
                                            {/* Gallery image */ }
                                            <div  className='flex flex-col w-full'>
                                                <label  className='label-text text-slate-600 text-sm'>
                                                    { t( 'Gallery Images' ) } <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                                </label>
                                                <div  className="w-full">
                                                    <div
                                                        onClick={ e => { setLimit( 5 ), handelShowModal( 'gallery_image' ) } }
                                                         className="cursor-pointer grid grid-cols-12 items-center"
                                                    >
                                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                                        </div>
                                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                            <p  className="ps-4 font-medium">{ data.gallery_image?.length + ' files chosen' }</p>
                                                        </div>
                                                    </div>
                                                    <div  className="flex items-center gap-3">
                                                        { data.gallery_image && data.gallery_image.map( ( img, i ) => ( <div key={ i }  className="relative">
                                                            <IoMdClose onClick={ e => { removeGalleryImage( img ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ img } alt={ 'gallery Images' } />

                                                        </div> ) ) }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Thumbnail Image */ }
                                            <div  className='flex flex-col w-full'>
                                                <label  className='label-text text-slate-600 text-sm'>
                                                    { t( 'Thumbnail Image' ) } <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                                </label>
                                                <div  className="w-full">
                                                    <div
                                                        onClick={ e => { setLimit( 1 ), handelShowModal( 'thumbnail_image' ) } }
                                                         className="cursor-pointer grid grid-cols-12 items-center"
                                                    >
                                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                                        </div>
                                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                            <p  className="ps-4 font-medium">{ data.thumbnail_image ? '1 file chosen' : '0 file chosen' }</p>
                                                        </div>
                                                    </div>
                                                    <div  className="flex items-center gap-3">
                                                        { data.thumbnail_image && <div  className="relative">
                                                            <IoMdClose onClick={ e => { removeFile( 'thumbnail_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ data.thumbnail_image } alt={ 'Banner' } />
                                                        </div> }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product Video */ }
                                        <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                            <h2  className="text-start font-semibold text-lg">{ t( 'Product Video' ) }</h2>
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="video_link">{ t( 'Video Link' ) } <span  className="text-blue-600 text-[12px]">{ ( '( Use proper link without extra parameter. Don\'t use short share link/embeded iframe code.)' ) }</span></label>
                                                <input
                                                    onChange={ e => setData( 'video_link', e.target.value ) }
                                                    value={ data.video_link }
                                                    name='video_link'
                                                    id='video_link'
                                                    type="url"
                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                    placeholder="https://"
                                                />
                                                { errors.video_link && <div  className="text-red-500 text-sm mt-1">{ errors.video_link }</div> }
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                            {/* Price & Stock Tab*/ }
                            {
                                activeTab === "stock" && (
                                    <>
                                        {/* Product Price */ }
                                        <div  className="px-8 py-6 mb-8 space-y-4 bg-white rounded-lg">
                                            <h2  className="text-start font-semibold text-lg">{ t( 'Product Price' ) }</h2>

                                            <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                                {/* Unit Price*/ }
                                                <div  className="mb-4 w-full">
                                                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="unit_price">{ t( 'Unit Price' ) } *</label>
                                                    <div  className="flex items-center">
                                                        <div  className="grow">
                                                            <input
                                                                onChange={ e => setData( 'unit_price', e.target.value ) }
                                                                value={ data.unit_price }
                                                                name='unit_price'
                                                                id='unit_price'
                                                                type="number"
                                                                min="0"
                                                                placeholder="0"
                                                                 className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-s-lg text-sm"
                                                            />
                                                        </div>
                                                        <div  className="border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-[50px] p-[9px] rounded-r-lg text-lg">
                                                            <p  className="text-center">{default_currency_symbol}</p>
                                                        </div>
                                                    </div>
                                                    { errors.unit_price && <div  className="text-red-500 text-sm mt-1">{ errors.unit_price }</div> }
                                                </div>
                                                {/* Discounts */ }
                                                <div  className="flex items-center gap-4">
                                                    {/* Discount */ }
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor=" discount">{ t( 'Discount' ) }</label>
                                                        <input
                                                            onChange={ e => setData( 'discount', e.target.value ) }
                                                            value={ data.discount }
                                                            name='discount'
                                                            id='discount'
                                                            min="0"
                                                            type="number"
                                                            placeholder="0"
                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                        />
                                                        { errors.discount && <div  className="text-red-500 text-sm mt-1">{ errors.discount }</div> }
                                                    </div>
                                                    {/* Discount Type */ }
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_type">{ t( 'Discount Type' ) }</label>
                                                        <Select
                                                            id="discount_type"
                                                            name=" discount_type"
                                                            placeholder={ t( 'Select Discount Type' ) }
                                                             className="w-full rounded-lg z-30"
                                                            classNamePrefix="react-select"
                                                            value={ selectedDiscountType }
                                                            onChange={ e => handleDiscountType( e ) }
                                                            options={ flat_persent }
                                                        />
                                                    </div>
                                                </div>
                                                {/*   Discount Period */ }
                                                <div  className="grid grid-cols-2 gap-4">
                                                    <div  className="w-full flex flex-col">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_period">{t('Discount Period')}</label>
                                                        <div onClick={handleClick}  className="flex justify-between items-center p-[13px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded-lg text-sm">
                                                            <span>{data.discount_start_date != '' ? data.discount_start_date : 'YYYY-MM-DD'} &nbsp; to &nbsp; {data.discount_end_date != '' ? data.discount_end_date : 'YYYY-MM-DD'}</span>
                                                            <span><MdDateRange  className="text-xl" /></span>
                                                        </div>
                                                        <PickerModal
                                                            customProps={ {
                                                                onSubmit: ( range ) => handleSetDateRangeOnSubmit( range ),
                                                                onCloseCallback: handleClose,
                                                            } }
                                                            modalProps={ {
                                                                anchorEl,
                                                                open,
                                                                onClose: handleClose,
                                                                slotProps: {
                                                                    paper: {
                                                                        sx: {
                                                                            borderRadius: "16px",
                                                                            boxShadow: "rgba(0, 0, 0, 0.21) 0px 0px 4px",
                                                                        },
                                                                    },
                                                                },
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                },
                                                            } }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Product Stock */ }
                                        <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                            <div  className="flex items-center justify-between">
                                                <h2  className="text-start font-semibold text-lg">{ t( 'Product Stock' ) }</h2>
                                                <div  className="flex items-center gap-2">
                                                    <input onChange={ e => { setHasVariant( e.target.checked ), setData( 'variant_product', e.target.checked ) } } type="checkbox" checked={ hasVariant }  className="toggle toggle-success toggle-sm" />
                                                    <h2  className="text-start font-medium text-base">{ t( 'Has Variant' ) }</h2>
                                                </div>
                                            </div>

                                            <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">

                                                <div  className="flex items-center gap-4">
                                                    {/* Minimum Stock Warning */ }
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="low_stock_qty">{ t( 'Minimum Stock Warning' ) }</label>
                                                        <input
                                                            onChange={ e => setData( 'low_stock_qty', e.target.value ) }
                                                            value={ data.low_stock_qty }
                                                            name='low_stock_qty'
                                                            id='low_stock_qty'
                                                            type="number"
                                                            min="0"
                                                            placeholder={t('Min stock to Warning')}
                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                        />
                                                        { errors.low_stock_qty && <div  className="text-red-500 text-sm mt-1">{ errors.low_stock_qty }</div> }
                                                    </div>
                                                    {/* Stock Visibility */ }
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="stock_visibility_state">{ t( 'Stock Visibility' ) }</label>
                                                        <Select
                                                            id="stock_visibility_state"
                                                            name="stock_visibility_state"
                                                            placeholder={ t( 'Select Stock Visibility State' ) }
                                                             className="w-full rounded-lg"
                                                            classNamePrefix="react-select"
                                                            value={ selectedStockVisibility }
                                                            onChange={ e => handleStockVisibility( e ) }
                                                            options={ stock_visibility }
                                                        />
                                                    </div>
                                                </div>
                                                { hasVariant == true ?
                                                    <>
                                                        <div  className="flex flex-col items-center gap-4">
                                                            {/* Colors */ }
                                                            <div  className="w-full">
                                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="colors">{ t( 'Colors' ) }*</label>
                                                                <Select
                                                                    isMulti
                                                                    id="colors"
                                                                    name="colors"
                                                                    placeholder="Select Colors"
                                                                     className="w-full rounded-lg"
                                                                    classNamePrefix="react-select"
                                                                    value={ selectedColors }
                                                                    onChange={ e => handleColorsChange( e ) }
                                                                    styles={ colourStyles }
                                                                    options={ colorsList.map( colorList => ( { value: colorList.id, label: colorList.name, color: colorList.color_code } ) ) }
                                                                />
                                                            </div>
                                                            {/* Attributes */ }
                                                            <div  className="w-full">
                                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="current_stock">{ t( 'Attributes' ) } <span  className="text-blue-600 text-[12px]">{ ( '( Choose the attributes of this product and then input values of each attribute)' ) }</span></label>
                                                                <Select
                                                                    isMulti
                                                                    id="attribute"
                                                                    name="attribute"
                                                                    placeholder='Select Attributes'
                                                                     className="w-full rounded-lg"
                                                                    classNamePrefix="react-select"
                                                                    value={ selectedAttributes }
                                                                    onChange={ e => handleAttributesChange( e ) }
                                                                    options={ attributeList.map( attribute => ( { value: attribute.id, label: attribute.title } ) ) }
                                                                />
                                                            </div>
                                                            {/* Dynamic Attributes */ }

                                                            { selectedAttributes.map( ( attribute, i ) =>
                                                            {
                                                                let attributeValue = []
                                                                let attributeValuefilter = attributeValueList.filter( data => data.attribute_id == attribute.value )
                                                                attributeValuefilter.forEach( data =>
                                                                {
                                                                    attributeValue.push( { label: data.value, value: data.id, id: data.attribute_id } )
                                                                } )
                                                                let filterAttributes = selectedAttributeValues?.find( data => data.attribute == attribute.label )
                                                                return <div key={ i }  className="w-full p-5 bg-slate-200 shadow-lg rounded-md">
                                                                    <label  className='label-text text-slate-600 text-sm font-medium'>{ t( attribute.label ) } *</label>
                                                                    <Select
                                                                        isMulti
                                                                        placeholder={ t( 'Select ' + attribute.label ) }
                                                                         className="w-full rounded-lg"
                                                                        classNamePrefix="react-select"
                                                                        onChange={ e => handeAttributeValueChange( e, attribute ) }
                                                                        value={ filterAttributes?.values }
                                                                        options={ attributeValue }
                                                                    />
                                                                </div>
                                                            } ) }
                                                        </div>
                                                        {/* Dynamic Inputs */ }
                                                        <div>
                                                            { dynamicInputActive &&
                                                                <table  className="tab- table">
                                                                    {/* head */ }
                                                                    <thead>
                                                                        <tr  className="border">
                                                                            <th align="center"  className="border text-slate-900">{ t( 'Variant' ) }</th>
                                                                            <th align="center"  className="border text-slate-900">{ t( 'Variant Price' ) }</th>
                                                                            <th align="center"  className="border text-slate-900">{ t( 'SKU' ) }</th>
                                                                            <th align="center"  className="border text-slate-900">{ t( 'Quantity' ) }</th>
                                                                            <th align="center"  className="border text-slate-900">{ t( 'Photo' ) }</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* row 1 */ }
                                                                        {
                                                                            dynamicInputsData?.combinations?.map( ( combination, i ) =>
                                                                            {
                                                                                let str = '';
                                                                                combination.map( ( element, index ) =>
                                                                                {
                                                                                    if ( index > 0 )
                                                                                    {

                                                                                        str += '-' + element;
                                                                                    } else
                                                                                    {
                                                                                        str += element;
                                                                                    }
                                                                                } );

                                                                                return <tr key={ i }  className="border">
                                                                                    <th>{ str }</th>
                                                                                    <td align="center"  className="border">
                                                                                        <div  className="flex items-center">
                                                                                            <input
                                                                                                type="number"
                                                                                                min="0"
                                                                                                placeholder={t('Enter')}
                                                                                                value={data['price_' + str]}
                                                                                                name={'price_' + str}
                                                                                                onChange={e => handelCombinationInputChange(e)}
                                                                                                 className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-s-lg text-sm"
                                                                                            />
                                                                                            <div  className="border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-[50px] p-[9px] rounded-r-lg text-lg">
                                                                                                <p  className="text-center">{default_currency_symbol}</p>
                                                                                            </div>
                                                                                        </div>

                                                                                    </td>
                                                                                    <td align="center"  className="border">
                                                                                        <input
                                                                                            type="text"
                                                                                            name={'sku_' + str}
                                                                                            placeholder={t('Enter')}
                                                                                            value={data['sku_' + str]}
                                                                                            onChange={e => handelCombinationInputChange(e)}
                                                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                                                        />
                                                                                    </td>
                                                                                    <td align="center"  className="border">
                                                                                        <input
                                                                                            type="number"
                                                                                            min="0"
                                                                                            value={ data[ 'qty_' + str ] }
                                                                                            name={ 'qty_' + str }
                                                                                            placeholder={ t( 'Enter' ) }
                                                                                            // value={ 0 }
                                                                                            onChange={e => handelCombinationInputChange(e)}
                                                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                                                        />
                                                                                    </td>
                                                                                    <td align="center"  className="border">
                                                                                        {/* <input type="file" name="" id="" />
                                                                                            <div  className="w-full">
                                                                                            <div
                                                                                                onClick={e => handelShowModal('photo')}
                                                                                                 className="cursor-pointer grid grid-cols-12 items-center"
                                                                                            >
                                                                                                <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                                                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                                                                                </div>
                                                                                                <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                                                                    <p  className="ps-4 font-medium">{photo?.file_name ?? 'No file chosen'}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div  className="flex items-center gap-3">
                                                                                                {photo?.url && <div  className="relative">
                                                                                                    <IoMdClose onClick={e => { removePhoto() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                                                                    <img  className=' h-32 border rounded-xl p-3 mt-3' src={photo?.url} alt={'photo'} />
                                                                                                </div>}
                                                                                            </div>
                                                                                        </div> */}
                                                                                    </td>
                                                                                </tr>
                                                                            } )
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            }




                                                            {/* <div dangerouslySetInnerHTML={{ __html: dynamicInputs }} /> */ }
                                                            {/* { dynamicInputActive && <SkuCombinations data={ dynamicInputsData } onCombinationInputChange={ handelCombinationInputChange } /> } */ }
                                                        </div>
                                                    </>
                                                    :
                                                    <div  className="flex items-center gap-4">
                                                        {/* SKU */ }
                                                        <div  className="w-full">
                                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="sku">{ t( 'SKU' ) }</label>
                                                            <div  className="w-full flex items-center">
                                                                <input
                                                                    onChange={ ( e ) => setData( 'sku', e.target.value ) }
                                                                    value={ data.sku }
                                                                    name='sku'
                                                                    id='sku'
                                                                    type="text"
                                                                    placeholder={t('Enter Product SKU')}
                                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                                />
                                                                { errors.sku && <div  className="text-red-500 text-sm mt-1">{ errors.sku }</div> }
                                                                <button  className="border bg-[#E9ECEF] py-[15px] px-[19px] rounded -ms-14" onClick={ () => setData( 'sku', cryptoRandomString( { length: 10, type: 'alphanumeric' } ) ) } type="button"><IoSyncOutline /></button>
                                                            </div>
                                                        </div>
                                                        {/* Current Stock */ }
                                                        <div  className="w-full">
                                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="current_stock">{ t( 'Current Stock' ) } *</label>
                                                            <input
                                                                onChange={ e => setData( 'current_stock', e.target.value ) }
                                                                value={ data.current_stock }
                                                                name='current_stock'
                                                                id='current_stock'
                                                                type="number"
                                                                min="0"
                                                                placeholder={t('Current available quantity')}
                                                                 className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                            />
                                                            { errors.current_stock && <div  className="text-red-500 text-sm mt-1">{ errors.current_stock }</div> }
                                                        </div>

                                                    </div>
                                                }
                                            </div >
                                        </div >
                                        {/* Tax */ }
                                        < div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg" >
                                            <h2  className="text-start font-semibold text-lg">{ t( 'Tax' ) }</h2>
                                            <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                                <div  className="flex items-center gap-4">
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="tax">{ t( 'Tax' ) }</label>
                                                        <input
                                                            onChange={ e => setData( 'tax', e.target.value ) }
                                                            value={ data.tax }
                                                            name='tax'
                                                            id='tax'
                                                            min="0"
                                                            type="number"
                                                            placeholder="0"
                                                             className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                        />
                                                        { errors.tax && <div  className="text-red-500 text-sm mt-1">{ errors.tax }</div> }
                                                    </div>
                                                    {/* Tax Type */ }
                                                    <div  className="w-full">
                                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="tax_type">{ t( 'Tax Type' ) }</label>
                                                        <Select
                                                            id="tax_type"
                                                            name="tax_type"
                                                            placeholder={ t( 'Select Tax Type' ) }
                                                             className="w-full rounded-lg z-30"
                                                            classNamePrefix="react-select"
                                                            value={ selectedTaxType }
                                                            onChange={ e => handleTaxType( e ) }
                                                            options={ flat_persent }
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div >

                                    </>

                                )
                            }


                            {/* Shipping Tab*/ }
                            {
                                activeTab === "shipping" && (

                                    <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                        <h2  className="text-start font-semibold text-lg">{ t( 'Shipping Info' ) }</h2>
                                        {/* Shipping */ }
                                        <div  className="px-9 ">
                                            {/* Shipping Fee Type */ }
                                            <div  className="w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="shipping_type">{ t( 'Shipping Fee Type' ) }
                                                </label>
                                                <Select
                                                    id="shipping_type"
                                                    name="shipping_type"
                                                    placeholder={ t( 'Select Shipping Fee Type' ) }
                                                     className="w-full rounded-lg z-30"
                                                    classNamePrefix="react-select"
                                                    value={ selectedShippingFeeType }
                                                    onChange={ e => handleShippingFeeType( e ) }
                                                    options={ shipping_fee_type }
                                                />
                                            </div>
                                        </div>

                                        {/* Shipping Fee When Click on Flat Option */ }
                                        { data.shipping_type == 'flat_rate' &&
                                            <div  className="px-9 w-full mb-4">
                                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="shipping_cost">{ t( 'Shipping Cost' ) } *</label>
                                                <input
                                                    onChange={ e => setData( 'shipping_cost', e.target.value ) }
                                                    value={ data.shipping_cost }
                                                    name='shipping_cost'
                                                    id='shipping_cost'
                                                    type="number"
                                                    min="0"
                                                    placeholder={t('Enter Shipping Cost')}
                                                     className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                />
                                                { errors.shipping_cost && <div  className="text-red-500 text-sm mt-1">{ errors.shipping_cost }</div> }
                                            </div>
                                        }
                                        <div  className="px-9 ">
                                            <ul  className="my-5">
                                                <li  className="grid grid-cols-4">
                                                    <p  className="col-span-2 text-sm text-slate-600 font-semibold">{t('Is Product Quantity Mulitiply')}</p>
                                                    <div  className="col-span-2 flex items-center gap-2">
                                                        <input onChange={ e => { setData( 'is_quantity_multiplied', e.target.checked ) } } type="checkbox"  className="toggle toggle-sm toggle-primary" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Shipping Days */ }
                                        <div  className="px-9">
                                            <div  className="flex justify-start gap-2">
                                                <span  className="badge badge-primary w-8 h-2 mt-[6px]"></span>
                                                <h2  className="text-start font-semibold text-base">{ t( 'Estimated Shipping Days & COD' ) }</h2>
                                            </div>
                                            <ul  className="my-5">
                                                <li  className="grid grid-cols-4">
                                                    <p  className="col-span-2 text-sm text-slate-600 font-semibold">{ t( 'Cash On Delivery' ) }</p>
                                                    <div  className="col-span-2 flex items-center gap-2">
                                                        <input onChange={ e => { setData( 'cash_on_delivery', e.target.checked ) } } defaultChecked={ data.cash_on_delivery } type="checkbox"  className="toggle toggle-sm toggle-primary" />
                                                        <p  className="text-slate-600 text-[16px]">{ t( 'Collect Cash After Delivery' ) }</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div  className="px-9 w-full mb-4">
                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="est_shipping_days">{ t( 'Shipping Days' ) }</label>
                                            <input
                                                onChange={ e => setData( 'est_shipping_days', e.target.value ) }
                                                value={ data.est_shipping_days }
                                                name='est_shipping_days'
                                                id='est_shipping_days'
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                 className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                            />
                                            { errors.est_shipping_days && <div  className="text-red-500 text-sm mt-1">{ errors.est_shipping_days }</div> }
                                        </div>

                                    </div>
                                )
                            }


                            {/* SEO Tab*/ }
                            {
                                activeTab === "seo" && (
                                    <div  className="px-8 py-6 mt-8 space-y-4 bg-white rounded-lg">
                                        <h2  className="text-start font-semibold text-lg">{ t( 'Product SEO' ) }</h2>
                                        <div  className="px-9 w-full mb-4">
                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="meta_title">{ t( 'Meta Title' ) }</label>
                                            <input
                                                onChange={ e => setData( 'meta_title', e.target.value ) }
                                                value={ data.meta_title }
                                                name='meta_title'
                                                id='meta_title'
                                                type="text"
                                                 className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                placeholder={t('Enter meta title')}
                                            />
                                            { errors.meta_title && <div  className="text-red-500 text-sm mt-1">{ errors.meta_title }</div> }
                                        </div>

                                        <div  className='px-9 w-full mb-4'>
                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="meta_description">{ t( 'Meta Description' ) }</label>
                                            <textarea
                                                onChange={ e => setData( 'meta_description', e.target.value ) }
                                                value={ data.meta_description }
                                                name='meta_description'
                                                id='meta_description'
                                                type="text"
                                                placeholder={ t( 'Enter meta description' ) }
                                                rows="4"
                                                 className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white"
                                            />
                                        </div>

                                        <div  className='px-9 flex flex-col justify-start rounded-lg gap-1 text-slate-600'>
                                            <div  className='flex flex-col'>
                                                <label  className='label-text text-sm font-medium text-slate-600 mb-1' htmlFor="meta_image">
                                                    {t('Meta image')}<span  className="text-[12px] ms-1 text_primary">(Aspect ratio should be 1:1)</span>
                                                </label>
                                                <div  className="w-full">
                                                    <div
                                                        onClick={ e => { setLimit( 1 ), handelShowModal( 'meta_image' ) } }
                                                         className="cursor-pointer grid grid-cols-12 items-center"
                                                    >
                                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                                        </div>
                                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                            <p  className="ps-4 font-medium">{ data.meta_image ? '1 file chosen' : '0 file chosen' }</p>
                                                        </div>
                                                    </div>
                                                    <div  className="flex items-center gap-3">
                                                        { data.meta_image && <div  className="relative">
                                                            <IoMdClose onClick={ e => { removeFile( 'meta_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                            <img  className=' h-32 border rounded-xl p-3 mt-3' src={ data.meta_image } alt={ 'meta Image' } />
                                                        </div> }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </div >
                        {/* Errors and submit button */ }
                        < div  className="flex flex-col justify-end items-end bg-white pt-5 px-4 space-y-4" >
                            < div >
                                { errors.name && <p  className="text-red-500 text-[15px]">{ errors.name }</p> }
                                { errors.category_id && <p  className="text-red-500 text-[15px]">{ errors.category_id }</p> }
                                { errors.unit && <p  className="text-red-500 text-[15px]">{ errors.unit }</p> }
                                { errors.min_qty && <p  className="text-red-500 text-[15px]">{ errors.min_qty }</p> }
                                { errors.unit_price && <p  className="text-red-500 text-[15px]">{ errors.unit_price }</p> }
                            </div >
                            <button type="submit" onClick={ e => setData( 'button', 'publish' ) }  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Save & Publish' ) }</button>
                        </div >
                    </form >
                </div >
            </div >
        </AdminLayout >
    );
}
