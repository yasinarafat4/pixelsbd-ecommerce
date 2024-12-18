import NothingFound from "@/Components/NothingFound";
import SellerLayout from "@/Layouts/SellerLayout";
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
        <SellerLayout>
            <Head title={"Product Queries"} />
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

                        {queries.length > 0 ? <div >
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
                                    {queries.map((query, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{i + 1}</td>
                                            <td align="left">{moment(query.created_at).format('lll')}</td>
                                            <td align="left">{query.customer.name}</td>
                                            <td align="left">{query.product?.name && query.product?.name.length > 40 ? query.product?.name.slice(0, 40) + '\u2026' : query.product?.name}</td>
                                            <td align="left">{query.question && query.question.length > 50 ? query.question.slice(0, 50) + '\u2026' : query.question}</td>
                                            <td align="left">{query.answer && query.answer.length > 50 ? query.answer.slice(0, 50) + '\u2026' : query.answer}</td>

                                            <td align="center">
                                                {query.answer ? <div  className="py-1 px-2 text-xs  bg-[#28bb59] text-white w-[90px] rounded-md text-center">
                                                    Replied
                                                </div> : <div  className="py-1 px-2 text-xs  bg-orange-500 text-white w-[90px] rounded-md text-center">
                                                    Not Replied
                                                </div>}
                                            </td>
                                            <td  className="space-x-2">
                                                <Link href={route('seller.product.query.edit', query.id)}>
                                                    <div data-tip="Answer"  className="tooltip  indicator cursor-pointer p-[10px] text-slate-700 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                        <PiArrowElbowUpLeftFill  className='text-base' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {queries.from || 0} to {queries.to || 0} of {queries.total}</p>
                                <Pagination links={queries.links} />
                            </div> */}
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
