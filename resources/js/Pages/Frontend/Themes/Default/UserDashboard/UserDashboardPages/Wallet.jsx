import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import RechargeWalletPopup from "@/Components/Popups/RechargeWalletPopup";
import { toCamel } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Wallet({ wallets, payment_methods }) {

    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props
    const [showModal, setShowModal] = useState(false);

    // Modal Handlers
    function handelShowModal() {
        setShowModal(true)
    }
    function closeModal() {
        setShowModal(false)
    };

    const isApproved = false;
    const isPending = false;
    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Wallet" />
            {/* Modal */}
            {showModal && <RechargeWalletPopup payment_methods={payment_methods} closeModal={closeModal} showModal={showModal} />}

            <div>
                <h1  className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('My Wallet')}</h1>
                <hr />
                <div  className="grid grid-cols-1 items-center md:grid-cols-2 space-y-2 md:space-y-0 gap-4 mt-4">
                    <div  className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-300 h-28 w-full">
                        <p  className="text-base text-slate-700">{t('Total Balance')}</p>
                        <p  className="text-2xl font-semibold">{auth.customer.balance}</p>
                    </div>
                    <div onClick={e => handelShowModal()}  className="cursor-pointer group flex flex-col items-center justify-center gap-2 border border-dashed border-slate-300 h-28 w-full">
                        <p  className="text-base text-slate-700">{t('Recharge Wallet')}</p>
                        <FaPlus  className="text-sm text-slate-500 group-hover:text_secondary duration-300" />
                    </div>
                </div>

                {/* Wallet History */}
                <div>
                    <h2  className="text-sm md:text-base lg:text-[18px] font-bold pt-5 pb-2 border-b">{t('Wallet Recharge History')}</h2>
                    <div>
                        {wallets.total > 0 ?
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th align="left">#</th>
                                            <th align="left">{t('Date')}</th>
                                            <th align="left">{t('Amount')}</th>
                                            <th align="left">{t('Payment Method')}</th>
                                            <th align="left">{t('Status')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wallets.data.map((wallet, i) => {
                                            var status = JSON.parse(wallet.payment_details);
                                            return <tr key={i}>
                                                <td data-label='#' align="left" >{ ( i + 1 ) + ( ( wallets.current_page - 1 ) * ( wallets.per_page ) ) }</td>
                                                <td data-label='Date' align="left">{moment(wallet.created_at).format('YYYY-MM-DD, h:m:s a')}</td>
                                                <td data-label='Amount' align="left">{wallet.amount}</td>
                                                <td data-label='Payment Method' align="left">{wallet.payment_method}</td>
                                                <td data-label='Status' align="right">{toCamel(status.status)}</td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing {wallets.from || 0} to {wallets.to || 0} of {wallets.total}</p>
                                    <Pagination links={wallets.links} />
                                </div>
                            </>
                            :
                            <div>
                                <NothingFound title={'Nothing in the wallet!'} />
                            </div>
                        }
                    </div>
                </div>

            </div>
        </UserDashboardLayout>
    )

}
