
import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";


export default function ChatWithSellerModel({ product, closeModal, showModal }) {
    const { t } = useLaravelReactI18n();
    // const [attachment, setAttachment] = useState([]);

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        receiver_id: product?.user?.id,
        receiver_user_type: product?.user?.user_type,
        title: product?.name,
        message: route('product', product?.slug || "any"),
    })



    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('conversations.store'), { onSuccess: () => { closeModal(true) } })
    }

    return (
        <>
            {/* Modal */}
            <Modal closeable={false} maxWidth="2xl" show={showModal} onClose={closeModal}>
                <div className="py-3 px-5 flex justify-between items-center gap-10 md:gap-0">
                    <h2 className="text-md md:text-xl lg:text-[18px] font-semibold text-slate-600">{t('Any Query About this Product?')}</h2>
                    <AiOutlineClose onClick={e => closeModal()} className="text-md md:text-xl cursor-pointer text-slate-500" />
                </div>
                <hr />
                <>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='grid grid-cols-1 items-center gap-2 px-3 md:px-6 pt-2 md:pt-4'>
                            {/* Subject */}
                            <>
                                <label className='label-text text-slate-600 text-sm' htmlFor="title">{t('Subject')}</label>
                                <input onChange={e => setData('title', e.target.value)} value={data.title} name='title' id='stitleject' type="text" placeholder={t('Enter Subject')} className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded-md text-sm" />
                            </>
                            {/* Issue Description */}
                            <div className='w-full'>
                                <label className='label-text text-slate-600 text-sm font-medium' htmlFor="message">{t('Your Message')}</label>
                                <textarea
                                    onChange={e => setData('message', e.target.value)}
                                    value={data.message}
                                    name='message'
                                    id='message'
                                    type="text"
                                    placeholder={t('Write your message')}
                                    rows="6"
                                    className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 bg-white text-slate-600 rounded-md text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-2 px-3 md:px-6 py-3 md:py-6">
                            <button type="submit" className="px-4 py-2 bg_primary rounded text-white font-medium">Send</button>
                        </div>
                    </form>
                </>
            </Modal >
        </>
    )

}
