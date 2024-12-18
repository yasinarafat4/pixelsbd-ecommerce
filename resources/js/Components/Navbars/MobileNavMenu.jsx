import { asset_url, placeholder_user } from '@/Helpers';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaHouseUser } from "react-icons/fa";
import { GrWorkshop } from 'react-icons/gr';
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbLogin2, TbLogout2 } from 'react-icons/tb';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function MobileNavMenu() {
    const { t } = useLaravelReactI18n();
    const { auth, business_settings } = usePage().props


    return (
        <div  className="dropdown lg:hidden">
            <div tabIndex={0} role="button"  className="lg:hidden md:ps-1 pe-3">
                <svg xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <div tabIndex={0}  className="menu menu-sm dropdown-content z-30 mt-4 px-2 py-5 shadow bg-white  text-black rounded-md w-[310px]">
                {/* Close Dropdown Icon */}
                <div  className="flex justify-end">
                    <button  className="p-1" onClick={() => document.activeElement?.blur()}>
                        <RxCross2  className="text-xl font-bold" />
                    </button>
                </div>
                {/* Login & Register */}
                {
                    auth.customer ?
                        <>
                            <div  className='flex flex-col items-center gap-2 mx-4'>
                                <div  className="avatar">
                                    <div  className="w-16 rounded-full">
                                        <LazyLoadImage
                                            src={asset_url(auth.customer?.image || placeholder_user())}
                                             className='w-full aspect-square'
                                            alt={auth.customer.name}
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
                        </> : (
                            <div  className='grid grid-cols-2 justify-center items-center gap-2 border-b border-slate-300 px-1 pb-3'>
                                <p  className="hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                                    <TbLogin2  className='text-slate-700 text-base' />
                                    <Link href={route('login')}  className="tracking-[1px]">{t('Sign In')}</Link>
                                </p>
                                <p  className="hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                                    <TbLogout2  className='text-slate-700 text-base' />
                                    <Link href={route('register')}  className="tracking-[1px]">{t('Sign Up')}</Link>
                                </p>
                            </div>
                        )
                }
                <hr />
                <div  className='py-5 space-y-3'>
                    {business_settings.header_menu.map((header_menu, i) => (
                        <div key={i}  className='ms-4 text-base'>
                            <Link href={header_menu.link}>
                                {header_menu.label}
                            </Link>
                        </div>
                    ))}

                    {
                        auth.customer &&
                        <>
                            <Link href={route('logout')} method="post" as="button"  className="text-white bg-red-500 hover:bg-red-600 rounded-full hover:text-white duration-500 text-[14px] flex items-center justify-center gap-2 w-full py-2"><RiLogoutCircleLine  className='text-slate-200 text-base' />{t('Logout')}</Link>
                        </>
                    }
                </div>
                {business_settings.vendor_system && <hr />}
                {business_settings.vendor_system && <div  className='grid grid-cols-2 justify-center items-center gap-2 px-1 pt-5'>
                    <p  className="hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                        <GrWorkshop  className='text-slate-700 text-base' />
                        <Link href={route('seller.register')}  className="tracking-[1px]">{t('Become A Seller')}</Link>
                    </p>
                    <p  className="hover:text_primary hover:bg-white duration-500 text-[13px] text-slate-600 flex items-center gap-1">
                        <FaHouseUser  className='text-slate-700 text-base' />
                        <Link href={route('seller.login')}  className="tracking-[1px]">{t('Login As Seller')}</Link>
                    </p>
                </div>}
            </div>
        </div>
    );
}
