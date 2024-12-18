import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Nexmo() {
    const { t } = useLaravelReactI18n();

    return (
        <div className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div className="border-b py-3 px-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-medium">Nexmo</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                        className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div className="px-5 py-4 space-y-3">
                    {/* NEXMO KEY */}
                    <div className="flex justify-between">
                        <label className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NEXMO_KEY">{t('NEXMO KEY')}</label>
                        <input name='NEXMO_KEY' id='NEXMO_KEY' type="text" placeholder={t('NEXMO KEY')} className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* NEXMO SECRET */}
                    <div className="flex justify-between">
                        <label className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NEXMO_SECRET">{t('NEXMO SECRET')}</label>
                        <input name='NEXMO_SECRET' id='NEXMO_SECRET' type="text" placeholder={t('NEXMO SECRET')} className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* NEXMO SENDER ID */}
                    <div className="flex justify-between">
                        <label className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="NEXMO_SENDER_ID">{t('NEXMO SENDER ID')}</label>
                        <div className="w-8/12">
                            <input name='NEXMO_SENDER_ID' id='NEXMO_SENDER_ID' type="text" placeholder={t('NEXMO SENDER ID')} className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p className="text-xs mt-1">Please check this URL for <a className="text-sky-500 hover:text-sky-600" target="_blank" rel="noreferrer" href="https://developer.vonage.com/en/messaging/sms/guides/custom-sender-id?source=messaging">Sender Identity</a> before setting the sender ID</p>
                        </div>
                    </div>
                    {/* Save button */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#009EF7] duration-300 py-[7px] px-[13px] rounded text-white text-[14px]">{t('Save')}</button>
                    </div>
                </div>
            </form>
        </div>


    )

}
