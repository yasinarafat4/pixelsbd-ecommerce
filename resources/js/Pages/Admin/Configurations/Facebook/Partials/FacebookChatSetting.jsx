import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function FacebookChatSetting ()
{
    const { t } = useLaravelReactI18n();

    // Chat settings form
    const { data, setData, post, processing, errors, reset } = useForm( {
        facebook_chat: "",
        FACEBOOK_PAGE_ID: import.meta.env.VITE_FACEBOOK_PAGE_ID,
    } )

    // Chat submit handler
    function handleFacebookChatSettingSubmit ( e )
    {
        e.preventDefault()
    }

    return (
        <div  className="shadow-lg p-6 grid grid-cols-2 gap-5 rounded-lg">
            {/* Left side */ }
            <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-5 h-60'>
                <div  className="border-b pb-4 px-6">
                    <h2  className="text-[16px] font-medium">{ t( 'Facebook Chat Setting' ) }</h2>
                </div>
                <form onSubmit={ handleFacebookChatSettingSubmit }>
                    <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                        {/* Facebook Chat */ }
                        <div  className="grid grid-cols-12">
                            <label  className='col-span-3 label-text text-[13px] text-start text-slate-600' htmlFor="facebook_chat">{ t( 'Facebook Chat' ) }</label>
                            <div  className="col-span-9 ">
                                <input type="checkbox"  className="toggle toggle-sm toggle-success" />
                            </div>
                        </div>
                        {/* Facebook Page ID */ }
                        <div  className="flex justify-between">
                            <label  className='label-text text-[12px] text-start text-slate-600' htmlFor="FACEBOOK_PAGE_ID">{ t( 'Facebook Page ID' ) }</label>
                            <input onChange={ e => setData( 'FACEBOOK_PAGE_ID', e.target.value ) } value={ data.FACEBOOK_PAGE_ID } name='FACEBOOK_PAGE_ID' id='FACEBOOK_PAGE_ID' type="text" placeholder={ t( 'Facebook Page ID' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-9/12 rounded-lg text-sm" />
                            { errors.FACEBOOK_PAGE_ID && <div  className="text-red-500 text-sm mt-1">{ errors.FACEBOOK_PAGE_ID }</div> }
                        </div>

                    </div>
                    <div  className="flex justify-end mx-5">
                        <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                    </div>
                </form>
            </div>
            <div  className="space-y-5">
                {/* Right side */ }
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="border-b pb-4 px-5">
                        <h2  className="text-[16px] font-medium">{ t( 'Please be carefull when you are configuring Facebook chat. For incorrect configuration you will not get messenger icon on your user-end site.' ) }</h2>
                    </div>
                    <div  className='grid grid-cols-1 items-center gap-4 px-5 py-3'>
                        <div>
                            <ul  className="border-t-[1px] border-l-[1px] border-slate-200 rounded">
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-t">1. Login into your facebook page</li>
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">2. Find the About option of your facebook page.</li>
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">3. At the very bottom, you can find the &quot;Facebook Page ID&quot;.</li>
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">4. Go to Settings of your page and find the option of &quot;Advance Messaging&quot;.</li>
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">5. Scroll down that page and you will get &quot;white listed domain&quot;</li>
                                <li  className="text-[13px] px-4 py-2 border-b-[1px] border-r-[1px] border-slate-200 rounded-b">6. Set your website domain name.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
