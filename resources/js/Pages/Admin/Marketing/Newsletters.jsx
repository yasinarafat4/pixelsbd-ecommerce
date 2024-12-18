import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from "react";
import { IoNewspaper } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";

export default function Newsletters ()
{
    const { t } = useLaravelReactI18n();
    const { dataArr } = usePage().props;
    const [ selectedUsersEmail, setSelectedUsersEmail ] = useState();
    const [ selectedSubscribersEmail, setSelectedSubscribersEmail ] = useState();

    // form functionality
    const { data, setData, post, errors } = useForm( {
        subject: "",
        subscribers_email: "",
        users_email: "",
        content: "",
    } )


    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault();
        post( route( 'admin.marketing.send_newsletter' ) )
    }


    // Users email handler
    function onUserEmailChange ( e )
    {
        const value = e.map( item => item.value )
        setSelectedUsersEmail( e );
        setData( 'users_email', value );
    }
    function selecteAllUsersEmail ()
    {
        setSelectedUsersEmail( dataArr.users_email );
        const value = dataArr.users_email.map( item => item.value )
        setData( 'users_email', value );
    }
    function unSelectAllUsersEmail ()
    {
        setSelectedUsersEmail( '' );
        setData( 'users_email', '' );
    }


    // Subscribers email handler
    function onSubscriberEmailChange ( e )
    {
        const value = e.map( item => item.value )
        setSelectedSubscribersEmail( e );
        setData( 'subscribers_email', value );
    }
    function selecteAllSubscribersEmail ()
    {
        setSelectedSubscribersEmail( dataArr.subscribers_email );
        const value = dataArr.subscribers_email.map( item => item.value )
        setData( 'subscribers_email', value );
    }
    function unSelecteAllSubscribersEmail ()
    {
        setSelectedSubscribersEmail( '' );
        setData( 'subscribers_email', '' );
    }

    // Content handler
    const handleContentChange = ( html ) =>
    {
        // setData('content', html);
        setData( prevData => ( { ...prevData, 'content': html } ) );
    }

    return (
        <AdminLayout>
            <Head title={ "Newsletters" } />
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
                                    <IoNewspaper  className="text-base text-slate-900" />
                                    <span>{ t( 'Newsletters' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Send Newsletter' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ e => handleSubmit( e ) }>
                        <div  className='grid grid-cols-1 items-center gap-2 py-4 px-6'>

                            {/* Users Email */ }
                            <div  className="flex flex-col">
                                <div  className="flex items-center gap-3">
                                    <label  className='label-text text-[15px] text-slate-600'>{ t( 'Users Email' ) }</label>
                                    <div  className="flex items-center gap-1 my-1">
                                        <button  className="py-[2px] px-2 text-[12px] bg-[#F2F3F8] hover:bg-[#E3E7EB] duration-200 rounded-sm" onClick={ () => selecteAllUsersEmail() }>Select all</button>
                                        <button  className="py-[2px] px-2 text-[12px] bg-[#F2F3F8] hover:bg-[#E3E7EB] duration-200 rounded-sm" onClick={ () => unSelectAllUsersEmail() }>Unselect all</button>
                                    </div>
                                </div>
                                <Select
                                    isMulti
                                    name="users_email"
                                    placeholder={ t( 'Select Email' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onUserEmailChange( e ) }
                                    value={ selectedUsersEmail }
                                    options={ dataArr.users_email }
                                />
                            </div>
                            {/* Subscribers Email */ }
                            <div  className="flex flex-col">
                                <div  className="flex items-center gap-3">
                                    <label  className='label-text text-[15px] text-slate-600'>{ t( 'Subscribers Email' ) }</label>
                                    <div  className="flex items-center gap-1 my-1">
                                        <button  className="py-[2px] px-2 text-[12px] bg-[#F2F3F8] hover:bg-[#E3E7EB] duration-200 rounded-sm" onClick={ () => selecteAllSubscribersEmail() }>Select all</button>
                                        <button  className="py-[2px] px-2 text-[12px] bg-[#F2F3F8] hover:bg-[#E3E7EB] duration-200 rounded-sm" onClick={ () => unSelecteAllSubscribersEmail() }>Unselect all</button>
                                    </div>
                                </div>
                                <Select
                                    isMulti
                                    name="subscribers_email"
                                    placeholder={ t( 'Select Email' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onSubscriberEmailChange( e ) }
                                    value={ selectedSubscribersEmail }
                                    options={ dataArr.subscribers_email }
                                />
                            </div>
                            {/* Newsletter Subject */ }
                            <div>
                                <label  className='label-text text-[15px] text-slate-600' htmlFor="subject">{ t( 'Newsletter Subject' ) }</label>
                                <input onChange={ e => setData( 'subject', e.target.value ) } value={ data.subject } name='subject' id='subject' type="text" placeholder={ t( 'Enter Newsletter Subject' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.subject && <div  className="text-red-500 text-sm mt-1">{ errors.subject }</div> }
                            </div>
                            {/* Newsletter Content */ }
                            <div>
                                <label  className='label-text text-[15px] font-medium text-slate-600' htmlFor="content">{ t( 'Newsletter Content' ) }</label>
                                <div  className="h-48">
                                    <Wysiwyg defaultValue="" placeholder="Newsletter Content" onWysiwygChange={ e => handleContentChange( e ) } />
                                </div>
                                { errors.content && <div  className="text-red-600 font-medium mt-1">{ errors.content }</div> }
                            </div>

                        </div>
                        <div  className="flex justify-end mx-6 mb-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Send' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
