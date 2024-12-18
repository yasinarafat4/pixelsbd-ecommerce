import SellerLayout from "@/Layouts/SellerLayout";
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";

export default function Configuration() {
    const { t } = useLaravelReactI18n();
    const { default_currency_symbol } = usePage().props;
    const [deliveryBoyPaymentType, setDeliveryBoyPaymentType] = useState('per_order_commission');

    function deliveryBoyPaymentTypeChange(e) {
        setDeliveryBoyPaymentType(e.target.id)
    }

    return (
        <SellerLayout>
            <Head title={"Configuration"} />
            <div  className='p-6'>
                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600 my-5">
                    <ul>
                        <li>
                            <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <GiReceiveMoney  className="text-base text-slate-900" />
                                <span>{t('Configuration')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Payment & Notification Configurations */}
                <div  className="grid grid-cols-2 gap-4">
                    {/* Payment Configuration */}
                    <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
                        <div  className="border-b py-3 px-5 flex items-center justify-between">
                            <div  className="flex items-center gap-2">
                                <h2  className="text-[16px] font-medium">Payment Configuration</h2>
                            </div>
                        </div>
                        <div  className="px-5 py-4 space-y-3">
                            {/* Monthly Salary */}
                            <div  className="flex justify-start gap-[161px]">
                                <label  className='label-text text-[13px] text-start' htmlFor="monthly_salary">{t('Monthly Salary')}</label>
                                <div>
                                    <input type="radio" id="monthly_salary" name="delivery_boy_payment_type"
                                        onChange={e => deliveryBoyPaymentTypeChange(e)} checked={deliveryBoyPaymentType == 'monthly_salary'}

                                         className="checkbox checkbox-primary" />
                                </div>
                            </div>
                            {/* Salary Amount */}
                            {deliveryBoyPaymentType == 'monthly_salary' &&
                                <div  className="flex justify-between gap-20">
                                    <label  className='label-text text-[13px] text-start' htmlFor="delivery_boy_salary">{t('Salary Amount')}</label>
                                    <div  className="grid grid-cols-12 w-8/12">
                                        <input name='delivery_boy_salary' id='delivery_boy_salary' type="text" placeholder={t('Salary Amount')}  className="col-span-11 p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-s text-sm" />
                                        <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 p-[9px] rounded-r-lg text-lg">
                                            <p  className="text-center">{default_currency_symbol}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* Per Order Commission */}
                            <div  className="flex justify-start gap-[117px]">
                                <label  className='label-text text-[13px] text-start' htmlFor="per_order_commission">{t('Per Order Commission')}</label>
                                <div>
                                    <input type="radio" id="per_order_commission" name="delivery_boy_payment_type"
                                        onChange={e => deliveryBoyPaymentTypeChange(e)} checked={deliveryBoyPaymentType == 'per_order_commission'}
                                         className="checkbox checkbox-secondary" />
                                </div>
                            </div>
                            {/* Commission Rate */}
                            {deliveryBoyPaymentType == 'per_order_commission' &&
                                <div  className="flex justify-between gap-20">
                                    <label  className='label-text text-[13px] text-start' htmlFor="delivery_boy_commission">{t('Commission Rate')}</label>
                                    <div  className="grid grid-cols-12 w-8/12">
                                        <input name='delivery_boy_commission' id='delivery_boy_commission' type="text" placeholder={t('Commission Rate')}  className="col-span-11 p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-s text-sm" />
                                        <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 p-[9px] rounded-r-lg text-lg">
                                            <p  className="text-center">{default_currency_symbol}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* Update Button */}
                            <div  className="flex justify-end">
                                <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{t('Update')}</button>
                            </div>
                        </div>
                    </div>
                    {/*Pickup Location For Delivery Boy */}
                    <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                        <div  className="border-b py-3 px-5 flex items-center justify-between">
                            <div  className="flex items-center gap-2">
                                <h2  className="text-[16px] font-medium">Pickup Location For Delivery Boy</h2>
                            </div>
                        </div>
                        <div  className="px-5 py-4 space-y-3">
                            {/* Longitude */}
                            <div>
                                <label  className='label-text text-[13px] text-start' htmlFor="delivery_boy_commission">{t('Longitude')}</label>
                                <input name='delivery_boy_commission' id='delivery_boy_commission' type="text" placeholder={t('Longitude')}  className="col-span-11 p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-s text-sm" />
                            </div>
                            {/* Latitude */}
                            <div>
                                <label  className='label-text text-[13px] text-start' htmlFor="delivery_boy_commission">{t('Latitude')}</label>
                                <input name='delivery_boy_commission' id='delivery_boy_commission' type="text" placeholder={t('Latitude')}  className="col-span-11 p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-s text-sm" />
                            </div>

                            {/* Update Button */}
                            <div  className="flex justify-end">
                                <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{t('Update')}</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        </SellerLayout >
    );
};
