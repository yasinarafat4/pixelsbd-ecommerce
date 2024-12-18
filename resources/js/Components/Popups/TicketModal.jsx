import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";


export default function TicketModal({ closeModal, showModal }) {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: "",
        details: "",
        files: [],
    })


    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        post(route('support_ticket_store'), {
            onSuccess: () => closeModal(true),
        })
    }


    // Image handler
    function handleFileChange(e) {
        const value = e.target.files;
            setData('files', value);
    }

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="2xl" show={showModal} onClose={closeModal}>
                <div  className="p-4 flex justify-between items-center text-slate-600">
                    <h2  className="text-lg md:text-xl lg:text-[20px] font-medium p-4">{t('Submit New Ticket')}</h2>
                    <AiOutlineClose onClick={closeModal}  className="text-xl cursor-pointer" />
                </div>
                <hr />
                <>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2 px-3 md:px-6 pt-4'>
                            {/* Subject */}
                            <>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="subject">{t('Subject')}</label>
                                <input onChange={e => setData('subject', e.target.value)} value={data.subject} name='subject' id='subject' type="text" placeholder={t('Enter Subject')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.subject && <div  className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </>
                            {/* Issue Description */}
                            <div  className='w-full'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="details">{t('Describe Your Issue')}</label>
                                <textarea
                                    onChange={e => setData('details', e.target.value)}
                                    value={data.details}
                                    name='details'
                                    id='details'
                                    type="text"
                                    placeholder={t('Write your issue')}
                                    rows="6"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 bg-white text-slate-600 rounded-lg text-sm focus:outline-none"
                                />
                                {errors.details && <div  className="text-red-500 text-sm mt-1">{errors.details}</div>}
                            </div>
                            {/* Files */}
                            <div  className='w-full mb-4 flex flex-col'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="files">{t('Files')}</label>
                                <input
                                    onChange={e => handleFileChange(e)}
                                    id="files"
                                    multiple
                                    type="file"
                                     className="file-input file-input-bordered file-input-primary w-full bg-white text-slate-600"
                                />
                            </div>
                        </div>
                        {/* Buttons */}
                        <div  className="flex items-center justify-end gap-2 px-3 md:px-6 pb-6">
                            <button  className="px-4 py-2 bg_primary rounded text-white font-medium">{t('Submit a Ticket')}</button>
                        </div>
                    </form>
                </>
            </Modal >
        </>
    )

}
