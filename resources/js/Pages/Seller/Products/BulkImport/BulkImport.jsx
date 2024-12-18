import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaFileImport } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

export default function BulkImport() {
    const { t } = useLaravelReactI18n();


    return (
        <SellerLayout>
            {/* Page Title */}
            <Head title="Bulk Import" />
            <div  className='p-4'>
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
                                <FaFileImport  className="text-sm text-slate-900" />
                                <span>{t('Bulk Import')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Product Bulk Upload */}
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 mt-4'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Product Bulk Upload')}</h2>
                        </div>
                    </div>
                    <div  className='card-body px-5 space-y-5'>
                        {/* Step One */}
                        <div  className="space-y-4">
                            <div  className="space-y-2 text-sm bg-[#CCE5FF] rounded-md p-5 border border-[#b5d3f5]">
                                <p  className="font-semibold">Step 1:</p>
                                <ul  className="space-y-2 text-[13px]">
                                    <li>1. Download the skeleton file and fill it with proper data.</li>
                                    <li>2. You can download the example file to understand how the data must be filled.</li>
                                    <li>3. Once you have downloaded and filled the skeleton file, upload it in the form below and submit.</li>
                                    <li>4. After uploading products you need to edit them and set product&apos;s images and choices.</li>
                                </ul>
                            </div>
                            <button  className="bg-[#2E294E] hover:bg-[#000] duration-300 px-5 py-2 rounded text-white">Download CSV</button>
                        </div>
                        {/* Step Two */}
                        <div  className="space-y-4">
                            <div  className="space-y-2 text-sm bg-[#CCE5FF] rounded-md p-5 border border-[#b5d3f5]">
                                <p  className="font-semibold">Step 2:</p>
                                <ul  className="space-y-2 text-[13px]">
                                    <li>1. Category and Brand should be in numerical id.</li>
                                    <li>2. You can download the pdf to get Category and Brand id.</li>
                                </ul>
                            </div>
                            <div  className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
                                <button  className="bg-[#2E294E] hover:bg-[#000] duration-300 px-5 py-2 rounded text-white">Download Category</button>
                                <button  className="bg-[#2E294E] hover:bg-[#000] duration-300 px-5 py-2 rounded text-white">Download Brand</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Upload Product File */}
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 mt-4'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Upload Product File')}</h2>
                        </div>
                    </div>

                    <div  className='card-body px-5 space-y-5'>
                        <div>
                            <input type="file"  className="file-input file-input-bordered border-slate-300  w-8/12 focus:outline-none bg-white text-slate-600" />
                        </div>
                        <button  className="bg-[#2E294E] hover:bg-[#000] duration-300 px-5 py-2 rounded text-white w-[130px]">Upload CSV</button>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
};
