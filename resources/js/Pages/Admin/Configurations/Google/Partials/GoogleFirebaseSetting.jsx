import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function GoogleFirebaseSetting ()
{
    const { t } = useLaravelReactI18n();

    // Chat settings form
    const { data, setData, post, processing, errors, reset } = useForm( {
        google_firebase: "",
        FCM_SERVER_KEY: import.meta.env.VITE_FCM_SERVER_KEY,
    } )

    // Chat submit handler
    function handleGoogleFirebaseSettingSubmit ( e )
    {
        e.preventDefault()
    }

    return (
        <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
            {/* Left side */ }
            <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-5'>
                <div  className="border-b pb-4 px-6">
                    <h2  className="text-[16px] font-medium">{ t( 'Google Firebase Setting' ) }</h2>
                </div>
                <form onSubmit={ handleGoogleFirebaseSettingSubmit }>

                    <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                        {/* Google Firebase */ }
                        <div  className="grid grid-cols-12">
                            <label  className='col-span-3 label-text text-[13px] text-start text-slate-600' htmlFor="google_firebase">{ t( 'Google Firebase' ) }</label>
                            <div  className="col-span-9 ">
                                <input type="checkbox"  className="toggle toggle-sm toggle-success" />
                            </div>
                        </div>
                        {/* FCM Server Key */ }
                        <div  className="flex justify-between">
                            <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="FCM_SERVER_KEY">{ t( 'FCM Server Key' ) }</label>
                            <input onChange={ e => setData( 'FCM_SERVER_KEY', e.target.value ) } value={ data.FCM_SERVER_KEY } name='FCM_SERVER_KEY' id='FCM_SERVER_KEY' type="text" placeholder={ t( 'FCM Server Key' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                            { errors.FCM_SERVER_KEY && <div  className="text-red-500 text-sm mt-1">{ errors.FCM_SERVER_KEY }</div> }
                        </div>

                    </div>
                    <div  className="flex justify-end mx-5">
                        <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                    </div>
                </form>
            </div>
            {/* Right side */ }
            <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                <div  className="border-b pb-4 px-5">
                    <h2  className="text-[16px] font-medium">{ t( 'Google Firebase Configuration Notes' ) }</h2>
                </div>
                <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                    <div>
                        <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. TODO.</li>
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">2. TODO.</li>
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">3. TODO.</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    )

}
