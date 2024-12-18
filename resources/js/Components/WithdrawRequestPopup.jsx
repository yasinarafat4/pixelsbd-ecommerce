import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "./Modal";


export default function WithdrawRequestPopup ( { closeModal, showModal } )
{

    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        amount: "",
        message: "",
    } )

    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'seller.money_withdraw_store' ), {
            onSuccess: () => closeModal(),
        } )
    }

    return (
        <>
            {/* Modal */ }
            <Modal maxWidth="xl" show={ showModal } onClose={ closeModal }>
                <div  className="p-4 flex justify-between items-center">
                    <h2  className="text-lg font-medium text-slate-600">{ t( 'Pay to Seller' ) }</h2>
                    <AiOutlineClose onClick={ closeModal }  className="text-xl cursor-pointer text-slate-500" />
                </div>
                <hr />
                <div  className="">
                    <form onSubmit={ e => handleSubmit( e ) }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* Amount */ }
                            <>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="amount">{ t( 'Amount' ) } <span  className="text-[#E3498B] text-lg">*</span> </label>
                                <input onChange={ e => setData( 'amount', e.target.value ) } value={ data.amount } name='amount' id='amount' type="number" placeholder="Amount"  className="p-[10px] focus:outline-none border-[1px] border-slate-200 focus:border-blue-600 block bg-white text-slate-600 w-full rounded text-sm" />
                                { errors.amount && <div  className="text-red-500 text-sm mt-1">{ errors.amount }</div> }
                            </>
                            {/* Message */ }
                            <div  className='w-full mb-4'>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="message">{ t( 'Message' ) }</label>
                                <textarea
                                    name='message'
                                    id='message'
                                    onChange={ e => setData( 'message', e.target.value ) }
                                    value={ data.message }
                                    type="text"
                                    placeholder={ t( 'Write your message' ) }
                                    rows="6"
                                     className="textarea p-3 block w-full border-[1px] border-slate-300 focus:border-blue-600 rounded-lg text-sm focus:outline-none text-slate-600 bg-white"
                                />
                            </div>
                        </div>
                        <hr />
                        {/* Buttons */ }
                        <div  className="flex items-center justify-end gap-2 p-4">
                            <button type="submit"  className="px-4 py-2 bg-black rounded text-white font-medium text-sm">Send</button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )

}
