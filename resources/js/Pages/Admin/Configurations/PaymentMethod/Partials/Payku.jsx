import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Payku ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'PAYKU_BASE_URL', 'PAYKU_PUBLIC_TOKEN', 'PAYKU_PRIVATE_TOKEN' ],
        PAYKU_BASE_URL: env_data.PAYKU_BASE_URL.value,
        PAYKU_PUBLIC_TOKEN: env_data.PAYKU_PUBLIC_TOKEN.value,
        PAYKU_PRIVATE_TOKEN: env_data.PAYKU_PRIVATE_TOKEN.value,
        payment_method: 'payku',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* PAYKU BASE URL */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYKU_BASE_URL">{ t( 'PAYKU BASE URL' ) }</label>
                    <input onChange={ e => setData( 'PAYKU_BASE_URL', e.target.value ) } value={ data.PAYKU_BASE_URL } name='PAYKU_BASE_URL' id='PAYKU_BASE_URL' type="text" placeholder={ t( 'PAYKU BASE URL' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYKU_BASE_URL && <div  className="text-red-500 text-sm mt-1">{errors.PAYKU_BASE_URL}</div>} */ }
                </div>

                {/* PAYKU PUBLIC TOKEN */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYKU_PUBLIC_TOKEN">{ t( 'PAYKU PUBLIC TOKEN' ) }</label>
                    <input onChange={ e => setData( 'PAYKU_PUBLIC_TOKEN', e.target.value ) } value={ data.PAYKU_PUBLIC_TOKEN } name='PAYKU_PUBLIC_TOKEN' id='PAYKU_PUBLIC_TOKEN' type="text" placeholder={ t( 'PAYKU PUBLIC TOKEN' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYKU_PUBLIC_TOKEN && <div  className="text-red-500 text-sm mt-1">{errors.PAYKU_PUBLIC_TOKEN}</div>} */ }
                </div>
                {/* PAYKU PRIVATE TOKEN */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYKU_PRIVATE_TOKEN">{ t( 'PAYKU PRIVATE TOKEN' ) }</label>
                    <input onChange={ e => setData( 'PAYKU_PRIVATE_TOKEN', e.target.value ) } value={ data.PAYKU_PRIVATE_TOKEN } name='PAYKU_PRIVATE_TOKEN' id='PAYKU_PRIVATE_TOKEN' type="text" placeholder={ t( 'PAYKU PRIVATE TOKEN' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYKU_PRIVATE_TOKEN && <div  className="text-red-500 text-sm mt-1">{errors.PAYKU_PRIVATE_TOKEN}</div>} */ }
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
