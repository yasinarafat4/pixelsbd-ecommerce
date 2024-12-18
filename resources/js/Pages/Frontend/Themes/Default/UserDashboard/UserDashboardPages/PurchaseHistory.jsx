import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { toCamel } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FiDownload, FiMenu } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import Swal from "sweetalert2";


export default function PurchaseHistory({ orders }) {
    const { t } = useLaravelReactI18n();

    // Delete functionality
    const cancelData = (id) => {
        router.get(route('cancel_order', window.btoa(id)))
    }
    const onCancelOrder = (id) => {
        Swal.fire({
            title: "Are you sure to cancel this order?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                cancelData(id)
            }
        });
    }

    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Purchase History" />
            <div>
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('Purchase History')}</h1>
                <hr />
                <div className="mt-4">
                    {orders.data.length > 0 ?
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th align="left">{t('Code')}</th>
                                        <th align="left">{t('Date')}</th>
                                        <th align="left">{t('Amount')}</th>
                                        <th align="left">{t('Delivery Status')}</th>
                                        <th align="left">{t('Payment Status')}</th>
                                        <th align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.map((order, i) => (

                                        <tr key={i}>
                                            <td data-label='Code' align="left" ><Link className="text-red-600" href={route('purchase_history_details', window.btoa(order.id))}>{order.code}</Link></td>
                                            <td data-label='Date' align="left">{moment(order.created_at).format('YYYY-MM-DD')}</td>
                                            <td data-label='Amount' align="left">{order.grand_total}</td>
                                            <td data-label='Delivery Status' className={`${order.delivery_status == 'pending' ? 'text-warning' : order.delivery_status == 'delivered' ? 'text-success' : order.delivery_status == 'cancelled' ? 'text-error' : 'text-primary'}`} align="left">
                                                {toCamel(order.delivery_status)}</td>
                                            <td data-label='Payment Status' align="left" className=""> {order.payment_status.trim() == "paid" ? <span className="px-[18px] py-[7px] text-sm rounded-full bg-[#85B567] text-white">Paid</span> :
                                                <span className="px-[18px] py-[7px] text-sm rounded-full bg-[#EF486A] text-white">Unpaid</span>}</td>
                                            <td align="right">
                                                <div className="flex items-center gap-2 justify-center lg:justify-end">
                                                    <Link href={route('purchase_history_details', window.btoa(order.id))}>
                                                        <div data-tip={t("Order Details")} className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                            <FiMenu className='text-sm' />
                                                        </div>
                                                    </Link>
                                                    <a href={route('invoice_download', window.btoa(order.id))} >
                                                        <div data-tip={t("Download Invoice")} className="tooltip cursor-pointer p-[10px] text-blue-700 hover:text-slate-200 bg-blue-200 hover:bg-blue-600 duration-500 rounded-full">
                                                            <FiDownload className='text-sm' />
                                                        </div>
                                                    </a>
                                                    {(order.delivery_status == 'pending' && order.payment_status == 'unpaid') && <Link>
                                                        <div onClick={e => onCancelOrder(order.id)} data-tip={t("Cancel")} className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <VscClose className='text-lg' />
                                                        </div>
                                                    </Link>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                            <div className="flex justify-between items-center mt-2">
                                <p className='text-slate-600 text-sm'>Showing {orders.meta.from || 0} to {orders.meta.to || 0} of {orders.meta.total}</p>
                                <Pagination links={orders.meta.links} />
                            </div>
                        </>
                        :
                        <div>
                            <NothingFound title={'No purchase history data found!'} />
                        </div>
                    }
                </div>
            </div>
        </UserDashboardLayout>
    )

}
