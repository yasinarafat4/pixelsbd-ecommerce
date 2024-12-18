import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Ngenius ()
{
    const { t } = useLaravelReactI18n();

    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'NGENIUS_OUTLET_ID', 'NGENIUS_API_KEY', 'NGENIUS_CURRENCY' ],
        NGENIUS_OUTLET_ID: env_data.NGENIUS_OUTLET_ID.value,
        NGENIUS_API_KEY: env_data.NGENIUS_API_KEY.value,
        NGENIUS_CURRENCY: env_data.NGENIUS_CURRENCY.value,
        payment_method: 'ngenius',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* NGENIUS OUTLET ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NGENIUS_OUTLET_ID">{ t( 'NGENIUS OUTLET ID' ) }</label>
                    <input onChange={ e => setData( 'NGENIUS_OUTLET_ID', e.target.value ) } value={ data.NGENIUS_OUTLET_ID } name='NGENIUS_OUTLET_ID' id='NGENIUS_OUTLET_ID' type="text" placeholder={ t( 'NGENIUS OUTLET ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NGENIUS_OUTLET_ID && <div  className="text-red-500 text-sm mt-1">{errors.NGENIUS_OUTLET_ID}</div>} */ }
                </div>
                {/* NGENIUS API KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NGENIUS_API_KEY">{ t( 'NGENIUS API KEY' ) }</label>
                    <input onChange={ e => setData( 'NGENIUS_API_KEY', e.target.value ) } value={ data.NGENIUS_API_KEY } name='NGENIUS_API_KEY' id='NGENIUS_API_KEY' type="text" placeholder={ t( 'NGENIUS API KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NGENIUS_API_KEY && <div  className="text-red-500 text-sm mt-1">{errors.NGENIUS_API_KEY}</div>} */ }
                </div>
                {/* NGENIUS CURRENCY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NGENIUS_CURRENCY">{ t( 'NGENIUS CURRENCY' ) }</label>
                    <input onChange={ e => setData( 'NGENIUS_CURRENCY', e.target.value ) } value={ data.NGENIUS_CURRENCY } name='NGENIUS_CURRENCY' id='NGENIUS_CURRENCY' type="text" placeholder={ t( 'NGENIUS CURRENCY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NGENIUS_CURRENCY && <div  className="text-red-500 text-sm mt-1">{errors.NGENIUS_CURRENCY}</div>} */ }
                </div>
                {/*NGENIUS N.B. */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="payhere_sandbox"></label>
                    <div  className="col-span-8 ps-4 py-3 border-[1px] border-[#90d0f5] bg-[#CCE5FF] rounded">
                        <p  className="text-xs">Currency must be <strong>AED</strong> or <strong>USD</strong> or <strong>EUR</strong> </p>
                        <p  className="text-xs">If kept empty, <strong>AED</strong> will be used automatically</p>
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
