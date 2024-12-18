import { mailers } from "@/Array";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiMailSettingsLine } from "react-icons/ri";
import Select from "react-select";

export default function Index ( { env_data } )
{
    const { t } = useLaravelReactI18n();

    const [ selectedType, setSelectedType ] = useState( [] );
    const [ testMail, setTestMail ] = useState( '' );

    // Configuration form
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'MAIL_MAILER', 'MAILGUN_DOMAIN', 'MAILGUN_SECRET', 'MAIL_HOST', 'MAIL_PORT', 'MAIL_USERNAME', 'MAIL_PASSWORD', 'MAIL_ENCRYPTION', 'MAIL_FROM_ADDRESS', 'MAIL_FROM_NAME' ],
        MAIL_MAILER: env_data.MAIL_MAILER.value,
        MAILGUN_DOMAIN: env_data.MAILGUN_DOMAIN.value,
        MAILGUN_SECRET: env_data.MAILGUN_SECRET.value,
        MAIL_HOST: env_data.MAIL_HOST.value,
        MAIL_PORT: env_data.MAIL_PORT.value,
        MAIL_USERNAME: env_data.MAIL_USERNAME.value,
        MAIL_PASSWORD: env_data.MAIL_PASSWORD.value,
        MAIL_ENCRYPTION: env_data.MAIL_ENCRYPTION.value,
        MAIL_FROM_ADDRESS: env_data.MAIL_FROM_ADDRESS.value,
        MAIL_FROM_NAME: env_data.MAIL_FROM_NAME.value,

    } )

    useEffect( () =>
    {
        let selected = mailers.filter( item => item.value == data.MAIL_MAILER );
        setSelectedType( selected[ 0 ] )
    }, [] )

    // Configuration submit handler
    function handleConfigurationSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.envUpdate' ) )
    }


    // Symbol change handler
    function onSmtpChange ( e )
    {
        setSelectedType( e );
        setData( 'MAIL_MAILER', e.value )
    }

    function SendTestMail ()
    {
        router.post( route( 'admin.configuration.test.smtp' ), {
            email: testMail
        } )
    }

    return (
        <AdminLayout>
            <Head title={ "SMTP Settings" } />
            <div  className='p-6'>
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
                                    <RiMailSettingsLine  className="text-base text-slate-900" />
                                    <span>{ t( 'SMTP Settings' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-2 gap-5">
                    {/* Left side */ }
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-5'>
                        <div  className="border-b pb-4 px-6">
                            <h2  className="text-[16px] font-medium">{ t( 'SMTP Settings' ) }</h2>
                        </div>
                        <form onSubmit={ handleConfigurationSubmit }>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                {/* Select SMTP Type */ }
                                <div  className="flex justify-between">
                                    <label  className='label-text text-[12px] text-slate-600 text-start uppercase'>{ t( 'TYPE' ) }</label>
                                    <Select
                                        name="MAIL_MAILER"
                                        placeholder={ t( 'MAIL MAILER' ) }
                                         className="w-8/12 rounded z-40"
                                        classNamePrefix="react-select"
                                        onChange={ onSmtpChange }
                                        value={ selectedType }
                                        options={ mailers }
                                    />
                                </div>
                                {
                                    selectedType[ 'value' ] == "mailgun" ?
                                        <>
                                            {/* Mailgun Domain */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAILGUN_DOMAIN">{ t( 'Mailgun Domain' ) }</label>
                                                <input onChange={ e => setData( 'MAILGUN_DOMAIN', e.target.value ) } value={ data.MAILGUN_DOMAIN } name='MAILGUN_DOMAIN' id='MAILGUN_DOMAIN' type="text" placeholder={ t( 'Mailgun Domain' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAILGUN_DOMAIN && <div  className="text-red-500 text-sm mt-1">{ errors.MAILGUN_DOMAIN }</div> }
                                            </div>
                                            {/* Mailgun Secret */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAILGUN_SECRET">{ t( 'Mailgun Secret' ) }</label>
                                                <input onChange={ e => setData( 'MAILGUN_SECRET', e.target.value ) } value={ data.MAILGUN_SECRET } name='MAILGUN_SECRET' id='MAILGUN_SECRET' type="text" placeholder={ t( 'Mailgun Secret' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAILGUN_SECRET && <div  className="text-red-500 text-sm mt-1">{ errors.MAILGUN_SECRET }</div> }
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_HOST">{ t( 'MAIL HOST' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_HOST', e.target.value ) } value={ data.MAIL_HOST } name='MAIL_HOST' id='MAIL_HOST' type="text" placeholder={ t( 'Mail Host' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_HOST && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_HOST }</div> }
                                            </div>
                                            {/* Mail port */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_PORT">{ t( 'MAIL PORT' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_PORT', e.target.value ) } value={ data.MAIL_PORT } name='MAIL_PORT' id='MAIL_PORT' type="text" placeholder={ t( 'Mail Port' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_PORT && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_PORT }</div> }
                                            </div>
                                            {/* Mail username */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_USERNAME">{ t( 'MAIL USERNAME' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_USERNAME', e.target.value ) } value={ data.MAIL_USERNAME } name='MAIL_USERNAME' id='MAIL_USERNAME' type="text" placeholder={ t( 'Mail Username' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_USERNAME && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_USERNAME }</div> }
                                            </div>
                                            {/* Mail password */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_PASSWORD">{ t( 'MAIL PASSWORD' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_PASSWORD', e.target.value ) } value={ data.MAIL_PASSWORD } name='MAIL_PASSWORD' id='MAIL_PASSWORD' type="text" placeholder={ t( 'Mail Password' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_PASSWORD && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_PASSWORD }</div> }
                                            </div>
                                            {/* Mail Encryption */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_ENCRYPTION">{ t( 'MAIL ENCRYPTION' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_ENCRYPTION', e.target.value ) } value={ data.MAIL_ENCRYPTION } name='MAIL_ENCRYPTION' id='MAIL_ENCRYPTION' type="text" placeholder={ t( 'Mail Encryption' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_ENCRYPTION && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_ENCRYPTION }</div> }
                                            </div>
                                            {/* Mail From Address */ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_FROM_ADDRESS">{ t( 'MAIL FROM ADDRESS' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_FROM_ADDRESS', e.target.value ) } value={ data.MAIL_FROM_ADDRESS } name='MAIL_FROM_ADDRESS' id='MAIL_FROM_ADDRESS' type="text" placeholder={ t( 'Mail From Address' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_FROM_ADDRESS && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_FROM_ADDRESS }</div> }
                                            </div>
                                            {/* Mail From Name*/ }
                                            <div  className="flex justify-between">
                                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="MAIL_FROM_NAME">{ t( 'MAIL FROM NAME' ) }</label>
                                                <input onChange={ e => setData( 'MAIL_FROM_NAME', e.target.value ) } value={ data.MAIL_FROM_NAME } name='MAIL_FROM_NAME' id='MAIL_FROM_NAME' type="text" placeholder={ t( 'Mail From Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-8/12 rounded-lg text-sm" />
                                                { errors.MAIL_FROM_NAME && <div  className="text-red-500 text-sm mt-1">{ errors.MAIL_FROM_NAME }</div> }
                                            </div>
                                        </>
                                }
                            </div>
                            <div  className="flex justify-end mx-5">
                                <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save Configuration' ) }</button>
                            </div>
                        </form>
                    </div>
                    <div  className="space-y-5">
                        {/* Right & Top side */ }
                        <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3 h-36'>
                            <div  className="border-b pb-4 px-6">
                                <h2  className="text-[16px] font-medium">{ t( 'Test SMTP configuration' ) }</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                {/* Test Mail */ }
                                <div  className="flex justify-between items-center ">
                                    <input onChange={ e => setTestMail( e.target.value ) } value={ testMail } name='test_mail' id='test_mail' type="text" placeholder={ t( 'Enter your email address' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                                    <div  className="flex justify-end">
                                        <button type="button" onClick={ e => SendTestMail() }  className="bg-[#008FE1] duration-300 py-3 px-4 rounded-md text-white text-sm">{ t( 'Send test email' ) }</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right & Bottom side */ }
                        <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="border-b pb-4 px-5">
                                <h2  className="text-[16px] font-medium">{ t( 'Instruction' ) }</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                <p  className="text-red-500 text-[13px]">
                                    Please be carefull when you are configuring SMTP. For incorrect configuration you will get error at the time of order place, new registration, sending newsletter.
                                </p>
                                {/* Non-SSL */ }
                                <div>
                                    <h2  className="text-base font-semibold text-slate-500 mb-1">{ t( 'For Non-SSL' ) }</h2>
                                    <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">Select sendmail for Mail Driver if you face any issue after configuring smtp as Mail Driver</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail Host according to your server Mail Client Manual Settings</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail port as 587</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail Encryption as ssl if you face issue with tls</li>
                                    </ul>
                                </div>
                                {/* SSL */ }
                                <div>
                                    <h2  className="text-base font-semibold text-slate-500 mb-1">{ t( 'For SSL' ) }</h2>
                                    <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">Select sendmail for Mail Driver if you face any issue after configuring smtp as Mail Driver</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail Host according to your server Mail Client Manual Settings</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail port as 465</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">Set Mail Encryption as ssl</li>
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
