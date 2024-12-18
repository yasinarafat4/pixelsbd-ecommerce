import NothingFound from "@/Components/NothingFound";
import { toCamel } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiArrowElbowUpLeftFill } from "react-icons/pi";

export default function Index() {
    const { t } = useLaravelReactI18n();
    const { tickets } = usePage().props


    return (
        <AdminLayout>
            <Head title={"Tickets"} />
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
                                    <IoTicket  className="text-base text-slate-900" />
                                    <span>{t('Tickets')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Ticket Summary')}</h2>
                        </div>
                        {/* Search*/}
                        {tickets.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {tickets.data.length > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="center">{t('Ticket ID')}</th>
                                        <th align="center">{t('Sending Date')}</th>
                                        <th align="center">{t('Subject')}</th>
                                        <th align="center">{t('User')}</th>
                                        <th align="center">{t('Status')}</th>
                                        <th align="right">{t('Replay')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {tickets.data.map((ticket, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left"></td>
                                            <td align="center">{ticket.code}</td>
                                            <td align="center">{moment(ticket.created_at).format('lll')}</td>
                                            <td align="center">{ticket.subject}</td>
                                            <td align="center">{ticket.user.name}</td>
                                            <td data-label='Status' align="left">
                                                {ticket.status == "solved" ? <div  className="py-1 px-2 text-xs  bg-green-600 text-white w-1/2 rounded-full text-center">
                                                    {toCamel(ticket.status)}
                                                </div> : ticket.status == "open" ? <div  className="py-1 px-2 text-xs  bg-blue-600 text-white w-1/2 rounded-full text-center">
                                                    {toCamel(ticket.status)}
                                                </div> : <div  className="py-1 px-2 text-xs  bg-red-500 text-white w-1/2 rounded-full text-center">
                                                    {toCamel(ticket.status)}
                                                </div>
                                                }
                                            </td>
                                            <td align="center"  className="space-x-2">
                                                <Link href={route('admin.support.ticket_replay', ticket.id)}>
                                                    <div data-tip="Replay"  className="tooltip  indicator cursor-pointer p-[10px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                        <PiArrowElbowUpLeftFill  className='text-base' />
                                                        {ticket.viewed == '0' ? <span  className='badge badge-xs badge-secondary indicator-item'>
                                                            new
                                                        </span> : ''}
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
