import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Twillo() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Twillo</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-3">
                    {/* TWILIO SID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="TWILIO_SID">{t('TWILIO SID')}</label>
                        <input name='TWILIO_SID' id='TWILIO_SID' type="text" placeholder={t('TWILIO SID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* TWILIO AUTH TOKEN */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="TWILIO_AUTH_TOKEN">{t('TWILIO AUTH TOKEN')}</label>
                        <input name='TWILIO_AUTH_TOKEN' id='TWILIO_AUTH_TOKEN' type="text" placeholder={t('TWILIO AUTH TOKEN')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* VALID TWILIO NUMBER */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="VALID_TWILIO_NUMBER">{t('VALID TWILIO NUMBER')}</label>
                        <input name='VALID_TWILIO_NUMBER' id='VALID_TWILIO_NUMBER' type="text" placeholder={t('VALID TWILIO NUMBER')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* TWILIO TYPE */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="TWILIO_TYPE">{t('TWILIO TYPE')}</label>
                        <select defaultValue={'SMS'}  className="select select-borderedp-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm">
                            <option>SMS</option>
                            <option>WhatsApp</option>
                        </select>
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
