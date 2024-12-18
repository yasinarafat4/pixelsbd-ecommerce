import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";


export default function SellerGoToCollectionPopup({ closeModal, showModal, deliveryBoy }) {

    const { t } = useLaravelReactI18n();
    const { active_currency_symbol } = usePage().props;


    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        delivery_boy_id: deliveryBoy.id,
        delivery_boy: deliveryBoy?.name,
        collection_from_delivery_boy: deliveryBoy?.total_collection,
        collection_amount: ""
    })

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('seller.deliveryboy.delivery_boy_collection'), {
            onSuccess: () => closeModal(),
        })
    }

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
                <div className="py-4 px-6 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-slate-600">{t('Collection From Delivery Boy')}</h2>
                    <AiOutlineClose onClick={closeModal} className="text-xl cursor-pointer text-slate-500" />
                </div>
                <hr />
                <div className="">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='grid grid-cols-1 items-center gap-2 py-4 px-6'>
                            {/* Delivery Boy */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="delivery_boy">{t('Delivery Boy')}</label>
                                <div className="col-span-10">
                                    <input readOnly value={data.delivery_boy} name='delivery_boy' id='delivery_boy' type="text" className="p-[10px] focus:outline-none border-[1px] border-blue-600 block text-slate-600 w-full rounded-l text-sm" />
                                </div>
                            </>
                            {/* Collection From Delivery Boy */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="collection_from_delivery_boy">{t('Total Collection From Delivery Boy')}</label>
                                <div className="grid grid-cols-11">
                                    <div className="col-span-10">
                                        <input readOnly value={data.collection_from_delivery_boy} name='collection_from_delivery_boy' id='collection_from_delivery_boy' type="number" className="p-[10px] focus:outline-none border-[1px] border-blue-600 block text-slate-600 w-full rounded-l text-sm" />
                                    </div>
                                    <div className="col-span-1 border-[1px] border-l-0 border-slate-200 text-black w-full p-[9px] rounded-r text-[15px]">
                                        <p className="text-center">{active_currency_symbol}</p>
                                    </div>
                                </div>
                            </>
                            {/* Collection Amount */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="collection_amount">{t('Collection Amount')} <span className="text-[#E3498B] text-lg">*</span> </label>
                                <div className="grid grid-cols-11">
                                    <div className="col-span-10">
                                        <input onChange={e => setData('collection_amount', e.target.value)} value={data.collection_amount} name='collection_amount' id='collection_amount' type="number" placeholder="Collection Amount" className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 w-full rounded-l text-sm" />
                                    </div>
                                    <div className="col-span-1 border-[1px] border-l-0 border-slate-200 text-black w-full p-[9px] rounded-r text-[15px]">
                                        <p className="text-center">{active_currency_symbol}</p>
                                    </div>
                                </div>
                                {errors.collection_amount && <div className="text-red-500 text-sm mt-1">{errors.collection_amount}</div>}
                            </>
                        </div>
                        <hr />
                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-2 py-4 px-6">
                            <button type="submit" className="px-4 py-3 bg_secondary rounded-md text-white font-medium text-sm">{t('Collection')}</button>
                            <button onClick={closeModal} type="button" className="px-4 py-3 bg-[#F2F3F8] hover:bg-[#E5E8EC] duration-300 rounded-md text-black font-medium text-sm">{t('Cancel')}</button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )

}
