
import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, placeholder1_1 } from "@/Helpers";
import { Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaLock, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function NotificationTypeTable({ notifications}) {
    const { t } = useLaravelReactI18n();

     // Delete functionality
     const deleteData = (id) => {
        router.delete(route('admin.marketing.notification.notification_type_delete', id))
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

    function onStatusChange(e, id) {
        router.put(route('admin.marketing.notification.notification_type_status', id), {
            status: e.target.checked,
        },)
    }

    return (
        <>{notifications.data.length > 0 ? <div>
            <table  className="table">
                {/* head */}
                <thead>
                    <tr  className='text-slate-600'>
                        <th align="left">#</th>
                        <th align="left">{t('Image')}</th>
                        <th align="left">{t('Type')}</th>
                        <th align="left">{t('Default Text')}</th>
                        <th align="left">{t('Status')}</th>
                        <th align="right">{t('Actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row */}
                    {notifications.data.map((notification, i) => (
                        <tr key={i}  className='text-slate-600'>
                            <td align="left">
                                {notification.type != 'custom' ? <span>
                                    <FaLock  className="w-5 h-5 text-slate-500" />
                                </span> :
                                    <span> {(i + 1) + ((notifications.current_page - 1) * (notifications.per_page))}</span>}
                            </td>
                            <td align="left">
                                <img  className="h-8 w-8" src={asset_url(notification.image || placeholder1_1())} alt={notification.name} />
                            </td>
                            <td align="left">{notification.name}</td>
                            <td align="left">{notification.text}</td>
                            <td align="left">
                                <input checked={notification.status} onChange={e => onStatusChange(e, notification.id)} type="checkbox"  className="toggle toggle-sm toggle-success" />
                            </td>
                            <td align="center"  className="space-x-2">
                                <Link href={route('admin.marketing.notification.notification_type_edit', notification.id)}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                    <BiSolidEdit  className='text-sm' />
                                </div></Link>
                                {notification.type == 'custom' && <Link onClick={e => handleDelete(notification.id)}>
                                    <div data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                        <FaRegTrashAlt  className='text-sm' />
                                    </div>
                                </Link>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div  className="flex justify-between items-center mt-2">
                <p  className='text-slate-700 text-sm'>Showing {notifications.from || 0} to {notifications.to || 0} of {notifications.total}</p>
                <Pagination links={notifications.links} />
            </div>
        </div> : <NothingFound title={'Nothing Found!'} />}</>
    )

}
