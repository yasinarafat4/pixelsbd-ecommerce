import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Mercadopago ()
{

    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'MERCADOPAGO_KEY', 'MERCADOPAGO_ACCESS', 'MERCADOPAGO_CURRENCY' ],
        MERCADOPAGO_KEY: env_data.MERCADOPAGO_KEY.value,
        MERCADOPAGO_ACCESS: env_data.MERCADOPAGO_ACCESS.value,
        MERCADOPAGO_CURRENCY: env_data.MERCADOPAGO_CURRENCY.value,
        payment_method: 'mercadopago',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Mercadopago Key */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MERCADOPAGO_KEY">{ t( 'Mercadopago Key' ) }</label>
                    <input onChange={ e => setData( 'MERCADOPAGO_KEY', e.target.value ) } value={ data.MERCADOPAGO_KEY } name='MERCADOPAGO_KEY' id='MERCADOPAGO_KEY' type="text" placeholder={ t( 'Mercadopago Key' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.MERCADOPAGO_KEY && <div  className="text-red-500 text-sm mt-1">{errors.MERCADOPAGO_KEY}</div>} */ }
                </div>
                {/* Mercadopago Access */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MERCADOPAGO_ACCESS">{ t( 'Mercadopago Access' ) }</label>
                    <input onChange={ e => setData( 'MERCADOPAGO_ACCESS', e.target.value ) } value={ data.MERCADOPAGO_ACCESS } name='MERCADOPAGO_ACCESS' id='MERCADOPAGO_ACCESS' type="text" placeholder={ t( 'Mercadopago Access' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.MERCADOPAGO_ACCESS && <div  className="text-red-500 text-sm mt-1">{errors.MERCADOPAGO_ACCESS}</div>} */ }
                </div>
                {/* MERCADOPAGO CURRENCY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MERCADOPAGO_CURRENCY">{ t( 'MERCADOPAGO CURRENCY' ) }</label>
                    <input onChange={ e => setData( 'MERCADOPAGO_CURRENCY', e.target.value ) } value={ data.MERCADOPAGO_CURRENCY } name='MERCADOPAGO_CURRENCY' id='MERCADOPAGO_CURRENCY' type="text" placeholder={ t( 'MERCADOPAGO CURRENCY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.MERCADOPAGO_CURRENCY && <div  className="text-red-500 text-sm mt-1">{errors.MERCADOPAGO_CURRENCY}</div>} */ }
                </div>
                {/*MERCADOPAGO N.B. */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="payhere_sandbox"></label>
                    <div  className="col-span-8 ps-4 py-3 border-[1px] border-[#90d0f5] bg-[#CCE5FF] rounded">
                        <p  className="text-xs">Currency must be <strong>es-AR</strong> or <strong>es-CL</strong> or <strong>es-CO</strong> or <strong>es-MX</strong> or <strong>es-VE</strong> or <strong>es-UY</strong> or <strong>es-PE</strong> or <strong>pt-BR</strong></p>
                        <p  className="text-xs">If kept empty, <strong>en-US</strong> will be used automatically</p>
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
