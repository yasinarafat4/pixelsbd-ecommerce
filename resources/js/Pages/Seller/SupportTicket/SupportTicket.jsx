import NothingFound from '@/Components/NothingFound';
import Pagination from '@/Components/Pagination';
import { toCamel } from '@/Helpers';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { FaPlus } from 'react-icons/fa';
import { ImTicket } from "react-icons/im";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdSpaceDashboard } from "react-icons/md";

export default function SupportTicket() {
    const { t } = useLaravelReactI18n();
    const { tickets } = usePage().props;


    return (
        <SellerLayout>
            <Head title={"Support Ticket"} />
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
                                    <ImTicket  className="text-base text-slate-900" />
                                    <span>{t('Support Ticket')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Support Ticket')}</h2>
                        </div>
                        {/* Create button */}
                        <div>
                            <Link href={route('seller.support_ticket.create')}>
                                <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Add New Ticket')}</span> <FaPlus  className='text-sm' /></button>
                            </Link>
                        </div>
                    </div>
                    <div  className='card-body'>
                        {tickets.data.length ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">Ticket ID</th>
                                        <th align="left">Sending Date</th>
                                        <th align="left">Subject</th>
                                        <th align="left">Status</th>
                                        <th align="left">Details</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {
                                        tickets.data.map((ticket, i) => (
                                            <tr key={i}  className='text-slate-600'>
                                                <td data-label='Ticket ID' align="left">#{ticket.code}</td>
                                                <td data-label='Sending Date' align="left">{moment(ticket.created_at).format('lll')}</td>
                                                <td data-label='Subject' align="left">{ticket.subject}</td>
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
                                                <td data-label='Details' align="left">
                                                    <Link href={route('seller.support_ticket_details', ticket.id)} data-tip="Details"  className='tooltip indicator' type='button'><IoInformationCircleOutline  className='text-2xl mt-1' />
                                                        {ticket.client_viewed == '0' ? <span  className='badge badge-xs badge-secondary indicator-item'>
                                                            new
                                                        </span> : ''}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {tickets.meta.from || 0} to {tickets.meta.to || 0} of {tickets.meta.total}</p>
                                <Pagination links={tickets.meta.links} />
                            </div>

                        </div>
                            : <NothingFound title={"Nothing Found!"} />}
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
};
