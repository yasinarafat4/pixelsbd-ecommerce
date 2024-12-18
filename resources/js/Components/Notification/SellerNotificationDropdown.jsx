import { asset_url, placeholder1_1 } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { TbBellCancel } from "react-icons/tb";

export default function SellerNotificationDropdown() {
    const { t } = useLaravelReactI18n();
    const { seller_order_notification, seller_product_notification, seller_payout_notification } = usePage().props
    const [index, setIndex] = useState('orders');

    const handleTabChange = (e) => {
        setIndex(e)
    }

    return (
        <>
            {/* Header */}
            <div className="bg-[#F5F5F5] py-2 border-b">
                <p className='font-semibold text-[17px] px-4'>{t('Notifications')}</p>
            </div>
            {/* Tabs */}
            <div className="bg-[#FFFFFF]">
                <ul className="grid grid-cols-3 justify-items-center border-b">
                    <li onClick={(e) => handleTabChange('orders')} className={`cursor-pointer w-full text-center text-[13px] py-[5px] indicator ${index === "orders" ? "border-b-2 border_secondary" : "hover:border-b hover:border-slate-200"}`}>
                        {t('Orders')}
                        {seller_order_notification.length > 0 && <span className="indicator-item py-[1px] px-[6px] rounded-full bg_secondary text-white text-[12px]">{seller_order_notification.length}</span>}
                    </li>
                    <li onClick={(e) => handleTabChange('products')} className={`cursor-pointer w-full text-center text-[13px] py-[5px] indicator ${index === "products" ? "border-b-2 border_secondary" : "hover:border-b hover:border-slate-200"}`}>
                        {t('Products')}
                        {seller_product_notification.length > 0 && <span className="indicator-item py-[1px] px-[6px] rounded-full bg_secondary text-white text-[12px]">{seller_product_notification.length}</span>}
                    </li>
                    <li onClick={(e) => handleTabChange('payouts')} className={`cursor-pointer w-full text-center text-[13px] py-[5px] indicator ${index === "payouts" ? "border-b-2 border_secondary" : "hover:border-b hover:border-slate-200"}`}>
                        {t('Payouts')}
                        {seller_payout_notification.length > 0 && <span className="indicator-item py-[1px] px-[6px] rounded-full bg_secondary text-white text-[12px]">{seller_payout_notification.length}</span>}
                    </li>
                </ul>
            </div>
            {/* Tab Contentes */}
            <>
                {/* Orders Contents */}
                {index === "orders" &&
                    <>
                        {seller_order_notification.length > 0 ?
                            <div className="py-4">
                                {
                                    seller_order_notification.map((notification, i) => {

                                        return <div key={i} className="py-3 px-4 rounded-md flex items-center gap-2">
                                            {notification.notificationShowDesign != 'only_text' &&
                                                <img className={`w-9 aspect-square ${notification.notificationShowDesign == 'design_3' ? 'rounded-full' : notification.notificationShowDesign == 'design_2' ? 'rounded-md' : ''}`} src={asset_url(notification.notificationType.image || placeholder1_1())} alt="notification img" />
                                            }
                                            <div dangerouslySetInnerHTML={{ __html: notification.notifyContent }} />
                                        </div>
                                    })
                                }
                            </div>

                            :
                            <div className="flex flex-col justify-center items-center gap-2 py-20">
                                <TbBellCancel className="text-[60px] text-slate-500" />
                                <p className="text-xl font-semibold text-slate-700">No Notification found!</p>
                            </div>
                        }
                    </>
                }
                {/* Sellers Contents */}
                {index === "products" &&
                    <>
                        {seller_product_notification.length > 0 ?
                            <div className="py-4">
                                {
                                    seller_product_notification.map((notification, i) => {

                                        return <div key={i} className="py-3 px-4 rounded-md flex items-center gap-2">
                                            {notification.notificationShowDesign != 'only_text' &&
                                                <img className={`w-9 h-9 ${notification.notificationShowDesign == 'design_3' ? 'rounded-full' : notification.notificationShowDesign == 'design_2' ? 'rounded-md' : ''}`} src="/assets/notification.webp" alt="notification img" />
                                            }
                                            <div dangerouslySetInnerHTML={{ __html: notification.notifyContent }} />

                                        </div>
                                    })
                                }
                            </div>
                            :
                            <div className="flex flex-col justify-center items-center gap-2 py-20">
                                <TbBellCancel className="text-[60px] text-slate-500" />
                                <p className="text-xl font-semibold text-slate-700">No Notification found!</p>
                            </div>
                        }
                    </>
                }
                {/* Payouts Contents*/}
                {index === "payouts" &&
                    <>
                        {seller_payout_notification.length > 0 ?
                            <div className="py-4">
                                {
                                    seller_payout_notification.map((notification, i) => {

                                        return <div key={i} className="py-3 px-4 rounded-md flex items-center gap-2">
                                            {notification.notificationShowDesign != 'only_text' &&
                                                <img className={`w-9 h-9 ${notification.notificationShowDesign == 'design_3' ? 'rounded-full' : notification.notificationShowDesign == 'design_2' ? 'rounded-md' : ''}`} src="/assets/notification.webp" alt="notification img" />
                                            }
                                            <div dangerouslySetInnerHTML={{ __html: notification.notifyContent }} />

                                        </div>
                                    })
                                }
                            </div>

                            :
                            <div className="flex flex-col justify-center items-center gap-2 py-20">
                                <TbBellCancel className="text-[60px] text-slate-500" />
                                <p className="text-xl font-semibold text-slate-700">No Notification found!</p>
                            </div>
                        }
                    </>
                }
            </>
            {/* Bottom */}
            <Link href={route('seller.all_notifications')}>
                <div className="text-center text-[13px] text-slate-600 hover:text-slate-900 hover:bg-[#F5F5F5]  duration-200 py-2 border-t">
                    <p>{t('View All Notifications')}</p>
                </div>
            </Link>
        </ >
    )

}
