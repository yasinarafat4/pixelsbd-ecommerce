/* eslint-disable */

import Pagination from "@/Components/Pagination";
import { asset_url, filesize, placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaEllipsisV, FaPlus, FaRegCopy, FaRegTrashAlt } from "react-icons/fa";
import { GrDownload } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiGalleryUploadFill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { toast } from "react-toastify";

export default function Index() {
    const { t } = useLaravelReactI18n();
    const { appUrl, images } = usePage().props;

    const [fileInfo, setFileInfo] = useState();


    function onImageDelete(id) {
        router.delete(route('admin.upload.destroy', id))
    }

    function onCopyLink(link) {
        try {
            navigator.clipboard.writeText(appUrl + link);
            toast.success('Link Copied!')
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }


    return (
        <AdminLayout>
            <Head title={"Uploaded Files"} />
            <div  className='px-2'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <RiGalleryUploadFill  className="text-lg text-slate-900" />
                                    <span>{t('Uploaded Files')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.upload.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Upload New File')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('All Files')}</h2>
                        </div>
                        {/* Search*/}
                        <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>
                    </div>
                    <div  className='card-body !p-3'>
                        <div  className="grid grid-cols-10">
                            {/* Images Container */}
                            <div  className="col-span-8 ">
                                <div  className="grid grid-cols-5 gap-4 pr-3 w-full">
                                    {images.data.map((img, i) => (
                                        <div key={i}  className="relative bg-white shadow-xl rounded-md border">
                                            {/*  */}
                                            <div  className="dropdown dropdown-end cursor-pointer absolute top-2 right-3 bg-white px-[1px] py-1 z-[1]">
                                                <div tabIndex={0}  className=""><FaEllipsisV  className="text-sm" /></div>
                                                <ul tabIndex={0}  className="mt-1 dropdown-content menu bg-white rounded-md z-[1] w-40 p-1 shadow-lg border">
                                                    <li>
                                                        <a download={img.file_name} target="_blank" rel="noreferrer" href={img.url}  className="details hover:bg-[#009EF7] hover:text-white active:!bg-[#009EF7] duration-300 flex items-center gap-5 rounded">
                                                            <GrDownload  className="text-xs" />
                                                            <span  className="text-sm">Download</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div onClick={(e) => onCopyLink(img.url)}  className="details hover:bg-[#009EF7] hover:text-white active:!bg-[#009EF7] duration-300 flex items-center gap-5 rounded">
                                                            <FaRegCopy  className="text-xs" />
                                                            <span  className="text-sm">Copy Link</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div onClick={(e) => onImageDelete(img.id)}  className="details hover:bg-[#009EF7] hover:text-white active:!bg-[#009EF7] duration-300 flex items-center gap-5 rounded">
                                                            <FaRegTrashAlt  className="text-xs" />
                                                            <span  className="text-sm">Delete</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div  className="h-40 flex justify-center items-center">
                                                <LazyLoadImage
                                                    effect='blur'
                                                    src={asset_url(img.url || placeholder1_1())}
                                                    alt={img.file_name}
                                                     className="w-full p-3 h-40 object-cover mix-blend-multiply"
                                                />
                                            </div>
                                            <div  className="pt-1 pb-2 px-2 h-16 bg-slate-200">
                                                <div  className="flex justify-between items-end">
                                                    <div  className="w-11/12">
                                                        <p  className="text-[14px] font-semibold truncate ...">{img.file_name}</p>
                                                        <p  className="text-[11px] text-slate-500">{img.width}x{img.height}</p>
                                                        <p  className="text-[11px] text-slate-500">{filesize(img.size)} </p>
                                                    </div>
                                                    <div onClick={() => setFileInfo(img)}  className="cursor-pointer ">
                                                        <BsInfoCircle  className="hover:text-blue-600 hover:text-lg " />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div  className="m-4 flex items-center justify-between">
                                    <p  className='text-slate-600 text-sm'>Showing {images.meta.from || 0} to {images.meta.to || 0} of {images.meta.total}</p>
                                    <div  className="flex flex-col items-end">
                                        <Pagination links={images.meta.links} />
                                    </div>
                                </div>
                            </div>
                            {/* Image Details Container */}
                            <div  className="col-span-2">
                                {fileInfo && <div  className="border border-slate-300 rounded-md">
                                    <h2  className="border-b border-slate-300 text-lg font-medium px-4 py-2">File Info</h2>

                                    <div  className="px-3 pt-2 pb-3">
                                        <ul  className="space-y-1">
                                            <li>
                                                <label  className="text-[12px] font-medium">File Name:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300 break-all">{fileInfo.file_name}</p>
                                            </li>
                                            <li>
                                                <label  className="text-[12px] font-medium">File Type:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300">{fileInfo.mime_type}</p>
                                            </li>
                                            <li>
                                                <label  className="text-[12px] font-medium">File Size:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300">{(fileInfo.size / 1024).toFixed(2)} KB </p>
                                            </li>
                                            <li>
                                                <label  className="text-[12px] font-medium">Dimensions:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300">{fileInfo.width}px by {fileInfo.height}px</p>
                                            </li>
                                            <li>
                                                <label  className="text-[12px] font-medium">Uploaded By:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300">{fileInfo.uploaded_by}</p>
                                            </li>
                                            <li>
                                                <label  className="text-[12px] font-medium">Uploaded At:</label>
                                                <p  className="p-2 bg-slate-100 rounded text-[12px] border border-slate-300">{moment(fileInfo.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                            </li>
                                            <div  className="flex justify-center items-center pt-2"><a download={fileInfo.file_name} target="_blank" href={fileInfo.url}  className="bg-slate-600 text-slate-100 py-2 px-3 text-sm rounded " rel="noreferrer">Download</a></div>
                                        </ul >
                                    </div >
                                </div >}
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </AdminLayout >
    )

}
