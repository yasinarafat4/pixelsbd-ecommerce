/* eslint-disable */

import UploadModal from "@/Components/UploadModals/UploadModal";
import { placeholder_user } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUsers } from "react-icons/fa";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

export default function Edit ( { staff, roles } )
{
    const { t } = useLaravelReactI18n();

    const [ showPassword, setShowPassword ] = useState( false );
    const [ activeRoles, setActiveRoles ] = useState( [] );
    const [ selectedRoles, setSelectedRoles ] = useState( [] );
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    const [ showModal, setShowModal ] = useState( false );
    const location = useGeoLocation();

    const handlerPhoneNumber = ( value ) =>
    {
        setPhoneNumber( value );
        setData( 'phone', value )
    };

    useEffect( () =>
    {
        setTimeout( () =>
        {
            setPhoneNumber( staff.phone );
        }, 1000 );
    }, [] );

    useEffect( () =>
    {
        var options = [];
        roles.forEach( role =>
        {
            options.push( { value: role.id, label: role.name } );
        } );

        setActiveRoles( options );

        let selected = options.filter( item => item.label == staff.role[ 0 ] );
        setSelectedRoles( selected )
    }, [] );

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        image: staff.image,
        password: "",
        role: staff.role[ 0 ],
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.staff.staffs.update', staff.id ) )
    }

    // Role handler
    function handleRoles ( e )
    {
        setSelectedRoles( e );
        setData( 'role', e.label )
    }

    // Modal
    function onAddFile ( v )
    {

        setData( 'image', v[ 0 ] );
        closeModal();
    }

    function handelShowModal ( index )
    {
        if ( data.image == "" )
        {
            setSelectedImg( [] )
        } else
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

    return (
        <AdminLayout>
            <Head title={ "Edit" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.staff.staffs.index' ) }  className="inline-flex gap-1 items-center">
                                    <FaUsers  className="text-base text-slate-900" />
                                    <span>{ t( 'Staffs' ) }</span>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Edit Staff' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        {/* Modal */ }
                        { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Staff name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Email */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="email">Email</label>
                                <input onChange={ e => setData( 'email', e.target.value ) } value={ data.email } name='email' id='email' type="email" placeholder={ t( 'Enter email' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.email && <div  className="text-red-500 text-sm mt-1">{ errors.email }</div> }
                            </div>
                            {/* Phone */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="phone">Phone</label>
                                <PhoneInput
                                    inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 w-full rounded-lg text-sm"
                                    dropdownClass="!z-50"
                                    masks={ { bd: '....-......' } }
                                    enableSearch
                                    country={ location.country?.toLowerCase() }
                                    preventDefault
                                    value={ phoneNumber }
                                    onChange={ () => handlerPhoneNumber }
                                    inputProps={ { name: 'phone', id: 'phone' } }
                                />
                            </div>
                            {/* Profile Image */ }
                            <div  className='flex flex-col w-full py-2'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    { t( 'Image' ) } <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={ e => { handelShowModal( 'image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-10 col-span-3 rounded-s flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-11 border col-span-9 border-slate-300 rounded-e flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ data.image ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        <img  className='h-32 border rounded-xl p-3 mt-3' src={ data.image || placeholder_user() } alt={ 'Staff Image' } />
                                    </div>
                                </div>
                            </div>
                            {/* Password */ }
                            <div  className="relative">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="password">{ t( 'Password' ) }</label>
                                <input onChange={ e => setData( 'password', e.target.value ) } value={ data.password } name='password' id='password' type={ showPassword ? "text" : "password" } placeholder={ t( 'Enter your password' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.password && <div  className="text-red-500 text-sm mt-1">{ errors.password }</div> }
                                <div
                                     className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                    onClick={ () =>
                                    {
                                        setShowPassword( ( visible ) => !visible )
                                    }
                                    }
                                >
                                    { showPassword ? (
                                        <FaEyeSlash  className="text-base font-medium text-slate-600" />
                                    ) : (
                                        <FaEye  className="text-base font-medium text-slate-600" />
                                    ) }
                                </div>
                                {/* Help text */ }
                            </div>
                            <p  className="text-success text-sm mb-1">{ t( "If don't want to change, keep it blank!" ) }</p>
                            {/* Role */ }
                            <div  className="w-full mb-4">
                                <label  className='label-text text-slate-600 text-sm font-medium'>{ t( 'Role' ) }</label>
                                <Select
                                    name="role"
                                    placeholder={ t( 'Select Role' ) }
                                     className="w-full rounded-lg z-0"
                                    classNamePrefix="react-select"
                                    value={ selectedRoles }
                                    onChange={ e => handleRoles( e ) }
                                    options={ activeRoles }
                                />
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
