import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { MdOutlineMessage, MdSpaceDashboard } from "react-icons/md";

export default function ProductConversations() {
    const { conversations } = usePage().props;

    const { t } = useLaravelReactI18n();
    return (
        <AdminLayout>
            <Head title={"Product Conversations"} />
            <div  className='p-4'>
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
                                    <MdOutlineMessage  className="text-base text-slate-900" />
                                    <span>{t('Product Conversations')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Conversations')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>

                        {conversations.data.length > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Date')}</th>
                                        <th align="left">{t('Title')}</th>
                                        <th align="left">{t('Sender')}</th>
                                        <th align="center">{t('Receiver')}</th>
                                        <th align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row*/}

                                    {conversations.data.map((conversation, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((conversations.meta.current_page - 1) * (conversations.meta.per_page))}</td>
                                            <td align="left">{moment(conversation.created_at).format('L, h:mm:ss a')}</td>
                                            <td align="left">{conversation.title}</td>
                                            <td align="left">{conversation.sender.name}
                                                {
                                                    (conversation.sender_viewed == 0) && <span  className="text-[11px] rounded bg_secondary text-white ms-1 py-[1px] px-[3px]">new</span>
                                                }

                                            </td>
                                            <td align="center">{conversation.receiver.name}
                                                {
                                                    (conversation.receiver_viewed == 0) && <span  className="text-[11px] rounded bg_secondary text-white ms-1 py-[1px] px-[3px]">new</span>
                                                }
                                            </td>
                                            <td  className="space-x-2">
                                                <Link href={route('admin.support.conversations_details', window.btoa(conversation.id))}><div data-tip={t('View')}  className="tooltip cursor-pointer p-[10px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                    <FaEye  className='text-sm' />
                                                </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {conversations.meta.from || 0} to {conversations.meta.to || 0} of {conversations.meta.total}</p>
                                <Pagination links={conversations.meta.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
