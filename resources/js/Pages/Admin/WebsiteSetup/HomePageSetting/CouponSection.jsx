
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";

export default function CouponSection() {
    const { t } = useLaravelReactI18n();
    const [primaryColor, setPrimaryColor] = useState()

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 flex flex-col">
                    <label className='label-text text-[14px] text-start normal-case' htmlFor="primary_color">{t('Background Color')}</label>
                    <MuiColorInput size="small" format="hex" isAlphaHidden value={primaryColor} onChange={e => setPrimaryColor(e)} placeholder={t('Enter Hex Color Code')} />
                </div>
                <div className="col-span-8 flex flex-col">
                    <label className='label-text text-[14px] text-start normal-case' htmlFor="title">{t('Title')}</label>
                    <input
                        // onChange={e => setMetaTitle(e.target.value)}
                        name='title' id='title' type="text" defaultValue={"Save Upto 50% with our Coupons"}
                        placeholder={t('Enter Title')} className="p-[14px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-md text-sm" />
                </div>
            </div>
            <div className="flex flex-col">
                <label className='label-text text-[14px] text-start normal-case' htmlFor="sub_title">{t('Subtitle')}</label>
                <input
                    // onChange={e => setMetaTitle(e.target.value)}
                    name='sub_title' id='sub_title' type="text" defaultValue={"Get huge discount in products or save money by using coupons while checkout"}
                    placeholder={t('Enter Subtitle')} className="p-[14px] focus:outline-none  border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-md text-sm" />
            </div>
            {/* Button */}
            <div className="flex justify-end my-4">
                <button className="bg-[#008FE1] duration-300 py-2 px-20 rounded-md text-white text-md">{t('Save')}</button>
            </div>
        </div>
    )

}
