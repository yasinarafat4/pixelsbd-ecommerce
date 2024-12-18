import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import EasyEdit, { Types } from 'react-easy-edit';
import { BsTranslate } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdLanguage } from "react-icons/md";

export default function Translate({ translations, lang, query, languageName }) {
    const { t } = useLaravelReactI18n();
    const [search, setSearchValue] = useState(query ?? '');

    const save = (value, key) => {
        router.post(route('admin.configuration.language.update_translate'), {
            name: lang + '|' + key,
            value: value,
        })
    }
    const cancel = () => { console.log("Cancelled") }

    function handleSearch(e) {
        e.preventDefault();
        router.visit(route('admin.configuration.language.translate', lang), {
            method: 'get', data: { search: e.target.value }, replace: true, preserveState: true, preserveScroll: true, only: ['translations', 'query']
        })
    }

    const CustomDisplay = props => {
        const val = props.value;
        return (
            <div className="text-green-600">
                {val}
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title={"Translate"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.configuration.language.index')} className="inline-flex gap-1 items-center">
                                    <MdLanguage className="text-base text-slate-900" />
                                    <span>{t('Language')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <BsTranslate className="text-base text-slate-900" />
                                    <span>{t('Translate')}</span>
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

                <div className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2 className="text-lg font-medium text-slate-600">Translate in {languageName}</h2>
                        </div>
                        {/* Search*/}
                        <div>
                            <label className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text" onKeyUp={handleSearch} onChange={(e) => setSearchValue(e.target.value)} value={search} className="grow" placeholder={t('search')} />
                            </label>
                        </div>
                    </div>
                    <div className='card-body'>

                        <div className="">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='text-slate-600 text-sm'>
                                        <th className="border border-slate-400 uppercase" align="left">#</th>
                                        <th className="border border-slate-400 uppercase" align="left">Key</th>
                                        <th className="border border-slate-400 uppercase" align="center">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {Object.keys(translations).map((translate, index) => (

                                        <tr key={index} className='text-slate-600'>
                                            <td className="border border-slate-300" align="left">{index + 1}</td>
                                            <td className="border border-slate-300" align="left">{translate}</td>
                                            <td className="border border-slate-300" align="center">
                                                <EasyEdit
                                                    className="bg-white"
                                                    type={Types.TEXT}
                                                    value={translations[translate][lang]?.value}
                                                    onSave={(value) => save(value, translate)}
                                                    onCancel={cancel}
                                                    saveButtonLabel="Save"
                                                    cancelButtonLabel="Cancel"
                                                    placeholder="Empty"
                                                    displayComponent={<CustomDisplay />}
                                                />
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {/* <div  className="flex justify-between items-center mt-2">
                                <Pagination links={allTranslations.links} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
