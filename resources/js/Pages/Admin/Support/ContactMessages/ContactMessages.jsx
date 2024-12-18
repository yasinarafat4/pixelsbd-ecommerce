import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { toCamel } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { TbShoppingCartQuestion } from "react-icons/tb";
import Swal from "sweetalert2";

export default function ContactMessages() {
    const { contact_messages } = usePage().props;

    // Contact Status
    function onContactStatusChange(id) {
        router.put(route('admin.support.contact_status', id))
    }

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.support.contact_messages_delete', id))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            }
        });
    }


    const { t } = useLaravelReactI18n();
    return (
        <AdminLayout>
            <Head title={"Contact Messages"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <TbShoppingCartQuestion  className="text-base text-slate-900" />
                                    <span>{t('Contact Messages')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Contact Messages')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>

                        {contact_messages.total > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Date')}</th>
                                        <th align="left">{t('User Name')}</th>
                                        <th align="left">{t('User Email')}</th>
                                        <th align="center">{t('Message')}</th>
                                        <th align="center">{t('Status')}</th>
                                        <th align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row*/}
                                    {contact_messages.data.map((contact_message, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((contact_messages.current_page - 1) * (contact_messages.per_page))}</td>
                                            <td align="left">{moment(contact_message.created_at).format('lll')}</td>
                                            <td align="left">{contact_message.name}</td>
                                            <td width={'15%'} align="left">{contact_message.email}</td>
                                            <td width={'20%'} align="left">{contact_message.message}</td>
                                            <td width={'20%'} align="left"><button onClick={e => onContactStatusChange(contact_message.id)}  className={`${contact_message.status == 'pending' ? 'btn btn-sm btn-error text-white' : 'btn btn-sm btn-success text-white'}`}>{toCamel(contact_message.status)}</button></td>
                                            <td>
                                                <Link><div onClick={() => handleDelete(contact_message.id)} data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                    <FaRegTrashAlt  className='text-sm' />
                                                </div></Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {contact_messages.from || 0} to {contact_messages.to || 0} of {contact_messages.total}</p>
                                <Pagination links={contact_messages.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
