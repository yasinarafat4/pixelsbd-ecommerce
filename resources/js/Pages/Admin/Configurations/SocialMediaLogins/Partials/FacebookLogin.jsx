import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";


export default function FacebookLogin({ env_data }) {
    const { t } = useLaravelReactI18n();
    const { appUrl } = usePage().props;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        types: ['FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET'],
        FACEBOOK_CLIENT_ID: env_data.FACEBOOK_CLIENT_ID.value,
        FACEBOOK_CLIENT_SECRET: env_data.FACEBOOK_CLIENT_SECRET.value,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.configuration.envUpdate'))
    }

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Facebook Login Credential</h2>
                </div>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div  className="px-5 py-4 space-y-3">
                    {/* Redirect Url */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start'>{t('Redirect URL')}</label>
                        <input readOnly value={appUrl + '/auth/facebook/callback'} type="text"  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* Facebook Client ID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="FACEBOOK_CLIENT_ID">{t('Facebook Client ID')}</label>
                        <input onChange={e => setData('FACEBOOK_CLIENT_ID', e.target.value)} value={data.FACEBOOK_CLIENT_ID} name='FACEBOOK_CLIENT_ID' id='FACEBOOK_CLIENT_ID' type="text" placeholder={t('Facebook Client ID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                        {/* {errors.FACEBOOK_CLIENT_ID && <div  className="text-red-500 text-sm mt-1">{errors.FACEBOOK_CLIENT_ID}</div>} */}
                    </div>
                    {/* Facebook Client Secret */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="FACEBOOK_CLIENT_SECRET">{t('Facebook Client Secret')}</label>
                        <input onChange={e => setData('FACEBOOK_CLIENT_SECRET', e.target.value)} value={data.FACEBOOK_CLIENT_SECRET} name='FACEBOOK_CLIENT_SECRET' id='FACEBOOK_CLIENT_SECRET' type="text" placeholder={t('Facebook Client Secret')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                        {/* {errors.FACEBOOK_CLIENT_SECRET && <div  className="text-red-500 text-sm mt-1">{errors.FACEBOOK_CLIENT_SECRET}</div>} */}
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
