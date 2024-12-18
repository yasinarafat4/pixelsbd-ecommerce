
import { asset_url, placeholder1_1, placeholder6_2, placeholder_user } from '@/Helpers';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useCart } from 'react-use-cart';

export default function DeliveryBoyNavbar() {

    const { t } = useLaravelReactI18n();
    const { auth, delivery_boy_notification, business_settings } = usePage().props


    const {
        isEmpty,
        totalUniqueItems,
    } = useCart();


    return (
        <nav className='bg-white relative ps-2 md:ps-6 lg:px-6'>
            <div className="navbar pe-[24px] lg:pe-[6px] xl:px-0 xl:max-w-[1680px] mx-auto">
                {/* Logo */}
                <div className='navbar-start static'>
                    <Link href={route('delivery_boy.dashboard')}>
                        <img />
                        <LazyLoadImage
                            className="h-[40px] w-[120px] lg:h-[50px] lg:w-[150px] hidden md:block"
                            alt={business_settings.site_name}
                            src={asset_url(business_settings.site_logo || placeholder6_2())}
                            effect='blur'
                        />
                    </Link>
                    <Link href={route('delivery_boy.dashboard')}>  <img className="mask mask-hexagon w-8 md:hidden" src={business_settings.mobile_logo || placeholder1_1()} /></Link>
                </div>

                <div className="navbar-end pt-2 flex items-center gap-3 lg:gap-6">
                    {/* Notification Icon */}
                    {/* {
                        auth.delivery_boy && <div  className="relative dropdown dropdown-end indicator cursor-pointer mb-[7px]">
                            {delivery_boy_notification.length > 0 && <span  className="indicator-item py-[1px] md:py-[2px] px-[6px] md:px-[6px] lg:px-[9px] rounded-full bg_secondary text-white text-[10px] lg:text-[14px]">{delivery_boy_notification.length}</span>}
                            <div tabIndex={0} role="button"  className="p-2 lg:p-3 rounded-full bg-slate-200"><FaRegBell  className='text-sm lg:text-lg' /></div>
                            <ul tabIndex={0}  className="absolute top-10 dropdown-content menu bg-white rounded z-[1] w-[380px] p-0 shadow">
                                <NotificationDropdown />
                            </ul>
                        </div>
                    } */}
                    {/* User Icon */}
                    {
                        <div className="group dropdown dropdown-end dropdown-hover ">
                            <div tabIndex={0} className="avatar cursor-pointer">
                                <div className="w-[31px] lg:w-[42px] rounded-full">
                                    <img src={auth.delivery_boy.image || placeholder_user()} />
                                </div>
                            </div>
                            <div tabIndex={0} className="dropdown-content z-[1000] menu shadow bg-white lg:text-slate-600 rounded w-[160px] space-y-2">
                                <Link href={route('delivery_boy.delivery_boy_profile')} className="py-2 w-full text-slate-900 bg-white hover:bg-blue-600 rounded hover:text-white duration-500 text-[14px] flex items-center justify-center gap-2"><FaUser className='text-sm' />{t('Profile')}</Link>
                                <Link href={route('delivery_boy.logout')} method="post" as="button" className="border border-red-600 py-2 w-full text-slate-900 bg-white hover:bg-red-600 rounded hover:text-white duration-500 text-[14px] flex items-center justify-center gap-2"><RiLogoutCircleLine className='text-base' />{t('Logout')}</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
