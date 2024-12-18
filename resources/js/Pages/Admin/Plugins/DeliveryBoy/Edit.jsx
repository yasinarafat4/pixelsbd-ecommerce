/* eslint-disable */

import UploadModal from "@/Components/UploadModals/UploadModal";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

export default function Edit ( { countries, delivery_boy } )
{
    const { t } = useLaravelReactI18n();
    const location = useGeoLocation();


    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );
    const [ selectedCountry, setSelectedCountry ] = useState( [] );
    const [ selectedState, setSelectedState ] = useState( [] );
    const [ selectedCity, setSelectedCity ] = useState( [] );
    const [ states, setStates ] = useState( [] );
    const [ cities, setCities ] = useState( [] );
    const [ phoneNumber, setPhoneNumber ] = useState( '' );


    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: delivery_boy.name,
        email: delivery_boy.email,
        phone: delivery_boy.phone,
        password: '',
        country_id: delivery_boy.country_id,
        state_id: delivery_boy.state_id,
        city_id: delivery_boy.city_id,
        image: delivery_boy.image,
        document_type: delivery_boy.document_type,
        nid_front: delivery_boy.nid_front,
        nid_back: delivery_boy.nid_back,
        passport: delivery_boy.passport,
        address: delivery_boy.address,
    } )


    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.deliveryboy.update_delivery_boy', delivery_boy.id ) )
    }

    //Set Country
    useEffect( () =>
    {
        let country = {};
        let co = countries.filter( country => country.id == data?.country_id );
        country = { value: co[ 0 ]?.id, label: co[ 0 ]?.name }
        setSelectedCountry( country );
        if ( data?.country_id )
        {
            axios.get( route( 'state_by_country', data?.country_id ) ).then( function ( response )
            {
                setStates( response.data )
            } )
        }
    }, [ data?.country_id ] )

    //Set State
    useEffect( () =>
    {
        let state = {};
        let st = states.filter( state => state.id == data?.state_id );
        state = { value: st[ 0 ]?.id, label: st[ 0 ]?.name }
        setSelectedState( state );
        if ( data?.state_id )
        {
            axios.get( route( 'city_by_state', data?.state_id ) ).then( function ( response )
            {
                setCities( response.data )

            } )
        }
    }, [ states ] )

    //Set city
    useEffect( () =>
    {
        let city = {};
        let ct = cities.filter( city => city.id == data?.city_id );
        city = { value: ct[ 0 ]?.id, label: ct[ 0 ]?.name }
        setSelectedCity( city );
    }, [ cities ] )

    // Phone
    useEffect( () =>
    {
        setTimeout( () =>
        {
            setPhoneNumber( data.phone );
        }, 1000 );
    }, [] );

    // Country change handler
    function OnCountryChange ( e )
    {
        setData( 'country_id', e.value )
        setSelectedCountry( e );
        axios.get( route( 'state_by_country', e.value ) ).then( function ( response )
        {
            setStates( response.data )

        } )
    }
    // Country change handler
    function OnStateChange ( e )
    {
        setData( 'state_id', e.value )
        setSelectedState( e );
        axios.get( route( 'city_by_state', e.value ) ).then( function ( response )
        {
            setCities( response.data )

        } )
    }
    // Country change handler
    function OnCityChange ( e )
    {
        setData( 'city_id', e.value )
        setSelectedCity( e );
    }

    // Modal
    function onAddFile ( v )
    {
        if ( type == 'image' )
        {
            setData( 'image', v[ 0 ] );
        }
        else if ( type == 'nid_front' )
        {
            setData( 'nid_front', v[ 0 ] );
        }
        else if ( type == 'nid_back' )
        {
            setData( 'nid_back', v[ 0 ] );
        }
        else if ( type == 'passport' )
        {
            setData( 'passport', v[ 0 ] );
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
        else if ( index == 'nid_front' )
        {
            if ( data.nid_front == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.nid_front ] )
            }
        }
        else if ( index == 'nid_back' )
        {
            if ( data.nid_back == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.nid_back ] )
            }
        }
        else if ( index == 'passport' )
        {
            if ( data.passport == "" )
            {
                setSelectedImg( [] )
            } else
            {
                setSelectedImg( [ data.passport ] )
            }
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Remove Images
    function removeImage ( imgType )
    {
        if ( imgType == 'image' )
        {
            setData( 'image', '' );
        }
        else if ( imgType == 'nid_front' )
        {
            setData( 'nid_front', '' );
        }
        else if ( imgType == 'nid_back' )
        {
            setData( 'nid_back', '' );
        }
        else if ( imgType == 'passport' )
        {
            setData( 'passport', '' );
        }
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
                                <a href={ route( 'admin.deliveryboy.all_delivery_boys' ) }  className="inline-flex gap-1 items-center">
                                    <PiUsersFourFill  className="text-base text-slate-900" />
                                    <span>{ t( 'All Delivery Boys' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaRegEdit  className="text-base text-slate-900" />
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

                <div  className='card rounded shadow bg-white border-[1px] border-slate-200 py-5 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Delivery Boy Information' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ e => handleSubmit( e ) }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) } <span  className="text-red-600">*</span></label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Name' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 w-full rounded text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Email */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="email">{ t( 'Email' ) } <span  className="text-red-600">*</span></label>
                                <input onChange={ e => setData( 'email', e.target.value ) } value={ data.email } name='email' id='email' type="text" placeholder={ t( 'Enter Email' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 w-full rounded text-sm" />
                                { errors.email && <div  className="text-red-500 text-sm mt-1">{ errors.email }</div> }
                            </div>
                            {/* Phone */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{ t( 'Phone' ) } <span  className="text-red-600">*</span></label>
                                <PhoneInput
                                    inputClass="p-[10px] focus:outline-none !border-[1px] !border-slate-300 block text-slate-600 w-full rounded text-sm"
                                    dropdownClass="!z-50"
                                    masks={ { bd: '....-......' } }
                                    enableSearch
                                    country={ location.country?.toLowerCase() }
                                    preventDefault
                                    value={ phoneNumber }
                                    onChange={ e => setData( 'phone', e ) }
                                    inputProps={ { name: 'phone', id: 'phone' } }
                                />
                                { errors.phone && <div  className="text-red-500 text-sm mt-1">{ errors.phone }</div> }
                            </div>
                            {/* Password */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm flex items-center gap-1' htmlFor="password"> <span>{ t( 'Password' ) }  <span  className="text-red-600">*</span></span> <span  className="text_primary text-xs">({ t( "If don't want to change, keep it blank!" ) })</span></label>
                                <input onChange={ e => setData( 'password', e.target.value ) } value={ data.password } name='password' id='password' type="password" placeholder={ t( 'Enter Password' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 w-full rounded text-sm" />
                                { errors.password && <div  className="text-red-500 text-sm mt-1">{ errors.password }</div> }
                            </div>
                            {/* Country */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'Country' ) } <span  className="text-red-600">*</span></label>
                                <Select
                                    name="country_id"
                                    placeholder={ t( 'Select Your Country' ) }
                                     className="w-full !rounded"
                                    classNamePrefix="react-select"
                                    onChange={ ( e ) => OnCountryChange( e ) }
                                    value={ selectedCountry }
                                    options={ countries.map( ( country ) => ( { value: country.id, label: country.name } ) ) }
                                />
                                { errors.country_id && <div  className="text-red-500 text-sm mt-1">{ errors.country_id }</div> }
                            </div>
                            {/* State */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'State' ) } <span  className="text-red-600">*</span></label>
                                <Select
                                    name="state_id"
                                    placeholder={ t( 'Select Your State' ) }
                                     className="w-full !rounded"
                                    classNamePrefix="react-select"
                                    onChange={ ( e ) => OnStateChange( e ) }
                                    value={ selectedState }
                                    options={ states.map( ( state ) => ( { value: state.id, label: state.name } ) ) }
                                />
                                { errors.state_id && <div  className="text-red-500 text-sm mt-1">{ errors.state_id }</div> }
                            </div>
                            {/* City */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'City' ) } <span  className="text-red-600">*</span></label>
                                <Select
                                    name="city_id"
                                    placeholder={ t( 'Select Your City' ) }
                                     className="w-full !rounded"
                                    classNamePrefix="react-select"
                                    onChange={ ( e ) => OnCityChange( e ) }
                                    value={ selectedCity }
                                    options={ cities.map( ( city ) => ( { value: city.id, label: city.name } ) ) }
                                />
                                { errors.city_id && <div  className="text-red-500 text-sm mt-1">{ errors.city_id }</div> }
                            </div>

                            {/* Modal */ }
                            { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                            {/* Image */ }
                            <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Image' ) } <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 1:1)</span>
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
                                            <IoMdClose onClick={ e => { removeImage( 'image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='w-32 h-32 border rounded-xl p-3 mt-3' src={ data.image } alt={ 'Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Select Document Type */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Document Type' ) }  <span  className="text-red-600">*</span>
                                </label>
                                <select onChange={ e => setData( 'document_type', e.target.value ) }  className="select select-bordered focus:outline-none w-full">
                                    <option value=''>Select document type</option>
                                    <option value="nid">NID</option>
                                    <option value="passport" >Passport</option>
                                </select>
                                { errors.document_type && <div  className="text-red-500 text-sm mt-1">{ errors.document_type }</div> }
                            </div>

                            { data.document_type == 'nid' && <div  className="space-y-2">
                                {/* NID Front Side*/ }
                                <div  className='flex flex-col w-full'>
                                    <label  className='label-text text-slate-600 text-sm'>
                                        { t( 'Front Side' ) } <span  className="text-red-600">*</span> <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 3:2)</span>
                                    </label>
                                    <div  className="w-full">
                                        <div
                                            onClick={ e => handelShowModal( 'nid_front' ) }
                                             className="cursor-pointer grid grid-cols-12 items-center"
                                        >
                                            <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                <p  className="text-white text-sm uppercase">Choose File</p>
                                            </div>
                                            <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                <p  className="ps-4 font-medium">{ data.nid_front ? '1 file chosen' : '0 file chosen' }</p>
                                            </div>
                                        </div>
                                        <div  className="flex items-center gap-3">
                                            { data.nid_front && <div  className="relative">
                                                <IoMdClose onClick={ e => { removeImage( 'nid_front' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                <img  className='h-32 border rounded-xl p-3 mt-3' src={ data.nid_front } alt={ 'NID Front Side' } />
                                            </div> }
                                        </div>
                                    </div>
                                    { errors.nid_front && <div  className="text-red-500 text-sm mt-1">{ errors.nid_front }</div> }
                                </div>
                                {/* NID Back Side*/ }
                                <div  className='flex flex-col w-full'>
                                    <label  className='label-text text-slate-600 text-sm'>
                                        { t( 'Back Side' ) } <span  className="text-red-600">*</span> <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 3:2)</span>
                                    </label>
                                    <div  className="w-full">
                                        <div
                                            onClick={ e => handelShowModal( 'nid_back' ) }
                                             className="cursor-pointer grid grid-cols-12 items-center"
                                        >
                                            <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                <p  className="text-white text-sm uppercase">Choose File</p>
                                            </div>
                                            <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                <p  className="ps-4 font-medium">{ data.nid_back ? '1 file chosen' : '0 file chosen' }</p>
                                            </div>
                                        </div>
                                        <div  className="flex items-center gap-3">
                                            { data.nid_back && <div  className="relative">
                                                <IoMdClose onClick={ e => { removeImage( 'nid_back' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                <img  className='h-32 border rounded-xl p-3 mt-3' src={ data.nid_back } alt={ 'NID Back Side' } />
                                            </div> }
                                        </div>
                                    </div>
                                    { errors.nid_back && <div  className="text-red-500 text-sm mt-1">{ errors.nid_back }</div> }
                                </div>
                            </div> }
                            {/* Passport*/ }
                            { data.document_type == 'passport' && <div  className='flex flex-col w-full'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Passport' ) } <span  className="text-red-600">*</span> <span  className="text-blue-600 text-[12px] font-medium">(Aspect ratio should be 2:3)</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => handelShowModal( 'passport' ) }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.passport ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { data.passport && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeImage( 'passport' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-full border rounded-xl p-3 mt-3' src={ data.passport } alt={ 'Passport' } />
                                        </div> }
                                    </div>
                                </div>
                                { errors.passport && <div  className="text-red-500 text-sm mt-1">{ errors.passport }</div> }
                            </div> }

                            {/* Address */ }
                            <div  className='w-full mb-4'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="address">{ t( 'Address' ) } <span  className="text-red-600">*</span></label>
                                <textarea
                                    onChange={ e => setData( 'address', e.target.value ) }
                                    value={ data.address }
                                    name='address'
                                    id='address'
                                    type="text"
                                    placeholder={ t( 'Write Address' ) }
                                    rows="3"
                                     className="textarea p-[10px] block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none"
                                />
                                { errors.address && <div  className="text-red-500 text-sm mt-1">{ errors.address }</div> }
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
