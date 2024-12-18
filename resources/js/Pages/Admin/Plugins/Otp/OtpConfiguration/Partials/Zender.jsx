import { useLaravelReactI18n } from "laravel-react-i18n";


export default function Zender() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 '>
            <div  className="border-b py-3 px-5 flex items-center justify-between">
                <div  className="flex items-center gap-2">
                    <h2  className="text-[16px] font-medium">Zender</h2>
                </div>
                <div>
                    <input type="checkbox"
                        // onChange={(e) => updatePaymentSettings(payment_method.id, e.target.checked)} checked={payment_method.status}
                         className="toggle toggle-sm toggle-success" />
                </div>
            </div>
            <form action="">
                <div  className="px-5 py-4 space-y-5">
                    {/* ZENDER SITEURL */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_SITEURL">{t('ZENDER SITEURL')}</label>
                        <div  className="w-8/12">
                            <input name='ZENDER_SITEURL' id='ZENDER_SITEURL' type="text" placeholder={t('ZENDER SITEURL')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p  className="text-xs mt-1">The site url of your Zender. Do not add ending slash.</p>
                        </div>
                    </div>
                    {/* ZENDER APIKEY */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_APIKEY">{t('ZENDER APIKEY')}</label>
                        <div  className="w-8/12">
                            <input name='ZENDER_APIKEY' id='ZENDER_APIKEY' type="text" placeholder={t('ZENDER APIKEY')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p  className="text-xs mt-1">Your Zender API key. Please make sure that it is correct and required permissions are granted: sms_send, wa_send</p>
                        </div>
                    </div>
                    {/* ZENDER SERVICE */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_SERVICE">{t('ZENDER SERVICE')}</label>
                        <div  className="w-8/12">
                            <select defaultValue={'SMS'}  className="select select-borderedp-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm">
                                <option>SMS</option>
                                <option>WhatsApp</option>
                            </select>
                            <p  className="text-xs mt-1">Select the sending service. Please make sure that the API key has the following permissions: sms_send, wa_send</p></div>
                    </div>
                    {/* ZENDER WHATSAPP */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_WHATSAPP">{t('ZENDER WHATSAPP')}</label>
                        <div  className="w-8/12">
                            <input name='ZENDER_WHATSAPP' id='ZENDER_WHATSAPP' type="text" placeholder={t('ZENDER WHATSAPP')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p  className="text-xs mt-1">For WhatsApp service only. WhatsApp account ID you want to use for sending.</p>
                        </div>
                    </div>
                    {/* ZENDER DEVICE */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_DEVICE">{t('ZENDER DEVICE')}</label>
                        <div  className="w-8/12">
                            <input name='ZENDER_DEVICE' id='ZENDER_DEVICE' type="text" placeholder={t('ZENDER DEVICE')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p  className="text-xs mt-1">For SMS service only. Linked device unique ID. Please only enter this field if you are sending using one of your devices.</p>
                        </div>
                    </div>
                    {/* ZENDER GATEWAY */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_GATEWAY">{t('ZENDER GATEWAY')}</label>
                        <div  className="w-8/12">
                            <input name='ZENDER_GATEWAY' id='ZENDER_GATEWAY' type="text" placeholder={t('ZENDER GATEWAY')}  className="p-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            <p  className="text-xs mt-1">For SMS service only. Partner device unique ID or gateway ID. Please only enter this field if you are sending using a partner device or third party gateway.</p>
                        </div>
                    </div>
                    {/* ZENDER SIM */}
                    <div  className="flex justify-between">
                        <label  className='label-text uppercase text-slate-600 text-[13px] text-start' htmlFor="ZENDER_SIM">{t('ZENDER SIM')}</label>
                        <div  className="w-8/12">
                            <select defaultValue={'SIM 1'}  className="select select-borderedp-[10px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm">
                                <option>SIM 1</option>
                                <option>SIM 2</option>
                            </select>
                            <p  className="text-xs mt-1">For SMS service only. Select the sim slot you want to use for sending the messages. Please only enter this field if you are sending using your device. This is ignored for partner devices and third party gateways.</p></div>
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
