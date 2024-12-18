import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Sslcommerz ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'SSLCZ_STORE_ID', 'SSLCZ_STORE_PASSWD' ],
        SSLCZ_STORE_ID: env_data.SSLCZ_STORE_ID.value,
        SSLCZ_STORE_PASSWD: env_data.SSLCZ_STORE_PASSWD.value,
        payment_method: 'sslcommerz',
        sslcommerz_sandbox: business_settings.sslcommerz_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Sslcz Store Id */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SSLCZ_STORE_ID">{ t( 'Sslcz Store Id' ) }</label>
                    <input onChange={ e => setData( 'SSLCZ_STORE_ID', e.target.value ) } value={ data.SSLCZ_STORE_ID } name='SSLCZ_STORE_ID' id='SSLCZ_STORE_ID' type="text" placeholder={ t( 'Sslcz Store Id' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.SSLCZ_STORE_ID && <div  className="text-red-500 text-sm mt-1">{errors.SSLCZ_STORE_ID}</div>} */ }
                </div>
                {/* Sslcz Store Password */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SSLCZ_STORE_PASSWD">{ t( 'Sslcz Store Password' ) }</label>
                    <input onChange={ e => setData( 'SSLCZ_STORE_PASSWD', e.target.value ) } value={ data.SSLCZ_STORE_PASSWD } name='SSLCZ_STORE_PASSWD' id='SSLCZ_STORE_PASSWD' type="text" placeholder={ t( 'Sslcz Store Password' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.SSLCZ_STORE_PASSWD && <div  className="text-red-500 text-sm mt-1">{errors.SSLCZ_STORE_PASSWD}</div>} */ }
                </div>
                {/* Sslcommerz Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="sslcz_sandbox">{ t( 'Sslcommerz Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'sslcommerz_sandbox', e.target.checked ) } checked={ business_settings.sslcommerz_sandbox }  className="toggle toggle-sm toggle-success" />
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
