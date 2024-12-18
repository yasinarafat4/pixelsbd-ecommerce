import UploadModal from "@/Components/UploadModals/UploadModal";
import { placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { PickerModal } from "mui-daterange-picker-plus";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdDateRange, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import Select from "react-select";

export default function Create ()
{

    const { t } = useLaravelReactI18n();
    const { default_currency_symbol, products } = usePage().props;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        title: "",
        banner: "",
        start_date: "",
        end_date: "",
        products: [],

    } )


    const [ showModal, setShowModal ] = useState( false );
    const [ open, setOpen ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );
    const [ anchorEl, setAnchorEl ] = useState();
    const [ selectedProducts, setSelectedProducts ] = useState( [] );
    const [ selectedProductList, setSelectedProductList ] = useState( [] );



    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.marketing.flashdeal.store' ) )
    }

    function onProductChange ( e )
    {
        const value = e.map( item => item.value );
        setSelectedProducts( e );
        setData( 'products', value );

        e.map( ( item ) =>
        {
            setData( prevData => ( { ...prevData, [ 'discount_' + item.value ]: prevData[ 'discount_' + item.value ] ?? '' } ) );
            setData( prevData => ( { ...prevData, [ 'discount_type_' + item.value ]: prevData[ 'discount_type_' + item.value ] ?? 'percent' } ) );
            // setData('discount_type_' + item.value, "");
        } )

        const filterSelectedProduct = products.filter( item => value.includes( item.id ) );
        setSelectedProductList( filterSelectedProduct );
    }


    // Discount handlers
    function onDiscountChange ( e )
    {
        setData( e.target.name, e.target.value );

    }

    function onDiscountTypeChange ( e )
    {
        setData( e.target.name, e.target.value );
    }

    // Modal
    function onAddFile ( v )
    {
        if ( type == 'banner' )
        {
            setData( 'banner', v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        if ( data.banner == "" )
        {
            setSelectedImg( [] )
        } else
        {
            setSelectedImg( [ data.banner ] )
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Romove Images
    function removeBanner ()
    {
        setData( 'banner', '' );
    }

    // Date Range
    const handleClick = ( e ) =>
    {
        setAnchorEl( e.currentTarget )
        setOpen( !open );
    };

    const handleClose = () =>
    {
        setOpen( false );
    };

    const handleSetDate = ( dateRange ) =>
    {
        setData( prevData => ( { ...prevData, 'start_date': moment( dateRange.startDate ).format( 'YYYY-MM-DD' ) } ) );
        setData( prevData => ( { ...prevData, 'end_date': moment( dateRange.endDate ).format( 'YYYY-MM-DD' ) } ) );
        handleClose();
    };

    return (
        <AdminLayout>
            <Head title={ "Create" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.marketing.flashdeal.index' ) }  className="inline-flex gap-1 items-center">
                                    <RiWaterFlashFill  className="text-lg text-slate-900" />
                                    <span>{ t( 'Flash Deals' ) }</span>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Flash Deal Information' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Title & Banner */ }
                            <div  className='grid grid-cols-2 gap-4'>
                                {/* Title */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title' ) }</label>
                                    <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( 'Enter Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                                </div>
                                <div>
                                    {/* Modal */ }
                                    { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                                    {/* Banner Image */ }
                                    <div  className='flex flex-col w-full'>
                                        <label  className='label-text text-slate-600 text-sm'>
                                            { t( 'Banner' ) }
                                        </label>
                                        <div  className="w-full">
                                            <div
                                                onClick={ e => handelShowModal( 'banner' ) }
                                                 className="cursor-pointer grid grid-cols-12 items-center"
                                            >
                                                <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                                </div>
                                                <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                    <p  className="ps-4 font-medium">{ data.banner ? '1 file chosen' : '0 file chosen' }</p>
                                                </div>
                                            </div>
                                            { errors.banner && <div  className="text-red-500 text-sm mt-1">{ errors.banner }</div> }
                                            <p  className="text-xs text-blue-600">This image is shown as cover banner in flash deal details page. Minimum aspect ratio required: 1:1.</p>

                                            <div  className="flex items-center gap-3">
                                                { data.banner && <div  className="relative">
                                                    <IoMdClose onClick={ e => { removeBanner() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                    <img  className='w-32 h-32 border rounded-xl p-3 mt-3' src={ data.banner || placeholder1_1() } alt={ 'Banner' } />
                                                </div> }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            {/* Date and Products */ }
                            <div  className="grid grid-cols-2 gap-4">
                                {/* Date */ }
                                <div  className="w-full flex flex-col">
                                    <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_period">{ t( 'Date' ) }</label>
                                    <div onClick={ handleClick }  className="flex justify-between items-center p-[13px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded-lg text-sm">
                                        <span>{ data.start_date != '' ? data.start_date : 'YYYY-MM-DD' } &nbsp; to &nbsp; { data.end_date != '' ? data.end_date : 'YYYY-MM-DD' }</span>
                                        <span><MdDateRange  className="text-xl" /></span>
                                    </div>
                                    <PickerModal
                                        customProps={ {
                                            onSubmit: ( range ) => handleSetDate( range ),
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
                                    { ( errors.start_date || errors.end_date ) && <div  className="text-red-500 text-sm mt-1">{ errors.start_date + ' ' + errors.end_date }</div> }
                                </div>
                                {/* Products */ }
                                <div  className="flex flex-col">
                                    <label  className='label-text text-slate-600 text-sm'>{ t( 'Products' ) }</label>
                                    <Select
                                        isMulti
                                        placeholder={ t( 'Select Product' ) }
                                         className="w-full rounded z-50"
                                        classNamePrefix="react-select"
                                        onChange={ e => onProductChange( e ) }
                                        value={ selectedProducts }
                                        options={ products.map( ( product ) => ( { value: product.id, label: product?.name } ) ) }
                                    />
                                </div>
                            </div>
                        </div>
                        <div  className="p-3 m-4 text-xs rounded bg-[#F8D7DA] border border-[#f7b6bb]">
                            If any product has discount or exists in another flash deal, the discount will be replaced by this discount & time limit.
                        </div>

                        {/* Dynamic Product Input */ }
                        { selectedProductList.length > 0 && <div  className="mx-4">
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">{ t( 'Product' ) }</th>
                                        <th align="left">{ t( 'Base Price' ) }</th>
                                        <th align="left">{ t( 'Discount' ) }</th>
                                        <th align="left">{ t( 'Discount Type' ) }</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }

                                    { selectedProductList.map( ( product, i ) => (
                                        <tr key={i} className='text-slate-600'>
                                            <td width='50%'>
                                                <div  className="flex items-start gap-3">
                                                    <div  className="avatar">
                                                        <div  className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={ product?.thumbnail_image || placeholder1_1() }
                                                                alt={ product?.name } />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div  className="font-bold">{ product?.name }</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="left">
                                                { default_currency_symbol }  { product.unit_price }
                                            </td>
                                            <td align="left">
                                                <div  className="w-full">
                                                    <input
                                                        required
                                                        onChange={ e => onDiscountChange( e ) }
                                                        value={ data[ 'discount_' + product.id ] }
                                                        name={ 'discount_' + product.id }
                                                        id={ 'discount_' + product.id }
                                                        min="0"
                                                        type="number"
                                                        placeholder="0"
                                                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                                    />
                                                </div>
                                            </td>
                                            <td align="left">
                                                <select value={ data[ 'discount_type_' + product.id ] } onChange={ e => onDiscountTypeChange( e ) } id={ 'discount_type_' + product.id } name={ 'discount_type_' + product.id }  className="select select-bordered w-full focus:outline-none">
                                                    <option value=''>Select Discount Type</option>
                                                    <option value='percent'>Percent</option>
                                                    <option value='amount'>Flat</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        </div> }
                        <div  className="flex justify-end m-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Create' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
