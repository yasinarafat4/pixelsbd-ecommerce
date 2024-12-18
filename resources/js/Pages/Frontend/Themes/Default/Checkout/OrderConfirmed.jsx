import { asset_url, placeholder1_1, toCamel } from "@/Helpers";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-phone-input-2/lib/style.css';
import { useCart } from "react-use-cart";


export default function OrderConfirmed({ combined_order }) {

    const { t } = useLaravelReactI18n();
    const { emptyCart } = useCart();

    useEffect(() => {
        emptyCart()
    }, [])


    return (
        <DefaultThemeLayout>
            <Head title="Order Confirmed" />
            <div  className="my-4 md:px-2 xl:px-0 space-y-6">
                <div  className="flex flex-col justify-center items-center gap-2 p-3 md:p-6 drop-shadow-md bg-white max-w-4xl mx-auto">
                    <FaCheckCircle  className="text-4xl text-success" />
                    <h2  className="text-2xl font-bold text-success">{t('Thank you for your Order!')}</h2>
                    <p  className="text-sm font-medium">A copy of your order summery has been sent to <strong>{combined_order.first_order.shipping_address.email}</strong></p>
                </div>
                {/* Order Summary */}
                <div  className="border px-3 lg:px-6 max-w-4xl mx-auto">
                    <div  className="py-4 border-b">
                        <h2  className="text-lg font-bold">{t('Order Summary')}</h2>
                    </div>
                    <div  className="grid grid-cols-1 md:grid-cols-2 items-start gap-3 lg:gap-6 py-5 md:py-8">
                        <ul  className="space-y-4">
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Order Date:</span> <span  className="text-sm  max-w-[180px]">{moment(combined_order.first_order.date).format('yyyy-MM-DD hh:mm:ss a')}</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Name:</span> <span  className="text-sm  max-w-[180px]">{combined_order.first_order.shipping_address.name}</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Email:</span> <span  className="text-sm  max-w-[180px]">{combined_order.first_order.shipping_address.email}</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Shipping Address:</span>
                                <span  className="text-sm text-end max-w-[280px]">
                                    {combined_order.first_order.shipping_address.address + ', ' + combined_order.first_order.shipping_address.city + ', ' + combined_order.first_order.shipping_address.state + '-' + combined_order.first_order.shipping_address.zip_code + ', ' + combined_order.first_order.shipping_address.country}
                                </span>
                            </li>
                        </ul>
                        <ul  className="space-y-4">
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Order Status:</span> <span  className="text-sm  max-w-[160px]">{toCamel(combined_order.first_order.delivery_status)}</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Total Order Amount:</span> <span  className="text-sm  max-w-[160px]">{combined_order.grand_total}</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Shipping:</span> <span  className="text-sm  max-w-[160px]">Flat Shipping Rate</span>
                            </li>
                            <li  className="flex justify-between">
                                <span  className="font-semibold text-sm">Payment Method:</span> <span  className="text-sm  max-w-[160px]">{toCamel(combined_order.first_order.payment_type)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Order Details */}

                {combined_order.orders.map((order, i) => (
                    <div key={i}  className="border px-3 lg:px-6 max-w-4xl mx-auto">
                        <h2  className="text-lg md:text-xl font-bold text-center pt-3 lg:pt-6">{t('Order Code')}: <span  className="text_secondary">{order.code}</span> </h2>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_details.map((details, i) => (

                                        <tr key={i}  className="text-sm">
                                            <td data-label='#' align="left">{i + 1}</td>
                                            <td  className="w-full xl:w-[30%]" data-label='Product' align="left">
                                                <div  className="flex flex-col xl:flex-row items-end xl:items-center gap-2">
                                                    <div  className='w-10 h-10'>
                                                        <LazyLoadImage
                                                             className='w-full h-full pointer-events-none mix-blend-multiply'
                                                            src={asset_url(details.product?.thumbnail_image || placeholder1_1())}
                                                            alt={details.product?.name}
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Order Amounts */}
                        <div  className="flex justify-end py-6">
                            <ul  className="space-y-2">
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
                    </div>
                ))}

            </div>
        </DefaultThemeLayout >
    )

}
