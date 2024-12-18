import EmptyCartDropdown from '@/Components/Cart/EmptyCartDropdown';
import SelectedItemDropdown from '@/Components/Cart/SelectedItemDropdown';
import NotificationDropdown from '@/Components/Notification/NotificationDropdown';
import { asset_url, placeholder6_2, placeholder_user } from '@/Helpers';
import { Link, router, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from 'react';
import { FaHouseUser } from 'react-icons/fa';
import { FiDownloadCloud } from "react-icons/fi";
import { GrWorkshop } from 'react-icons/gr';
import { IoMdCall } from 'react-icons/io';
import { IoSearch, IoWallet } from "react-icons/io5";
import { MdDashboard, MdOutlineContactSupport } from "react-icons/md";
import { PiBasketFill } from "react-icons/pi";
import { RiLogoutCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { TbMessageDots } from "react-icons/tb";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useCart } from 'react-use-cart';

export default function TopNavbar() {
    const { auth, customer_notification, business_settings, active_locale, active_languages, active_currencies, active_currency_code } = usePage().props
    const { t } = useLaravelReactI18n();
    let queryParams = usePage().props.ziggy.query;
    let searchValue = queryParams.search;

    const [navMenuToggle, setNavMenuToggle] = useState(false)
    const [totalWishlist, setTotalWishlist] = useState(auth?.customer?.wishlists?.length ?? 0);
    const [totalNotifications, setTotalNotifications] = useState(customer_notification.length ?? 0);
    const [search, setSearch] = useState(searchValue)


    const {
        isEmpty,
        totalUniqueItems,
    } = useCart();

    useEffect(() => {
        window.Echo.channel('wishlist.' + auth?.customer?.id)
            .listen('WishlistEvent', function (response) {

                setTotalWishlist(response.total)

            });

        window.Echo.private('App.Models.User.' + auth?.customer?.id)
            .notification((notification) => {
                setTotalNotifications(notification.count)

            });
    }, []);


    function onSearchProduct(e) {
        router.get(route("search", [{ 'search': search }]))
    }

    function handleClick() {
        setNavMenuToggle(!navMenuToggle)
    }

    function onLanguageChange(e) {
        router.get(route('set.locale', e), {
            onFinish: () => {
                window.location.reload();
            }
        })
    }

    function onCurrencyChange(e) {
        router.get(route('set.currency', e), {
            onFinish: () => {
                window.location.reload();
            }
        })
    }


    return (

        <header className='bg-white shadow-md font-sans min-h-[50px] tracking-wide relative z-50'>
            {/* Topbar */}
            <section className='bg-[#F5F5F5] text-white text-right'>
                <div className='flex items-center justify-between xl:max-w-7xl mx-auto px-[10px]'>
                    <div className="flex items-center gap-2">
                        {/* Change Language */}
                        {business_settings.show_language_switcher == '1' &&
                            <select aria-label="Change Language" defaultValue={active_locale} onChange={e => onLanguageChange(e.target.value)} className="select max-w-xs select-sm bg-[#F5F5F5] text-slate-600 focus:border-none focus:outline-none focus:ring-0">
                                {active_languages && active_languages.map((language, i) => (
                                    <option key={i} value={language.code}> {language.name}</option>
                                ))}
                            </select>}
                        {business_settings.show_currency_switcher == '1' &&
                            <select aria-label="Change Currency" defaultValue={active_currency_code} onChange={e => onCurrencyChange(e.target.value)} className="select max-w-xs select-sm bg-[#F5F5F5] text-slate-600 focus:border-none focus:outline-none focus:ring-0">
                                {active_currencies && active_currencies.map((currency, i) => (
                                    <option key={i} value={currency.code}> {currency.code}</option>
                                ))}
                            </select>}
                    </div>
                    <div className='lg:hidden'>
                        {business_settings.help_line_number && <a className='text-slate-600 hover:text_secondary duration-500 flex items-center gap-1' href={`tel:${business_settings.help_line_number}`}><IoMdCall className='text-sm' /><span className='text-sm'>{business_settings.help_line_number}</span></a>}
                    </div>
                    <div className="hidden lg:flex gap-7 items-center text-sm">
                        {business_settings.help_line_number && <a className='text-slate-600 hover:text_secondary duration-500 flex items-center gap-1' href={`tel:${business_settings.help_line_number}`}><IoMdCall className='text-base' /><span>{t('Call')}: {business_settings.help_line_number}</span></a>}
                        {/* <button  className='text-slate-600 hover:text_secondary duration-500 flex items-center gap-1'><MdOutlineLocationOn  className='text-lg' /><span>{t('Track Order')}</span></button> */}

                        {business_settings.vendor_system && <>
                            <Link href={route('seller.register')} className='text-slate-600 hover:text_secondary duration-500 flex items-center gap-1'><GrWorkshop className='' /><span>{t('Become A Seller')}</span></Link>
                            <Link href={route('seller.login')} className='text-slate-600 hover:text_secondary duration-500 flex items-center gap-1'><FaHouseUser className='' /><span>{t('Login As Seller')}</span></Link>
                        </>}
                    </div>
                </div>
            </section>
            {/* Navbar */}
            <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4 xl:max-w-7xl px-[10px] py-3 lg:py-2 mx-auto'>
                {/* Logo */}
                <Link aria-label="Logo" href={route('home')}>
                    <LazyLoadImage
                        className='h-[50px] aspect-[6/2]'
                        src={asset_url(business_settings.site_logo || placeholder6_2())}
                        alt="Logo"
                        effect='blur'
                    />
                </Link>

                {/* Collapse menu for small devices */}
                <div id="collapseMenu"
                    className={`fixed top-0 left-0 h-full max-lg:w-3/5 max-lg:min-w-[300px] max-lg:bg-white max-lg:shadow-md z-50 transition-transform duration-500 ease-in-out`}
                    style={{
                        transform: navMenuToggle ? "translateX(0)" : "translateX(-100%)",
                    }}
                >
                    <div>
                        <button onClick={e => handleClick()} id="toggleClose" className='lg:hidden absolute top-3 right-3 z-[100] rounded-full bg-white p-2 border'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-black" width="12px" viewBox="0 0 320.591 320.591">
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>
                        <div>
                            <div className='px-5 py-3 md:px-10'>
                                <Link href={route('home')}>
                                    <LazyLoadImage
                                        className='h-[50px] aspect-[6/2]'
                                        src={asset_url(business_settings.site_logo || placeholder6_2())}
                                        alt={business_settings.website_name}
                                        effect='blur'
                                    />
                                </Link>
                            </div>
                            <div className='py-4 px-5 md:px-10 '>
                                {auth.customer ?

                                    <div className="avatar flex items-center gap-2 cursor-pointer">
                                        <div className="w-[35px] rounded-full">
                                            <LazyLoadImage
                                                className='w-full aspect-square'
                                                src={asset_url(auth.customer?.image || placeholder_user())}
                                                alt={auth.customer?.name || "No user"}
                                                effect='blur'
                                            />
                                        </div>
                                        <span className='text-sm font-semibold'>{auth.customer?.name}</span>
                                    </div> : <div className="group flex items-center gap-2">
                                        <div className="cursor-pointer group-hover:shadow-xl duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='group-hover:fill-[#007bff]' width="20px" viewBox="0 0 512 512">
                                                <path
                                                    d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                                                    data-original="#000000"></path>
                                            </svg>
                                        </div>
                                        <Link href={route('login')}>
                                            <span className='hover:text-[#007bff] text-sm'>Signin</span>
                                        </Link>
                                        |
                                        <Link href={route('register')}>
                                            <span className='hover:text-[#007bff] text-sm'>Register</span>
                                        </Link>
                                    </div>

                                }
                            </div>
                            <hr />
                            <div className='px-5 md:px-10 py-5 space-y-3'>
                                <ul>
                                    {business_settings.header_menu.map((header_menu, i) => (
                                        <li key={i} className='max-lg:py-3'>
                                            <a href={header_menu.link}
                                                className='hover:text-[#007bff] text-[15px] text-[#007bff] block font-bold'>{header_menu.label}</a>
                                        </li>
                                    ))}
                                </ul>
                                {
                                    auth.customer &&
                                    <>
                                        <Link href={route('logout')} method="post" as="button" className="text-white bg-red-500 hover:bg-red-600 rounded-full hover:text-white duration-500 text-[14px] flex items-center justify-center gap-2 w-full py-2"><RiLogoutCircleRLine className='text-slate-200 text-base' />{t('Logout')}</Link>
                                    </>
                                }
                            </div>
                            {business_settings.vendor_system && <hr />}
                            {business_settings.vendor_system &&
                                <div className='flex flex-col md:flex-row items-center gap-2 md:gap-5 px-5 md:px-10 py-5'>
                                    <div className="group flex items-center gap-2">
                                        <div className="cursor-pointer group-hover:shadow-xl duration-300">
                                            <FaHouseUser className='text-slate-700 text-xl' />
                                        </div>
                                        <Link href={route('seller.register')} className="tracking-[1px] text-[12px] md:text-sm">{t('Become A Seller')}</Link>
                                        |
                                        <Link href={route('seller.login')} className="tracking-[1px] text-[12px] md:text-sm">{t('Login As Seller')}</Link>
                                    </div>
                                </div>}
                        </div>
                    </div>

                </div>

                {/* Search Input for Large Devices */}
                <div
                    className="hidden lg:flex px-6 rounded-full lg:w-6/12 mx-auto">
                    <input aria-label="Search" onChange={e => setSearch(e.target.value)} value={search} type="text" placeholder={t('Search')} className="input input-bordered input-sm py-4 lg:py-[18px] rounded-s-full rounded-e-none focus:outline-none focus:border-2 focus:border_secondary w-full bg-white text-slate-600 join-item" />
                    <button aria-label="Search" onClick={e => onSearchProduct(e)} className="w-[50px] px-3 py-[7px] lg:py-[9px] rounded-e-full bg_primary hover:bg_primary join-item"><IoSearch className='text-white text-xl' /></button>
                </div>

                <div className='flex items-center ml-auto space-x-6'>
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Notification Icon */}
                        {
                            auth.customer && <div className="relative dropdown dropdown-end cursor-pointer">
                                <span tabIndex={0} className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                                        className="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block" viewBox="0 0 371.263 371.263">
                                        <path
                                            d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                                            data-original="#000000"></path>
                                    </svg>
                                    {totalNotifications > 0 && <span className="absolute left-auto -ml-2 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{totalNotifications}</span>}
                                </span>
                                <ul tabIndex={0} className="absolute top-10 dropdown-content menu bg-white rounded z-[1] w-[380px] p-0 shadow">
                                    <NotificationDropdown />
                                </ul>
                            </div>
                        }
                        {/* Wishlist Icon */}
                        {auth.customer &&
                            <>
                                <Link aria-label="Wishlist" href={route('wishlist')}>
                                    <span className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                                            className="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block" viewBox="0 0 64 64">
                                            <path
                                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                                data-original="#000000" />
                                        </svg>
                                        {totalWishlist > 0 && <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{totalWishlist}</span>}
                                    </span>
                                </Link>
                            </>
                        }
                        {/* Cart with dropdown icon */}
                        <div className="relative group dropdown dropdown-end dropdown-hover">
                            <div tabIndex={0} className='flex items-center gap-3 cursor-pointer'>
                                <Link aria-label="Cart" href={route('cart')}>
                                    <span className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                                            className="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block" viewBox="0 0 512 512">
                                            <path
                                                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                                data-original="#000000"></path>
                                        </svg>
                                        {totalUniqueItems > 0 && <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{totalUniqueItems}</span>}
                                    </span>
                                </Link>
                            </div>
                            <div tabIndex={0} className='absolute top-5 dropdown-content dropdown-left z-[1000] bg-white rounded w-[410px] p-4 shadow-lg'>
                                {isEmpty ?
                                    <EmptyCartDropdown />
                                    :
                                    <SelectedItemDropdown />
                                }
                            </div>
                        </div>

                        {/* User Icon */}
                        {auth.customer ?
                            <div className="group dropdown dropdown-end dropdown-hover">
                                <div tabIndex={0} className="avatar flex items-center gap-2 cursor-pointer">
                                    <div className="w-[30px] lg:w-[35px] rounded-full">
                                        <LazyLoadImage
                                            className='w-full aspect-square'
                                            src={asset_url(auth.customer?.image || placeholder_user())}
                                            alt={auth.customer.name || "No user"}
                                            effect='blur'
                                        />
                                    </div>
                                    <span className='text-base font-semibold hidden xl:block'>{auth.customer.name}</span>
                                </div>

                                <div tabIndex={0} className="dropdown-content z-[1] menu shadow bg-white lg:text-slate-600 rounded w-[200px]">
                                    <Link href={route('user_dashboard')} className="border-1 border-b pb-[8px] border-slate-300 hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><MdDashboard className='text-slate-700 text-base' />{t('Dashboard')}</Link>
                                    <Link href={route('purchase_history')} className="border-1 border-b border-slate-300 py-[8px] hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><PiBasketFill className='text-slate-700 text-base' />{t('Purchase History')}</Link>
                                    <Link href={route('downloads')} className="border-1 border-b border-slate-300 py-[8px] hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><FiDownloadCloud className='text-slate-700 text-base' />{t('Downloads')}</Link>
                                    <Link href={route('conversations')} className="border-1 border-b border-slate-300 py-[8px] hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><TbMessageDots className='text-slate-700 text-base' />{t('Conversations')}</Link>

                                    {business_settings.wallet_system && <Link href={route('wallet')} className="border-1 border-b border-slate-300 py-[8px] hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><IoWallet className='text-slate-700 text-base' />{t('Wallet')}</Link>}

                                    <Link href={route('support_ticket')} className="border-1 border-b border-slate-300 py-[8px] hover:text-blue-500 hover:bg-white duration-500 text-[14px]  text-slate-600 flex items-center gap-2"><MdOutlineContactSupport className='text-slate-700 text-base' />{t('Support Ticket')}</Link>
                                    <Link href={route('logout')} method="post" as="button" className="ps-12 pb-[8px] pt-[8px] text-slate-200 bg-red-500 hover:bg-red-600 rounded hover:text-white duration-500 text-[14px] flex items-center gap-2"><RiLogoutCircleLine className='text-slate-200 text-base' />{t('Logout')}</Link>
                                </div>
                            </div>

                            :

                            <>
                                <div className="group flex items-center gap-2">
                                    <div className="cursor-pointer group-hover:shadow-xl duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='group-hover:fill-[#007bff]' width="20px" viewBox="0 0 512 512">
                                            <path
                                                d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                                                data-original="#000000"></path>
                                        </svg>
                                    </div>
                                    <Link href={route('login')}>
                                        <span className='hover:text-[#007bff] text-sm'>Signin</span>
                                    </Link>
                                    |
                                    <Link href={route('register')}>
                                        <span className='hover:text-[#007bff] text-sm'>Register</span>
                                    </Link>
                                </div>
                            </>
                        }
                    </div>

                    {/* Toggle Button for Small Devices */}
                    <button onClick={e => handleClick()} id="toggleOpen" className='lg:hidden'>
                        <svg fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="30px">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div >

            {/* Search Input for Small Devices */}
            < div className="lg:hidden flex items-center mx-auto px-[10px] pb-3 lg:pb-2" >
                <input aria-label="Search" onChange={e => setSearch(e.target.value)} value={search} type="text" placeholder={t('Search')} className="input input-bordered input-sm py-4 lg:py-[18px] rounded-s-full rounded-e-none focus:outline-none focus:border-2 focus:border_secondary w-full bg-white text-slate-600 join-item" />
                <button aria-label="Search" onClick={e => onSearchProduct(e)} className="w-[50px] px-3 py-[7px] lg:py-[9px] rounded-e-full bg_primary hover:bg_primary join-item"><IoSearch className='text-white text-xl' /></button>
            </ div>
        </header >
    );
};
