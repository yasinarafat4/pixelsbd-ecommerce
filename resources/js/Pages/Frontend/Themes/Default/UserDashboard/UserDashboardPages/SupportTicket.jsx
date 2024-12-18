import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import TicketModal from "@/Components/Popups/TicketModal";
import { toCamel } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

export default function SupportTicket() {
    const { t } = useLaravelReactI18n();
    const { tickets } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    // Modal Handlers
    function handelShowModal() {
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };


    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Support Ticket" />
            {/* Ticket Modal */}
            {showModal && <TicketModal closeModal={closeModal} showModal={showModal} />}

            <div className="flex justify-between items-center py-2">
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold">{t('Support Ticket')}</h1>
                <button onClick={e => handelShowModal()} className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'>{t('Add New Ticket')}</button>
            </div>
            <hr />
            {/* Table */}
            {tickets.meta.total > 0 ? <div className="mt-4">
                <table>
                    {/* head */}
                    <thead>
                        <tr className="text-slate-600">
                            <th className="text-sm" align="left">{t('Ticket ID')}</th>
                            <th className="text-sm" align="left">{t('Submission date')}</th>
                            <th className="text-sm" align="left">{t('Subject')}</th>
                            <th className="text-sm" align="left">{t('Status')}</th>
                            <th className="text-sm" align="center">{t('Action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            tickets.data.map((ticket, i) => (
                                <tr key={i} className='text-slate-600'>
                                    <td className="text-sm" data-label='Ticket ID' align="left">#{ticket.code}</td>
                                    <td className="text-sm" data-label='Submission date' align="left" >{moment(ticket.created_at).format('lll')}</td>
                                    <td className="text-sm" data-label='Subject' align="left">{ticket.subject}</td>
                                    <td data-label='Status' align="left">
                                        {ticket.status == "solved" ?
                                            <button className="btn btn-xs btn-success text-white rounded-full"> {toCamel(ticket.status)}</button> : ticket.status == "open" ? <button className="btn btn-xs btn-primary text-white rounded-full"> {toCamel(ticket.status)}</button> : <button className="btn btn-xs btn-error text-white rounded-full"> {toCamel(ticket.status)}</button>
                                        }
                                    </td>
                                    <td>
                                        <Link href={route('support_ticket_details', ticket.id)}>
                                            <div data-tip={t("View Details")} className="tooltip indicator cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                <FaRegEye className='text-sm' />
                                                {ticket.client_viewed == '0' ? <span className='badge badge-xs badge-secondary indicator-item'>
                                                    new
                                                </span> : ''}
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-2">
                    <p className='text-slate-600 text-sm'>Showing {tickets.meta.from || 0} to {tickets.meta.to || 0} of {tickets.meta.total}</p>
                    <Pagination links={tickets.meta.links} />
                </div>
            </div> : <NothingFound title={'No Ticket Data Available!'} />}
        </UserDashboardLayout>
    )

}
