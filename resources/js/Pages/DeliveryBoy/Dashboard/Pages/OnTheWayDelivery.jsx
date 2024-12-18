import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import RequestToCancelPopup from "@/Components/Popups/RequestToCancelPopup";
import { toCamel } from "@/Helpers";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FiDownload, FiMenu } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";


export default function OnTheWayDelivery() {
    const { t } = useLaravelReactI18n();
    const { default_currency_symbol, on_the_way_deliveries } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [orderID, setOrderId] = useState();

    // Modal Handlers
    function handelShowModal(e, order_id) {
        setShowModal(true)
        setOrderId(order_id)
    }

    function closeModal() {
        setShowModal(false)
    };

    function onAssignedDeliveryStatusChange(e, id) {
        router.visit(route('delivery_boy.update_delivery_status'), {
            method: 'post',
            data: {
                'order_id': id,
                'status': 'delivered'
            },
            replace: false,
            preserveState: false,
            preserveScroll: false,
        })
    }

    return (
        <DeliveryBoyLayout>
            {/* Page Title */}
            <Head title="On The Way Delivery" />
            {/* Modal */}
            {showModal && <RequestToCancelPopup closeModal={closeModal} showModal={showModal} orderID={orderID} />}
            <div>
                <div  className="py-3">
                    <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('On The Way Delivery History')}</h2>
                </div>
                <div>
                    {on_the_way_deliveries.total > 0 ?
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
                                        <th  className="w-1/12 text-sm" align="left">{t('Payment Type')}</th>
                                        <th  className="w-1/12 text-sm" align="left">{t('Mark As Delivered')}</th>
                                        <th  className="w-1/12 text-sm" align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {on_the_way_deliveries.data.map((on_the_way_delivery, i) => (
                                        <tr key={i}>
                                            <td  className="text-sm" data-label='#' align="left">{i + 1}</td>
                                            <td  className="text-sm font-medium" data-label='Code' align="left"> <span  className="text-red-500">{on_the_way_delivery.code}</span></td>
                                            <td  className="text-sm" data-label='Date' align="left">{on_the_way_delivery.date}</td>
                                            <td  className="text-sm" data-label='Amount' align="left">{default_currency_symbol}{on_the_way_delivery.grand_total}</td>
                                            <td  className="text-sm font-semibold" data-label='Delivery Status' align="left"><span  className="text-[#2f3ec7]">{toCamel(on_the_way_delivery.delivery_status)}</span> </td>
                                            <td  className="text-sm" data-label='Payment Status' align="left">
                                                {on_the_way_delivery.payment_status.trim() == "paid" ? <span  className="px-[18px] py-[7px] text-sm rounded-full bg-[#85B567] text-white">Paid</span> :
                                                    <span  className="px-[18px] py-[7px] text-sm rounded-full bg-[#EF486A] text-white">Unpaid</span>}
                                            </td>
                                            <td  className="text-sm" data-label='Payment Type' align="left">{toCamel(on_the_way_delivery.payment_type)}</td>
                                            <td  className="text-sm" data-label="Mark As Pickup" align="left">
                                                <input onChange={e => onAssignedDeliveryStatusChange(e, on_the_way_delivery.id)} type="checkbox"  className="toggle toggle-sm toggle-success" />
                                            </td>
                                            <td align="right"  className="flex items-center gap-2 justify-center lg:justify-start">
                                                <button type="button" onClick={e => handelShowModal(e, on_the_way_delivery.id)}>
                                                    <div data-tip={t("Cancel")}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <VscClose  className='text-lg' />
                                                    </div>
                                                </button>
                                                <Link href={route('delivery_boy.order_details', window.btoa(on_the_way_delivery.id))}>
                                                    <div data-tip={t("Order Details")}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <FiMenu  className='text-sm' />
                                                    </div>
                                                </Link>
                                                <a href={ route( 'delivery_boy.invoice_download', window.btoa( on_the_way_delivery.id ) ) } >
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
                                <p  className='text-slate-600 text-sm'>Showing {on_the_way_deliveries.from || 0} to {on_the_way_deliveries.to || 0} of {on_the_way_deliveries.total}</p>
                                <Pagination links={on_the_way_deliveries.links} />
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
