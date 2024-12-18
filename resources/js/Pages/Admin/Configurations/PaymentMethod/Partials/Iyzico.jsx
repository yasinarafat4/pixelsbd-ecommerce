import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Iyzico ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'IYZICO_API_KEY', 'IYZICO_SECRET_KEY', 'IYZICO_CURRENCY_CODE' ],
        IYZICO_API_KEY: env_data.IYZICO_API_KEY.value,
        IYZICO_SECRET_KEY: env_data.IYZICO_SECRET_KEY.value,
        IYZICO_CURRENCY_CODE: env_data.IYZICO_CURRENCY_CODE.value,
        payment_method: 'iyzico',
        iyzico_sandbox: business_settings.iyzico_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* IYZICO API KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="IYZICO_API_KEY">{ t( 'IYZICO API KEY' ) }</label>
                    <input onChange={ e => setData( 'IYZICO_API_KEY', e.target.value ) } value={ data.IYZICO_API_KEY } name='IYZICO_API_KEY' id='IYZICO_API_KEY' type="text" placeholder={ t( 'IYZICO API KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.IYZICO_API_KEY && <div  className="text-red-500 text-sm mt-1">{errors.IYZICO_API_KEY}</div>} */ }
                </div>
                {/* IYZICO SECRET KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="IYZICO_SECRET_KEY">{ t( 'IYZICO SECRET KEY' ) }</label>
                    <input onChange={ e => setData( 'IYZICO_SECRET_KEY', e.target.value ) } value={ data.IYZICO_SECRET_KEY } name='IYZICO_SECRET_KEY' id='IYZICO_SECRET_KEY' type="text" placeholder={ t( 'IYZICO SECRET KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.IYZICO_SECRET_KEY && <div  className="text-red-500 text-sm mt-1">{errors.IYZICO_SECRET_KEY}</div>} */ }
                </div>
                {/* IYZICO CURRENCY CODE */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="IYZICO_CURRENCY_CODE">{ t( 'IYZICO CURRENCY CODE' ) }</label>
                    <input onChange={ e => setData( 'IYZICO_CURRENCY_CODE', e.target.value ) } value={ data.IYZICO_CURRENCY_CODE } name='IYZICO_CURRENCY_CODE' id='IYZICO_CURRENCY_CODE' type="text" placeholder={ t( 'IYZICO CURRENCY CODE' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.IYZICO_CURRENCY_CODE && <div  className="text-red-500 text-sm mt-1">{errors.IYZICO_CURRENCY_CODE}</div>} */ }
                </div>
                {/*IYZICO Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start'>{ t( 'IYZICO Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'iyzico_sandbox', e.target.checked ) } checked={ business_settings.iyzico_sandbox }  className="toggle toggle-sm toggle-success" />
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
