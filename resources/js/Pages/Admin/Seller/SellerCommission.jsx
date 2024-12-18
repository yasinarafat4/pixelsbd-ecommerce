import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";

import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";


export default function SellerCommission() {
    const { t } = useLaravelReactI18n();

    const { business_settings, default_currency_symbol } = usePage().props

    const [vendorCommissionActivation, setVendorCommissionActivation] = useState(business_settings.vendor_commission_activation)
    const [categoryWiseCommission, setCategoryWiseCommission] = useState(business_settings.category_wise_commission)
    const [vendorCommission, setVendorCommission] = useState(business_settings.vendor_commission ?? 0)
    const [minimumSellerAmountWithdraw, setMinimumSellerAmountWithdraw] = useState(business_settings.minimum_seller_amount_withdraw ?? 0)

    function updateSettings(type, value) {
        router.post(route('admin.configuration.features.activation'), {
            type: type,
            value: value
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true
        })
    }


    return (
        <AdminLayout>
            <Head title={"Seller Commission"} />
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
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span>{t('Seller Commission')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className="space-y-8">
                    {/* System */}
                    <div  className="grid grid-cols-2 gap-5">
                        {/* Seller Commission Activatation */}
                        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                            <div  className="border-b py-4 px-5 flex items-center justify-between">
                                <h2  className="text-[16px] font-medium">Seller Commission Activatation</h2>
                            </div>
                            <div  className="p-8 flex justify-center items-center">
                                <input type="checkbox" onChange={(e) => { updateSettings('vendor_commission_activation', e.target.checked); setVendorCommissionActivation(e.target.checked) }} checked={vendorCommissionActivation}  className="toggle h-[22px] w-[46px] toggle-success" />
                            </div>
                        </div>
                        {/* Category Based Commission */}
                        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                            <div  className="border-b py-4 px-5 flex items-center justify-between">
                                <h2  className="text-[16px] font-medium">Category Based Commission</h2>
                            </div>
                            <div  className="p-8 flex justify-center items-center">
                                <input type="checkbox" onChange={(e) => { updateSettings('category_wise_commission', e.target.checked); setCategoryWiseCommission(e.target.checked) }} checked={categoryWiseCommission}  className="toggle h-[22px] w-[46px] toggle-success" />
                            </div>
                        </div>
                    </div>

                    <div  className="grid grid-cols-2 gap-5 rounded-lg">
                        {/* Left side */}
                        <div  className='card rounded-lg shadow-lg bg-white border-[1px] border-slate-200 py-5'>
                            <div  className="border-b pb-4 px-6">
                                <h2  className="text-[16px] font-medium">{t('Seller Commission')}</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                {/* Tracking ID */}
                                <div  className="flex justify-between items-center">
                                    <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="vendor_commission">{t('Seller Commission')}</label>
                                    <div  className="grid grid-cols-12 w-8/12">
                                        <div  className="col-span-11">
                                            <input value={vendorCommission} onChange={e => setVendorCommission(e.target.value)} name='vendor_commission' id='vendor_commission' type="number" placeholder={t('Seller Commission')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-l-lg text-sm" />
                                        </div>
                                        <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[13px] rounded-r-lg text-sm">
                                            <p  className="text-center">%</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div  className="flex justify-end mx-5">
                                <button type="button" onClick={e => updateSettings('vendor_commission', vendorCommission)}  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </div>
                        {/* Right side */}
                        <div  className='card rounded-lg shadow-lg bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="border-b pb-4 px-5">
                                <h2  className="text-[16px] font-medium">{t('Notes')}</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                <div>
                                    <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. {vendorCommission}% of seller product price will be deducted from seller earnings.</li>
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">2. If Category Based Commission is enbaled, Set seller commission percentage 0..</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div  className="grid grid-cols-2 gap-5 rounded-lg">
                        {/* Left side */}
                        <div  className='card rounded-lg shadow-lg bg-white border-[1px] border-slate-200 py-5'>
                            <div  className="border-b pb-4 px-6">
                                <h2  className="text-[16px] font-medium">{t('Withdraw Seller Amount')}</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                {/* Tracking ID */}
                                <div  className="flex justify-between items-center">
                                    <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="minimum_seller_amount_withdraw">{t('Minimum Seller Amount Withdraw')}</label>

                                    <div  className="grid grid-cols-12 w-8/12">
                                        <div  className="col-span-11">
                                            <input value={minimumSellerAmountWithdraw} onChange={e => setMinimumSellerAmountWithdraw(e.target.value)} name='minimum_seller_amount_withdraw' id='minimum_seller_amount_withdraw' type="number" placeholder={t('Minimum Seller Amount Withdraw')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-l-lg text-sm" />
                                        </div>
                                        <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[9px] rounded-r-lg text-lg">
                                            <p  className="text-center">{default_currency_symbol}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div  className="flex justify-end mx-5">
                                <button type="button" onClick={e => updateSettings('minimum_seller_amount_withdraw', minimumSellerAmountWithdraw)}  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </div>
                        {/* Right side */}
                        <div  className='card rounded-lg shadow-lg bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="border-b pb-4 px-5">
                                <h2  className="text-[16px] font-medium">{t('Notes')}</h2>
                            </div>
                            <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                                <div>
                                    <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                        <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Minimum  Amount Seller can Withdraw.</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
