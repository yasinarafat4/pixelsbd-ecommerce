
import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FiDownload, FiMenu } from "react-icons/fi";


export default function Earnings() {
    const { t } = useLaravelReactI18n();
    const { default_currency_symbol, total_earnings } = usePage().props;

    return (
        <DeliveryBoyLayout>
            {/* Page Title */}
            <Head title="Earnings" />
            <div>
                <div  className="py-3">
                    <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('Earning History')}</h2>
                </div>
                <div>
                    {total_earnings.total > 0 ?
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th  className="w-1/12 text-sm" align="left">{t('#')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Code')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Date')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Amount')}</th>
                                        <th  className="w-1/12 text-sm" align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Row */}
                                    {
                                        total_earnings.data.map((total_earning,i) => (
                                            <tr key={i}>
                                                <td  className="text-sm" data-label='#' align="left">{i + 1}</td>
                                                <td  className="text-sm font-medium" data-label='Code' align="left"> <span  className="text-red-500">{total_earning.order.code}</span></td>
                                                <td  className="text-sm" data-label='Date' align="left">{moment(total_earning.created_at).format('lll')}</td>
                                                <td  className="text-sm" data-label='Date' align="left">{default_currency_symbol}{total_earning.earning}</td>
                                                <td align="right"  className="flex items-center gap-2 justify-center lg:justify-start">
                                                    <Link href={route('delivery_boy.order_details', window.btoa(total_earning.order_id))}>
                                                        <div data-tip={t("Order Details")}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                            <FiMenu  className='text-sm' />
                                                        </div>
                                                    </Link>
                                                    <a href={ route( 'delivery_boy.invoice_download', window.btoa( total_earning.order_id ) ) }>
                                                        <div data-tip={t("Download Invoice")}  className="tooltip cursor-pointer p-[10px] text-blue-700 hover:text-slate-200 bg-blue-200 hover:bg-blue-600 duration-500 rounded-full">
                                                            <FiDownload  className='text-sm' />
                                                        </div>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {total_earnings.from || 0} to {total_earnings.to || 0} of {total_earnings.total}</p>
                                <Pagination links={total_earnings.links} />
                            </div>
                        </>
                        :
                        <div>
                            <NothingFound title={'No data found!'} />
                        </div>
                    }
                </div>
            </div>
        </DeliveryBoyLayout>
    )

}


