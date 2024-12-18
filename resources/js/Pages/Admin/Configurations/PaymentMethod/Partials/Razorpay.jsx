
import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Razorpay ()
{
    const { t } = useLaravelReactI18n();
    const { env_data } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        types: [ 'RAZOR_KEY', 'RAZOR_SECRET' ],
        RAZOR_KEY: env_data.RAZOR_KEY.value,
        RAZOR_SECRET: env_data.RAZOR_SECRET.value,
        payment_method: 'razorpay',
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.payment_method_update' ) )
    }

    return (

        <form action="" onSubmit={ handleSubmit }>
            <div  className="px-5 py-4 space-y-3">
                {/* RAZOR KEY */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="RAZOR_KEY">{ t( 'RAZOR KEY' ) }</label>
                    <input onChange={ e => setData( 'RAZOR_KEY', e.target.value ) } value={ data.RAZOR_KEY } name='RAZOR_KEY' id='RAZOR_KEY' type="text" placeholder={ t( 'RAZOR KEY' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.RAZOR_KEY && <div  className="text-red-500 text-sm mt-1">{errors.RAZOR_KEY}</div>} */ }
                </div>
                {/* RAZOR SECRET */ }
                <div  className="flex justify-between">
                    <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="RAZOR_SECRET">{ t( 'RAZOR SECRET' ) }</label>
                    <input onChange={ e => setData( 'RAZOR_SECRET', e.target.value ) } value={ data.RAZOR_SECRET } name='RAZOR_SECRET' id='RAZOR_SECRET' type="text" placeholder={ t( 'RAZOR SECRET' ) }  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    {/* {errors.RAZOR_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.RAZOR_SECRET}</div>} */ }
                </div>
                {/* Save button */ }
                <div  className="flex justify-end">
                    <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{ t( 'Save' ) }</button>
                </div>
            </div>
        </form>
    )

}
