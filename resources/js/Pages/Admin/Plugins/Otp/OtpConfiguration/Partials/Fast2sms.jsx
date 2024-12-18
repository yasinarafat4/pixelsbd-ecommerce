import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Fast2sms() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Fast2sms</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-3">
                    {/* AUTH KEY */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="AUTH_KEY">{t('AUTH KEY')}</label>
                        <input name='AUTH_KEY' id='AUTH_KEY' type="text" placeholder={t('AUTH KEY')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* ENTITY ID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ENTITY_ID">{t('ENTITY ID')}</label>
                        <input name='ENTITY_ID' id='ENTITY_ID' type="text" placeholder={t('ENTITY ID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* ROUTE */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ROUTE">{t('ROUTE')}</label>
                        <select defaultValue={'Transactional Use'}  className="select select-borderedp-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm">
                            <option>DLT Manual</option>
                            <option>Promotional Use</option>
                            <option>Transactional Use</option>
                        </select>
                    </div>
                    {/* Language */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="language">{t('Language')}</label>
                        <select defaultValue={'English'}  className="select select-borderedp-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm">
                            <option>English</option>
                            <option>Promotional Use</option>
                        </select>
                    </div>
                    {/* SENDER ID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="SENDER_ID">{t('SENDER ID')}</label>
                        <input name='SENDER_ID' id='SENDER_ID' type="text" placeholder={t('SENDER ID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
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
