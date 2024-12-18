import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { IoTicket } from "react-icons/io5";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Create() {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: "",
        details: "",
        files: [],
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('seller.support_ticket_store'))
    }

      // Image handler
      function handleFileChange(e) {
        const value = e.target.files;
            setData('files', value);
    }

    return (
        <SellerLayout>
            <Head title={"Create"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li  className="inline-flex gap-1 items-center">
                                    <IoTicket  className="text-base" />
                                    <Link href={route('seller.support_ticket')}>{t('Ticket')}</Link>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Ticket Info')}</h2>
                        </div>
                    </div>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Subject & Customer */}

                            <div  className="w-full">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="subject">{t('Subject')}</label>
                                <input onChange={e => setData('subject', e.target.value)} value={data.subject} name='subject' id='subject' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.subject && <div  className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>

                            {/* Message */}
                            <div  className='w-full'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="details">{t('Message')}</label>
                                <textarea
                                    onChange={e => setData('details', e.target.value)}
                                    value={data.details}
                                    name='details'
                                    id='details'
                                    type="text"
                                    placeholder={t('Write Your Message')}
                                    rows="6"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                                />
                                {errors.details && <div  className="text-red-500 text-sm mt-1">{errors.details}</div>}
                            </div>
                            {/* Ticket file */}
                            <div  className='flex flex-col justify-start rounded-lg gap-1 text-slate-600'>
                                <div  className='flex flex-col'>
                                    <label  className='label-text text-slate-600 text-sm font-medium text-slate-600 mb-1' htmlFor="files">
                                        {t('Ticket Files')}<span  className="text-[12px] ms-1 text_primary">(Aspect ratio should be 1:1)</span>
                                    </label>
                                    <input
                                        onChange={e => handleFileChange(e)}
                                        multiple
                                        id="files"
                                        type="file"
                                         className="file-input file-input-bordered border-slate-300 bg-white text-slate-600 w-full rounded-md"
                                    />
                                </div>
                            </div>

                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Create')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </SellerLayout>
    )

}
