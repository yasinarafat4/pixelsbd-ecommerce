import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Nagad ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'NAGAD_MODE', 'NAGAD_MERCHANT_ID', 'NAGAD_MERCHANT_NUMBER', 'NAGAD_PG_PUBLIC_KEY', 'NAGAD_MERCHANT_PRIVATE_KEY' ],
        NAGAD_MODE: env_data.NAGAD_MODE.value,
        NAGAD_MERCHANT_ID: env_data.NAGAD_MERCHANT_ID.value,
        NAGAD_MERCHANT_NUMBER: env_data.NAGAD_MERCHANT_NUMBER.value,
        NAGAD_PG_PUBLIC_KEY: env_data.NAGAD_PG_PUBLIC_KEY.value,
        NAGAD_MERCHANT_PRIVATE_KEY: env_data.NAGAD_MERCHANT_PRIVATE_KEY.value,
        payment_method: 'nagad'
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* NAGAD MODE */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NAGAD_MODE">{ t( 'NAGAD MODE' ) }</label>
                    <input onChange={ e => setData( 'NAGAD_MODE', e.target.value ) } value={ data.NAGAD_MODE } name='NAGAD_MODE' id='NAGAD_MODE' type="text" placeholder={ t( 'NAGAD MODE' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NAGAD_MODE && <div  className="text-red-500 text-sm mt-1">{errors.NAGAD_MODE}</div>} */ }
                </div>
                {/* NAGAD MERCHANT ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NAGAD_MERCHANT_ID">{ t( 'NAGAD MERCHANT ID' ) }</label>
                    <input onChange={ e => setData( 'NAGAD_MERCHANT_ID', e.target.value ) } value={ data.NAGAD_MERCHANT_ID } name='NAGAD_MERCHANT_ID' id='NAGAD_MERCHANT_ID' type="text" placeholder={ t( 'NAGAD MERCHANT ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NAGAD_MERCHANT_ID && <div  className="text-red-500 text-sm mt-1">{errors.NAGAD_MERCHANT_ID}</div>} */ }
                </div>
                {/* NAGAD MERCHANT NUMBER */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NAGAD_MERCHANT_NUMBER">{ t( 'NAGAD MERCHANT NUMBER' ) }</label>
                    <input onChange={ e => setData( 'NAGAD_MERCHANT_NUMBER', e.target.value ) } value={ data.NAGAD_MERCHANT_NUMBER } name='NAGAD_MERCHANT_NUMBER' id='NAGAD_MERCHANT_NUMBER' type="text" placeholder={ t( 'NAGAD MERCHANT NUMBER' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NAGAD_MERCHANT_NUMBER && <div  className="text-red-500 text-sm mt-1">{errors.NAGAD_MERCHANT_NUMBER}</div>} */ }
                </div>
                {/* NAGAD PG PUBLIC KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NAGAD_PG_PUBLIC_KEY">{ t( 'NAGAD PG PUBLIC KEY' ) }</label>
                    <input onChange={ e => setData( 'NAGAD_PG_PUBLIC_KEY', e.target.value ) } value={ data.NAGAD_PG_PUBLIC_KEY } name='NAGAD_PG_PUBLIC_KEY' id='NAGAD_PG_PUBLIC_KEY' type="text" placeholder={ t( 'NAGAD PG PUBLIC KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NAGAD_PG_PUBLIC_KEY && <div  className="text-red-500 text-sm mt-1">{errors.NAGAD_PG_PUBLIC_KEY}</div>} */ }
                </div>
                {/* NAGAD MERCHANT PRIVATE KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NAGAD_MERCHANT_PRIVATE_KEY">{ t( 'NAGAD MERCHANT PRIVATE KEY' ) }</label>
                    <input onChange={ e => setData( 'NAGAD_MERCHANT_PRIVATE_KEY', e.target.value ) } value={ data.NAGAD_MERCHANT_PRIVATE_KEY } name='NAGAD_MERCHANT_PRIVATE_KEY' id='NAGAD_MERCHANT_PRIVATE_KEY' type="text" placeholder={ t( 'NAGAD MERCHANT PRIVATE KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.NAGAD_MERCHANT_PRIVATE_KEY && <div  className="text-red-500 text-sm mt-1">{errors.NAGAD_MERCHANT_PRIVATE_KEY}</div>} */ }
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
