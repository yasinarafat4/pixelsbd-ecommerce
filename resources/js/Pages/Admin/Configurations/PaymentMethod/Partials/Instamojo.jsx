import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Instamojo ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings, env_data } = usePage().props

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'IM_API_KEY', 'IM_AUTH_TOKEN' ],
        IM_API_KEY: env_data.IM_API_KEY.value,
        IM_AUTH_TOKEN: env_data.IM_AUTH_TOKEN.value,
        payment_method: 'instamojo',
        instamojo_sandbox: business_settings.instamojo_sandbox
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (
        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* API KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="IM_API_KEY">{ t( 'IM API KEY' ) }</label>
                    <input onChange={ e => setData( 'IM_API_KEY', e.target.value ) } value={ data.IM_API_KEY } name='IM_API_KEY' id='IM_API_KEY' type="text" placeholder={ t( 'IM API KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.IM_API_KEY && <div  className="text-red-500 text-sm mt-1">{errors.IM_API_KEY}</div>} */ }
                </div>
                {/* AUTH TOKEN */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="IM_AUTH_TOKEN">{ t( 'IM AUTH TOKEN' ) }</label>
                    <input onChange={ e => setData( 'IM_AUTH_TOKEN', e.target.value ) } value={ data.IM_AUTH_TOKEN } name='IM_AUTH_TOKEN' id='IM_AUTH_TOKEN' type="text" placeholder={ t( 'IM AUTH TOKEN' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.IM_AUTH_TOKEN && <div  className="text-red-500 text-sm mt-1">{errors.IM_AUTH_TOKEN}</div>} */ }
                </div>
                {/* Instamojo Sandbox Mode */ }
                <div  className="grid grid-cols-12">
                    <label  className='col-span-4 label-text text-slate-600 uppercase text-[13px] text-start' htmlFor="instamojo_sandbox">{ t( 'Instamojo Sandbox Mode' ) }</label>
                    <div  className="col-span-8 ">
                        <input type="checkbox" onChange={ ( e ) => setData( 'instamojo_sandbox', e.target.checked ) } checked={ business_settings.instamojo_sandbox }  className="toggle toggle-sm toggle-success" />
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
