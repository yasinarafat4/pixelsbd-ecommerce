import NothingFound from "@/Components/NothingFound";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { RiEyeLine } from "react-icons/ri";

export default function RefundRequests() {
    const { t } = useLaravelReactI18n();
    const isApproved = false;
    const isPending = false;
    const refundRequestLength = 0;


    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Refund Requests" />
            <div>
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('Applied Refund Requests')}</h1>
                <hr />
                <div className="mt-4">
                    {refundRequestLength > 0 ? <table>
                        {/* head */}
                        <thead>
                            <tr>
                                <th align="left">{t('Date')}</th>
                                <th align="left">{t('Code')}</th>
                                <th align="left">{t('Product')}</th>
                                <th align="left">{t('Amount')}</th>
                                <th align="right">{t('Status')}</th>
                                <th align="right">{t('Options')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td data-label='Date' align="left">15-05-2024</td>
                                <td data-label='Code' align="left" >20240515-08165590</td>
                                <td data-label='Product' align="left">Confirmed</td>
                                <td data-label='Amount' align="left">$150.00</td>
                                <td data-label='Status' align="left">Confirmed</td>
                                <td data-label='Options' align="right" className="">{isApproved ? <button className="btn btn-xs btn-success text-white rounded-full">{t('Approved')}</button> : isPending ? <button className="btn btn-xs btn-accent text-white rounded-full">{t('Pending')}</button> : <div className="flex items-center gap-1"> <div data-tip={t("Reject Reason")} className="tooltip cursor-pointer p-[7px] text-red-600 bg-red-200 hover:bg-red-600 hover:text-slate-200 duration-500 rounded-full">
                                    <RiEyeLine className='text-sm' />
                                </div> <button className="btn btn-xs btn-error text-white rounded-full">{t('Regected')}</button></div>}
                                </td>
                            </tr>
                        </tbody>
                    </table> : <div>
                        <NothingFound title={'No refund request found!'} />
                    </div>}
                </div>
            </div>
        </UserDashboardLayout>
    )

}
