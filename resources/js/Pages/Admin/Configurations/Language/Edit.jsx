import { language_code } from "@/Array";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft, MdLanguage } from "react-icons/md";
import Select from "react-select";

export default function Edit({ language }) {
    const { t } = useLaravelReactI18n();
    const [selectedCode, setSelectedCode] = useState([]);

    useEffect(() => {
        let selectedcode = [];
        let codefind = language_code.find((item) => item.code == language.code)
        selectedcode.push({ value: codefind.code, label: codefind.name + ' ( ' + codefind.code + ' ) ' })
        setSelectedCode(selectedcode[0])
    }, []);


    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        name: language.name,
        rtl: language.rtl,
        code: language.code,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(route('admin.configuration.language.update', language))
    }


    // Direction and code handler
    // function onDirectionChange(e) {
    //     setSelectedDirection(e)
    //     setData('direction', e.value)
    // }

    function onCodeChange(e) {
        let selected = [];
        let selectedfind = language_code.find(item => item.code == e.value);
        selected.push({ value: selectedfind.code, label: selectedfind.name + ' ( ' + selectedfind.code + ' ) ' })
        setData(data => ({ ...data, code: e.value }));
        setData(data => ({ ...data, rtl: selected.rtl }));
        setSelectedCode(selected);
    }

    return (
        <AdminLayout>
            <Head title={"Edit"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.configuration.language.index')} className="inline-flex gap-1 items-center">
                                    <MdLanguage className="text-base" />
                                    <span>{t('Language')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <BiSolidEdit className='text-sm' />
                                    <span>{t('Edit')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link onClick={e => window.history.back()}>
                            <button className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div className='card rounded-lg shadow bg-white border-[1px] border-slate-300 py-5 max-w-2xl mx-auto'>
                    <div className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2 className="text-lg font-medium text-slate-600">{t('Update Language')}</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* name */}
                            <div>
                                <label className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter Language Name')} className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            {/* Code */}
                            <div>
                                <label className='label-text text-slate-600 text-sm' htmlFor="direction">{t('Code')}</label>
                                <Select
                                    name="code"
                                    placeholder={t("Select Code")}
                                    className="w-full rounded-lg"
                                    classNamePrefix="react-select"
                                    value={selectedCode}
                                    onChange={e => onCodeChange(e)}
                                    options={language_code.map((language) => ({ value: language.code, label: language.name + ' ( ' + language.code + ' ) ' }))}
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end mx-4">
                            <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
