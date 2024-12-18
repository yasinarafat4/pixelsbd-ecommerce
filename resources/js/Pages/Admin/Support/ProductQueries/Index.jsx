import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { MdSpaceDashboard } from "react-icons/md";
import { PiArrowElbowUpLeftFill } from "react-icons/pi";
import { TbShoppingCartQuestion } from "react-icons/tb";

export default function Index() {
    const { queries } = usePage().props;

    const { t } = useLaravelReactI18n();
    return (
        <AdminLayout>
            <Head title={"Product Queries"} />
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
                                    <TbShoppingCartQuestion  className="text-base text-slate-900" />
                                    <span>{t('Product Queries')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Product Queries')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>

                        {queries.meta.total > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Date')}</th>
                                        <th align="left">{t('User Name')}</th>
                                        <th align="left">{t('Product Name')}</th>
                                        <th align="center">{t('Question')}</th>
                                        <th align="center">{t('Answer')}</th>
                                        <th align="center">{t('Status')}</th>
                                        <th align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row*/}
                                    {queries.data.map((query, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((queries.meta.current_page - 1) * (queries.meta.per_page))}</td>
                                            <td align="left">{moment(query.created_at).format('lll')}</td>
                                            <td align="left">{query.customer.name}</td>
                                            <td width={'15%'} align="left">{query.product?.name}</td>
                                            <td width={'20%'} align="left">{query.question}</td>
                                            <td width={'20%'} align="left">{query.answer}</td>

                                            <td align="center">
                                                {query.answer ? <div  className="py-1 px-2 text-xs  bg-[#28bb59] text-white w-[90px] rounded-md text-center">
                                                    Replied
                                                </div> : <div  className="py-1 px-2 text-xs  bg-orange-500 text-white w-[90px] rounded-md text-center">
                                                    Not Replied
                                                </div>}
                                            </td>
                                            <td>
                                                <Link href={route('admin.support.query.edit', query.id)}>
                                                    <div data-tip="Answer"  className="tooltip  indicator cursor-pointer p-[10px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                        <PiArrowElbowUpLeftFill  className='text-base' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {queries.meta.from || 0} to {queries.meta.to || 0} of {queries.meta.total}</p>
                                <Pagination links={queries.meta.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
