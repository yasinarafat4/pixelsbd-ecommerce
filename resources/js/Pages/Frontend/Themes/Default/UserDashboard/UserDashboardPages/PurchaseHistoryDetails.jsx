import OrderReviewPopup from "@/Components/Popups/OrderReviewPopup";
import { asset_url, placeholder1_1, toCamel } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PurchaseHistoryDetails({ order }) {
    const { t } = useLaravelReactI18n();

    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState();

    // Modal Handlers
    function handelShowModal(product) {
        setProduct(product)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };



    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Purchase History Details" />
            {/* Popup */}
            {showModal && <OrderReviewPopup closeModal={closeModal} showModal={showModal} product={product} />}
            <div>
                <h2 className="text-lg md:text-xl font-medium text-start">{t('Order Code')}: <span className="text_secondary">{order.code}</span> </h2>
                <div  className="my-4 md:px-2 xl:px-0 space-y-6 mt-4">
                    {/* Order Summary */}
                    <div  className="border px-3 lg:px-6 max-w-4xl mx-auto">
                        <div  className="py-4 border-b">
                            <h2  className="text-lg font-bold">{t('Order Summary')}</h2>
                        </div>
                        <div  className="grid grid-cols-1 md:grid-cols-2 items-start gap-5 lg:gap-6 py-5 md:py-8">
                            <ul  className="space-y-4">
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Order Date')}:</span>
                                    <span  className="text-sm  max-w-[180px]">{moment(order.created_at).format('YYYY-MM-DD hh:mm:ss a')}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Name')}:</span>
                                    <span  className="text-sm  max-w-[180px]">{order.shipping_address.name}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Email')}:</span>
                                    <span  className="text-sm  max-w-[180px]">{order.shipping_address.email}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Shipping Address')}:</span>
                                    <span  className="text-sm text-end max-w-[280px]">
                                        {order.shipping_address.address + ', ' + order.shipping_address.city + ', ' + order.shipping_address.state + '-' + order.shipping_address.zip_code + ', ' + order.shipping_address.country}
                                    </span>
                                </li>
                            </ul>
                            <ul  className="space-y-4">
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Order Status')}:</span> <span  className={`${order.delivery_status == "pending" ? 'bg-warning' : order.delivery_status == "delivered" ? 'bg-success' : order.delivery_status == "cancelled" ? 'bg-error' : 'bg-primary'} text-sm max-w-[160px] px-[5px] py-[2px] text-white rounded`}>{toCamel(order.delivery_status)}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Total Order Amount')}:</span> <span  className="text-sm  max-w-[160px]">{order.grand_total}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Payment Method')}:</span> <span  className="text-sm  max-w-[160px]">{toCamel(order.payment_type)}</span>
                                </li>
                                <li  className="flex justify-between">
                                    <span  className="font-semibold text-sm">{t('Payment Method')}:</span> <span  className={`${order.payment_status == "unpaid" ? 'bg-error' : 'bg-success'} text-sm max-w-[160px] px-[5px] py-[2px] text-white rounded`}>{toCamel(order.payment_status)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Order Details */}
                    <div  className="border px-3 lg:px-6 max-w-4xl mx-auto">

                        <div  className="py-4 border-b">
                            <h2  className="text-base md:text-lg font-bold">{t('Order Details')}</h2>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr  className="text-sm">
                                        <th align="left">{t('#')}</th>
                                        <th align="left">{t('Product')}</th>
                                        <th align="left">{t('Variation')}</th>
                                        <th align="left">{t('Quantity')}</th>
                                        <th align="left">{t('Delivery Type')}</th>
                                        <th align="right">{t('Price')}</th>
                                        <th align="right">{t('Review')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_details.map((details, i) =>
                                    (
                                        <tr key={i}  className="text-sm">
                                            <td data-label='#' align="left">{i + 1}</td>
                                            <td  className="w-full xl:w-[30%]" data-label='Product' align="left">
                                                <div  className="flex flex-col xl:flex-row items-end xl:items-start gap-2">
                                                    <div  className='w-10 h-10'>
                                                        <LazyLoadImage
                                                             className='w-full h-full'
                                                            src={asset_url(details.product?.thumbnail_image || placeholder1_1())} alt={details.product?.name}
                                                            effect='blur'
                                                        />
                                                    </div>
                                                    <p  className="text-[13px] w-full">{details.product?.name}</p>
                                                </div>
                                            </td>
                                            <td data-label='Variation' align="left">{details.variation}</td>
                                            <td data-label='Quantity' align="left" >{details.quantity}</td>
                                            <td data-label='Delivery Type' align="left">{toCamel(details.shipping_type)}</td>
                                            <td data-label='Price' align="left">{details.price}</td>
                                            <td data-label='Review' align="left">

                                                {details.delivery_status == 'delivered' ?
                                                    <button type="button" onClick={e => handelShowModal(details.product)}  className="py-1 px-2 text-sm border border-green-600 text-green-600 rounded-full text-center">
                                                        Review
                                                    </button>
                                                    :
                                                    <div  className="py-1 px-2 text-sm border border-red-500 text-red-500 rounded-full text-center">
                                                        Not Delivered Yet
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))}
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
                        <div  className="flex justify-center md:justify-end pb-6">
                            {(order.payment_status == 'unpaid' && order.delivery_status == 'pending') &&
                                <button  className="py-2 px-4 rounded bg_secondary text-white w-[245px]">
                                    Make Payment
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    )

}
