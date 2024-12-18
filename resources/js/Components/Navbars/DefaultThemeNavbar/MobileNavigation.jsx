import { asset_url, placeholder_user } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiOutlineDollar, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHouseUser, FaRegUser } from "react-icons/fa";
import { FiDownloadCloud, FiHome } from "react-icons/fi";
import { IoClose, IoWallet } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdDashboard, MdLogin, MdOutlineContactSupport } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbHeartPlus, TbMessageDots } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCart } from "react-use-cart";

export default function MobileNavigation() {
    const { t } = useLaravelReactI18n();
    const { auth, business_settings } = usePage().props

    const {
        totalUniqueItems,
    } = useCart();

    return (
        <>
            <div  className="btm-nav btm-nav-md py-2 lg:hidden bg-white z-50 border-t-[1px] border-slate-300">

                <Link href={route('home')}  className={route().current("home") ? "text_primary" : "text-slate-900"}>
                    <FiHome  className="text-xl" />
                    <span  className="text-[13px]">{t('Home')}</span>
                </Link>
                <Link href={route('categories')}  className={route().current("categories") ? "text_primary" : "text-slate-900"}>
                    <BiCategoryAlt  className="text-xl" />
                    <span  className="text-[13px]">{t('Categories')}</span>
                </Link>
                <Link href={route('cart')}  className={`${route().current("cart") ? "text_primary" : "text-slate-900"}`}>
                    <div  className="indicator">
                        {totalUniqueItems > 0 && <span  className="indicator-item py-[1px] md:py-[2px] px-[6px] md:px-[6px] lg:px-[9px] rounded-full bg_secondary text-white text-[10px] lg:text-[14px]">{totalUniqueItems}</span>}
                        <AiOutlineShoppingCart  className="text-xl m-1" />
                    </div>
                    <span  className="text-[13px]">{t('Cart')}</span>
                </Link>

                <div  className="drawer">
                    <input id="my-drawer" type="checkbox"  className="drawer-toggle z-50" />
                    <div  className="drawer-content">
                        <label htmlFor="my-drawer"  className="drawer-button lg:hidden flex flex-col items-center">
                            <div  className="avatar cursor-pointer">
                                <div  className="w-6 h-6 rounded-full">
                                    <LazyLoadImage
                                         className="w-full aspect-square"
                                        src={asset_url(auth.customer && auth.customer?.image || placeholder_user())}
                                        alt={auth.customer && auth.customer.name || "No user"}
                                        effect='blur'
                                    />
                                </div>
                            </div>
                            <span  className="text-[13px]">{t('My Account')}</span>
                        </label>
                    </div>
                    <div  className="drawer-side z-50">
                        <label htmlFor="my-drawer" aria-label="close sidebar"  className="drawer-overlay"></label>
                        <ul  className="menu p-4 w-[300px] md:w-80 z-50 min-h-full bg-white text-slate-600">
                            {/* Drawer close button */}
                            <div  className="flex justify-start">
                                <IoClose  className="text-2xl cursor-pointer" onClick={() => document.getElementById('my-drawer').checked = false} />
                            </div>
                            {auth.customer ?
                                <>
                                    <div  className='flex flex-col items-center gap-2 border-b mt-10 mx-4'>
                                        <div  className="avatar">
                                            <div  className="w-16 rounded-full">
                                                <LazyLoadImage
                                                     className="w-full aspect-square"
                                                    src={asset_url(auth.customer?.image || placeholder_user())}
                                                    alt={auth.customer.name || "No user"}
                                                    effect='blur'
                                                />
                                            </div>
                                        </div>
                                        <div  className="mb-6">
                                            <p  className='text-sm'><strong>{t('Name')}:</strong> {auth.customer.name || 'No User'}</p>
                                            <p  className='text-sm'><strong>{t('Email')}:</strong> {auth.customer.email || 'No Email'}</p>
                                            <p  className='text-sm'><strong>{t('Mobile')}:</strong> {auth.customer.phone || 'No Number Found'}</p>
                                        </div>
                                    </div>
                                    <div  className="mx-4">
                                        <Link href={route('user_dashboard')}  className={route().current("user_dashboard") ? "dashItemActive" : "dashItemDefault"}><MdDashboard /><span>{t('Dashboard')}</span></Link>
                                        <Link href={route('purchase_history')}  className={route().current("purchase_history") ? "dashItemActive" : "dashItemDefault"}><LuClipboardList /><span>{t('Purchase History')}</span></Link>
                                        <Link href={route('downloads')}  className={route().current("downloads") ? "dashItemActive" : "dashItemDefault"}><FiDownloadCloud /><span>{t('Downloads')}</span></Link>
                                        <Link href={route('refund_requests')}  className={route().current("refund_requests") ? "dashItemActive" : "dashItemDefault"}><AiOutlineDollar /><span>{t('Refund Requests')}</span></Link>
                                        <Link href={route('wishlist')}  className={route().current("wishlist") ? "dashItemActive" : "dashItemDefault"}><TbHeartPlus /><span>{t('Wishlist')}</span></Link>
                                        <Link href={route('conversations')}  className={route().current("conversations") ? "dashItemActive" : "dashItemDefault"}><TbMessageDots /><span>{t('Conversations')}</span></Link>
                                        {business_settings.wallet_system &&
                                            <Link href={route('wallet')}  className={route().current("wallet") ? "dashItemActive" : "dashItemDefault"}><IoWallet /><span>{t('Wallet')}</span></Link>
                                        }
                                        <Link href={route('support_ticket')}  className={route().current("support_ticket") ? "dashItemActive" : "dashItemDefault"}><MdOutlineContactSupport /><span>{t('Support Ticket')}</span></Link>
                                        <Link href={route('manage_profile')}  className={route().current("manage_profile") ? "dashItemActive" : "dashItemDefault"}><FaRegUser /><span>{t('Manage Profile')}</span></Link>
                                        <Link href={route('logout')} method="post" as="button"  className="w-full py-[8px] px-[20px] mt-5 text-white bg-red-500 hover:bg-red-600 hover:text-white duration-500 text-[15px] font-medium flex justify-center items-center gap-2 rounded-full"><RiLogoutCircleLine  className='text-slate-200 text-base' />{t('logout')}</Link>

                                    </div>
                                </> : <>
                                    <p  className="text-red-500 text-lg font-medium mt-10 mb-5 text-center">No User Found!</p>
                                    <div  className='flex justify-center items-center'>
                                        <p  className="shadow-lg px-4 py-2 border rounded-md hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                                            <MdLogin  className='text-slate-700 text-base' />
                                            <Link href={route('login')}  className="tracking-[1px]">{t('Sign In')}</Link>
                                        </p>
                                        <div  className="divider divider-horizontal"></div>
                                        <p  className="shadow-lg px-4 py-2 border rounded-md hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                                            <FaHouseUser  className='text-slate-700 text-base' />
                                            <Link href={route('register')}  className="tracking-[1px]">{t('Sign Up')}</Link>
                                        </p>
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
