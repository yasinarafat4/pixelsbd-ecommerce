/* eslint-disable */

import { asset_url, placeholder_user } from '@/Helpers';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Scrollbars } from '@om-tlh/react-custom-scrollbars';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { RiMessage2Line } from 'react-icons/ri';
import { TbMessage, TbMessage2Exclamation } from 'react-icons/tb';

export default function ProductConversationDetails ( { conversation } )
{
    const { t } = useLaravelReactI18n();
    const [ message, setMessage ] = useState();
    const [ messagesData, setMessagesData ] = useState( conversation.messages );
    const [ typing, setTyping ] = useState( false );

    const scrollRef = useRef();
    scrollRef?.current?.scrollToBottom();

    useEffect( () =>
    {
        scrollRef?.current?.scrollToBottom();
    }, [ messagesData ] )


    function handleSendMessage ()
    {
        router.post( route( 'admin.support.admin_replay.store' ), {
            message: message,
            conversation_id: conversation.id,
        }, {
            onSuccess: () => { setMessage( '' ) }
        } )
    }

    useEffect( () =>
    {
        window.Echo.private( 'sender-' + conversation.sender.id + 'receiver-' + conversation.receiver.id )
            .listen( 'MessageEvent', function ( response )
            {
                axios.get( route( 'conversations_message', response.id ) )
                    .then( function ( response )
                    {
                        setMessagesData( response.data )

                    } )

            } ).listenForWhisper( 'typing', ( e ) =>
            {
                setTyping( e.typing )
                // remove is typing indicator after 0.9s
                setTimeout( function ()
                {
                    setTyping( false )
                }, 900 );
            } )
    }, [] );

    function isTyping ()
    {
        let channel = window.Echo.private( 'sender-' + conversation.sender.id + 'receiver-' + conversation.receiver.id );

        setTimeout( function ()
        {
            channel.whisper( 'typing', {
                typing: true
            } );
        }, 300 );
    }

    return (
        <AdminLayout>
            <Head title='Product Conversations' />
            {/* Breadcrumbs */ }
            <div  className="text-sm breadcrumbs text-slate-600 p-4">
                <ul>
                    <li>
                        <a href={ route( 'admin.support.conversations' ) }  className="inline-flex gap-1 items-center">
                            <RiMessage2Line  className="text-base text-slate-900" />
                            <span>{ t( 'Conversations' ) }</span>
                        </a>
                    </li>
                    <li>
                        <span  className="inline-flex gap-1 items-center">
                            <TbMessage2Exclamation  className="text-base text-slate-900" />
                            <span>{ t( 'Conversation Details' ) }</span>
                        </span>
                    </li>
                </ul>
            </div>

            <div  className='border rounded-t-md max-w-7xl mx-auto'>
                <div  className='bg-[#F5F5F5] border-b px-8 py-4'>
                    <h2  className="text-lg md:text-xl font-bold">{ conversation.title }</h2>
                    <p  className='flex items-center gap-2'> <TbMessage  className='text-xl' /> <span  className='text-sm'>Between <Link  className='font-semibold'>{ conversation.sender.name }</Link> and <Link  className='font-semibold'>{ conversation.receiver.name }</Link></span> </p>
                </div>
                <div  className='px-3 md:px-8 py-4' >
                    <div  className='h-[450px]'>
                        <Scrollbars ref={ scrollRef }>
                            { messagesData.map( ( msg, i ) =>
                            {
                                return <div key={ i }>
                                    {
                                        conversation.sender.id == msg.user.id &&
                                        <div  className="chat chat-start my-3">
                                            <div  className="chat-image avatar">
                                                <div  className="w-10 rounded-full">
                                                    <img
                                                        alt={ msg.user.name }
                                                        src={ asset_url(msg.user.image || placeholder_user()) } />
                                                </div>
                                            </div>
                                            <div  className="chat-header">
                                                { conversation.sender.name }
                                                <time  className="text-xs opacity-90 ms-1">{ moment( msg.created_at ).format( 'LT' ) }</time>
                                            </div>
                                            <div  className="chat-bubble break-words text-white" >{ msg.messages }</div>
                                        </div>
                                    }

                                    {
                                        conversation.receiver.id == msg.user.id
                                        && <div  className="chat chat-end my-3 mr-3 md:mr-5">
                                            <div  className="chat-image avatar">
                                                <div  className="w-10 rounded-full">
                                                    <img
                                                        alt={ msg.user.name }
                                                        src={ asset_url(msg.user.image || placeholder_user()) } />
                                                </div>
                                            </div>
                                            <div  className="chat-header">
                                                { conversation.receiver.name }
                                                <time  className="text-xs opacity-90 ms-1">{ moment( msg.created_at ).format( 'LT' ) }</time>
                                            </div>
                                            <div  className="chat-bubble bg-blue-600  text-white break-words">{ msg.messages }</div>
                                            { msg.seen_at && <div  className="chat-footer opacity-50 mt-1">Seen at { moment( msg.seen_at ).format( 'LT' ) }</div> }
                                        </div>
                                    }
                                </div>
                            } )
                            }

                        </Scrollbars>
                    </div>
                    {/* Message Input */ }
                    {
                        conversation.receiver.user_type == "admin" &&
                        <div  className='py-6 space-y-2 '>
                            <div  className='w-full'>
                                { typing && <span  className="loading loading-dots loading-lg"></span> }
                                <textarea
                                    onKeyUp={ e => isTyping() }
                                    onChange={ e => setMessage( e.target.value ) }
                                    value={ message }
                                    name='replay'
                                    id='replay'
                                    type="text"
                                    placeholder={ t( 'Type your replay' ) }
                                    rows="4"
                                     className="textarea p-3 block w-full border-[2px] border-slate-700 bg-white text-slate-600 focus:border_primary text-sm rounded-none focus:outline-none"
                                />

                            </div>
                            {/* Buttons */ }
                            <div  className="flex items-center justify-end gap-2">
                                <button onClick={ e => handleSendMessage() } type="submit"  className="px-4 py-2 bg_primary rounded text-white font-medium">Send</button>
                            </div>
                        </div>
                    }
                </div>

            </div>

        </AdminLayout>
    );
};
