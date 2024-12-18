
import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Aamarpay ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'AAMARPAY_STORE_ID', 'AAMARPAY_SIGNATURE_KEY' ],
        AAMARPAY_STORE_ID: env_data.AAMARPAY_STORE_ID.value,
        AAMARPAY_SIGNATURE_KEY: env_data.AAMARPAY_SIGNATURE_KEY.value,
        payment_method: 'aamarpay',
        aamarpay_sandbox: business_settings.aamarpay_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Aamarpay Store Id */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="AAMARPAY_STORE_ID">{ t( 'Aamarpay Store Id' ) }</label>
                    <input onChange={ e => setData( 'AAMARPAY_STORE_ID', e.target.value ) } value={ data.AAMARPAY_STORE_ID } name='AAMARPAY_STORE_ID' id='AAMARPAY_STORE_ID' type="text" placeholder={ t( 'Aamarpay Store Id' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.AAMARPAY_STORE_ID && <div  className="text-red-500 text-sm mt-1">{errors.AAMARPAY_STORE_ID}</div>} */ }
                </div>
                {/* Aamarpay Signature Key */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="AAMARPAY_SIGNATURE_KEY">{ t( 'Aamarpay signature key' ) }</label>
                    <input onChange={ e => setData( 'AAMARPAY_SIGNATURE_KEY', e.target.value ) } value={ data.AAMARPAY_SIGNATURE_KEY } name='AAMARPAY_SIGNATURE_KEY' id='AAMARPAY_SIGNATURE_KEY' type="text" placeholder={ t( 'Aamarpay Signature Key' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.AAMARPAY_SIGNATURE_KEY && <div  className="text-red-500 text-sm mt-1">{errors.AAMARPAY_SIGNATURE_KEY}</div>} */ }
                </div>
                {/* Aamarpay Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="aamarpay_sandbox">{ t( 'Aamarpay Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'aamarpay_sandbox', e.target.checked ) } checked={ business_settings.aamarpay_sandbox }  className="toggle toggle-sm toggle-success" />
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
