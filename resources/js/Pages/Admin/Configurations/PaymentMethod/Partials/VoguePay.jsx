import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function VoguePay ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'VOGUE_MERCHANT_ID' ],
        VOGUE_MERCHANT_ID: env_data.VOGUE_MERCHANT_ID.value,
        payment_method: 'voguepay',
        voguepay_sandbox: business_settings.voguepay_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3 ">
                {/* VoguePay MERCHANT ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="VOGUE_MERCHANT_ID">{ t( 'VoguePay MERCHANT ID' ) }</label>
                    <input onChange={ e => setData( 'VOGUE_MERCHANT_ID', e.target.value ) } value={ data.VOGUE_MERCHANT_ID } name='VOGUE_MERCHANT_ID' id='VOGUE_MERCHANT_ID' type="text" placeholder={ t( 'VoguePay MERCHANT ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.VOGUE_MERCHANT_ID && <div  className="text-red-500 text-sm mt-1">{errors.VOGUE_MERCHANT_ID}</div>} */ }
                </div>
                {/*VoguePay Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start'>{ t( 'VoguePay Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'voguepay_sandbox', e.target.checked ) } checked={ business_settings.voguepay_sandbox }  className="toggle toggle-sm toggle-success" />
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
