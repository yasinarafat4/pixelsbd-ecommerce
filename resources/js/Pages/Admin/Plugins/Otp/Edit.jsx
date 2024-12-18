import UploadModal from "@/Components/UploadModals/UploadModal";
import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiWaterFlashFill } from "react-icons/ri";
import Select from "react-select";

export default function Edit() {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        select: "",
        image: "",
        description: "",
        short_description: "",
    })

    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState();
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);

    // Quill items
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],

            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],

            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    }

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent',
        'size', 'header',
        'link', 'image', 'video',
        'color', 'background'
    ]

    const selectData = [
        { value: 'data1', label: 'Data1' },
        { value: 'data2', label: 'Data2' },
        { value: 'data3', label: 'Data3' },
    ]


    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        // post('/banner', {
        //     onSuccess: () => window.location.href = "/banner",
        // })
    }


    // Select change handler
    function onSelectChange(e) {
        setData('select', e.value)
    }

    // Description handler
    const handleDescriptionChange = (html) => {
        setData('description', html);
    }

    // Modal
    function onAddFile(v) {
        if (type == 'image') {
            setData('image', v[0]);
        }
        closeModal();
    }

    function handelShowModal(index) {
        if (data.image == "") {
            setSelectedImg([])
        } else {
            setSelectedImg([data.image])
        }
        setShowModal(true)
        setType(index)
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
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('marketing.flashdeal.index')} className="inline-flex gap-1 items-center">
                                    <RiWaterFlashFill className="text-lg text-slate-900" />
                                    <span>{t('Flash Deals')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <BiSolidEdit className="text-sm text-slate-900" />
                                    <span>{t('Edit')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link onClick={e => window.history.back()}>
                            <button className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2 className="text-lg font-medium text-slate-600">{t('Flash Deal Information')}</h2>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Title */}
                            <div>
                                <label className='label-text text-slate-600 text-sm' htmlFor="title">{t('Title')}</label>
                                <input onChange={e => setData('title', e.target.value)} value={data.title} name='title' id='title' type="text" placeholder={t('Enter Title')} className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            {/* Select */}
                            <div className="flex flex-col">
                                <label className='label-text text-slate-600 text-sm'>{t('Select')}</label>
                                <Select
                                    name="select"
                                    placeholder={t('Select')}
                                    className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={() => onSelectChange}
                                    defaultValue={data.select}
                                    options={selectData}
                                />
                            </div>

                            {/* Modal */}
                            {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                            {/* Image */}
                            <div className='flex flex-col w-full'>
                                <label className='label-text text-slate-600 text-sm'>
                                    {t('Image')}
                                </label>
                                <div className="w-full">
                                    <div
                                        onClick={e => handelShowModal('image')}
                                        className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p className="ps-4 font-medium">{data.image ? '1 file chosen' : '0 file chosen'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {data.image && <div className="relative">
                                            <IoMdClose onClick={e => { removeImage() }} className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img className='w-32 h-32 border rounded-xl p-3 mt-3' src={data.image} alt={'Image'} />
                                        </div>}
                                    </div>
                                </div>
                            </div>

                            {/* Short Description */}
                            <div className='w-full mb-4'>
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="short_description">{t('Short Description')}</label>
                                <textarea
                                    onChange={e => setData('short_description', e.target.value)}
                                    value={data.short_description}
                                    name='short_description'
                                    id='short_description'
                                    type="text"
                                    placeholder={t('Write Short Description')}
                                    rows="2"
                                    className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="description">{t('Description')}</label>
                                <div className='h-60'>
                                    <Wysiwyg defaultValue="" placeholder="Description" modules={modules} formats={formats} onChange={handleDescriptionChange} />
                                </div>
                                {errors.description && <div className="text-red-600 font-medium mt-1">{errors.description}</div>}
                            </div>

                        </div>
                        <div className="flex justify-end mx-4">
                            <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
