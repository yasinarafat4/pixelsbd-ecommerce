import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Paymob ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'PAYMOB_API_KEY', 'PAYMOB_IFRAME_ID', 'PAYMOB_INTEGRATION_ID', 'PAYMOB_HMAC' ],
        PAYMOB_API_KEY: env_data.PAYMOB_API_KEY.value,
        PAYMOB_IFRAME_ID: env_data.PAYMOB_IFRAME_ID.value,
        PAYMOB_INTEGRATION_ID: env_data.PAYMOB_INTEGRATION_ID.value,
        PAYMOB_HMAC: env_data.PAYMOB_HMAC.value,
        payment_method: 'paymob',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Paymob API Key */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYMOB_API_KEY">{ t( 'Paymob API Key' ) }</label>
                    <input onChange={ e => setData( 'PAYMOB_API_KEY', e.target.value ) } value={ data.PAYMOB_API_KEY } name='PAYMOB_API_KEY' id='PAYMOB_API_KEY' type="text" placeholder={ t( 'Paymob API Key' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYMOB_API_KEY && <div  className="text-red-500 text-sm mt-1">{errors.PAYMOB_API_KEY}</div>} */ }
                </div>

                {/* Paymob Iframe ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYMOB_IFRAME_ID">{ t( 'Paymob Iframe ID' ) }</label>
                    <input onChange={ e => setData( 'PAYMOB_IFRAME_ID', e.target.value ) } value={ data.PAYMOB_IFRAME_ID } name='PAYMOB_IFRAME_ID' id='PAYMOB_IFRAME_ID' type="text" placeholder={ t( 'Paymob Iframe ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYMOB_IFRAME_ID && <div  className="text-red-500 text-sm mt-1">{errors.PAYMOB_IFRAME_ID}</div>} */ }
                </div>
                {/* Paymob Integration ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYMOB_INTEGRATION_ID">{ t( 'Paymob Integration ID' ) }</label>
                    <input onChange={ e => setData( 'PAYMOB_INTEGRATION_ID', e.target.value ) } value={ data.PAYMOB_INTEGRATION_ID } name='PAYMOB_INTEGRATION_ID' id='PAYMOB_INTEGRATION_ID' type="text" placeholder={ t( 'Paymob Integration ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYMOB_INTEGRATION_ID && <div  className="text-red-500 text-sm mt-1">{errors.PAYMOB_INTEGRATION_ID}</div>} */ }
                </div>
                {/* Paymob HMAC */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYMOB_HMAC">{ t( 'Paymob HMAC' ) }</label>
                    <input onChange={ e => setData( 'PAYMOB_HMAC', e.target.value ) } value={ data.PAYMOB_HMAC } name='PAYMOB_HMAC' id='PAYMOB_HMAC' type="text" placeholder={ t( 'Paymob HMAC' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYMOB_HMAC && <div  className="text-red-500 text-sm mt-1">{errors.PAYMOB_HMAC}</div>} */ }
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
