
import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";

export default function AllNotifications({ notifications }) {

    const { t } = useLaravelReactI18n();

    // Notification Delete functionality
    const deleteData = (id) => {
        router.delete(route('notification_destroy', id))
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

    return (
        <UserDashboardLayout>
            <Head title="All Notifications" />
            <div>
                <div  className="border-b pb-4">
                    <h2  className="text-lg md:text-xl lg:text-[22px] font-bold">{t('Notifications')}</h2>
                    <p  className="text-sm text-slate-600">
                        You have total <span  className="text-slate-900 font-semibold">{notifications.meta.total}</span> {notifications.meta.total > 1 ? 'Notifications' : 'Notification'}
                    </p>
                </div>
                <div>
                    {notifications.meta.total > 0 ? <> <table>

                        <thead>
                            <tr>
                                <th align="left">#</th>
                                <th align="left">{t('Notification')}</th>
                                <th align="center">{t('Option')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.data.map((notification, i) => (
                                <tr key={i}>
                                    <td data-label='#' align="left">{i + 1}</td>
                                    <td data-label='Notification' align="left"  className="flex flex-col justify-center items-start">
                                        <div  className="py-1 flex text-start md:items-center gap-1">
                                            <div>
                                                {notification.notificationShowDesign != 'only_text' &&
                                                    <LazyLoadImage
                                                         className={`w-8 md:w-9 h-8 md:h-9 ${notification.notificationShowDesign == 'design_3' ? 'rounded-full' : notification.notificationShowDesign == 'design_2' ? 'rounded-md' : ''}`}
                                                        src={asset_url(notification.notificationType.image)}
                                                        alt="notification img"
                                                        effect='blur'
                                                    />
                                                }
                                            </div>
                                            <div dangerouslySetInnerHTML={{ __html: notification.notifyContent }} />
                                        </div>
                                        <div>
                                            <p  className="text-slate-500 text-xs">
                                                {moment(notification.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                            </p>
                                        </div>
                                    </td>
                                    <td data-label='Option' align="center"  className="">
                                        <Link onClick={() => handleDelete(notification.id)}>
                                            <div data-tip={t("Delete")}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                <FaRegTrashAlt  className='text-sm' />
                                            </div>
                                        </Link></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                        <div  className="flex justify-between items-center mt-2">
                            <p  className='text-slate-600 text-sm'>Showing {notifications.meta.from || 0} to {notifications.meta.to || 0} of {notifications.meta.total}</p>
                            <Pagination links={notifications.meta.links} />
                        </div>
                    </>
                        : <div>
                            <NothingFound title={'No notification found!'} />
                        </div>}
                </div>
            </div>
        </UserDashboardLayout>
    );
};
