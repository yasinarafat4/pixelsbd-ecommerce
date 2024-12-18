import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FiMenu } from "react-icons/fi";


export default function RequestToCancel() {
    const { t } = useLaravelReactI18n();
    const { cancel_requests } = usePage().props;

    return (
        <DeliveryBoyLayout>
            {/* Page Title */}
            <Head title="Cancel Requests" />
            <div>
                <div  className="py-3">
                    <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('All Cancel Requests')}</h2>
                </div>
                <div>
                    {cancel_requests.total > 0 ?
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th  className="w-1/12 text-sm" align="left">{t('#')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Code')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Request By')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Request At')}</th>
                                        <th  className="w-1/12 text-sm" align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Row */}
                                    {cancel_requests.data.map((cancel_request, i) => (
                                        <tr key={i}>
                                            <td  className="text-sm" data-label='#' align="left">{i + 1}</td>
                                            <td  className="text-sm font-medium" data-label='Code' align="left"> <span  className="text-red-500">{cancel_request.code}</span></td>
                                            <td  className="text-sm" data-label='Date' align="left">{cancel_request.deliveryboy.name}</td>
                                            <td  className="text-sm" data-label='Date' align="left">{moment(cancel_request.cancel_request_at).format('lll')}</td>
                                            <td align="right"  className="flex items-center gap-2 justify-center lg:justify-start">
                                                <Link href={route('delivery_boy.order_details', window.btoa(cancel_request.id))}>
                                                    <div data-tip={t("Order Details")}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <FiMenu  className='text-sm' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {cancel_requests.from || 0} to {cancel_requests.to || 0} of {cancel_requests.total}</p>
                                <Pagination links={cancel_requests.links} />
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

