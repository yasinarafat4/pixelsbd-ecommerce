import UploadModal from "@/Components/UploadModals/UploadModal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { TbBellPause } from "react-icons/tb";

export default function NotificationTypeEdit({ notification_type }) {
    const { t } = useLaravelReactI18n();

    const [showModal, setShowModal] = useState(false);
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        name: notification_type.name,
        image: notification_type.image,
        text: notification_type.text,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(route('admin.marketing.notification.notification_type_update', notification_type.id), {
        })
    }

    // Modal
    function onAddFile(v) {

        setData('image', v[0]);
        closeModal();
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

    // Romove Images
    function removeImage() {
        setData('image', '');
    }


    return (
        <AdminLayout>
            <Head title={"Edit"} />
            {/* Breadcrumbs */}
            <div  className="text-sm breadcrumbs text-slate-600 p-4">
                <ul>
                    <li>
                        <a href={route('admin.marketing.notification.notification_types')}  className="inline-flex gap-1 items-center">
                            <TbBellPause  className="text-lg text-slate-900" />
                            <span>{t('Notification Types')}</span>
                        </a>
                    </li>
                    <li>
                        <span  className="inline-flex gap-1 items-center">
                            <LuFilePlus  className="text-base text-slate-900" />
                            <span>{t('Notification Type Edit')}</span>
                        </span>
                    </li>
                </ul>
            </div>
            {/* Edit Notification Type */}
            <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-5xl mx-auto'>
                <div  className="flex items-center justify-between border-b pb-3 px-6">
                    <div>
                        <h2  className="text-lg font-medium text-slate-600">{t('Edit Notification Type')}</h2>
                    </div>
                </div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                        {/* Name */}
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name*')}</label>
                            <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Notification type')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>

                        {/* Modal */}
                        {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                        {/* Image */}
                        <div  className='flex flex-col w-full'>
                            <label  className='label-text text-slate-600 text-sm'>
                                {t('Image')}
                            </label>
                            <div  className="w-full">
                                <div
                                    onClick={e => handelShowModal('image')}
                                     className="cursor-pointer grid grid-cols-12 items-center"
                                >
                                    <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                        <p  className="text-white text-sm uppercase">Choose File</p>
                                    </div>
                                    <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                        <p  className="ps-4 font-medium">{data.image ? '1 file chosen' : '0 file chosen'}</p>
                                    </div>
                                </div>
                                <div  className="flex items-center gap-3">
                                    {data.image && <div  className="relative">
                                        <IoMdClose onClick={e => { removeImage() }}  className="text-xl text_primary absolute top-0 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                        <img  className='h-12 border rounded p-1 mt-1' src={data.image} alt={'Image'} />
                                    </div>}
                                </div>
                            </div>
                        </div>

                        {/* Default Text */}
                        <div  className='w-full mb-4'>
                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="text">{t('Default Text*')}</label>
                            <textarea
                                onChange={e => setData('text', e.target.value)}
                                value={data.text}
                                name='text'
                                id='text'
                                type="text"
                                placeholder={t('Write Default Text')}
                                rows="2"
                                 className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                            />
                        </div>
                        {/* N.B */}
                        <div>
                            <p  className="text-sm text-blue-600">N.B: Do not change the variable like <span  className="text-red-500 font-semibold"> [[...]]</span>  </p>
                        </div>
                    </div>


                    <div  className="flex justify-end mx-4">
                        <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                    </div>
                </form>
            </div>

        </AdminLayout>
    )

}
