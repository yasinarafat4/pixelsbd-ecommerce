import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";


export default function NotifiedCustomersModal({ closeModal, showModal, notifiedCustomersData }) {
    const { t } = useLaravelReactI18n();

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
                <div  className="flex justify-between items-center py-4 px-6">
                    <h2  className="text-[18px] font-medium">{t('Notified Customers')}</h2>
                    <AiOutlineClose onClick={closeModal}  className="text-lg cursor-pointer text-slate-500" />
                </div>
                <hr />
                <div  className='grid grid-cols-1 items-center gap-4 py-8 px-6'>
                    <ul  className="space-y-3">
                        <li  className="flex items-center gap-3">
                            <h2  className="text-base font-semibold">Notification Text: </h2>
                            <p  className="text-sm">{notifiedCustomersData.text}</p>
                        </li>
                        <li  className="flex items-center gap-3">
                            <h2  className="text-base font-semibold">Link: </h2>
                            <p  className="text-sm">{notifiedCustomersData.link}</p>
                        </li>
                    </ul>
                    {/* Table */}
                    <table  className="table">
                        {/* head */}
                        <thead>
                            <tr  className='border text-slate-600'>
                                <th  className="border" align="left">{t('Name')}</th>
                                <th  className="border" align="left">{t('Email/Phone')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {notifiedCustomersData.notified_user_list.map((user, i) => (
                                <tr key={i}  className='border text-slate-600'>
                                    <td align="left">{user.name}</td>
                                    <td align="left">{user.email}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Modal >
        </>
    )

}
