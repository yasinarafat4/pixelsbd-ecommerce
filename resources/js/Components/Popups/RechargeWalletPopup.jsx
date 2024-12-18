import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import Modal from "../Modal";


export default function RechargeWalletPopup({ closeModal, showModal, payment_methods }) {
    const { t } = useLaravelReactI18n();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()
    const { active_currency_symbol } = usePage().props;


    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        payment_method: "",
    })


    // Select change handler
    function onSelectChange(e) {
        setSelectedPaymentMethod(e)
        setData('payment_method', e.value)
    }

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('wallet.recharge'), {
            onSuccess: () => '',
        })
    }

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-slate-600">{t('Recharge Wallet')}</h2>
                    <AiOutlineClose onClick={closeModal} className="text-xl cursor-pointer text-slate-500" />
                </div>
                <hr />
                <div className="">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Select */}
                            <div className="flex flex-col">
                                <label className='label-text text-slate-600 text-sm'>{t('Payment Method')} <span className="text-[#E3498B] text-lg">*</span></label>
                                <Select
                                    name="payment_method"
                                    placeholder={t('Select')}
                                    className="w-full rounded bg-white text-slate-600"
                                    classNamePrefix="react-select"
                                    onChange={e => onSelectChange(e)}
                                    value={selectedPaymentMethod}
                                    options={payment_methods.map((payment) => ({ value: payment.name, label: payment.name }))}
                                />
                            </div>
                            {/* Amount */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="amount">{t('Amount')} <span className="text-[#E3498B] text-lg">*</span> </label>
                                <div className="grid grid-cols-11">
                                    <div className="col-span-10">
                                        <input onChange={e => setData('amount', e.target.value)} value={data.amount} name='amount' id='amount' type="number" placeholder="Amount" className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded-l text-sm" />
                                    </div>
                                    <div className="col-span-1 border-[1px] border-l-0 border-slate-200 text-black w-full p-[9px] rounded-r text-[15px]">
                                        <p className="text-center">{active_currency_symbol}</p>
                                    </div>
                                </div>
                                {errors.amount && <div className="text-red-500 text-sm mt-1">{errors.amount}</div>}
                            </>

                        </div>
                        <hr />
                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-2 p-4">
                            <button className="px-4 py-2 bg_secondary rounded-sm text-white font-medium text-sm">Confirm</button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )

}
