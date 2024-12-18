
import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { toCamel } from "@/Helpers";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FiDownload, FiMenu } from "react-icons/fi";


export default function CancelledDelivery() {
    const { t } = useLaravelReactI18n();
    const { cancelled_deliveries } = usePage().props;
    const isPaid = 0;
    const length = 1;

    return (
        <DeliveryBoyLayout>
            {/* Page Title */}
            <Head title="Cancelled Delivery" />
            <div>
                <div  className="py-3">
                    <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('Cancelled Delivery History')}</h2>
                </div>
                <div>
                    {cancelled_deliveries.total > 0 ?
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th  className="w-[2%] text-sm" align="left">{t('#')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Code')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Date')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Amount')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Delivery Status')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Payment Status')}</th>
                                        <th  className="w-1/12 text-sm" align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Row */}
                                    {cancelled_deliveries.data.map((cancelled_delivery, i) => (
                                        <tr key={i}>
                                            <td  className="text-sm" data-label='#' align="left">1</td>
                                            <td  className="text-sm font-medium" data-label='Code' align="left"> <span  className="text-red-500">{cancelled_delivery.code}</span></td>
                                            <td  className="text-sm" data-label='Date' align="left">{cancelled_delivery.date}</td>
                                            <td  className="text-sm" data-label='Amount' align="left">{cancelled_delivery.grand_total}</td>
                                            <td  className="text-sm font-semibold" data-label='Delivery Status' align="left"> <span  className="text-[#EF486A]">{toCamel(cancelled_delivery.delivery_status)}</span></td>
                                            <td  className="text-sm" data-label='Payment Status' align="left">
                                                {cancelled_delivery.payment_status.trim() == "paid" ? <span  className="px-[18px] py-[7px] text-sm rounded-full bg-[#85B567] text-white">Paid</span> :
                                                    <span  className="px-[18px] py-[7px] text-sm rounded-full bg-[#EF486A] text-white">Unpaid</span>}
                                            </td>
                                            <td align="right"  className="flex items-center gap-2 justify-center lg:justify-start">
                                                <Link href={route('delivery_boy.order_details', window.btoa(cancelled_delivery.id))}>
                                                    <div data-tip={t("Order Details")}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <FiMenu  className='text-sm' />
                                                    </div>
                                                </Link>
                                                <a  href={ route( 'delivery_boy.invoice_download', window.btoa( cancelled_delivery.id ) ) }>
                                                    <div data-tip={t("Download Invoice")}  className="tooltip cursor-pointer p-[10px] text-blue-700 hover:text-slate-200 bg-blue-200 hover:bg-blue-600 duration-500 rounded-full">
                                                        <FiDownload  className='text-sm' />
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {cancelled_deliveries.from || 0} to {cancelled_deliveries.to || 0} of {cancelled_deliveries.total}</p>
                                <Pagination links={cancelled_deliveries.links} />
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
