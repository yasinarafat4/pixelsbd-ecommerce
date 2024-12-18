/* eslint-disable */

import AddressModal from "@/Components/Popups/AddressModal";
import { asset_url, isNullOrEmpty, placeholder_user } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import useGeoLocation from "react-ipgeolocation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManageProfile({ countries }) {
    const { auth } = usePage().props

    const { t } = useLaravelReactI18n();
    const location = useGeoLocation();

    const userProfileRef = useRef(null);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressData, setAdressData] = useState();
    const [newEmail, setNewEmail] = useState(auth.customer.email);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(auth.customer.image);


    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'put',
        name: auth.customer.name,
        phone: auth.customer.phone,
        image: '',
    })

    //Set phone number
    useEffect(() => {
        setTimeout(() => {
            if (!isNullOrEmpty(auth.customer.phone)) {
                setPhoneNumber(auth.customer.phone);
            }
        }, 1000);
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        post(route('user_profile_update', auth.customer.id))
    }

    const handlerPhoneNumber = (value) => {
        setData('phone', value)
    };

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

    // Image Handlers
    function onProfileImageUpload() {
        userProfileRef.current.click()
    }

    function onFileSelect(e) {
        setData('image', e.target.files[0]);
        setProfileImage(URL.createObjectURL(e.target.files[0]))
    }

    // Address Modal Handlers
    function handelShowAddressModal(address) {
        setShowAddressModal(true)
        setAdressData(address);
    }

    // Set Default Address
    function onSetDefaultAddress(id) {
        router.put(route('make_default_address', id))
    }

    function closeAddressModal() {
        setShowAddressModal(false)
    };

    // Password change Handlers
    function onPasswordChange(e) {
        router.post(route('password_update'),
            {
                old_password: oldPassword,
                new_password: newPassword
            }
        )
    }


    const deleteData = (id) => {
        router.delete(route('address.destroy', id))
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            }
        });
    }


    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Manage Profile" />
            <div>
                <h2  className="text-lg md:text-xl lg:text-[22px] font-bold pb-2">{t('Manage Profile')}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div  className="bg-white rounded border py-3">
                    <div  className="border-b pb-3 px-4">
                        <h3  className="text-lg font-semibold">{t('Basic Info')}</h3>
                    </div>
                    <div  className="px-4">
                        { /* Customer profile image */}
                        <div  className="flex flex-col items-center justify-center gap-1">
                            <div  className="relative">
                                <div  className='w-32 h-32 border rounded-full p-1 mt-3'>
                                    <LazyLoadImage
                                         className='w-full h-full rounded-full'
                                        src={asset_url(profileImage || placeholder_user())}
                                        alt={'image'}
                                        effect='blur'
                                    />
                                </div>

                                <div onClick={e => onProfileImageUpload()}  className="absolute bottom-[2px] left-[87px] flex justify-center items-center cursor-pointer w-10 h-10 bg_primary text-white rounded-full">
                                    <IoMdCamera  className='text-base' />
                                </div>
                                <input onChange={e => onFileSelect(e)} ref={userProfileRef}  className="hidden" type="file" name="" id="" />

                            </div>
                            <h2  className="text-lg font-semibold">{auth.customer.name}</h2>
                        </div>
                        <div  className='flex flex-col gap-2 px-2 md:px-4 py-6'>
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
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
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
                    <button
                        onClick={e => onPasswordChange(e)}
                        type="button"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
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
                            <input onChange={e => setNewEmail(e.target.value)} value={newEmail} name='email' id='email' type="email" placeholder={t("Type here")}  className="col-span-9 md:col-span-10 xl:col-span-11 p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded-l text-sm" />
                            <button onClick={e => handleEmailVerify()} type="button"  className="col-span-3 md:col-span-2 xl:col-span-1 flex justify-center items-center gap-1  p-[13px] border border-slate-500 bg-white hover:bg-slate-600 hover:text-white text-sm font-medium duration-300 text-center rounded-r">
                                {loading ? <span  className="loading loading-spinner"></span>
                                    : <span>Verify</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Address */}
            <div  className="border border-slate-300 my-4 py-4 px-3 md:px-6">
                <h2  className="text-base md:text-xl font-bold pb-2">{t('Address')}</h2>
                {/* Modal */}
                {showAddressModal && <AddressModal countries={countries} closeModal={closeAddressModal} showModal={showAddressModal} addressData={addressData} />}

                <div  className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 p-2">
                    {
                        auth.customer?.addresses?.map((address, i) => {
                            return (
                                <label key={i}  className={`text-sm font-normal cursor-pointer p-2 flex justify-between border ${address.set_default && 'border-2 border-green-600 rounded'}`}>
                                    <div>
                                        <p><strong>Address</strong> : {address.address}</p>
                                        <p><strong>Country</strong> : {address.country}</p>
                                        <p><strong>State</strong> : {address.state}</p>
                                        <p><strong>City</strong> : {address.city}</p>
                                        <p><strong>Phone</strong> : {address.phone}</p>
                                    </div>
                                    <div  className="dropdown dropdown-end">
                                        <div tabIndex={0}  className="btn btn-xs !min-h-9 border border_primary hover:border_primary bg-white hover:bg-white"><BiDotsVertical  className="text-xl" /></div>
                                        <ul tabIndex={0}  className="menu dropdown-content bg-white rounded z-[1] w-52 p-2 shadow">
                                            {!address.set_default && <li onClick={e => onSetDefaultAddress(address.id)}  className="hover:bg-green-600 hover:text-white duration-300 rounded"><a>{t('Set As Default')}</a></li>}
                                            <li onClick={e => handelShowAddressModal(address)}  className="hover:bg-blue-600 hover:text-white duration-300 rounded"><a>{t('Edit Address')}</a></li>
                                            <li onClick={e => handleDelete(address.id)}  className="hover:bg-red-600 hover:text-white duration-300 rounded"><a>{t('Delete Address')}</a></li>
                                        </ul>
                                    </div>
                                </label>
                            );
                        })
                    }
                </div>

                <button onClick={e => handelShowAddressModal(null)}  className="py-3 w-full border rounded-sm bg-[#f3f1f1] hover:bg-[#D7D7D7] duration-300 flex flex-col justify-center items-center">
                    <AiOutlinePlus  className="text-2xl" />
                    <span  className="text-sm md:text-base font-semibold">{t('Add New Adress')}</span>
                </button>
            </div>

        </UserDashboardLayout>
    )

}
