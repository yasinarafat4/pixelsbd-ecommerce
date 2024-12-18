import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft, MdOutlineFolderCopy } from "react-icons/md";

export default function Show() {
    const { t } = useLaravelReactI18n();
    return (
        <AdminLayout>
            <Head title={"Show"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a className="inline-flex gap-1 items-center">
                                    <MdOutlineFolderCopy className="text-base" />
                                    <Link href={route('language.index')}>Lorem</Link>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <BiSolidEdit className="text-sm text-slate-900" />
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

            </div>
        </AdminLayout>
    )

}
