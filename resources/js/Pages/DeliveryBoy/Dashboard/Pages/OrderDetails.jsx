import { asset_url, toCamel } from "@/Helpers";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { LuPrinter } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import QRCode from "react-qr-code";

export default function OrderDetails() {
    const { t } = useLaravelReactI18n();
    const { order, default_currency_symbol } = usePage().props

    return (
        <DeliveryBoyLayout>
            <Head title={"Order Details"} />
            {/* Back button */}
            <div  className="flex justify-end">
                <Link onClick={e => window.history.back()}>
                    <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                </Link>
            </div>
            <div  className='p-4'>
                <div  className="card bg-white space-y-4">
                    <div  className="w-24">
                        <QRCode
                            size={100}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={order.code}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div  className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <h2  className="font-semibold"> {order.shipping_address.name}</h2>
                            <p  className="text-[13px]">{order.shipping_address.email}</p>
                            <p  className="text-[13px]">{order.shipping_address.phone}</p>
                            <p  className="text-[13px]">{order.shipping_address.address + ', ' + order.shipping_address.city + ', ' + order.shipping_address.state + '-' + order.shipping_address.zip_code + ', ' + order.shipping_address.country}</p>

                        </div>
                        <div>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Order')}</span>  <span>{order.code}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Order Status')}</span>  <span  className={`${order.delivery_status == "pending" ? 'bg-warning' : order.delivery_status == "delivered" ? 'bg-success' : order.delivery_status == "cancelled" ? 'bg-error' : 'bg-primary'} text-sm px-[5px] py-[2px] text-white rounded`}>{toCamel(order.delivery_status)}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Order date')}</span>  <span>{moment(order.created_at).format('lll')}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Order Total')}</span>  <span>{order.grand_total + default_currency_symbol}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Payment method')}</span>  <span>{toCamel(order.payment_type)}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Payment Status')}</span>  <span  className={`${order.payment_status == "unpaid" ? 'bg-error' : 'bg-success'} text-sm max-w-[160px] px-[5px] py-[2px] text-white rounded`}>{toCamel(order.payment_status)}</span></p>
                        </div>
                    </div>
                    {order.additional_info && <div  className="flex justify-start">
                        <p  className="text-[13px]"> <span  className="font-semibold">{t('Additional Info')}</span> : <span>{order.additional_info}</span></p>
                    </div>}
                    <hr />
                    {/* Table */}
                    <div  className="border px-3 lg:px-6">
                        <div>
                            <table>
                                {/* head */}
                                <thead>
                                    <tr  className="text-sm">
                                        <th align="left">{t('#')}</th>
                                        <th align="left">{t('Product')}</th>
                                        <th align="left">{t('Variation')}</th>
                                        <th align="left">{t('Quantity')}</th>
                                        <th align="left">{t('Delivery Type')}</th>
                                        <th align="right">{t('Price')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_details.map((details, i) => {
                                        return <tr key={i}  className="text-sm">
                                            <td data-label='#' align="left">{i + 1}</td>
                                            <td  className="w-full xl:w-[40%]" data-label='Product' align="left">
                                                <div  className="flex flex-col md:flex-row items-end md:items-center gap-2">
                                                    <img  className="ms-2 w-20 md:w-14" src={asset_url(details.product?.thumbnail_image)} alt={details.product?.name} />
                                                    <p  className="w-full text-[13px]">{details.product?.name}</p>
                                                </div>
                                            </td>
                                            <td data-label='Variation' align="left">{details.variation}</td>
                                            <td data-label='Quantity' align="left" >{details.quantity}</td>
                                            <td data-label='Delivery Type' align="left">{toCamel(details.shipping_type)}</td>
                                            <td data-label='Price' align="left">{details.price + default_currency_symbol}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Cart */}
                        <div  className="flex justify-center md:justify-end py-6">
                            <ul  className="space-y-2 border border-slate-400 p-4">
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Subtotal:</span> <span  className="text-sm  max-w-[160px]">{order.subtotal + default_currency_symbol}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Shipping:</span> <span  className="text-sm  max-w-[160px]">{order.shipping_cost + default_currency_symbol}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Tax:</span> <span  className="text-sm  max-w-[160px]">{order.tax + default_currency_symbol}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Coupon Discount:</span> <span  className="text-sm  max-w-[160px]">{order.coupon_discount + default_currency_symbol}</span>
                                </li>
                                <hr />
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Total:</span> <span  className="text-sm  max-w-[160px]">{order.grand_total + default_currency_symbol}</span>
                                </li>

                            </ul>
                        </div>

                        <div  className="flex justify-end items-center pb-6">
                            <a href={route('delivery_boy.invoice_download', order.id)}  className="py-3 px-5 rounded bg-black flex justify-center items-center text-white w-[55px]">
                                <LuPrinter />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </DeliveryBoyLayout>
    )

}
