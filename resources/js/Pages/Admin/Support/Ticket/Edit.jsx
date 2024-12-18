/* eslint-disable */

import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdOutlineReplayCircleFilled } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function Edit ()
{
    const { t } = useLaravelReactI18n();
    const [ ticketFile, setTicketFile ] = useState();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        ticket_replay: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto tempora alias adipisci blanditiis sed quod maxime cumque, incidunt distinctio autem.",
        ticket_file: "",
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        // post('/banner', {
        //     onSuccess: () => window.location.href = "/banner",
        // })
    }

    // Description handler
    const handleTicketReplay = ( html ) =>
    {
        setData( 'ticket_replay', html );
    }

    // Image handler
    function handleImageChange ( e )
    {
        const key = e.target.id;
        const value = e.target.files[ 0 ];

        if ( key === 'ticket_file' )
        {
            setTicketFile( URL.createObjectURL( value ) );
            setData( 'ticket_file', value );
        }
    }


    // File Ref
    let ticketFileRef = React.createRef();
    return (
        <AdminLayout>
            <Head title={ "Ticket Replay" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a  className="inline-flex gap-1 items-center">
                                    <MdOutlineReplayCircleFilled  className="text-base" />
                                    <Link href={ route( 'admin.support.ticket_replay', 1 ) }>Ticket Replay</Link>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <RxUpdate  className="text-base text-slate-900" />
                                    <span>Update Replay</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Backk' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <h2  className="text-lg font-medium text-slate-600">Ticket Reply</h2>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>


                            {/* Ticket Replay */ }
                            <div>
                                <div  className='h-60'>
                                    {/* <ReactQuill id='ticket_replay'  className='h-44 rounded-md' theme="snow" name='ticket_replay' value={ data.ticket_replay } modules={ module } formats={ formats } onChange={()=> handleTicketReplay } /> */ }
                                    <Wysiwyg defaultValue="" placeholder="Ticket replay" onWysiwygChange={ (e) => handleTicketReplay(e) } />
                                </div>
                                { errors.ticket_replay && <div  className="text-red-600 font-medium mt-1">{ errors.ticket_replay }</div> }
                            </div>
                            {/* Ticket file */ }
                            <div  className='flex flex-col justify-start rounded-lg gap-1 text-slate-600'>
                                <div  className='flex flex-col'>
                                    <label  className='label-text text-slate-600 text-sm font-medium text-slate-600 mb-1' htmlFor="ticket_file">
                                        Ticket File<span  className="text-[12px] ms-1 text_primary">(Aspect ratio should be 1:1)</span>
                                    </label>
                                    <input
                                        onChange={ () => handleImageChange }
                                        id="ticket_file"
                                        ref={ ticketFileRef }
                                        type="file"
                                         className="file-input file-input-bordered border-slate-300 bg-white text-slate-600 w-full rounded-md"
                                    />
                                </div>
                                { ticketFile && (
                                    <div  className="relative">
                                        <button
                                            type="button"
                                            onClick={ () =>
                                            {
                                                setData( 'ticket_file', '' );
                                                setTicketFile( null );
                                                ticketFileRef.current.value = null;
                                            } }
                                             className="absolute top-3 left-0 p-1 bg-blue-200 rounded-full"
                                        >
                                            <IoMdClose  className="text-sm text_primary" />
                                        </button>
                                        <img  className='w-32 border rounded-xl p-3 mt-3' src={ ticketFile } alt={ 'Product Image' } />
                                    </div>
                                ) }
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">Replay</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
