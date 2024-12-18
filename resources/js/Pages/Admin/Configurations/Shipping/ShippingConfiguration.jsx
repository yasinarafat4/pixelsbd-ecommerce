import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";



export default function ShippingConfiguration ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [ shippingType, setShippingType ] = useState( business_settings.shipping_type );
    const [ flatRateShippingCost, setFlatRateShippingCost ] = useState( business_settings.flat_rate_cost );
    const [ shippingCostAdmin, setShippingCostAdmin ] = useState( business_settings.shipping_cost_admin );

    function OnUpdateShippingType ()
    {
        router.post( route( 'admin.configuration.shipping.shipping_configuration_update' ), {
            type: 'shipping_type',
            value: shippingType
        } )
    }

    function OnUpdateFlatRateShippingCost ()
    {
        router.post( route( 'admin.configuration.shipping.shipping_configuration_update' ), {
            type: 'flat_rate_shipping_cost',
            value: flatRateShippingCost
        } )
    }

    function OnUpdateShippingCostAdmin ()
    {
        router.post( route( 'admin.configuration.shipping.shipping_configuration_update' ), {
            type: 'shipping_cost_admin',
            value: shippingCostAdmin
        } )
    }

    return (
        <AdminLayout>
            <Head title="Shipping Configuration" />
            <div  className="p-10 space-y-5">
                {/* Breadcrumbs */ }
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{ t( 'Dashboard' ) }</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <FaGear  className="text-base text-slate-900" />
                                <span>{ t( 'Shipping Configuration' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Select Shipping Method */ }
                <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
                    {/* Left side */ }
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 h-64'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Select Shipping Method' ) }</h2>
                        </div>
                        <div  className="flex flex-col items-start gap-1 px-5 pt-5">
                            <div  className="flex items-center gap-1">
                                <label  className="flex items-center text-sm font-normal cursor-pointer">
                                    <input onChange={ e => setShippingType( e.target.value ) } value="product_wise_shipping" defaultChecked={ business_settings.shipping_type == 'product_wise_shipping' } name="shipping_type" type="radio"  className="h-4 w-4 border-gray-300" />
                                    <span  className="pl-2 label-text text-slate-600">Product Wise Shipping Cost</span>
                                </label>
                            </div>
                            <div  className="flex items-center gap-1">
                                <label  className="flex items-center text-sm font-normal cursor-pointer">
                                    <input onChange={ e => setShippingType( e.target.value ) } value="flat_rate" defaultChecked={ business_settings.shipping_type == 'flat_rate' } name="shipping_type" type="radio"  className="h-4 w-4 border-gray-300" />
                                    <span  className="pl-2 label-text text-slate-600">Flat Rate Shipping Cost</span>
                                </label>
                            </div>
                            <div  className="flex items-center gap-1">
                                <label  className="flex items-center text-sm font-normal cursor-pointer">
                                    <input onChange={ e => setShippingType( e.target.value ) } value="seller_wise_shipping" defaultChecked={ business_settings.shipping_type == 'seller_wise_shipping' } name="shipping_type" type="radio"  className="h-4 w-4 border-gray-300" />
                                    <span  className="pl-2 label-text text-slate-600">Seller Wise Flat Shipping Cost</span>
                                </label>
                            </div>
                            <div  className="flex items-center gap-1">
                                <label  className="flex items-center text-sm font-normal cursor-pointer">
                                    <input onChange={ e => setShippingType( e.target.value ) } value="area_wise_shipping" defaultChecked={ business_settings.shipping_type == 'area_wise_shipping' } name="shipping_type" type="radio"  className="h-4 w-4 border-gray-300" />
                                    <span  className="pl-2 label-text text-slate-600">Area Wise Flat Shipping Cost</span>
                                </label>
                            </div>
                        </div>
                        <div  className="flex justify-end mx-5">
                            <button type="button" onClick={ e => OnUpdateShippingType() }  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                        </div>
                    </div>
                    {/* Note */ }
                    <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Note' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-5 py-4'>
                            <div>
                                <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Product Wise Shipping Cost calculation: Shipping cost is calculate by addition of each product shipping cost.</li>
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">2. Flat Rate Shipping Cost calculation: How many products a customer purchase, doesn&apos;t matter. Shipping cost is fixed.</li>
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">3. Seller Wise Flat Shipping Cost calculation: Fixed rate for each seller. If customers purchase 2 product from two seller shipping cost is calculated by addition of each seller flat shipping cost.</li>
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">4. Area Wise Flat Shipping Cost calculation: Fixed rate for each area. If customers purchase multiple products from one seller shipping cost is calculated by the customer shipping area. To configure area wise shipping cost go to <Link href={ route( 'admin.configuration.shipping.city.index' ) }  className="text-[#008CDD] font-medium">Shipping Cities</Link>.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Flat Rate Cost */ }
                <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
                    {/* Left side */ }
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Flat Rate Cost' ) }</h2>
                        </div>
                        <div  className='flex justify-between items-center gap-4 px-5 py-3'>
                            <input onChange={ e => setFlatRateShippingCost( e.target.value ) } value={ flatRateShippingCost } name='flat_rate_shipping_cost' id='flat_rate_shipping_cost' type="number" placeholder={ t( 'Flat Rate Cost' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            <div  className="flex justify-end mx-5">
                                <button type="button" onClick={ e => OnUpdateFlatRateShippingCost() }  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                            </div>
                        </div>
                    </div>
                    {/* Note */ }
                    <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Note' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-5 py-4'>
                            <div>
                                <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Flat rate shipping cost is applicable if Flat rate shipping is enabled.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Shipping Cost for Admin Products */ }
                <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
                    {/* Left side */ }
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Shipping Cost for Admin Products' ) }</h2>
                        </div>
                        <div  className='flex justify-between items-center gap-4 px-5 py-4'>
                            <input onChange={ e => setShippingCostAdmin( e.target.value ) } value={ shippingCostAdmin } name='shipping_cost_admin' id='shipping_cost_admin' type="number" placeholder={ t( 'Shipping Cost' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            <div  className="flex justify-end mx-5">
                                <button type="button" onClick={ e => OnUpdateShippingCostAdmin() }  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                            </div>
                        </div>
                    </div>
                    {/* Note */ }
                    <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                        <div  className="border-b px-5 py-4">
                            <h2  className="text-[16px] font-medium">{ t( 'Note' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-5 py-4'>
                            <div>
                                <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                    <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Shipping cost for admin is applicable if Seller wise shipping cost is enabled.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
