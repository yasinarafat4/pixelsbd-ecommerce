import { asset_url, placeholder1_1 } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { TbBellCancel } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NotificationDropdown() {
    const { t } = useLaravelReactI18n();
    const { customer_notification } = usePage().props

    return (
        <>
            <div className="bg-[#F5F5F5] py-3 border-b">
                <p className='font-semibold text-xl px-4'>{t('Notifications')}</p>
            </div>
            <>
                {customer_notification.length > 0 ?
                    <div className="py-4 h-[400px]">
                        <Scrollbars>
                            {
                                customer_notification.map((notification, i) => {

                                    return <div key={i} className="py-3 px-4 rounded-md flex items-center gap-2">
                                        <>
                                            {notification.notificationShowDesign != 'only_text' &&
                                                <LazyLoadImage
                                                    className={`w-9 aspect-square ${notification.notificationShowDesign == 'design_3' ? 'rounded-full' : notification.notificationShowDesign == 'design_2' ? 'rounded-md' : ''}`} src={asset_url(notification.notificationType.image || placeholder1_1())}
                                                    alt="notification img"
                                                    effect='blur'
                                                />
                                            }
                                        </>
                                        <div dangerouslySetInnerHTML={{ __html: notification.notifyContent }} />
                                    </div>
                                })
                            }
                        </Scrollbars>
                    </div>

                    :
                    <div className="flex flex-col justify-center items-center gap-2 py-20">
                        <TbBellCancel className="text-[60px] text-slate-500" />
                        <p className="text-xl font-semibold text-slate-700">No Notification found!</p>
                    </div>}
            </>

            <Link href={route('all_notifications')}>
                <div className="text-center text-[13px] text-slate-600 hover:text-slate-900 hover:bg-[#F5F5F5]  duration-200 py-2 border-t">
                    <p>{('View All Notifications')}</p>
                </div>
            </Link>
        </ >
    )

}
