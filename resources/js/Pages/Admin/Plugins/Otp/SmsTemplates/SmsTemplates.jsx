import AdminLayout from "@/Layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import AccountOpening from "./Partials/AccountOpening";
import AssignDeliveryBoy from "./Partials/AssignDeliveryBoy";
import DeliveryStatusChange from "./Partials/DeliveryStatusChange";
import NumberVerification from "./Partials/NumberVerification";
import OrderPlacement from "./Partials/OrderPlacement";
import PasswordReset from "./Partials/PasswordReset";
import PaymentStatusChange from "./Partials/PaymentStatusChange";

export default function SmsTemplates() {
    const { t } = useLaravelReactI18n();
    const [index, setIndex] = useState('number_verification');

    const handleTabChange = (e) => {
        // router.visit( route( 'admin.website.homepage_setting', [ { tab: e } ] ), {
        //     preserveState: true,
        //     preserveScroll: true,
        //     replace: true
        // } )
        setIndex(e)
    }
    return (
        <AdminLayout>
            <Head title={"SMS Templates"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{t('Sms Templates')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className="mr-6 my-4">
                    <div  className="border px-4 py-3 rounded-t-lg">
                        <h2  className="text-[16px] font-medium">{t('SMS Templates')}</h2>
                    </div>
                    <div  className="drawer drawer-open">
                        <input id="my-drawer-2" type="checkbox"  className="drawer-toggle" />

                        {/* Tabs Content Here */}
                        <div  className="drawer-content py-4 ps-6 border border-t-0 border-l-0 rounded-br-lg">

                            {/* Number Verification */}
                            {
                                index === "number_verification" && (
                                    <div>
                                        <NumberVerification />
                                    </div>
                                )
                            }

                            {/* Password Reset */}
                            {
                                index === "password_reset" && (
                                    <div>
                                        <PasswordReset />
                                    </div>
                                )
                            }

                            {/* Order Placement */}
                            {
                                index === "order_placement" && (
                                    <div>
                                        <OrderPlacement />
                                    </div>
                                )
                            }

                            {/* Delivery Status Change */}
                            {
                                index === "delivery_status_change" && (
                                    <div>
                                        <DeliveryStatusChange />
                                    </div>
                                )
                            }

                            {/* Payment Status Change */}
                            {
                                index === "payment_status_change" && (
                                    <div>
                                        <PaymentStatusChange />
                                    </div>
                                )
                            }

                            {/* Assign Delivery Boy */}
                            {
                                index === "assign_delivery_boy" && (
                                    <div>
                                        <AssignDeliveryBoy />
                                    </div>
                                )
                            }

                            {/* Account Opening */}
                            {
                                index === "account_opening" && (
                                    <div>
                                        <AccountOpening />
                                    </div>
                                )
                            }

                        </div>
                        <div  className="drawer-side border border-t-0 rounded-bl-lg">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar"  className="drawer-overlay"></label>
                            <ul  className="menu p-4 gap-2" >
                                {/* Tabs Here */}
                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "number_verification" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={(e) => handleTabChange('number_verification')}>
                                    {t('Phone Number Verification')}
                                </li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "password_reset" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={(e) => handleTabChange('password_reset')}>
                                    {t('Password Reset')}
                                </li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "order_placement" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={() => handleTabChange('order_placement')}>{t('Order Placement')}</li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "delivery_status_change" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={() => handleTabChange('delivery_status_change')}>{t('Delivery Status Change')}</li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "payment_status_change" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={() => handleTabChange('payment_status_change')}>{t('Payment Status Change')}</li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "assign_delivery_boy" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={() => handleTabChange('assign_delivery_boy')}>{t('Assign Delivery Boy')}</li>

                                <li  className={`tab tab-bordered text-slate-600 flex justify-center items-start w-64 rounded ${index === "account_opening" ? "text-white bg-blue-600 py-5" : "hover:text-white hover:bg-blue-600 py-5 duration-300"}`}
                                    onClick={() => handleTabChange('account_opening')}>{t('Account Opening')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
