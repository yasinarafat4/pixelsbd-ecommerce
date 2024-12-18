import NothingFound from '@/Components/NothingFound';
import { asset_url, placeholder_user } from '@/Helpers';
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdSpaceDashboard } from "react-icons/md";
import { RiMessage2Line } from 'react-icons/ri';

export default function Conversations({ conversations }) {
    const { auth } = usePage().props;
    const { t } = useLaravelReactI18n();

    return (
        <SellerLayout>
            {/* Page Title */}
            <Head title="Conversations" />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <RiMessage2Line  className="text-base text-slate-900" />
                                    <span>{t('Conversations')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className='border-b border-slate-200 p-4'>
                        <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('Conversations')}</h2>
                    </div>
                    {conversations.data.length > 0 ? <div  className="space-y-2 lg:space-y-4  p-4">
                        {
                            conversations.data.map((conversation, i) => (
                                <div  className="border grid grid-cols-1 lg:grid-cols-12 items-center" key={i}>
                                    <div  className="lg:col-span-4 flex items-center gap-2 md:gap-4 p-2 md:p-4">
                                        <img  className="h-14 w-14" src={asset_url(conversation.sender.image || placeholder_user())} alt={conversation.name} />
                                        <div>
                                            <h2  className="text-base font-semibold mb-1">{conversation.sender.name}</h2>
                                            <p  className="text-xs">{conversation.created_at}</p>
                                        </div>
                                    </div>
                                    <div  className="lg:col-span-8 p-2 md:p-4">
                                    <div  className="flex items-center gap-1">
                                        <Link href={route('seller.conversation_details', window.btoa(conversation.id))}><h2  className="text-base font-semibold mb-1">{ conversation.title }</h2></Link>
                                        {
                                            (conversation.receiver_viewed == 0 ) && <span  className="text-[11px] rounded bg_secondary text-white py-[1px] px-[3px]">new</span>
                                        }
                                        {/* {
                                            ( auth.customer.id == conversation.receiver.id && conversation.receiver_viewed == 0 ) && <span  className="text-[11px] rounded bg_secondary text-white py-[1px] px-[3px]">new</span>
                                        } */}
                                    </div>
                                    <p  className="text-sm">{ conversation.last_message.length > 100 ? conversation.last_message.slice( 0, 100 ) + '\u2026' : conversation.last_message }</p>
                                </div>
                                </div>
                            ))
                        }
                    </div> :
                        <NothingFound title={"Nothing Found!"} />}
                </div>
            </div>
        </SellerLayout>
    )

}
