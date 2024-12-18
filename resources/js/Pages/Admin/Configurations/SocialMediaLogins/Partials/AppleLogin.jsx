import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function AppleLogin({ env_data }) {
    const { t } = useLaravelReactI18n();
    const { appUrl } = usePage().props;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        types: ['APPLE_CLIENT_ID', 'APPLE_CLIENT_SECRET'],
        APPLE_CLIENT_ID: env_data.APPLE_CLIENT_ID.value,
        APPLE_CLIENT_SECRET: env_data.APPLE_CLIENT_SECRET.value,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.configuration.envUpdate'))
    }

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Apple Login Credential</h2>
                </div>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div  className="px-5 py-4 space-y-3">
                    {/* Redirect Url */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start'>{t('Redirect URL')}</label>
                        <input readOnly value={appUrl + '/auth/apple/callback'} type="text"  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* Apple Client ID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="APPLE_CLIENT_ID">{t('Apple Client ID')}</label>
                        <input onChange={e => setData('APPLE_CLIENT_ID', e.target.value)} value={data.APPLE_CLIENT_ID} name='APPLE_CLIENT_ID' id='APPLE_CLIENT_ID' type="text" placeholder={t('Apple Client ID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                        {/* {errors.SIGN_IN_WITH_APPLE_CLIENT_ID && <div  className="text-red-500 text-sm mt-1">{errors.SIGN_IN_WITH_APPLE_CLIENT_ID}</div>} */}
                    </div>
                    {/* Apple Client Secret */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="APPLE_CLIENT_SECRET">{t('Apple Client Secret')}</label>
                        <input onChange={e => setData('APPLE_CLIENT_SECRET', e.target.value)} value={data.APPLE_CLIENT_SECRET} name='APPLE_CLIENT_SECRET' id='APPLE_CLIENT_SECRET' type="text" placeholder={t('Apple Client Secret')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                        {/* {errors.SIGN_IN_WITH_APPLE_CLIENT_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.SIGN_IN_WITH_APPLE_CLIENT_SECRET}</div>} */}
                    </div>
                    {/* Save button */}
                    <div  className="flex justify-end">
                        <button type="submit"  className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{t('Save')}</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
