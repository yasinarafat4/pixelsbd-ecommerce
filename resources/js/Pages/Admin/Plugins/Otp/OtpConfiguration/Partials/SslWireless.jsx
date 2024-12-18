import { useLaravelReactI18n } from "laravel-react-i18n";


export default function SslWireless() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Ssl Wireless</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-3">
                    {/* SSL SMS API TOKEN */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SSL_SMS_API_TOKEN">{t('SSL SMS API TOKEN')}</label>
                        <input name='SSL_SMS_API_TOKEN' id='SSL_SMS_API_TOKEN' type="text" placeholder={t('SSL SMS API TOKEN')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* SSL SMS SID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SSL_SMS_SID">{t('SSL SMS SID')}</label>
                        <input name='SSL_SMS_SID' id='SSL_SMS_SID' type="text" placeholder={t('SSL SMS SID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* SSL SMS URL */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SSL_SMS_URL">{t('SSL SMS URL')}</label>
                        <input name='SSL_SMS_URL' id='SSL_SMS_URL' type="text" placeholder={t('SSL SMS URL')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
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
