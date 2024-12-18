import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Select from "react-select";

export function CustomerWelcomeCoupon() {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        welcome_coupon_code: "",
        welcome_discount: "",
        welcome_amount_percent: "",
        welcome_minimum_shopping: "",
        maximum_discount_amount: "",
        validation_days: "",

    })

    const welcomeAmountData = [
        { value: 'amount', label: 'Amount' },
        { value: 'percent', label: 'Percent' },
    ]

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        // post('/banner', {
        //     onSuccess: () => window.location.href = "/banner",
        // })
    }

    // Onchange handler
    function onWelcomeAmountPercent(e) {
        setData('welcome_amount_percent', e.value)
    }


    return (
        <div>
            <form onSubmit={e=>handleSubmit(e)}>
                <div  className="py-4 space-y-2">
                    <h2  className="text-lg font-medium text-slate-600">Add Your Customer Welcome Coupon</h2>
                    <hr />
                    {/* Coupon Code & Minimum Shopping */}
                    <div  className='grid grid-cols-2 gap-4'>
                        {/* Coupon Code */}
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="welcome_coupon_code">{t('Coupon Code')}</label>
                            <input onChange={e => setData('welcome_coupon_code', e.target.value)} value={data.welcome_coupon_code} name='welcome_coupon_code' id='welcome_coupon_code' type="text" placeholder={t('Enter Coupon Code')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                            {errors.welcome_coupon_code && <div  className="text-red-500 text-sm mt-1">{errors.welcome_coupon_code}</div>}
                        </div>
                        {/* Minimum Shopping */}
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="welcome_minimum_shopping">{t('Minimum Shopping')}</label>
                            <input onChange={e => setData('welcome_minimum_shopping', e.target.value)} value={data.welcome_minimum_shopping} name='welcome_minimum_shopping' id='welcome_minimum_shopping' type="number" placeholder={t('Enter Minimum Shopping')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                            {errors.welcome_minimum_shopping && <div  className="text-red-500 text-sm mt-1">{errors.welcome_minimum_shopping}</div>}
                        </div>
                    </div>
                    {/* Discount & Amount */}
                    <div>
                        <label  className='label-text text-slate-600 text-sm'>{t('Discount')}</label>
                        <div  className='grid grid-cols-12 gap-4'>
                            {/* Discount */}
                            <div  className="col-span-9">
                                <input onChange={e => setData('welcome_discount', e.target.value)} value={data.welcome_discount} name='welcome_discount' id='welcome_discount' type="number" placeholder={t('Enter Discount')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                                {errors.welcome_discount && <div  className="text-red-500 text-sm mt-1">{errors.welcome_discount}</div>}
                            </div>
                            {/* Amount */}
                            <div  className="col-span-3 flex flex-col">
                                <Select
                                    name="welcome_amount_percent"
                                    placeholder={t('Select Amount/Percent')}
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={e => onWelcomeAmountPercent(e)}
                                    defaultValue={data.welcome_amount_percent}
                                    options={welcomeAmountData}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Validation Days */}
                    <div>
                        <label  className='label-text text-slate-600 text-sm' htmlFor="validation_days">{t('Validation Days')}</label>
                        <div  className="grid grid-cols-12">
                            <div  className="col-span-11">
                                <input onChange={e => setData('validation_days', e.target.value)} value={data.validation_days} name='validation_days' id='validation_days' type="number" placeholder={t('Enter Validation Days')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-l-lg text-sm" />
                            </div>
                            <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[13px] rounded-r-lg text-sm">
                                <p  className="text-center">Days</p>
                            </div>
                        </div>
                        {errors.validation_days && <div  className="text-red-500 text-sm mt-1">{errors.validation_days}</div>}
                    </div>
                </div>
                {/* Save Button */}
                <div  className="flex justify-end">
                    <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Save')}</button>
                </div>
            </form>
        </div>
    );
};

