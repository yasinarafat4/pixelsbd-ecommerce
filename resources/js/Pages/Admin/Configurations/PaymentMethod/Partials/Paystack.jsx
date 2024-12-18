import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Paystack ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'PAYSTACK_PUBLIC_KEY', 'PAYSTACK_SECRET_KEY', 'PAYSTACK_MERCHANT_EMAIL', 'PAYSTACK_CURRENCY_CODE' ],
        PAYSTACK_PUBLIC_KEY: env_data.PAYSTACK_PUBLIC_KEY.value,
        PAYSTACK_SECRET_KEY: env_data.PAYSTACK_SECRET_KEY.value,
        PAYSTACK_MERCHANT_EMAIL: env_data.PAYSTACK_MERCHANT_EMAIL.value,
        PAYSTACK_CURRENCY_CODE: env_data.PAYSTACK_CURRENCY_CODE.value,
        payment_method: 'paystack',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route('admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Paystack PUBLIC KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYSTACK_PUBLIC_KEY">{ t( 'Paystack PUBLIC KEY' ) }</label>
                    <input onChange={ e => setData( 'PAYSTACK_PUBLIC_KEY', e.target.value ) } value={ data.PAYSTACK_PUBLIC_KEY } name='PAYSTACK_PUBLIC_KEY' id='PAYSTACK_PUBLIC_KEY' type="text" placeholder={ t( 'Paystack PUBLIC KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYSTACK_PUBLIC_KEY && <div  className="text-red-500 text-sm mt-1">{errors.PAYSTACK_PUBLIC_KEY}</div>} */ }
                </div>
                {/* Paystack SECRET KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYSTACK_SECRET_KEY">{ t( 'Paystack SECRET KEY' ) }</label>
                    <input onChange={ e => setData( 'PAYSTACK_SECRET_KEY', e.target.value ) } value={ data.PAYSTACK_SECRET_KEY } name='PAYSTACK_SECRET_KEY' id='PAYSTACK_SECRET_KEY' type="text" placeholder={ t( 'Paystack SECRET KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYSTACK_SECRET_KEY && <div  className="text-red-500 text-sm mt-1">{errors.PAYSTACK_SECRET_KEY}</div>} */ }
                </div>
                {/* Paystack MERCHANT EMAIL */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYSTACK_MERCHANT_EMAIL">{ t( 'Paystack MERCHANT EMAIL' ) }</label>
                    <input onChange={ e => setData( 'PAYSTACK_MERCHANT_EMAIL', e.target.value ) } value={ data.PAYSTACK_MERCHANT_EMAIL } name='PAYSTACK_MERCHANT_EMAIL' id='PAYSTACK_MERCHANT_EMAIL' type="text" placeholder={ t( 'Paystack MERCHANT EMAIL' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYSTACK_MERCHANT_EMAIL && <div  className="text-red-500 text-sm mt-1">{errors.PAYSTACK_MERCHANT_EMAIL}</div>} */ }
                </div>
                {/* PAYSTACK CURRENCY CODE */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="PAYSTACK_CURRENCY_CODE">{ t( 'PAYSTACK CURRENCY CODE' ) }</label>
                    <input onChange={ e => setData( 'PAYSTACK_CURRENCY_CODE', e.target.value ) } value={ data.PAYSTACK_CURRENCY_CODE } name='PAYSTACK_CURRENCY_CODE' id='PAYSTACK_CURRENCY_CODE' type="text" placeholder={ t( 'PAYSTACK CURRENCY CODE' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.PAYSTACK_CURRENCY_CODE && <div  className="text-red-500 text-sm mt-1">{errors.PAYSTACK_CURRENCY_CODE}</div>} */ }
                </div>

                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
