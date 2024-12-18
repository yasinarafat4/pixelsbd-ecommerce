import { asset_url, placeholder_user } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineDollar } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoWallet } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdDashboard, MdOutlineContactSupport } from "react-icons/md";
import { TbHeartPlus, TbMessageDots } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DefaultThemeLayout from "./DefaultThemeLayout";

export default function UserDashboardLayout ( { children } )
{
    const { t } = useLaravelReactI18n();
    const { user_ticket_count, user_conversation_count, auth, business_settings } = usePage().props

    return (
        <DefaultThemeLayout>
            <div  className="lg:grid grid-cols-12 gap-4 my-5 md:my-10">
                <div  className="hidden lg:block col-span-3 bg-[#FFFFFF] border space-y-3 py-6">
                    <div  className='flex flex-col items-center gap-2 border-b mx-4'>
                        <div  className="avatar">
                            <div  className="w-16 rounded-full">
                                <LazyLoadImage
                                     className='h-[45px]'
                                    src={ asset_url(auth.customer.image || placeholder_user()) }
                                    alt={ auth.customer.name }
                                    effect='blur'
                                />
                            </div>
                        </div>
                        <div  className="mb-4">
                            <p  className='text-sm'><strong>{ t( 'Name' ) }:</strong> { auth.customer.name || 'No User' }</p>
                            <p  className='text-sm'><strong>{ t( 'Email' ) }:</strong> { auth.customer.email || 'No Email' }</p>
                            <p  className='text-sm'><strong>{ t( 'Mobile' ) }:</strong> { auth.customer.phone || 'No Number Found' }</p>
                        </div>
                    </div>

                    <div  className="mx-4">
                        <Link href={ route( 'user_dashboard' ) }  className={ route().current( "user_dashboard" ) ? "dashItemActive" : "dashItemDefault" }>
                            <MdDashboard  className="text-base" /><span  className="font-medium">{ t( 'Dashboard' ) }</span>
                        </Link>
                        <Link href={ route( 'purchase_history' ) }  className={ route().current( "purchase_history" ) ? "dashItemActive" : "dashItemDefault" }>
                            <LuClipboardList  className="text-base" /><span  className="font-medium">{ t( 'Purchase History' ) }</span>
                        </Link>
                        <Link href={ route( 'downloads' ) }  className={ route().current( "downloads" ) ? "dashItemActive" : "dashItemDefault" }>
                            <FiDownloadCloud  className="text-base" /><span  className="font-medium">{ t( 'Downloads' ) }</span>
                        </Link>

                        <Link href={ route( 'refund_requests' ) }  className={ route().current( "refund_requests" ) ? "dashItemActive" : "dashItemDefault" }>
                            <AiOutlineDollar  className="text-base" /><span  className="font-medium">{ t( 'Refund Requests' ) }</span>
                        </Link>

                        <Link href={ route( 'wishlist' ) }  className={ route().current( "wishlist" ) ? "dashItemActive" : "dashItemDefault" }>
                            <TbHeartPlus  className="text-base" /><span  className="font-medium">{ t( 'Wishlist' ) }</span>
                        </Link>
                        <Link href={ route( 'conversations' ) }  className={ route().current( "conversations" ) ? "dashItemActive" : "dashItemDefault" }>
                            <TbMessageDots  className="text-base" />
                            <div  className="flex">
                                <span  className="font-medium">{ t( 'Conversations' ) }</span>
                                { user_conversation_count ? <span  className='badge badge-xs badge-secondary'>
                                    { user_conversation_count }
                                </span> : '' }
                            </div>
                        </Link>

                        { business_settings.wallet_system &&
                            <Link href={ route( 'wallet' ) }  className={ route().current( "wallet" ) ? "dashItemActive" : "dashItemDefault" }>
                                <IoWallet  className="text-base" /><span  className="font-medium">{ t( 'Wallet' ) }</span>
                            </Link>
                        }

                        <Link href={ route( 'support_ticket' ) }  className={ route().current( "support_ticket" ) ? "dashItemActive" : "dashItemDefault" }>
                            <MdOutlineContactSupport  className="text-base" />
                            <div  className="flex">
                                <span  className="font-medium">{ t( 'Support Ticket' ) }</span>
                                { user_ticket_count ? <span  className='badge badge-xs badge-secondary'>
                                    { user_ticket_count }
                                </span> : '' }
                            </div>
                        </Link>

                        <Link href={ route( 'manage_profile' ) }  className={ route().current( "manage_profile" ) ? "dashItemActive" : "dashItemDefault" }>
                            <HiOutlineUser  className="text-lg font-semibold" /><span  className="font-medium">{ t( 'Manage Profile' ) }</span>
                        </Link>
                    </div>

                </div>
                <div  className="col-span-9 bg-[#FFFFFF] border py-3 px-3 xl:py-5 xl:px-6">
                    { children }
                </div>
            </div>
        </DefaultThemeLayout>
    )

}
