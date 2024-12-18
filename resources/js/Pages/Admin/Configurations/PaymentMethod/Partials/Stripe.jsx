import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Stripe ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'STRIPE_KEY', 'STRIPE_SECRET' ],
        STRIPE_KEY: env_data.STRIPE_KEY.value,
        STRIPE_SECRET: env_data.STRIPE_SECRET.value,
        payment_method: 'stripe',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* Stripe Key */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="STRIPE_KEY">{ t( 'Stripe Key' ) }</label>
                    <input onChange={ e => setData( 'STRIPE_KEY', e.target.value ) } value={ data.STRIPE_KEY } name='STRIPE_KEY' id='STRIPE_KEY' type="text" placeholder={ t( 'Stripe Key' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.STRIPE_KEY && <div  className="text-red-500 text-sm mt-1">{errors.STRIPE_KEY}</div>} */ }
                </div>
                {/* Stripe Secret */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="STRIPE_SECRET">{ t( 'Stripe Secret' ) }</label>
                    <input onChange={ e => setData( 'STRIPE_SECRET', e.target.value ) } value={ data.STRIPE_SECRET } name='STRIPE_SECRET' id='STRIPE_SECRET' type="text" placeholder={ t( 'Stripe Secret' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.STRIPE_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.STRIPE_SECRET}</div>} */ }
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
