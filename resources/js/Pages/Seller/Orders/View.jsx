/* eslint-disable */

import { delivery_status, payment_status } from "@/Array";
import { asset_url, placeholder1_1, toCamel } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { LuFilePlus, LuPrinter } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import QRCode from "react-qr-code";
import Select from "react-select";

export default function View({ order, delivery_boy_list }) {

    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState()
    const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState()
    const [selectedPaymentStatu, setSelectedPaymentStatu] = useState()
    const deliveryBoyAddon = isAddonActive('delivery_boy');

    useEffect(() => {
        let dstatus = delivery_status.find(status => status.value == order.delivery_status)
        setSelectedDeliveryStatus(dstatus)
        let pstatus = payment_status.find(status => status.value == order.payment_status)
        setSelectedPaymentStatu(pstatus)
        let dboy = delivery_boy_list.find(delivery_boy => delivery_boy.id == order.assign_delivery_boy)
        const selectedDboy = dboy ? { label: dboy?.name, value: dboy?.id } : []
        setSelectedDeliveryBoy(selectedDboy);
    }, [])

    // Delivery Boy change handler
    function onDeliveryBoyChange(e) {
        setSelectedDeliveryBoy(e)
        router.post(route('seller.delivery-boy-assign'), {
            order_id: order.id,
            delivery_boy: e.value
        })
    }

    // Delivery Status change handler
    function onDeliveryStatusChange(e) {
        setSelectedDeliveryStatus(e)
        router.visit(route('seller.update_delivery_status'), {
            method: 'post',
            data: {
                'order_id': order.id,
                'status': e.value
            },
            replace: false,
            preserveState: false,
            preserveScroll: false,
        })
    }

    // Payment Statu change handler
    function onPaymentStatuChange(e) {
        setSelectedPaymentStatu(e)
        router.visit(route('seller.update_payment_status'), {
            method: 'post',
            data: {
                'order_id': order.id,
                'status': e.value
            },
            replace: false,
            preserveState: false,
            preserveScroll: false,
        })
    }

    return (
        <SellerLayout>
            <Head title={"Order Details"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('seller.seller_orders')}  className="inline-flex gap-1 items-center">
                                    <BsFillCartCheckFill  className="text-base text-slate-900" />
                                    <span>{t('Orders')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{t('Order Details')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link onClick={e => window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>
                <div  className="card bg-white border-[1px] border-slate-200 p-5 space-y-4">
                    <div  className="flex justify-end">

                        {!business_settings.product_manage_by_admin && <div  className=" flex items-center w-7/12 gap-5">
                            {/* Assign Delivery Boy */}
                            {deliveryBoyAddon && <div  className="flex flex-col w-full">
                                <label  className='label-text text-slate-600 text-sm'>{t('Assign Delivery Boy')}</label>
                                <Select
                                    name="select"
                                    placeholder={t('Select Delivery Boy')}
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={e => onDeliveryBoyChange(e)}
                                    value={selectedDeliveryBoy}
                                    options={delivery_boy_list.map((delivery_boy) => ({ value: delivery_boy.id, label: delivery_boy.name }))}
                                />
                            </div>}
                            {/* Delivery Status */}
                            <div  className="flex flex-col w-full">
                                <label  className='label-text text-slate-600 text-sm'>{t('Delivery Status')}</label>
                                <Select
                                    isDisabled={order.delivery_status == 'delivered' || order.delivery_status == 'cancelled'}
                                    name="delivery_status"
                                    placeholder={t('Select Delivery Status')}
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={e => onDeliveryStatusChange(e)}
                                    value={selectedDeliveryStatus}
                                    options={delivery_status}
                                />
                            </div>
                            {/* Payment Status */}
                            <div  className="flex flex-col w-full">
                                <label  className='label-text text-slate-600 text-sm'>{t('Payment Status')}</label>
                                <Select
                                    isDisabled={order.payment_status == 'paid'}
                                    name="payment_status"
                                    placeholder={t('Select Payment Status')}
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={e => onPaymentStatuChange(e)}
                                    value={selectedPaymentStatu}
                                    options={payment_status}
                                />
                            </div>
                        </div>}
                    </div>
                    <div  className="w-24 col-span-2">
                        <QRCode
                            size={100}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={order.code}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div  className="flex justify-between">
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
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Order Total')}</span>  <span>{order.grand_total}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Payment method')}</span>  <span>{toCamel(order.payment_type)}</span></p>
                            <p  className="text-[13px] flex items-center justify-between gap-5"> <span  className="font-semibold">{t('Payment Status')}</span>  <span  className={`${order.payment_status == "unpaid" ? 'bg-error' : 'bg-success'} text-sm max-w-[160px] px-[5px] py-[2px] text-white rounded`}>{toCamel(order.payment_status)}</span></p>
                        </div>
                    </div>
                    <div  className="flex justify-start">
                        <p  className="text-[13px]"> <span  className="font-semibold">{t('Additional Info')}</span> : <span>{order.additional_info}</span></p>
                    </div>
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
                                            <td width={'40%'} data-label='Product' align="left">
                                                <div  className="flex items-center gap-2">
                                                    <img  className="w-10" src={asset_url(details.product?.thumbnail_image || placeholder1_1())} alt={details.product?.name} />
                                                    <p  className="text-[13px]">{details.product?.name}</p>
                                                </div>
                                            </td>
                                            <td data-label='Variation' align="left">{details.variation}</td>
                                            <td data-label='Quantity' align="left" >{details.quantity}</td>
                                            <td data-label='Delivery Type' align="left">{toCamel(details.shipping_type)}</td>
                                            <td data-label='Price' align="left">{details.price}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Cart */}
                        <div  className="flex justify-center md:justify-end py-6">
                            <ul  className="space-y-2 border border-slate-400 p-4">
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Subtotal:</span> <span  className="text-sm  max-w-[160px]">{order.subtotal}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Shipping:</span> <span  className="text-sm  max-w-[160px]">{order.shipping_cost}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Tax:</span> <span  className="text-sm  max-w-[160px]">{order.tax}</span>
                                </li>
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Coupon Discount:</span> <span  className="text-sm  max-w-[160px]">{order.coupon_discount}</span>
                                </li>
                                <hr />
                                <li  className="flex justify-between gap-20">
                                    <span  className="font-semibold text-sm">Total:</span> <span  className="text-sm  max-w-[160px]">{order.grand_total}</span>
                                </li>

                            </ul>
                        </div>

                        <div  className="flex justify-end items-center pb-6">
                            <a href={route('seller.invoice_download', order.id)}  className="py-3 px-5 rounded bg-black flex justify-center items-center text-white w-[55px]">
                                <LuPrinter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
