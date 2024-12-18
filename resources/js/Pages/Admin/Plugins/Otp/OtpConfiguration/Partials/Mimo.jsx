import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Mimo() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Mimo</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-3">
                    {/* MIMO USERNAME */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MIMO_USERNAME">{t('MIMO USERNAME')}</label>
                        <input name='MIMO_USERNAME' id='MIMO_USERNAME' type="text" placeholder={t('MIMO USERNAME')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* MIMO PASSWORD */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MIMO_PASSWORD">{t('MIMO PASSWORD')}</label>
                        <input name='MIMO_PASSWORD' id='MIMO_PASSWORD' type="text" placeholder={t('MIMO PASSWORD')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                    </div>
                    {/* MIMO SENDER ID */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="MIMO_SENDER_ID">{t('MIMO SENDER ID')}</label>
                        <input name='MIMO_SENDER_ID' id='MIMO_SENDER_ID' type="text" placeholder={t('MIMO SENDER ID')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
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
