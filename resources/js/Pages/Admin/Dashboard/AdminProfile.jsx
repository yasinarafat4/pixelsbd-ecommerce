 /* eslint-disable */

import UploadModal from "@/Components/UploadModals/UploadModal";
import { asset_url, isNullOrEmpty, placeholder_user } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaHouseUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function AdminProfile ( { auth } )
{
    const location = useGeoLocation();
    const { t } = useLaravelReactI18n();

    const [ showModal, setShowModal ] = useState( false );
    const [ phoneNumber, setPhoneNumber ] = useState();
    const [ oldPassword, setOldPassword ] = useState( '' );
    const [ newPassword, setNewPassword ] = useState( '' );
    const [ showOldPassword, setShowOldPassword ] = useState( false );
    const [ showNewPassword, setShowNewPassword ] = useState( false );
    const [ type, setType ] = useState( '' );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    // form functionality
    const { data, setData, put, errors, reset } = useForm( {
        name: auth.admin.name,
        email: auth.admin.email,
        phone: auth.admin.phone,
        image: auth.admin.image,
    } )


    useEffect( () =>
    {
        setTimeout( () =>
        {
            if ( !isNullOrEmpty( auth.admin.phone ) )
            {
                setPhoneNumber( auth.admin.phone );
            }
        }, 1000 );
    }, [] );

    const handlerPhoneNumber = ( value ) =>
    {
        setData( 'phone', value )
    };

    // Form handlers
    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.admin_profile_update', auth.admin.id ) )
    }


    // Password change Handlers
    function onPasswordChange ( e )
    {
        router.post( route( 'admin.password_update' ),
            {
                old_password: oldPassword,
                new_password: newPassword
            }
        )
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

    // Image Remove Handlers
    function removeFile ()
    {
        setData( 'image', '' );
    };


    function handelShowModal ( index )
    {
        setSelectedImg( [] )
        if ( index == 'image' && !isNullOrEmpty( data.image ) )
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
        <AdminLayout
        >
            <Head title="Admin Profile" />
            {/* Breadcrumbs */ }
            <div  className="p-4 text-sm breadcrumbs text-slate-600">
                <ul>
                    <li>
                        <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                            <MdSpaceDashboard  className="text-base" />
                            <span>{ t( 'Dashboard' ) }</span>
                        </a>
                    </li>
                    <li>
                        <span  className="inline-flex gap-1 items-center">
                            <FaHouseUser  className="text-base text-slate-900" />
                            <span>{ t( 'Admin Profile' ) }</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div  className="max-w-4xl mx-auto">
                <form onSubmit={ e => handleSubmit( e ) }>
                    {/* Modal */ }
                    { showModal && <UploadModal selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                    {/* Account Information */ }
                    <div  className="bg-white rounded border py-3">
                        <div  className="border-b pb-3 px-4">
                            <h2  className="text-lg font-semibold">{ t( 'Manage Profile' ) }</h2>
                        </div>
                        <div  className="grid grid-cols-1 items-center gap-4 px-5 py-5">
                            {/* Name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="name" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Email */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="email">{ t( 'Email' ) }</label>
                                <input onChange={ e => setData( 'email', e.target.value ) } value={ data.email } name='email' id='email' type="email" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.email && <div  className="text-red-500 text-sm mt-1">{ errors.email }</div> }
                            </div>
                            {/* Phone */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{ t( 'Phone' ) }</label>
                                <PhoneInput
                                    inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 w-full rounded text-sm"
                                    dropdownClass="!z-50"
                                    masks={ { bd: '....-......' } }
                                    enableSearch
                                    country={ location.country?.toLowerCase() }
                                    preventDefault
                                    value={ phoneNumber }
                                    onChange={ e => handlerPhoneNumber( e ) }
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
                                        <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile() } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(data.image || placeholder_user()) } alt={ 'Staff Image' } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Save button */ }
                            <div  className="flex justify-end">
                                <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[20px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Password */ }
                <div  className="bg-white rounded border py-3 my-6">
                    <div  className="border-b pb-3 px-4">
                        <h3  className="text-lg font-semibold">{ t( 'Change Password' ) }</h3>
                    </div>
                    <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-3 px-4">
                        {/* Old Password */ }
                        <div  className="relative">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="old_password">{ t( 'Old Password' ) }</label>
                            <input onChange={ e => setOldPassword( e.target.value ) } value={ oldPassword } name='old_password' id='old_password' type={ showOldPassword ? "text" : "password" } placeholder={ t( "Enter your old password" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                            <div
                                 className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                onClick={ () =>
                                {
                                    setShowOldPassword( ( visible ) => !visible )
                                }
                                }
                            >
                                { showOldPassword ? (
                                    <FaEyeSlash  className="text-base font-medium text-slate-600" />
                                ) : (
                                    <FaEye  className="text-base font-medium text-slate-600" />
                                ) }
                            </div>
                        </div>
                        {/* New Password */ }
                        <div  className="relative">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="new_password">{ t( 'New Password' ) }</label>
                            <input onChange={ e => setNewPassword( e.target.value ) } value={ newPassword } name='new_password' id='new_password' type={ showNewPassword ? "text" : "password" } placeholder={ t( "Enter your new password" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                            <div
                                 className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                onClick={ () =>
                                {
                                    setShowNewPassword( ( visible ) => !visible )
                                }
                                }
                            >
                                { showNewPassword ? (
                                    <FaEyeSlash  className="text-base font-medium text-slate-600" />
                                ) : (
                                    <FaEye  className="text-base font-medium text-slate-600" />
                                ) }
                            </div>
                        </div>
                    </div>
                    {/* Button */ }
                    <div  className="flex justify-end mx-4">
                        <button onClick={ e => onPasswordChange( e ) } type="button"  className="bg-[#009EF7] duration-300 py-[7px] px-[20px] rounded text-white text-[14px]">{ t( 'Update' ) }</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
