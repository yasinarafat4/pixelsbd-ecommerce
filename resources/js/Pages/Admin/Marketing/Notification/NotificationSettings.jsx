import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdSpaceDashboard } from "react-icons/md";
import { TbBellCog } from "react-icons/tb";

export default function NotificationSettings ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    // form functionality
    const { data, setData, post } = useForm( {
        types: [ 'notification_show_type' ],
        notification_show_type: business_settings.notification_show_type,
    } )

    function handleSubmit ( e )
    {
        e.preventDefault();
        post( route( 'admin.configuration.update' ) )
    }

    return (
        <AdminLayout>
            <Head title={ "Notification Settings" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <TbBellCog  className="text-lg text-slate-900" />
                                    <span>{ t( 'Notification Settings' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <h2  className="text-base font-medium">{ t( 'Notification Settings' ) }</h2>
                    </div>
                    <div  className='card-body'>
                        <p  className="text-sm">You can add new types & upload image for every type. If you do not upload image or edit images from default types then default image will be shown.</p>
                        <form onSubmit={ e => handleSubmit( e ) }>
                            <div  className="grid grid-cols-2 gap-10">
                                <div>
                                    <div  className="py-3 px-6 shadow-xl rounded-md">
                                        <p  className="text-sm font-medium">Order Code :: <span  className="text-[#009EF7]">20220912-10085522</span> has been <br /> Delivered</p>
                                    </div>
                                    <div  className="flex items-center gap-2 py-2">
                                        <input id="text" type="radio" defaultChecked={ data.notification_show_type == 'only_text' } onChange={ e => setData( 'notification_show_type', e.target.value ) } name="notification_show_type" value="only_text" />
                                        <label htmlFor='text'  className="text-sm">Only Text</label>
                                    </div>
                                </div>
                                <div  className="">
                                    <div  className="py-3 px-6 shadow-xl rounded-md flex items-center gap-2">
                                        <img  className="w-9 h-9" src="/assets/notification.webp" alt="notification img" />
                                        <p  className="text-sm font-medium">Order Code :: <span  className="text-[#009EF7]">20220912-10085522</span> has <br /> been Delivered</p>
                                    </div>
                                    <div  className="flex items-center gap-2 py-2">
                                        <input id="design1" type="radio" defaultChecked={ data.notification_show_type == 'design_1' } onChange={ e => setData( 'notification_show_type', e.target.value ) } name="notification_show_type" value="design_1" />
                                        <label htmlFor='design1'  className="text-sm">Design 1</label>
                                    </div>
                                </div>
                                <div  className="">
                                    <div  className="py-3 px-6 shadow-xl rounded-md flex items-center gap-2">
                                        <img  className="w-9 h-9 rounded-md" src="/assets/notification.webp" alt="notification img" />
                                        <p  className="text-sm font-medium">Order Code :: <span  className="text-[#009EF7]">20220912-10085522</span> has <br /> been Delivered</p>
                                    </div>
                                    <div  className="flex items-center gap-2 py-2">
                                        <input id="design2" type="radio" defaultChecked={ data.notification_show_type == 'design_2' } onChange={ e => setData( 'notification_show_type', e.target.value ) } name="notification_show_type" value="design_2" />
                                        <label htmlFor='design2'  className="text-sm">Design 2</label>
                                    </div>
                                </div>
                                <div  className="">
                                    <div  className="py-3 px-6 shadow-xl rounded-md flex items-center gap-2">
                                        <img  className="w-9 h-9 rounded-full" src="/assets/notification.webp" alt="notification img" />
                                        <p  className="text-sm font-medium">Order Code :: <span  className="text-[#009EF7]">20220912-10085522</span> has <br /> been Delivered</p>
                                    </div>
                                    <div  className="flex items-center gap-2 py-2">
                                        <input id="design3" type="radio" defaultChecked={ data.notification_show_type == 'design_3' } onChange={ e => setData( 'notification_show_type', e.target.value ) } name="notification_show_type" value="design_3" />
                                        <label htmlFor='design3'  className="text-sm">Design 3</label>
                                    </div>
                                </div>
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-8 rounded-md text-sm text-white">{ t( 'Save' ) }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
