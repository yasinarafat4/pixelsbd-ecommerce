import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Authorizenet ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'AUTH_MERCHANT_LOGIN_ID', 'AUTH_MERCHANT_TRANSACTION_KEY' ],
        AUTH_MERCHANT_LOGIN_ID: env_data.AUTH_MERCHANT_LOGIN_ID.value,
        AUTH_MERCHANT_TRANSACTION_KEY: env_data.AUTH_MERCHANT_TRANSACTION_KEY.value,
        payment_method: 'authorizenet',
        authorizenet_sandbox: business_settings.authorizenet_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* AUTHORIZENET MERCHANT LOGIN ID */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="AUTH_MERCHANT_LOGIN_ID">{ t( 'AUTH MERCHANT LOGIN ID' ) }</label>
                    <input onChange={ e => setData( 'AUTH_MERCHANT_LOGIN_ID', e.target.value ) } value={ data.AUTH_MERCHANT_LOGIN_ID } name='AUTH_MERCHANT_LOGIN_ID' id='AUTH_MERCHANT_LOGIN_ID' type="text" placeholder={ t( 'AUTH MERCHANT LOGIN ID' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.AUTH_MERCHANT_LOGIN_ID && <div  className="text-red-500 text-sm mt-1">{errors.AUTH_MERCHANT_LOGIN_ID}</div>} */ }
                </div>
                {/* AUTHORIZENET MERCHANT TRANSACTION KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="AUTH_MERCHANT_TRANSACTION_KEY">{ t( 'AUTH MERCHANT TRANSACTION KEY' ) }</label>
                    <input onChange={ e => setData( 'AUTH_MERCHANT_TRANSACTION_KEY', e.target.value ) } value={ data.AUTH_MERCHANT_TRANSACTION_KEY } name='AUTH_MERCHANT_TRANSACTION_KEY' id='AUTH_MERCHANT_TRANSACTION_KEY' type="text" placeholder={ t( 'AUTH MERCHANT TRANSACTION KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.AUTH_MERCHANT_TRANSACTION_KEY && <div  className="text-red-500 text-sm mt-1">{errors.AUTH_MERCHANT_TRANSACTION_KEY}</div>} */ }
                </div>
                {/* Authorizenet Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="authorizenet_sandbox">{ t( 'Auth Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'authorizenet_sandbox', e.target.checked ) } checked={ business_settings.authorizenet_sandbox }  className="toggle toggle-sm toggle-success" />
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
