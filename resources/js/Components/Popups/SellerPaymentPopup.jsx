import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Modal from "../Modal";


export default function SellerPaymentPopup({ closeModal, showModal, sellerData }) {
    const { t } = useLaravelReactI18n();
    const { default_currency_symbol } = usePage().props
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        shop_id: sellerData.shop.id,
        amount: sellerData.admin_to_pay,
        payment_option: '',
        txn_code: '',
    })

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.commissions.pay_to_seller'), {
            onSuccess: () => closeModal(),
        })
    }


    // Select change handlers
    function onSelectTypeChange(e) {
        setData('type', e.value)
    }


    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
                <h2 className="text-lg font-medium p-4 text-slate-600">{t('Pay to Seller')}</h2>
                <hr />
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            <table className="table" >
                                <tbody className="text-slate-600">
                                    <tr>
                                        <td>{sellerData.to_pay}</td>
                                        <td>{sellerData.admin_to_pay + default_currency_symbol}</td>
                                    </tr>
                                    {sellerData.bank_payment_status ?
                                        <>
                                            <tr>
                                                <td>{t('Bank Name')} </td>
                                                <td>{sellerData.bank_name}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('Bank Account Name')} </td>
                                                <td>{sellerData.holder_name}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('Bank Account Number')} </td>
                                                <td>{sellerData.account_no}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('Bank Routing Number')} </td>
                                                <td>{sellerData.bank_routing_no}</td>
                                            </tr>
                                        </> : <></>
                                    }
                                </tbody>
                            </table>
                            {sellerData.admin_to_pay > 0 ?

                                <div className="space-y-3">
                                    <>
                                        <label className='label-text text-slate-600 text-sm' htmlFor="amount">{t('Amount')}</label>
                                        <div className="flex items-center">
                                            <input onChange={e => setData('amount', e.target.value)} value={data.amount} name='amount' id='amount' type="number" placeholder="0" className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded-s text-sm" />
                                            <div className="border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-[50px] p-[6px] rounded-r-lg text-lg">
                                                <p className="text-center">{default_currency_symbol}</p>
                                            </div>
                                        </div>
                                        {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                                    </>
                                    <>
                                        <label className='label-text text-slate-600 text-sm' htmlFor="payment_option">{t('Payment Option')}</label>
                                        <select name="payment_option" id="payment_option" onChange={e => setData('payment_option', e.target.value)} className="select select-bordered w-full bg-white text-slate-600 focus:outline-none">
                                            <option value="">{t('Select Payment Method')}</option>
                                            {sellerData.cash_payment_status && <option value="cash">{t('Cash')}</option>}
                                            {sellerData.bank_payment_status && <option value="bank_payment">{t('Bank Payment')}</option>}
                                        </select>
                                    </>
                                    {data.payment_option == "bank_payment" && <>
                                        <label className='label-text text-slate-600 text-sm' htmlFor="amount">{t('Txn Code')}</label>
                                        <input onChange={e => setData('txn_code', e.target.value)} value={data.txn_code} name='txn_code' id='txn_code' type="text" placeholder="Txn Code" className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded text-sm" />
                                        {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                                    </>}
                                </div>
                                :
                                <div className="space-y-3">
                                    <>
                                        <label className='label-text text-slate-600 text-sm' htmlFor="amount">{t('Amount')}</label>
                                        <div className="flex items-center">
                                            <input onChange={e => setData('amount', e.target.value)} value={data.amount} name='amount' id='amount' type="number" placeholder="0" className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded-s text-sm" />
                                            <div className="border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-[50px] p-[6px] rounded-r-lg text-lg">
                                                <p className="text-center">{default_currency_symbol}</p>
                                            </div>
                                        </div>
                                        {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                                    </>
                                </div>
                            }
                        </div>
                        <hr />
                        <div className="flex items-center justify-end gap-2 p-4">
                            {sellerData.admin_to_pay > 0 ?
                                <button className="px-4 py-2 bg_primary rounded text-white font-medium text-sm">Pay</button>
                                :
                                <button className="px-4 py-2 bg_primary rounded text-white font-medium text-sm">Clear Due</button>
                            }

                            <button onClick={closeModal} className="px-4 py-2 bg_secondary rounded text-white font-medium text-sm">Cancel</button>
                        </div>
                    </form>
                </div >
            </Modal >
        </>
    )

}
