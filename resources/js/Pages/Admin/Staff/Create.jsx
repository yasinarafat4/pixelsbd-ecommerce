import UploadModal from "@/Components/UploadModals/UploadModal";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUsers } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";

export default function Create({ roles }) {
    const { t } = useLaravelReactI18n();

    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);
    const location = useGeoLocation();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        image: "",
        role: "",
    })
    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.staff.staffs.store'))
    }

    // Role handler
    function handleRole(e) {
        setData('role', e.label);
    }

    // Modal
    function onAddFile(v) {

        setData('image', v[0]);
        closeModal();
    }

    // Remove
    function removeStaffImage() {
        setData('image', '');
    }

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
        <AdminLayout>
            <Head title={"Create"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.staff.staffs.index')}  className="inline-flex gap-1 items-center">
                                    <FaUsers  className="text-base text-slate-900" />
                                    <span>{t('Staffs')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{t('Create')}</span>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Add Staff')}</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Modal */}
                        {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Name */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter Staff name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            {/* Email */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="email">{t('Email')}</label>
                                <input onChange={e => setData('email', e.target.value)} value={data.email} name='email' id='email' type="email" placeholder={t('Enter a valid email adderss')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.email && <div  className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>
                            {/* Phone */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{t('Phone')}</label>
                                <PhoneInput
                                    inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 w-full rounded-lg text-sm"
                                    dropdownClass="!z-50"
                                    masks={{ bd: '....-......' }}
                                    enableSearch
                                    country={location.country?.toLowerCase()}
                                    value={data.phone}
                                    onChange={e => setData('phone', e)}
                                />
                                {errors.phone && <div  className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                            </div>
                            {/* Profile Image */}
                            <div  className='flex flex-col w-full py-2'>
                                <label  className='label-text text-slate-600 text-sm'>
                                    {t('Image')} <span  className="text-blue-600 text-[12px]">{('(Image aspect ratio should be 1:1 )')}</span>
                                </label>
                                <div  className="w-full">
                                    <div
                                        onClick={e => { handelShowModal() }}
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
                                        {data.image && <div  className="relative">
                                            <IoMdClose onClick={e => { removeStaffImage() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={data.image} alt={'image'} />
                                        </div>}
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div  className="relative">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="password">{t('Password')}</label>
                                    <input onChange={e => setData('password', e.target.value)} value={data.password} name='password' id='password' type={showPassword ? "text" : "password"} placeholder={t('Enter your password')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
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
                            {/* Role */}
                            <div  className="w-full mb-4">
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="role">{t('Role')}</label>
                                <Select
                                    id="role"
                                    name="role"
                                    placeholder={t('Select Role')}
                                     className="w-full rounded-lg z-0"
                                    classNamePrefix="react-select"
                                    defaultValue={data.role}
                                    onChange={e => handleRole(e)}
                                    options={roles.map(role => ({ value: role.id, label: role.name }))}
                                />
                                {errors.role && <div  className="text-red-500 text-sm mt-1">{errors.role}</div>}
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Add Staff')}</button>
                        </div>
                    </form>
                </div>
            </div >
        </AdminLayout >
    )

}
