import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Msegat() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Msegat</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-3">
                    {/* MSEGAT API KEY */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MSEGAT_API_KEY">{t('MSEGAT API KEY')}</label>
                        <input name='MSEGAT_API_KEY' id='MSEGAT_API_KEY' type="text" placeholder={t('MSEGAT API KEY')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* MSEGAT USERNAME */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MSEGAT_USERNAME">{t('MSEGAT USERNAME')}</label>
                        <input name='MSEGAT_USERNAME' id='MSEGAT_USERNAME' type="text" placeholder={t('MSEGAT USERNAME')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* MSEGAT USER SENDER */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MSEGAT_USER_SENDER">{t('MSEGAT USER SENDER')}</label>
                        <input name='MSEGAT_USER_SENDER' id='MSEGAT_USER_SENDER' type="text" placeholder={t('MSEGAT USER SENDER')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
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
