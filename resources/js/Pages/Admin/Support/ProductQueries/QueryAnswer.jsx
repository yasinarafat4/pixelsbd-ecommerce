import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { IoTicket } from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft, MdOutlineReplayCircleFilled } from "react-icons/md";

export default function QueryAnswer() {
    const { query } = usePage().props;
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        answer: query.answer,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(route('admin.support.query.update', query.id))
    }

    return (
        <AdminLayout>
            <Head title={"Query Answer"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li  className="inline-flex gap-1 items-center">
                                <IoTicket  className="text-base" />
                                <Link href={route('admin.support.query.index')}>{t('Query')}</Link>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <MdOutlineReplayCircleFilled  className="text-base text-slate-900" />
                                    <span>{t('Query Answer')}</span>
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
                {/* Replay Form */}
                <div  className='card rounded-md bg-white border max-w-5xl mx-auto'>
                    <div  className="border-b py-5">
                        <p  className="px-5 font-medium">{query.product?.name}</p>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center p-5 space-y-4'>

                            {/* Question */}
                            <div  className="space-y-4">
                                {/* User */}
                                <div  className="flex items-center gap-2">
                                    <img  className="w-9 h-9 rounded-full" src={asset_url(query.customer.image)} alt={query.customer.name} />
                                    <div>
                                        <h2  className="text-base font-semibold">{query.customer.name}</h2>
                                        <p  className="text-xs text-slate-400">{moment(query.created_at).format('lll')}</p>
                                    </div>
                                </div>
                                {/* Query */}
                                <div>
                                    <p  className="text-lg font-semibold">{query.question}</p>
                                </div>

                            </div>
                            {/* Answer */}
                            <div  className='w-full'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="replay">{t('Answer')}</label>
                                <textarea
                                    readOnly={query.seller.user_type == "seller"}
                                    onChange={e => setData('answer', e.target.value)}
                                    value={data.answer}
                                    name='answer'
                                    id='answer'
                                    type="text"
                                    placeholder={t('Write Your Answer')}
                                    rows="4"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 rounded-lg text-sm focus:outline-none bg-white"
                                />
                                {errors.answer && <div  className="text-red-500 text-sm mt-1">{errors.answer}</div>}
                            </div>
                            {query.seller.user_type == "admin" && <div  className="flex justify-end">
                                <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Answer')}</button>
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
