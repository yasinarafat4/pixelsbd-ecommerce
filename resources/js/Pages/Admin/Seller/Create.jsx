import AdminLayout from "@/Layouts/AdminLayout";

import UploadModal from "@/Components/UploadModals/UploadModal";
import { isNullOrEmpty } from "@/Helpers";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaHouseUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function Create() {
    const { t } = useLaravelReactI18n();
    const location = useGeoLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState();
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        f_name: "",
        l_name: "",
        phone: "",
        email: "",
        password: "",
        shop_name: "",
        shop_address: "",
        shop_logo: "",
        shop_banner: "",
        password_confirmation: "",
        image: ""
    });


    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.seller.store'))
    }

    const handlerPhoneNumber = (value) => {
        setData('phone', value)
    };


    // Modal
    function onAddFile(v) {
        if (type == 'image') {
            setData('image', v[0]);
        }
        else if (type == 'shop_logo') {
            setData('shop_logo', v[0]);
        } else if (type == 'shop_banner') {
            setData('shop_banner', v[0]);
        }
        closeModal();
    }

    function handelShowModal(index) {

        setSelectedImg([])
        if (index == 'image' && !isNullOrEmpty(data.image)) {
            setSelectedImg([data.image])
        }
        else if (index == 'shop_logo' && !isNullOrEmpty(data.shop_logo)) {
            setSelectedImg([data.shop_logo])
        }
        else if (index == 'shop_banner' && !isNullOrEmpty(data.shop_banner)) {
            setSelectedImg([data.shop_banner])
        }
        setShowModal(true)
        setType(index)
    }

    function closeModal() {
        setShowModal(false)
    };

    // Remove Images
    function removeSellerImage() {
        setData('image', '');
    }

    function removeShopLogo() {
        setData('shop_logo', '');
    }

    function removeShopBanner() {
        setData('shop_banner', '');
    }


    return (
        <AdminLayout>
            <Head title={"Create"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.seller.index')}  className="inline-flex gap-1 items-center">
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span >{t('Sellers')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuUserPlus2  className="text-base text-slate-900" />
                                    <span>{t('Add New Seller')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link onClick={e => window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow border-[1px] w-full mx-auto'>

                    <form  className="bg-[#F5F6FA]" onSubmit={handleSubmit}>
                        {/* Modal */}
                        {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                        <div  className='grid grid-cols-2 items-start gap-5 px-4 py-6'>
                            {/* Seller Information */}
                            <div  className="shadow-md bg-white rounded-lg">
                                <div  className="flex items-center justify-between border-b py-4 px-6">
                                    <div>
                                        <h2  className="text-lg font-semibold">{t('Seller Information')}</h2>
                                    </div>
                                </div>
                                <div  className="space-y-5 py-4 px-6">
                                    {/* First Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="f_name">{t('First Name')}</label>
                                        <input onChange={e => setData('f_name', e.target.value)} value={data.f_name} name='f_name' id='f_name' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        {errors.f_name && <div  className="text-red-500 text-sm mt-1">{errors.f_name}</div>}
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="l_name">{t('Last Name')}</label>
                                        <input onChange={e => setData('l_name', e.target.value)} value={data.l_name} name='l_name' id='l_name' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        {errors.l_name && <div  className="text-red-500 text-sm mt-1">{errors.l_name}</div>}
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
                                            value={data.phone}
                                            onChange={e => handlerPhoneNumber(e)}
                                            inputProps={{ name: 'phone', id: 'phone' }}
                                        />
                                        {errors.phone && <div  className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                                    </div>
                                    {/* Seller profile image */}
                                    <div  className='flex flex-col justify-start rounded-lg gap-1 text-slate-600'>
                                        <div  className='flex flex-col gap-3 justify-center items-center'>
                                            {data.image && <div  className="relative">
                                                <IoMdClose onClick={e => { removeSellerImage() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                <img  className='h-40 border rounded-xl p-3 mt-3' src={data.image} alt={'seller image'} />
                                            </div>}
                                            <div  className="w-full">
                                                <label  className='label-text text-slate-600 text-sm'>
                                                    {t('Seller Profile Image')}  <span  className="text-blue-600 text-[13px]">{('(Image aspect ratio should be 1:1 )')}</span>
                                                </label>
                                                <div
                                                    onClick={e => { handelShowModal('image') }}
                                                     className="cursor-pointer grid grid-cols-12 items-center"
                                                >
                                                    <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                        <p  className="text-white text-sm uppercase">Choose File</p>
                                                    </div>
                                                    <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                        <p  className="ps-4 font-medium">{data.image ? '1 file chosen' : '0 file chosen'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Shop Information */}
                            <div  className="shadow-md bg-white rounded-lg">
                                <div  className="flex items-center justify-between border-b py-4 px-6">
                                    <div>
                                        <h2  className="text-lg font-semibold">{t('Shop Information')}</h2>
                                    </div>
                                </div>
                                <div  className="space-y-4 py-4 px-6">
                                    {/* Shop Name */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="shop_name">{t('Shop Name')}</label>
                                        <input onChange={e => setData('shop_name', e.target.value)} value={data.shop_name} name='shop_name' id='shop_name' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        {errors.shop_name && <div  className="text-red-500 text-sm mt-1">{errors.shop_name}</div>}
                                    </div>
                                    {/* Shop Address */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="shop_address">{t('Shop Address')}</label>
                                        <input onChange={e => setData('shop_address', e.target.value)} value={data.shop_address} name='shop_address' id='shop_address' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        {errors.shop_address && <div  className="text-red-500 text-sm mt-1">{errors.shop_address}</div>}
                                    </div>
                                    {/* Shop Logo */}
                                    <div  className='flex flex-col w-full'>
                                        <label  className='label-text text-slate-600 text-sm'>
                                            {t('Shop Logo')} <span  className="text-blue-600 text-[13px]">{('(Image aspect ratio should be 1:1 )')}</span>
                                        </label>
                                        <div  className="w-full">
                                            <div
                                                onClick={e => handelShowModal('shop_logo')}
                                                 className="cursor-pointer grid grid-cols-12 items-center"
                                            >
                                                <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                                </div>
                                                <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                    <p  className="ps-4 font-medium">{data.shop_logo ? '1 file chosen' : '0 file chosen'}</p>
                                                </div>
                                            </div>
                                            <div  className="flex items-center gap-3">
                                                {data.shop_logo && <div  className="relative">
                                                    <IoMdClose onClick={e => { removeShopLogo() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                    <img  className='h-40 border rounded-xl p-3 mt-3' src={data.shop_logo} alt={'shop logo'} />
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Shop Banner Image */}
                                    <div  className='flex flex-col w-full'>
                                        <label  className='label-text text-slate-600 text-sm'>
                                            {t('Shop Banner')} <span  className="text-blue-600 text-[13px]">{('(Image aspect ratio should be 6:2 )')}</span>
                                        </label>
                                        <div  className="w-full">
                                            <div
                                                onClick={e => handelShowModal('shop_banner')}
                                                 className="cursor-pointer grid grid-cols-12 items-center"
                                            >
                                                <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                                </div>
                                                <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                    <p  className="ps-4 font-medium">{data.shop_banner ? '1 file chosen' : '0 file chosen'}</p>
                                                </div>
                                            </div>
                                            <div  className="flex items-center gap-3">
                                                {data.shop_banner && <div  className="relative">
                                                    <IoMdClose onClick={e => { removeShopBanner() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                    <img  className='h-40 border rounded-xl p-3 mt-3' src={data.shop_banner} alt={'Shop Banner'} />
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Account Information */}
                        <div  className="m-6 shadow-md bg-white rounded-lg">
                            <div  className="flex items-center justify-between border-b py-4 px-6">
                                <div>
                                    <h2  className="text-lg font-semibold">{t('Account Information')}</h2>
                                </div>
                            </div>

                            <div  className="grid grid-cols-3 items-center gap-4 px-4 py-6">
                                {/* Email */}
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="email">{t('Email')}</label>
                                    <input onChange={e => setData('email', e.target.value)} value={data.email} name='email' id='email' type="email" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    {errors.email && <div  className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                                {/* Password */}
                                <div>
                                    <div  className="relative">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="password">{t('Password')}</label>
                                        <input onChange={e => setData('password', e.target.value)} value={data.password} name='password' id='password' type={showPassword ? "text" : "password"} placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                        <div
                                             className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                            onClick={() => {
                                                setShowPassword((visible) => !visible)
                                            }
                                            }
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash  className="text-base font-medium text-slate-600" />
                                            ) : (
                                                <FaEye  className="text-base font-medium text-slate-600" />
                                            )}
                                        </div>
                                    </div>
                                    {errors.password && <div  className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>
                                {/* Confirm Password */}
                                <div  className="relative">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="password_confirmation">{t('Confirm Password')}</label>
                                    <input onChange={e => setData('password_confirmation', e.target.value)} value={data.password_confirmation} name='password_confirmation' id='password_confirmation' type={showConfirmPassword ? "text" : "password"} placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    <div
                                         className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                        onClick={() => {
                                            setShowConfirmPassword((visible) => !visible)
                                        }
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash  className="text-base font-medium text-slate-600" />
                                        ) : (
                                            <FaEye  className="text-base font-medium text-slate-600" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Add button */}
                        <div  className="flex justify-end items-center bg-white py-5 px-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Add Seller')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}

