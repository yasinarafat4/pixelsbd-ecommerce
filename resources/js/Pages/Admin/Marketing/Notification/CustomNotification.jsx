
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdSpaceDashboard } from "react-icons/md";
import { TbBellCode } from "react-icons/tb";
import Select from "react-select";

export default function CustomNotification ( { customers, customNotificationTypes } )
{
    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, post, errors, reset } = useForm( {
        user_ids: "",
        notification_type_id: "",
        content: "",
        link: "",
    } )

    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.marketing.notification.custom_notification.send' ), {
            onFinish: () =>
            {
                reset();
            },
            preserveState: false
        } )
    }


    // Select change handler
    function onCustomerChange ( e )
    {
        let ids = [];
        e.forEach( element =>
        {
            ids.push( element.value )
        } );
        setData( 'user_ids', ids )
    }

    // Select change handler
    function onNotificationTypeChange ( e )
    {
        setData( prevData => ( { ...prevData, 'notification_type_id': e.value } ) );
        setData( prevData => ( { ...prevData, 'content': e.text } ) );
    }

    return (
        <AdminLayout>
            <Head title={ "Custom Notification" } />
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
                                    <TbBellCode  className="text-lg text-slate-900" />
                                    <span>{ t( 'Custom Notification' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Send Custom Notification' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>

                            {/* Customers */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'Customers' ) }</label>
                                <Select
                                    isMulti
                                    name="customers"
                                    placeholder={ t( 'Select Customers' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onCustomerChange( e ) }
                                    options={ customers.map( ( customer ) => ( { value: customer.id, label: customer.name + ' (' + customer.email + ') ' } ) ) }
                                />
                            </div>

                            {/* Select Type */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'Select Type' ) }</label>
                                <Select
                                    name="select_type"
                                    placeholder={ t( 'Select' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onNotificationTypeChange( e ) }
                                    options={ customNotificationTypes.map( ( notificationtype ) => ( { value: notificationtype.id, label: notificationtype.name, text: notificationtype.text } ) ) }
                                />
                            </div>

                            {/* Content*/ }
                            <div  className='w-full mb-4'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="content">{ t( 'Content' ) }</label>
                                <p  className="text-xs text-blue-600">(Best within 80 character)</p>
                                <textarea
                                    readOnly
                                    value={ data.content }
                                    name='content'
                                    id='content'
                                    type="text"
                                    placeholder={ t( 'Write what your notification will display…' ) }
                                    rows="4"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                                />
                            </div>

                            {/* Link */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="link">{ t( 'Link' ) }</label>
                                <input onChange={ e => setData( 'link', e.target.value ) } value={ data.link } name='link' id='link' type="text" placeholder={ t( 'Paste your link' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.link && <div  className="text-red-500 text-sm mt-1">{ errors.link }</div> }
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-sm text-white">{ t( 'Send Notification' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
