import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Bkash ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'BKASH_CHECKOUT_APP_KEY', 'BKASH_CHECKOUT_APP_SECRET', 'BKASH_CHECKOUT_USER_NAME', 'BKASH_CHECKOUT_PASSWORD' ],
        BKASH_CHECKOUT_APP_KEY: env_data.BKASH_CHECKOUT_APP_KEY.value,
        BKASH_CHECKOUT_APP_SECRET: env_data.BKASH_CHECKOUT_APP_SECRET.value,
        BKASH_CHECKOUT_USER_NAME: env_data.BKASH_CHECKOUT_USER_NAME.value,
        BKASH_CHECKOUT_PASSWORD: env_data.BKASH_CHECKOUT_PASSWORD.value,
        payment_method: 'bkash',
        bkash_sandbox: business_settings.bkash_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* BKASH CHECKOUT API KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="BKASH_CHECKOUT_APP_KEY">{ t( 'BKASH CHECKOUT API KEY' ) }</label>
                    <input onChange={ e => setData( 'BKASH_CHECKOUT_APP_KEY', e.target.value ) } value={ data.BKASH_CHECKOUT_APP_KEY } name='BKASH_CHECKOUT_APP_KEY' id='BKASH_CHECKOUT_APP_KEY' type="text" placeholder={ t( 'BKASH CHECKOUT API KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.BKASH_CHECKOUT_APP_KEY && <div  className="text-red-500 text-sm mt-1">{errors.BKASH_CHECKOUT_APP_KEY}</div>} */ }
                </div>
                {/* BKASH CHECKOUT APP SECRET */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="BKASH_CHECKOUT_APP_KEY">{ t( 'BKASH CHECKOUT APP SECRET' ) }</label>
                    <input onChange={ e => setData( 'BKASH_CHECKOUT_APP_SECRET', e.target.value ) } value={ data.BKASH_CHECKOUT_APP_SECRET } name='BKASH_CHECKOUT_APP_KEY' id='BKASH_CHECKOUT_APP_KEY' type="text" placeholder={ t( 'BKASH CHECKOUT APP SECRET' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.BKASH_CHECKOUT_APP_KEY && <div  className="text-red-500 text-sm mt-1">{errors.BKASH_CHECKOUT_APP_KEY}</div>} */ }
                </div>
                {/* BKASH CHECKOUT USER NAME */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="BKASH_CHECKOUT_USER_NAME">{ t( 'BKASH CHECKOUT USER NAME' ) }</label>
                    <input onChange={ e => setData( 'BKASH_CHECKOUT_USER_NAME', e.target.value ) } value={ data.BKASH_CHECKOUT_USER_NAME } name='BKASH_CHECKOUT_USER_NAME' id='BKASH_CHECKOUT_USER_NAME' type="text" placeholder={ t( 'BKASH CHECKOUT USER NAME' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.BKASH_CHECKOUT_USER_NAME && <div  className="text-red-500 text-sm mt-1">{errors.BKASH_CHECKOUT_USER_NAME}</div>} */ }
                </div>
                {/* BKASH CHECKOUT PASSWORD */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="BKASH_CHECKOUT_PASSWORD">{ t( 'BKASH CHECKOUT PASSWORD' ) }</label>
                    <input onChange={ e => setData( 'BKASH_CHECKOUT_PASSWORD', e.target.value ) } value={ data.BKASH_CHECKOUT_PASSWORD } name='BKASH_CHECKOUT_PASSWORD' id='BKASH_CHECKOUT_PASSWORD' type="text" placeholder={ t( 'BKASH CHECKOUT PASSWORD' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.BKASH_CHECKOUT_PASSWORD && <div  className="text-red-500 text-sm mt-1">{errors.BKASH_CHECKOUT_PASSWORD}</div>} */ }
                </div>
                {/*bKash Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="bkash_sandbox">{ t( 'bKash Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'bkash_sandbox', e.target.checked ) } checked={ business_settings.bkash_sandbox }  className="toggle toggle-sm toggle-success" />
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
