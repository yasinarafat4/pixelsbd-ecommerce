import SellerLayout from "@/Layouts/SellerLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdSpaceDashboard } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

export default function SellerVerification() {

    const { business_settings } = usePage().props
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({})

    function handleSubmit(e) {
        e.preventDefault()
        post(route('seller.seller_verification_submit'))
    }


    // Text Input change
    function onTextInputChange(e) {
        setData(e.target.name, e.target.value)
    }

    // File Input change
    function onFileInputChange(e) {
        setData(e.target.name, e.target.files[0]);
    }
    // Radio Input change
    function onRadioInputChange(e) {
        setData(e.target.name, e.target.value);
    }
    // Select Input change
    function onSelectInputChange(e) {
        setData(e.target.name, e.target.value);
    }

    return (
        <SellerLayout>
            <Head title={"Shop Setting"} />
            <div className='p-4'>

                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={route('seller.dashboard')} className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </a>
                        </li>
                        <li>
                            <span className="inline-flex gap-1 items-center">
                                <RiCoupon2Line className="text-base text-slate-900" />
                                <span>{t('Seller Verification')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Shop Settings */}
                <div className="space-y-4">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='card  z-10 rounded-lg bg-white border-[1px] w-9/12 mx-auto'>
                            <div className="border-b px-8 py-4">
                                <h2 className="text-[16px] font-semibold">{t('Seller Verification Form')}</h2>
                            </div>
                            <div className='grid grid-cols-1 items-center gap-4 px-8 py-6'>

                                {business_settings.verification_form?.map((input, i) => {
                                    return input.type == "Text" ?
                                        <div key={i} className="flex justify-between">
                                            <label className='label-text text-[14px] text-start text-slate-600'>{input.label} <span className="text-red-600 text-base">*</span></label>
                                            <input name={'element_' + i} onChange={e => onTextInputChange(e)} type={input.type} placeholder={input.label} className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                                        </div> :
                                        input.type == "File" ?
                                            <div key={i} className="flex justify-between">
                                                <label className='label-text text-[14px] text-start text-slate-600'>{input.label} <span className="text-red-600 text-base">*</span></label>
                                                <input required name={'element_' + i} onChange={e => onFileInputChange(e)} type={input.type} placeholder={input.label} className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                                            </div>
                                            :
                                            input.type == "Radio"
                                                ?
                                                <div className="flex">
                                                    <label className='label-text text-[14px] text-start text-slate-600'>{input.label} <span className="text-red-600 text-base">*</span></label>
                                                    <div className="ms-[105px]">
                                                        {
                                                            input.options.map((option, index) => (
                                                                <div className="flex items-center gap-1" key={index}>
                                                                    <input onChange={e => onRadioInputChange(e)} name={'element_' + i} type="radio" value={option.value} />
                                                                    <label htmlFor="css">{option.value}</label>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <div className="flex justify-between">
                                                    <label className='label-text text-[14px] text-start text-slate-600'>{input.label} <span className="text-red-600 text-base">*</span></label>
                                                    <select onChange={e => onSelectInputChange(e)} name={'element_' + i} className="select select-bordered select-md w-10/12">
                                                        <option disabled selected>Select</option>
                                                        {input.options.map((option, i) => (
                                                            <option key={i} className="text-base">{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                })}
                                {/* Button */}
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Save')}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </SellerLayout >
    )

}
