import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit() {
    const { t } = useLaravelReactI18n();
    // Edit Currency form
    const { data, setData, post, processing, errors, reset } = useForm({
        tax_type: "",
    })

    // Currency foramte submit handler
    function handleSubmit(e) {
        e.preventDefault()
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
                                <a href={route('admin.configuration.tax.index')}  className="inline-flex gap-1 items-center">
                                    <LiaFileInvoiceDollarSolid  className="text-base" />
                                    <span>{t('Vat & Tax')}</span>
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


                {/* Add New Tax */}
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-start border-b py-3 px-4">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Edit Tax')}</h2>
                        </div>
                    </div>

                    <form onSubmit={e=>handleSubmit(e)}  className="space-y-3 py-4 px-4">
                        {/* tax Type */}
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="tax_type">{t('Tax Type')}</label>
                            <input onChange={e => setData('tax_type', e.target.value)} value={data.tax_type} name='tax_type' id='tax_type' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            {errors.tax_type && <div  className="text-red-500 text-sm mt-1">{errors.tax_type}</div>}
                        </div>
                        <div  className="flex justify-end">
                            <button type="submit"  className="bg-[#008fe1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Update')}</button>
                        </div>
                    </form>

                </div>

            </div>
        </AdminLayout>
    )

}
