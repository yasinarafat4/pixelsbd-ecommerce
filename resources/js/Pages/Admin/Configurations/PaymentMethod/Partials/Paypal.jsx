import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Paypal ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET' ],
        PAYPAL_CLIENT_ID: env_data.PAYPAL_CLIENT_ID.value,
        PAYPAL_CLIENT_SECRET: env_data.PAYPAL_CLIENT_SECRET.value,
        payment_method: 'paypal',
        paypal_sandbox: business_settings.paypal_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Paypal Client Id */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYPAL_CLIENT_ID">{ t( 'Paypal Client Id' ) }</label>
                    <input onChange={ e => setData( 'PAYPAL_CLIENT_ID', e.target.value ) } value={ data.PAYPAL_CLIENT_ID } name='PAYPAL_CLIENT_ID' id='PAYPAL_CLIENT_ID' type="text" placeholder={ t( 'Paypal Client Id' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYPAL_CLIENT_ID && <div  className="text-red-500 text-sm mt-1">{errors.PAYPAL_CLIENT_ID}</div>} */ }
                </div>
                {/* Paypal Client Secret */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYPAL_CLIENT_SECRET">{ t( 'Paypal Client Secret' ) }</label>
                    <input onChange={ e => setData( 'PAYPAL_CLIENT_SECRET', e.target.value ) } value={ data.PAYPAL_CLIENT_SECRET } name='PAYPAL_CLIENT_SECRET' id='PAYPAL_CLIENT_SECRET' type="text" placeholder={ t( 'Paypal Client Secret' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYPAL_CLIENT_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.PAYPAL_CLIENT_SECRET}</div>} */ }
                </div>
                {/* Paypal Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="paypal_sandbox">{ t( 'Paypal Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'paypal_sandbox', e.target.checked ) } checked={ business_settings.paypal_sandbox }  className="toggle toggle-sm toggle-success" />
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
