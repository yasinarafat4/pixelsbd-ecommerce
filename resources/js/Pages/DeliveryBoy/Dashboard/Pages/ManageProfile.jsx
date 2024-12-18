/* eslint-disable */

import UploadModal from "@/Components/UploadModals/UploadModal";
import { asset_url, isNullOrEmpty, placeholder_user } from "@/Helpers";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import useGeoLocation from "react-ipgeolocation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { toast } from "react-toastify";

export default function ManageProfile() {
    const { auth } = usePage().props

    const { t } = useLaravelReactI18n();
    const location = useGeoLocation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newEmail, setNewEmail] = useState(auth.delivery_boy.email);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        name: auth.delivery_boy.name,
        phone: auth.delivery_boy.phone,
        address: auth.delivery_boy.address,
        image: auth.delivery_boy.image,
    })

    //Set phone number
    useEffect(() => {
        setTimeout(() => {
            if (!isNullOrEmpty(auth.delivery_boy.phone)) {
                setPhoneNumber(auth.delivery_boy.phone);
            }
        }, 1000);
    }, []);


    const handlerPhoneNumber = (value) => {
        setData('phone', value)
    };

    function onSubmit(e) {
        e.preventDefault()
        put(route('delivery_boy.delivery_boy_profile_update', auth.delivery_boy.id))
    }

    // Password change Handlers
    function onPasswordChange(e) {
        router.post(route('delivery_boy.delivery_boy_password_update'),
            {
                old_password: oldPassword,
                new_password: newPassword
            }
        )
    }


    // Email Verify
    function handleEmailVerify() {
        setLoading(true)
        axios.post(route('delivery_boy.verify_email'),
            { 'email': newEmail }
        ).then(function (response) {
            setLoading(false)
            toast.success(response.data.message)
        })

    }

    // Modal Handlers
    function handelShowModal() {
        if (data.image == "") {
            setSelectedImg([])
        } else {
            setSelectedImg([data.image])
        }
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };


    // Modals' handlers
    function onAddFile(v) {
        setData('image', v[0]);
        closeModal();
    }

    // function handelShowModal() {
    //     setShowModal(true)
    // }

    // function closeModal() {
    //     setShowModal(false)
    // };


    return (
        <DeliveryBoyLayout>
            {/* Page Title */}
            <Head title="Manage Profile" />
            <div>
                <h2  className="text-lg md:text-xl lg:text-[22px] font-bold pb-2">{t('Manage Profile')}</h2>
            </div>
            <form onSubmit={onSubmit}>
                {/* Basic Info */}
                <div  className="bg-white rounded border py-3">
                    <div  className="border-b pb-3 px-4">
                        <h3  className="text-lg font-semibold">{t('Basic Info')}</h3>
                    </div>
                    <div  className="px-4">
                        {/* Modal */}
                        {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                        { /* delivery_boy profile image */}
                        <div  className="flex flex-col items-center justify-center gap-1 px-3 md:px-4 ">
                            <div  className="relative">
                                <div  className="w-32 h-32 ">
                                    <LazyLoadImage
                                         className='w-full h-full border rounded-full p-1 mt-3'
                                        src={asset_url(data.image || placeholder_user())}
                                        alt={'image'}
                                        effect='blur'
                                    />
                                </div>
                                <div onClick={e => handelShowModal('image')}  className="absolute bottom-[2px] left-[87px] flex justify-center items-center cursor-pointer w-10 h-10 bg_primary text-white rounded-full">
                                    <IoMdCamera  className='text-base' />
                                </div>
                            </div>
                            <h2  className="text-lg font-semibold">{auth.delivery_boy.name}</h2>
                        </div>
                        <div  className='flex flex-col gap-2 py-3'>
                            <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Name */}
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                    <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter Name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                    {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                {/* Phone */}
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{t('Phone')}</label>
                                    <PhoneInput
                                        inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 w-full rounded text-sm"
                                        dropdownClass="!z-50"
                                        masks={{ bd: '....-......' }}
                                        enableSearch
                                        country={location.country?.toLowerCase()}
                                        preventDefault
                                        value={phoneNumber}
                                        onChange={e => handlerPhoneNumber(e)}
                                        inputProps={{ name: 'phone', id: 'phone' }}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div  className='w-full'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="address">{t('Address')}</label>
                                <textarea
                                    onChange={e => setData('address', e.target.value)}
                                    value={data.address}
                                    name='address'
                                    id='address'
                                    type="text"
                                    placeholder={t('Enter Your Address')}
                                    rows="4"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 bg-white focus:border-blue-600 rounded text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        {/* Button */}
                        <div  className="flex justify-end">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                        </div>
                    </div>
                </div>
            </form>
            {/* Password */}
            <div  className="bg-white rounded border py-3 my-6">
                <div  className="border-b pb-3 px-4">
                    <h3  className="text-lg font-semibold">{t('Change Password')}</h3>
                </div>
                <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-3 px-4">
                    {/* Old Password */}
                    <div  className="relative">
                        <label  className='label-text text-slate-600 text-sm' htmlFor="old_password">{t('Old Password')}</label>
                        <input onChange={e => setOldPassword(e.target.value)} value={oldPassword} name='old_password' id='old_password' type={showOldPassword ? "text" : "password"} placeholder={t("Enter your old password")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                        <div
                             className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                            onClick={() => {
                                setShowOldPassword((visible) => !visible)
                            }
                            }
                        >
                            {showOldPassword ? (
                                <FaEyeSlash  className="text-base font-medium text-slate-600" />
                            ) : (
                                <FaEye  className="text-base font-medium text-slate-600" />
                            )}
                        </div>
                    </div>
                    {/* New Password */}
                    <div  className="relative">
                        <label  className='label-text text-slate-600 text-sm' htmlFor="new_password">{t('New Password')}</label>
                        <input onChange={e => setNewPassword(e.target.value)} value={newPassword} name='new_password' id='new_password' type={showNewPassword ? "text" : "password"} placeholder={t("Enter your new password")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                        <div
                             className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                            onClick={() => {
                                setShowNewPassword((visible) => !visible)
                            }
                            }
                        >
                            {showNewPassword ? (
                                <FaEyeSlash  className="text-base font-medium text-slate-600" />
                            ) : (
                                <FaEye  className="text-base font-medium text-slate-600" />
                            )}
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div  className="flex justify-end mx-4">
                    <button onClick={e => onPasswordChange(e)} type="button"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                </div>
            </div>
            {/* Email Verify */}
            <div  className="bg-white rounded border">
                <div  className="border-b py-3 px-4">
                    <div>
                        <h3  className="text-lg font-semibold">{t('Change Your Email')}</h3>
                    </div>
                </div>
                <div  className="px-4 py-4">
                    {/* Email */}
                    <div>
                        <label  className='label-text text-slate-600 text-sm' htmlFor="email">{t('Email')}</label>
                        <div  className="grid grid-cols-12">
                            <input onChange={e => setNewEmail(e.target.value)} value={newEmail} name='email' id='email' type="email" placeholder={t("Type here")}  className="col-span-9 md:col-span-10 xl:col-span-11 p-[10px] focus:outline-none border-[1px] border-slate-200 bg-white block text-slate-600 w-full rounded-l text-sm" />
                            <button onClick={e => handleEmailVerify()} type="button"  className="col-span-3 md:col-span-2 xl:col-span-1 flex justify-center items-center gap-1 p-[10px] border border-slate-500 bg-white hover:bg-slate-600 hover:text-white text-sm font-medium duration-300 text-center rounded-r">
                                {loading ? <span  className="loading loading-spinner"></span>
                                    : <span>{t('Verify')}</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </DeliveryBoyLayout>
    )

}
