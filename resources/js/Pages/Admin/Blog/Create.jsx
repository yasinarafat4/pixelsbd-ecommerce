import UploadModal from "@/Components/UploadModals/UploadModal";
import Wysiwyg from "@/Components/Wysiwyg";
import { placeholder1_1, placeholder4_2 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from "react-select";
import slugify from "react-slugify";

export default function Create({ blogCategories }) {
    const { t } = useLaravelReactI18n();

    const [selectedBlogCategory, setSelectedBlogCategory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState();
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);



    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        slug: "",
        blog_category_id: "",
        description: "",
        short_description: "",
        meta_title: "",
        meta_description: "",
        meta_image: "",
        blog_banner: "",

    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.blog.blogs.store'))
    }

    // Select change handler
    function onSelectCategoryChange(e) {
        setSelectedBlogCategory(e);
        setData('blog_category_id', e.value)
    }

    // Description handler
    const handleDescriptionChange = (html) => {
        setData(data => ({ ...data, ['description']: html }))
    }

    // Modal
    function onAddFile(v) {
        if (type == 'blog_banner') {
            setData('blog_banner', v[0]);
        } else if (type == 'meta_image') {
            setData('meta_image', v[0]);
        }
        closeModal();
    }

    function handelShowModal(index) {
        setSelectedImg([])
        if (index == 'blog_banner' && data.blog_banner) {
            setSelectedImg([data.blog_banner])
        }
        else if (index == 'meta_image' && data.meta_image) {
            setSelectedImg([data.meta_image])
        }
        setShowModal(true)
        setType(index)
    }

    // Image Remove Handlers
    function removeFile(type) {
        if (type == 'blog_banner') {
            setData('blog_banner', '');
        }
        else if (type == 'meta_image') {
            setData('meta_image', '');
        }
    };

    function closeModal() {
        setShowModal(false)
    };

    // Slug
    const handleSlugify = (data) => {
        setData('slug', slugify(data))
    }

    return (
        <AdminLayout>
            <Head title={"Create"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.blog.blogs.index')} className="inline-flex gap-1 items-center">
                                    <FaBlog className="text-base text-slate-900" />
                                    <span>{t('Blogs')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <LuFilePlus className="text-base text-slate-900" />
                                    <span>{t('Create')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <>
                        <Link onClick={e => window.history.back()}>
                            <button className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </>
                </div>

                <div className='card rounded shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div className="flex items-center justify-between border-b pb-3 px-6">
                        <h2 className="text-lg font-medium text-slate-600">{t('Create Blog')}</h2>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Modal */}
                            {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                            {/* Title */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="title">{t('Title')}</label>
                                <input onChange={e => setData('title', e.target.value)} onKeyUp={(e) => { e.preventDefault(); handleSlugify(data.title) }} value={data.title} name='title' id='title' type="text" placeholder={t('Enter Title')} className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </>
                            {/* Slug */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="slug">{t('Slug')}</label>
                                <input onChange={e => setData('slug', e.target.value)} value={data.slug} name='slug' id='slug' type="text" placeholder={t('Enter Slug')} className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                {errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
                            </>

                            {/* Blog Category Id */}
                            <div className="flex flex-col">
                                <label className='label-text text-slate-600 text-sm'>{t('Blog Category')}</label>
                                <Select
                                    name="blog_category_id"
                                    placeholder={t('Select Category')}
                                    className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={e => onSelectCategoryChange(e)}

                                    value={selectedBlogCategory}
                                    options={blogCategories.map(blogCategory => ({ value: blogCategory.id, label: blogCategory.name }))}
                                />

                                {errors.blog_category_id && <div className="text-red-500 text-sm mt-1">{errors.blog_category_id}</div>}
                            </div>

                            {/* Banner Image */}
                            <div className='flex flex-col w-full'>
                                <label className='label-text text-slate-600 text-sm'>
                                    {t('Banner')} <span className="text-blue-600 text-[12px]">{('(Image aspect ratio should be 4:2 )')}</span>
                                </label>
                                <div className="w-full">
                                    <div
                                        onClick={e => handelShowModal('blog_banner')}
                                        className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p className="ps-4 font-medium">{data.blog_banner ? '1 file chosen' : '0 file chosen'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <IoMdClose onClick={e => { removeFile('blog_banner') }} className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img className='h-32 border rounded-xl p-3 mt-3' src={data.blog_banner || placeholder4_2()} alt={'blog_banner'} />
                                        </div>
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
                                    className="textarea p-3 block w-full border-[1px] border-slate-300 bg-white focus:border-blue-600 rounded text-sm focus:outline-none"
                                />
                                {errors.short_description && <div className="text-red-500 text-sm mt-1">{errors.short_description}</div>}
                            </div>

                            {/* Description */}
                            <>
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="description">{t('Description')}</label>
                                <div className='h-60'>
                                    <Wysiwyg defaultValue={data.description} placeholder="Description" onWysiwygChange={e => handleDescriptionChange(e)} />
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>
                            </>

                            {/* Meta Title */}
                            <div className="w-full mb-4">
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="meta_title">{t('Meta Title')}</label>
                                <input
                                    onChange={e => setData('meta_title', e.target.value)}
                                    value={data.meta_title}
                                    name='meta_title'
                                    id='meta_title'
                                    type="text"
                                    className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm"
                                    placeholder={t('Enter Meta Title')}
                                />
                                {errors.meta_title && <div className="text-red-500 text-sm mt-1">{errors.meta_title}</div>}
                            </div>

                            {/* Meta Image */}
                            <div className='flex flex-col'>
                                <label className='label-text text-slate-600 text-sm' htmlFor="meta_image">
                                    {t('Meta Image')}
                                </label>
                                <div className="w-full">
                                    <div
                                        onClick={e => handelShowModal('meta_image')}
                                        className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p className="ps-4 font-medium">{data.meta_image ? '1 file chosen' : '0 file chosen'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {data.meta_image && <div className="relative">
                                            <IoMdClose onClick={e => { removeFile('meta_image') }} className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img className='w-32 h-32 border rounded-xl p-3 mt-3' src={data.meta_image || placeholder1_1()} alt={'meta_image'} />
                                        </div>}
                                    </div>
                                </div>
                            </div>

                            {/* Meta Description */}
                            <div className='w-full mb-4'>
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="meta_description">{t('Meta Description')}</label>
                                <textarea
                                    onChange={e => setData('meta_description', e.target.value)}
                                    value={data.meta_description}
                                    name='meta_description'
                                    id='meta_description'
                                    type="text"
                                    placeholder={t('Enter Meta Description')}
                                    rows="4"
                                    className="textarea p-3 block w-full border-[1px] border-slate-300 bg-white focus:border-blue-600 rounded text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mx-4">
                            <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Create')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
