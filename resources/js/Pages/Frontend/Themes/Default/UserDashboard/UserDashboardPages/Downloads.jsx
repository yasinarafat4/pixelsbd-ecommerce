import NothingFound from "@/Components/NothingFound";
import { asset_url, placeholder1_1 } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FiDownload } from "react-icons/fi";

export default function Downloads() {
    const { t } = useLaravelReactI18n();
    const downloadDataLength = 1;

    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Downloads" />
            <div>
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('Downloads')}</h1>
                <hr />
                <div className="mt-4">
                    {downloadDataLength > 0 ? <table>
                        {/* head */}
                        <thead>
                            <tr>
                                <th align="left">{t('Product')}</th>
                                <th align="right">{t('Option')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td data-label='Product' align="left" >
                                    <div className="flex flex-col md:flex-row items-center gap-1"> <img className="w-28 md:w-full lg:w-16 h-28 md:h-full lg:h-16  rounded" src={asset_url(placeholder1_1())} alt="Product" />
                                        <span>Adobe Illustrator | Vector graphic design software | 12-month Subscription with auto-renewal, PC/Mac</span></div></td>
                                <td data-label='Option' align="right">
                                    <div data-tip={t("Download")} className="tooltip cursor-pointer p-[10px] text-blue-700 hover:text-slate-200 bg-blue-200 hover:bg-blue-600 duration-500 rounded-full">
                                        <FiDownload className='text-sm' />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> : <NothingFound title={'No Download Data Available!'} />}
                </div>
            </div>
        </UserDashboardLayout>
    )

}
