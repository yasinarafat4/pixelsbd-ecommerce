import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { MdCancelScheduleSend, MdSpaceDashboard } from "react-icons/md";
export default function CancelRequest() {

    const { t } = useLaravelReactI18n();
    const { cancel_requests } = usePage().props;

    return (
        <AdminLayout>
            <Head title={"Cancel Request"} />
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
                                    <MdCancelScheduleSend  className="text-base text-slate-900" />
                                    <span>{t('All Cancel Requests')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Cancel Requests')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>

                        {cancel_requests.total > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Code')}</th>
                                        <th align="left">{t('Request By')}</th>
                                        <th align="left">{t('Request At')}</th>
                                        <th align="left">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {cancel_requests.data.map((cancel_request, i) => (
                                        <tr key={i}>
                                            <td  className="text-sm" data-label='#' align="left">{i + 1}</td>
                                            <td  className="text-sm font-medium" data-label='Code' align="left"> <span  className="text-red-500">{cancel_request.code}</span></td>
                                            <td  className="text-sm" data-label='Date' align="left">{cancel_request.deliveryboy.name}</td>
                                            <td  className="text-sm" data-label='Date' align="left">{moment(cancel_request.cancel_request_at).format('lll')}</td>
                                            <td align="left">
                                                <Link href={route('admin.orders.show', window.btoa(cancel_request.id))}><div data-tip={t('View')}  className="tooltip cursor-pointer p-[10px] text-slate-700 border border-slate-500 hover:text-slate-200 bg-[#fff] hover:bg-[#A179F0] hover:border-[#A179F0] duration-500 rounded-full">
                                                    <FaEye  className='text-sm' />
                                                </div></Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {cancel_requests.from || 0} to {cancel_requests.to || 0} of {cancel_requests.total}</p>
                                <Pagination links={cancel_requests.links} />
                            </div>
                        </div> : <NothingFound title={"Nothing Found!"} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
