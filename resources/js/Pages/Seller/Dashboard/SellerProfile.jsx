/* eslint-disable */

import SellerUploadModal from "@/Components/UploadModals/SellerUploadModal";
import { asset_url, isNullOrEmpty, placeholder_user } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaHouseUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { toast } from "react-toastify";

export default function SellerProfile() {

    const { auth } = usePage().props
    const location = useGeoLocation();
    const { t } = useLaravelReactI18n();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState();
    const [showModal, setShowModal] = useState(false);
    const [newEmail, setNewEmail] = useState(auth.seller.email);
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        f_name: auth?.seller.f_name,
        l_name: auth?.seller.l_name,
        phone: auth?.seller.phone,
        image: auth?.seller.image,
        bank_name: auth?.seller.bank_name,
        holder_name: auth?.seller.holder_name,
        account_no: auth?.seller.account_no,
        bank_routing_no: auth?.seller.bank_routing_no,
        bank_payment_status: auth?.seller.bank_payment_status,
        cash_payment_status: auth?.seller.cash_payment_status,

    })

    useEffect(() => {
        setTimeout(() => {
            if (!isNullOrEmpty(auth.seller.phone)) {
                setPhoneNumber(auth.seller.phone);
            }
        }, 1000);
    }, []);

    const handlerPhoneNumber = (value) => {
        setData('phone', value)
    };


    // Form Handlers
    function handleSubmit(e) {
        e.preventDefault()
        put(route('seller.seller_profile_update', auth.seller.id))
    }

    function handleEmailVerify() {
        setLoading(true)
        axios.post(route('seller.verify_email'),
            { 'email': newEmail }
        ).then(function (response) {
            setLoading(false)
            toast.success(response.data.message)
        })

    }

    // Password change Handlers
    function onPasswordChange(e) {
        router.post(route('seller.password_update'),
            {
                old_password: oldPassword,
                new_password: newPassword
            }
        )
    }

    // Modal
    function onAddFile(v) {
        setData('image', v[0]);
        closeModal();
    }

    // Image Remove Handlers
    function removeFile() {
        setData('image', '');
    };

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


    return (
        <SellerLayout
        >
            <Head title="Seller Profile" />
            {/* Breadcrumbs */}
            <div  className="p-4 text-sm breadcrumbs text-slate-600">
                <ul>
                    <li>
                        <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                            <MdSpaceDashboard  className="text-base" />
                            <span>{t('Dashboard')}</span>
                        </a>
                    </li>
                    <li>
                        <span  className="inline-flex gap-1 items-center">
                            <FaHouseUser  className="text-base text-slate-900" />
                            <span>{t('Seller Profile')}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div  className="max-w-7xl mx-auto space-y-6 py-6">
                {/* Manage Profile */}
                <div  className="border rounded-md">
                    <div  className="m-6">
                        <h2  className="text-lg font-semibold">{t('Manage Profile')}</h2>
                    </div>
                    <form  className="pb-5" onSubmit={e => handleSubmit(e)}>
                        {/* Modal */}
                        {showModal && <SellerUploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                        {/* Account Information */}
                        <div  className="m-6 bg-white rounded border">
                            <div  className="border-b py-3 px-4">
                                <div>
                                    <h3  className="text-lg font-semibold">{t('Basic Info')}</h3>
                                </div>
                            </div>
                            <div  className="px-4 py-4">
                                <div  className="grid grid-cols-2 items-center gap-5 py-2">
                                    {/* First Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="f_name">{t('First Name')}</label>
                                        <input onChange={e => setData('f_name', e.target.value)} value={data.f_name} name='f_name' id='f_name' type="f_name" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.f_name && <div  className="text-red-500 text-sm mt-1">{errors.f_name}</div>}
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="l_name">{t('Last Name')}</label>
                                        <input onChange={e => setData('l_name', e.target.value)} value={data.l_name} name='l_name' id='l_name' type="l_name" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.l_name && <div  className="text-red-500 text-sm mt-1">{errors.l_name}</div>}
                                    </div>
                                </div>
                                <div  className="grid grid-cols-2 gap-5 py-2">
                                    {/* Image */}
                                    <div  className='flex flex-col w-full py-2'>
                                        <label  className='label-text text-slate-600 text-sm'>
                                            {t('Image')} <span  className="text-blue-600 text-[12px]">{('(Image aspect ratio should be 1:1 )')}</span>
                                        </label>
                                        <div  className="w-full">
                                            <div
                                                onClick={e => { handelShowModal('image') }}
                                                 className="cursor-pointer grid grid-cols-12 items-center"
                                            >
                                                <div  className="bg-[#2B3440] h-10 col-span-3 rounded-s flex justify-center items-center">
                                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                                </div>
                                                <div  className="bg-[#FFFFFF] h-11 border col-span-9 border-slate-300 rounded-e flex justify-start items-center">
                                                    <p  className="ps-4 font-medium">{data.image ? '1 file chosen' : '0 file chosen'}</p>
                                                </div>
                                            </div>
                                            <div  className="flex items-center gap-3">
                                                <div  className="relative">
                                                    <IoMdClose onClick={e => { removeFile() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                    <img  className='h-32 border rounded-xl p-3 mt-3' src={asset_url(data.image || placeholder_user())} alt={'Seller Image'} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{t('Phone')}</label>
                                        <PhoneInput
                                            inputClass="focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 w-full rounded text-sm"
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
                            </div>
                        </div>
                        {/* Payment Information */}
                        <div  className="m-6 bg-white rounded border">
                            <div  className="border-b py-3 px-4">
                                <div>
                                    <h3  className="text-lg font-semibold">{t('Payment Setting')}</h3>
                                </div>
                            </div>
                            <div  className="px-4 py-4">
                                {/* Payment Toggle */}
                                <div  className="grid grid-cols-2 items-center gap-5 py-2">
                                    {/* Cash Payment */}
                                    <div  className="flex items-center gap-2">
                                        <input onChange={e => { setData('cash_payment_status', e.target.checked) }} type="checkbox" checked={data.cash_payment_status}  className="toggle toggle-sm toggle-success" />
                                        <p  className="text-slate-500 text-[16px]">{t('Cash Payment')}</p>
                                    </div>
                                    {/* Bank Payment */}
                                    <div  className="flex items-center gap-2">
                                        <input onChange={e => { setData('bank_payment_status', e.target.checked) }} type="checkbox" checked={data.bank_payment_status}  className="toggle toggle-sm toggle-success" />
                                        <p  className="text-slate-500 text-[16px]">{t('Bank Payment')}</p>
                                    </div>
                                </div>
                                <div  className="grid grid-cols-2 items-center gap-5 py-2">
                                    {/* Bank Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="bank_name">{t('Bank Name')}</label>
                                        <input onChange={e => setData('bank_name', e.target.value)} value={data.bank_name} name='bank_name' id='bank_name' type="bank_name" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.bank_name && <div  className="text-red-500 text-sm mt-1">{errors.bank_name}</div>}
                                    </div>
                                    {/* Bank Account Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="holder_name">{t('Bank Account Name')}</label>
                                        <input onChange={e => setData('holder_name', e.target.value)} value={data.holder_name} name='holder_name' id='holder_name' type="holder_name" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.holder_name && <div  className="text-red-500 text-sm mt-1">{errors.holder_name}</div>}
                                    </div>
                                </div>
                                <div  className="grid grid-cols-2 items-center gap-5 py-2">
                                    {/* Bank Account Number */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="account_no">{t('Bank Account Number')}</label>
                                        <input onChange={e => setData('account_no', e.target.value)} value={data.account_no} name='account_no' id='account_no' type="account_no" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.account_no && <div  className="text-red-500 text-sm mt-1">{errors.account_no}</div>}
                                    </div>
                                    {/* Bank Routing Number */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="bank_routing_no">{t('Bank Routing Number')}</label>
                                        <input onChange={e => setData('bank_routing_no', e.target.value)} value={data.bank_routing_no} name='bank_routing_no' id='bank_routing_no' type="bank_routing_no" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.bank_routing_no && <div  className="text-red-500 text-sm mt-1">{errors.bank_routing_no}</div>}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Update button */}
                        <div  className="flex justify-end mx-6">
                            <button type="submit"  className="bg-[#2E294E] duration-300 py-[7px] px-[20px] rounded text-white text-[14px]">{t('Update Profile')}</button>
                        </div>
                    </form>
                </div>

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
                    {/* Update button */}
                    <div  className="flex justify-end mx-6">
                        <button onClick={e => onPasswordChange(e)} type="button"  className="bg-[#2E294E] duration-300 py-[7px] px-[20px] rounded text-white text-[14px]">{t('Update Password')}</button>
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
                                <input onChange={e => setNewEmail(e.target.value)} value={newEmail} name='email' id='email' type="email" placeholder={t("Type here")}  className="col-span-9 md:col-span-10 xl:col-span-11 p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-l text-sm" />
                                <button onClick={e => handleEmailVerify()} type="button"  className="col-span-3 md:col-span-2 xl:col-span-1 flex justify-center items-center gap-1  p-[13px] border border-slate-500 bg-white hover:bg-slate-600 hover:text-white text-sm font-medium duration-300 text-center rounded-r">
                                    {loading ? <span  className="loading loading-spinner"></span>
                                        : <span>Verify</span>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
