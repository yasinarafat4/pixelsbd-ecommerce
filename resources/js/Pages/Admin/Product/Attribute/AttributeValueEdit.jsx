import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit({ attributeValue }) {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        attribute_id : attributeValue.attribute_id,
        value: attributeValue.value,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(route('admin.product.attribute_value_update', attributeValue.id))
    }

    return (
        <AdminLayout>
            <Head title={"Edit"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.product.attribute_value', attributeValue.attribute_id)}  className="inline-flex gap-1 items-center">
                                    <FaHandHoldingUsd  className="text-base" />
                                    <span>{t('Attribute Value')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className='text-sm' />
                                    <span>{t('Edit')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Update Attribute Value')}</h2>
                        </div>
                    </div>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/*Attribute Value */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="value">{t('Attribute Value')} *</label>
                                <input onChange={e => setData('value', e.target.value)} value={data.value} name='value' id='value' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.value && <div  className="text-red-500 text-sm mt-1">{errors.value}</div>}
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
