
import DeliveryBoyNavbar from "@/Components/DeliveryBoyNavbar/DeliveryBoyNavbar";
import MobileNavigation from "@/Components/DeliveryBoyNavbar/MobileNavigation";
import LoadingSpinner from "@/Components/LoadingSpinner/LoadingSpinner";
import { asset_url, placeholder_user } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlineDollar } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { GoIssueClosed } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";
import { ImStack } from "react-icons/im";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineWatchLater, MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingCartCancel } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DeliveryBoyLayout({ children }) {
    const { t } = useLaravelReactI18n();
    const { auth, flash } = usePage().props
    useEffect(() => {
        if (flash.success != null) {
            toast.success(flash.success, {
                position: "top-right",
                theme: "colored",
            })
        }
        if (flash.error != null) {
            toast.error(flash.error, {
                position: "top-right",
                theme: "colored",
            })
        }
    }, [flash])

    return (
        <div  className="bg-[#FAFAFC]">
            <LoadingSpinner />
            {/* Navbar */}
            <DeliveryBoyNavbar />
            {/* Body */}
            <div  className="px-[20px] md:px-[30px] xl:px-0 xl:max-w-[1680px] mx-auto ">
                <div  className="bg-[#FAFAFC] relative">
                    <ToastContainer />
                    <Scrollbars  className="min-h-screen z-50">
                        <div  className="lg:grid grid-cols-11 gap-4">
                            <div  className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-[#FFFFFF] border space-y-3 py-6">
                                <div  className='flex flex-col items-center gap-2 border-b mx-4'>
                                    <div  className="avatar">
                                        <div  className="w-12 rounded-full">
                                            <img src={asset_url(auth.delivery_boy?.image || placeholder_user())} alt={auth.delivery_boy?.name} />
                                        </div>
                                    </div>
                                    <div  className="mb-4">
                                        <p  className='text-sm'><strong>{t('Name')}:</strong> {auth.delivery_boy.name}</p>
                                        <p  className='text-sm'><strong>{t('Email')}:</strong> {auth.delivery_boy.email}</p>
                                        <p  className='text-sm'><strong>{t('Mobile')}:</strong> {auth.delivery_boy.phone}</p>
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

                            </div>
                            <div  className="lg:col-span-8 xl:col-span-9 bg-[#FFFFFF] border py-3 px-5 lg:px-6 xl:py-5 xl:px-10">
                                {children}
                            </div>
                            {/* Mobile Navigation */}
                            <MobileNavigation />
                        </div>
                    </Scrollbars>
                </div>
            </div>
            {/* Footer */}
            <p  className="text-center">Footer</p>
        </div>
    )

}
