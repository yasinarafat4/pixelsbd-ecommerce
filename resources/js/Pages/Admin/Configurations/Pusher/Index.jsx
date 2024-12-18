import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdSpaceDashboard } from "react-icons/md";
import { SiPusher } from "react-icons/si";

export default function Index() {
    const { t } = useLaravelReactI18n();
    const { env_data, business_settings } = usePage().props;

    // Chat settings form
    const { data, setData, post, processing, errors, reset } = useForm({
        pusher_active: business_settings.pusher_active,
        types: ['PUSHER_APP_ID', 'PUSHER_APP_KEY', 'PUSHER_APP_SECRET', 'PUSHER_APP_CLUSTER'],
        PUSHER_APP_ID: env_data.PUSHER_APP_ID.value,
        PUSHER_APP_KEY: env_data.PUSHER_APP_KEY.value,
        PUSHER_APP_SECRET: env_data.PUSHER_APP_SECRET.value,
        PUSHER_APP_CLUSTER: env_data.PUSHER_APP_CLUSTER.value,
    })

    // Chat submit handler
    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.configuration.pusher_update'))
    }

    return (
        <AdminLayout>
            <Head title={"Pusher"} />
            <div  className='px-6 pt-6 pb-16'>
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
                                    <SiPusher  className="text-base text-slate-900" />
                                    <span>{t('Pusher')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-1 gap-5">
                    <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
                        {/* Left side */}
                        <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-5'>
                            <div  className="border-b pb-4 px-6">
                                <h2  className="text-[16px] font-medium">{t('Pusher Setting')}</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                    {/* Pusher */}
                                    <div  className="grid grid-cols-12">
                                        <label  className='col-span-3 label-text text-[13px] text-start text-slate-600' htmlFor="pusher_active">{t('Pusher Activate')}</label>
                                        <div  className="col-span-9 ">
                                            <input onChange={e => setData('pusher_active', e.target.checked)} checked={data.pusher_active} type="checkbox"  className="toggle toggle-sm toggle-success" />
                                        </div>
                                    </div>

                                    {/* Pusher App Id */}
                                    <div  className="flex justify-between">
                                        <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="PUSHER_APP_ID">{t('Pusher App Id')}</label>
                                        <input onChange={e => setData('PUSHER_APP_ID', e.target.value)} value={data.PUSHER_APP_ID} name='PUSHER_APP_ID' id='PUSHER_APP_ID' type="text" placeholder={t('Pusher App Id')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                                    </div>

                                    {/* Pusher App Key */}
                                    <div  className="flex justify-between">
                                        <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="PUSHER_APP_KEY">{t('Pusher App Key')}</label>
                                        <input onChange={e => setData('PUSHER_APP_KEY', e.target.value)} value={data.PUSHER_APP_KEY} name='PUSHER_APP_KEY' id='PUSHER_APP_KEY' type="text" placeholder={t('Pusher App Key')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                                    </div>
                                    {/* Pusher App Secret */}
                                    <div  className="flex justify-between">
                                        <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="PUSHER_APP_SECRET">{t('Pusher App Secret')}</label>
                                        <input onChange={e => setData('PUSHER_APP_SECRET', e.target.value)} value={data.PUSHER_APP_SECRET} name='PUSHER_APP_SECRET' id='PUSHER_APP_SECRET' type="text" placeholder={t('Pusher App Secret')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                                    </div>
                                    {/* Pusher App Cluster */}
                                    <div  className="flex justify-between">
                                        <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="PUSHER_APP_CLUSTER">{t('Pusher App Cluster')}</label>
                                        <input onChange={e => setData('PUSHER_APP_CLUSTER', e.target.value)} value={data.PUSHER_APP_CLUSTER} name='PUSHER_APP_CLUSTER' id='PUSHER_APP_CLUSTER' type="text" placeholder={t('Pusher App Cluster')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                                    </div>

                                </div>
                                <div  className="flex justify-end mx-5">
                                    <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Save')}</button>
                                </div>
                            </form>
                        </div>
                        {/* Right side */}
                        <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="border-b pb-4 px-5">
                                <h2  className="text-[16px] font-medium">{t('Pusher Configuration Notes')}</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                <div>
                                    <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">

                                        </li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Login to <a  className='!text-blue-600' href="https://pusher.com">pusher.com</a>.</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">2. Go to <strong>Channel</strong> &gt; <strong>Create App</strong> &gt; <strong>App Keys</strong></li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">3. Here you&apos;ll find your all credentials</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
