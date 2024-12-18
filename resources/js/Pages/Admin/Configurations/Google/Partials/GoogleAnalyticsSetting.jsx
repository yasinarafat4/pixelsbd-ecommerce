import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function GoogleAnalyticsSetting ()
{
    const { t } = useLaravelReactI18n();

    // Chat settings form
    const { data, setData, post, processing, errors, reset } = useForm( {
        google_analytics: "",
        ANALYTICS_TRACKING_ID: import.meta.env.VITE_ANALYTICS_TRACKING_ID,
    } )

    // Chat submit handler
    function handleGoogleAnalyticsSettingSubmit ( e )
    {
        e.preventDefault()
    }

    return (
        <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
            {/* Left side */ }
            <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-5'>
                <div  className="border-b pb-4 px-6">
                    <h2  className="text-[16px] font-medium">{ t( 'Google Analytics Setting' ) }</h2>
                </div>
                <form onSubmit={ handleGoogleAnalyticsSettingSubmit }>
                    <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                        {/* Google Analytics */ }
                        <div  className="grid grid-cols-12">
                            <label  className='col-span-3 label-text text-[13px] text-start text-slate-600' htmlFor="google_analytics">{ t( 'Google Analytics' ) }</label>
                            <div  className="col-span-9 ">
                                <input type="checkbox"  className="toggle toggle-sm toggle-success" />
                            </div>
                        </div>
                        {/* Tracking ID */ }
                        <div  className="flex justify-between">
                            <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="ANALYTICS_TRACKING_ID">{ t( 'Tracking ID' ) }</label>
                            <input onChange={ e => setData( 'ANALYTICS_TRACKING_ID', e.target.value ) } value={ data.ANALYTICS_TRACKING_ID } name='ANALYTICS_TRACKING_ID' id='ANALYTICS_TRACKING_ID' type="text" placeholder={ t( 'Tracking ID' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                            { errors.ANALYTICS_TRACKING_ID && <div  className="text-red-500 text-sm mt-1">{ errors.ANALYTICS_TRACKING_ID }</div> }
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
                    <h2  className="text-[16px] font-medium">{ t( 'Google Analytics Configuration Notes' ) }</h2>
                </div>
                <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                    <div>
                        <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1.  Sign up for Google Analyticsand open Google Analytics.</li>
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200">2. Click the &apos;Admin&apos; tab.</li>
                            <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">3. In the left-hand column, click Tracking Info where you will get &apos;Tracking Code&apos;.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )

}
