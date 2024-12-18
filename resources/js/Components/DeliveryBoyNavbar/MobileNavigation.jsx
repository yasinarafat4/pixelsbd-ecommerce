import { asset_url, placeholder_user } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineCloseCircle, AiOutlineDollar } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { GoIssueClosed } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";
import { ImStack } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineWatchLater, MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingCartCancel } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MobileNavigation() {
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props
    return (
        <>
            <div  className="btm-nav btm-nav-md py-2 lg:hidden bg-white border-t-[1px] border-slate-300 z-50">

                <Link href={route('delivery_boy.dashboard')}  className={route().current("delivery_boy.dashboard") ? "text-red-600" : "text-slate-900"} >
                    <FiHome  className="text-xl" />
                    <span  className="text-[13px]">{t('Dashboard')}</span>
                </Link>
                <Link href={route('delivery_boy.completed_delivery')}  className={route().current("delivery_boy.completed_delivery") ? "text-red-600" : "text-slate-900"}>
                    <GoIssueClosed  className="text-xl" />
                    <span  className="text-[13px]">{t('My Delivery')}</span>
                </Link>
                <Link href={route('delivery_boy.earnings')}  className={route().current("delivery_boy.earnings") ? "text-red-600" : "text-slate-900"} >
                    <AiOutlineDollar  className="text-xl" />
                    <span  className="text-[13px]">{t('My Earnings')}</span>
                </Link>

                <div  className="drawer z-50">
                    <input id="my-drawer" type="checkbox"  className="drawer-toggle" />
                    <div  className="drawer-content">
                        <label htmlFor="my-drawer"  className="drawer-button lg:hidden flex flex-col items-center">
                            <div  className="avatar cursor-pointer">
                                <div  className="w-6 h-6 rounded-full">
                                    <div  className="w-6 h-6 rounded-full">
                                        <LazyLoadImage
                                            src={asset_url(auth.delivery_boy && auth.delivery_boy?.image || placeholder_user())} alt={auth.delivery_boy && auth.delivery_boy.name}
                                            effect='blur'
                                        />
                                    </div>
                                </div>
                            </div>
                            <span  className="text-[13px]">{t('My Account')}</span>
                        </label>
                    </div>
                    <div  className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar"  className="drawer-overlay"></label>
                        <ul  className="menu p-4 w-[300px] md:w-80 min-h-full bg-white text-slate-600">
                            {/* Drawer close button */}
                            <div  className="flex justify-start">
                                <IoClose  className="text-2xl cursor-pointer" onClick={() => document.getElementById('my-drawer').checked = false} />
                            </div>
                            {auth.delivery_boy &&
                                <>
                                    <div  className='flex flex-col items-center gap-2 border-b mt-10 mx-4'>
                                        <div  className="avatar">
                                            <div  className="w-16 rounded-full">
                                                <img src={auth.delivery_boy?.image || placeholder_user()} alt={auth.delivery_boy?.name} />
                                            </div>
                                        </div>
                                        <div  className="mb-6">
                                            <p  className='text-sm'><strong>{t('Name')}:</strong> {auth.delivery_boy.name || 'No User'}</p>
                                            <p  className='text-sm'><strong>{t('Email')}:</strong> {auth.delivery_boy.email || 'No Email'}</p>
                                            <p  className='text-sm'><strong>{t('Mobile')}:</strong> {auth.delivery_boy.phone || 'No Number Found'}</p>
                                        </div>
                                    </div>
                                    <div  className="mx-4">
                                        <div  className="pt-[1px] pb-3">
                                            <Link href={route('delivery_boy.dashboard')}  className={route().current("delivery_boy.dashboard") ? "dashItemActive" : "dashItemDefault"}>
                                                <FiHome  className="text-lg" /><span  className="font-medium">{t('Dashboard')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.assigned_delivery')}  className={route().current("delivery_boy.assigned_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <LuCalendarCheck  className="text-lg" /><span  className="font-medium">{t('Assigned Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.picked_up_delivery')}  className={route().current("delivery_boy.picked_up_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <MdShoppingCartCheckout  className="text-lg" /><span  className="font-medium">{t('Picked Up Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.on_the_way_delivery')}  className={route().current("delivery_boy.on_the_way_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <GrMapLocation  className="text-lg" /><span  className="font-medium">{t('On The Way Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.pending_delivery')}  className={route().current("delivery_boy.pending_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <MdOutlineWatchLater  className="text-lg" /><span  className="font-medium">{t('Pending Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.completed_delivery')}  className={route().current("delivery_boy.completed_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <GoIssueClosed  className="text-lg" /><span  className="font-medium">{t('Completed Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.cancelled_delivery')}  className={route().current("delivery_boy.cancelled_delivery") ? "dashItemActive" : "dashItemDefault"}>
                                                <AiOutlineCloseCircle  className="text-lg" /><span  className="font-medium">{t('Cancelled Delivery')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.request_to_cancel')}  className={route().current("delivery_boy.request_to_cancel") ? "dashItemActive" : "dashItemDefault"}>
                                                <TbShoppingCartCancel  className="text-lg" /><span  className="font-medium">{t('Request to Cancel')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.total_collection')}  className={route().current("delivery_boy.total_collection") ? "dashItemActive" : "dashItemDefault"}>
                                                <ImStack  className="text-lg" /><span  className="font-medium">{t('Total Collection')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.earnings')}  className={route().current("delivery_boy.earnings") ? "dashItemActive" : "dashItemDefault"}>
                                                <AiOutlineDollar  className="text-lg" /><span  className="font-medium">{t('Earnings')}</span>
                                            </Link>
                                            <Link href={route('delivery_boy.delivery_boy_profile')}  className={route().current("delivery_boy.delivery_boy_profile") ? "dashItemActive" : "dashItemDefault"}>
                                                <HiOutlineUser  className="text-lg font-semibold" /><span  className="font-medium">{t('Manage Profile')}</span>
                                            </Link>
                                        </div>
                                        <hr />
                                        <Link href={route('delivery_boy.logout')} method="post" as="button"  className="flex items-center justify-center w-full gap-2 border my-2 px-[10px] py-[6px] rounded-full border-[#E62E04] bg-white hover:bg-[#E62E04] text-[#E62E04] hover:text-white duration-500 text-[16px] font-medium mt-5">
                                            <span>{t('Logout')}</span>
                                        </Link>
                                    </div>
                                </>
                            }
                        </ul>

                    </div>

                </div>
            </div>
        </>
    )

}
