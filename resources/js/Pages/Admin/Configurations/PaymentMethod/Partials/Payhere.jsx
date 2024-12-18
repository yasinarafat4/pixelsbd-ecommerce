import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Payhere ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'PAYHERE_MERCHANT_ID', 'PAYHERE_SECRET', 'PAYHERE_CURRENCY' ],
        PAYHERE_MERCHANT_ID: env_data.PAYHERE_MERCHANT_ID.value,
        PAYHERE_SECRET: env_data.PAYHERE_SECRET.value,
        PAYHERE_CURRENCY: env_data.PAYHERE_CURRENCY.value,
        payment_method: 'payhere',
        payhere_sandbox: business_settings.payhere_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Payhere MERCHANT ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYHERE_MERCHANT_ID">{ t( 'Payhere MERCHANT ID' ) }</label>
                    <input onChange={ e => setData( 'PAYHERE_MERCHANT_ID', e.target.value ) } value={ data.PAYHERE_MERCHANT_ID } name='PAYHERE_MERCHANT_ID' id='PAYHERE_MERCHANT_ID' type="text" placeholder={ t( 'Payhere MERCHANT ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYHERE_MERCHANT_ID && <div  className="text-red-500 text-sm mt-1">{errors.PAYHERE_MERCHANT_ID}</div>} */ }
                </div>
                {/* PAYHERE SECRET */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYHERE_SECRET">{ t( 'PAYHERE SECRET' ) }</label>
                    <input onChange={ e => setData( 'PAYHERE_SECRET', e.target.value ) } value={ data.PAYHERE_SECRET } name='PAYHERE_SECRET' id='PAYHERE_SECRET' type="text" placeholder={ t( 'PAYHERE SECRET' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYHERE_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.PAYHERE_SECRET}</div>} */ }
                </div>
                {/* PAYHERE CURRENCY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYHERE_CURRENCY">{ t( 'PAYHERE CURRENCY' ) }</label>
                    <input onChange={ e => setData( 'PAYHERE_CURRENCY', e.target.value ) } value={ data.PAYHERE_CURRENCY } name='PAYHERE_CURRENCY' id='PAYHERE_CURRENCY' type="text" placeholder={ t( 'PAYHERE CURRENCY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYHERE_CURRENCY && <div  className="text-red-500 text-sm mt-1">{errors.PAYHERE_CURRENCY}</div>} */ }
                </div>
                {/*Payhere Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="payhere_sandbox">{ t( 'Payhere Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'payhere_sandbox', e.target.checked ) } checked={ business_settings.payhere_sandbox }  className="toggle toggle-sm toggle-success" />
                    </div>
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
