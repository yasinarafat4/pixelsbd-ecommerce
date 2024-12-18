import { router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import Modal from "../Modal";


export default function RequestToCancelPopup({ closeModal, showModal, orderID }) {
    const { t } = useLaravelReactI18n();


    // Form submit functionality
    function onRequestToCancel(e) {
        e.preventDefault()
        router.post(route('delivery_boy.cancel_request'),
            { order_id: orderID },
            { onSuccess: () => closeModal() }
        )
    }


    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
                <h2  className="text-lg font-medium py-4 px-6">{t('Confirmation')}</h2>
                <hr />
                <div  className=" py-4 px-6">
                    <p>{t('Do you really want to send request to cancel?')}</p>
                </div>
                <hr />
                <div  className="flex items-center justify-end gap-2 py-4 px-6">
                    <button onClick={closeModal}  className="px-4 py-3 bg-[#919199] text-white font-normal text-base">Cancel</button>
                    <button onClick={e => onRequestToCancel(e)}  className="px-4 py-3 bg-[#E62E04] text-white font-normal text-base">Request to Cancel</button>
                </div>
            </Modal >
        </>
    )

}
