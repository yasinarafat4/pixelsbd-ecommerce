import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React from "react";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import Aamarpay from "./Partials/Aamarpay";
import Authorizenet from "./Partials/Authorizenet";
import Bkash from "./Partials/Bkash";
import Instamojo from "./Partials/Instamojo";
import Iyzico from "./Partials/Iyzico";
import Mercadopago from "./Partials/Mercadopago";
import Nagad from "./Partials/Nagad";
import Ngenius from "./Partials/Ngenius";
import Payhere from "./Partials/Payhere";
import Payku from "./Partials/Payku";
import Paymob from "./Partials/Paymob";
import Paypal from "./Partials/Paypal";
import Paystack from "./Partials/Paystack";
import Razorpay from "./Partials/Razorpay";
import Sslcommerz from "./Partials/Sslcommerz";
import Stripe from "./Partials/Stripe";
import VoguePay from "./Partials/VoguePay";

export default function Index ( { payment_methods } )
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    function updatePaymentSettings ( id, value )
    {
        router.post( route( 'admin.configuration.payment_method_activation' ), {
            id: id,
            value: value
        }, { preserveScroll: true, preserveState: true } )
    }

    function updateSettings ( type, value )
    {
        router.post( route( 'admin.configuration.features.activation' ), {
            type: type,
            value: value
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true
        } )
    }

    const Components = {
        'Paypal': Paypal,
        'Stripe': Stripe,
        'Sslcommerz': Sslcommerz,
        'Instamojo': Instamojo,
        'Razorpay': Razorpay,
        'Paystack': Paystack,
        'VoguePay': VoguePay,
        'Payhere': Payhere,
        'Ngenius': Ngenius,
        'Iyzico': Iyzico,
        'Nagad': Nagad,
        'Bkash': Bkash,
        'Aamarpay': Aamarpay,
        'Authorizenet': Authorizenet,
        'Payku': Payku,
        'Mercadopago': Mercadopago,
        'Paymob': Paymob,
    };

    return (
        <AdminLayout>
            <Head title={ "Payment Methods" } />
            <div  className='p-10 bg-[#FAFBFB]'>
                {/* Breadcrumbs */ }
                <div  className="text-sm breadcrumbs text-slate-600 mb-5">
                    <ul>
                        <li>
                            <Link href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{ t( 'Dashboard' ) }</span>
                            </Link>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <FaMoneyCheckDollar  className="text-xl text-slate-900" />
                                <span>{ t( 'Payment Methods' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div  className="grid grid-cols-2 gap-5">

                    {
                        payment_methods && payment_methods.map( ( payment_method, i ) =>
                        {
                            return <div key={ i }  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <div  className="flex items-center gap-2">
                                        <img  className="w-14" src={ asset_url('/assets/payment_methods/' + payment_method.image) } alt={ payment_method.name } />
                                        <h2  className="text-[16px] font-medium">{ payment_method.name }</h2>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={ ( e ) => updatePaymentSettings( payment_method.id, e.target.checked ) } checked={ payment_method.status }  className="toggle toggle-sm toggle-success" />
                                    </div>
                                </div>
                                { React.createElement( Components[ payment_method.name ] ) }
                            </div>
                        } )
                    }
                    {/* Cash Payment */ }
                    <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 h-24 justify-center'>
                        <div  className="py-3 px-5 flex items-center justify-between">
                            <div  className="flex items-center gap-2">
                                <img  className="w-14" src={ asset_url("/assets/payment_methods/cod.webp") } alt="Cash Payment Image" />
                                <h2  className="text-[16px] font-medium">{ t( 'Cash Payment' ) }</h2>
                            </div>
                            <div>
                                <input type="checkbox" onChange={ ( e ) => updateSettings( 'cash_payment', e.target.checked ) } checked={ business_settings.cash_payment }  className="toggle toggle-sm toggle-success" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
