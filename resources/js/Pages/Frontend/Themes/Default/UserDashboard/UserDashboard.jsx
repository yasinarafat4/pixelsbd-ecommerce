import NothingFound from "@/Components/NothingFound";
import AddressModal from "@/Components/Popups/AddressModal";
import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import { currencyFormat } from "@/Helpers";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaPlus, FaWrench } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineMoveToInbox, MdOutlineShoppingCart } from "react-icons/md";
import RechargeWallet from "./RechargeWallet";

const LazyProductCard = React.lazy(() => import('@/Components/Cards/ProductCard'));

export default function UserDashboard({ wishlists, countries, payment_methods, expenditure, cart, total_products_ordered, default_address }) {

    const { t } = useLaravelReactI18n();
    const { auth, active_currency_symbol, business_settings } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    // Modal Handlers
    function handelShowModal() {
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };

    useEffect(() => {
        window.Echo.channel('test.' + auth.customer.id)
            .listen('TestEvent', function (response) {
            });
    }, []);


    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="User Dashboard" />
            <div  className="space-y-4">
                {/* Dashboard Container*/}
                <div  className="space-y-3 md:space-y-4 xl:space-y-6">
                    {/* Top Containner */}
                    <div  className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-2 xl:gap-6">
                        {/* Wallet */}
                        {business_settings.wallet_system &&
                            <div  className="">
                                <RechargeWallet payment_methods={payment_methods} />
                            </div>
                        }
                        <div  className="flex flex-col md:flex-row items-center gap-4">
                            {/* Total Expenditure */}
                            <div  className="flex flex-col justify-center bg_primary w-full h-full px-6 py-5 space-y-5">
                                <div  className="flex items-center gap-3">
                                    <div  className="h-12 w-12 flex justify-center items-center rounded-full bg_soft_primary border-2 border-slate-200 ">
                                        {/* <BsCurrencyDollar  className="text-white text-xl" /> */}
                                        <p  className="text-white text-2xl" >{active_currency_symbol}</p>
                                    </div>
                                    <div>
                                        <p  className="text-xl text-white">{t('Total Expenditure')}</p>
                                        <p  className="text-lg font-medium text-white">{currencyFormat(expenditure || 0)}</p>
                                    </div>
                                </div>
                                <Link href={route('purchase_history')}><button  className="flex items-center gap-2 text-white text-sm"><span>{t('View Order History')}</span> <span><IoIosArrowForward /></span></button></Link>
                            </div>
                            {/* Last Recharge */}
                            <div  className="flex flex-col justify-center bg_secondary w-full h-full px-6 py-5 space-y-5">
                                <div  className="flex items-center gap-3">
                                    <div  className="p-3 rounded-full bg_soft_secondary border-2 border-slate-200">
                                        <FaWrench  className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <p  className="text-xl text-white">{t('24/7 Support')}</p>
                                        <p  className="text-lg font-medium text-white"></p>
                                    </div>
                                </div>
                                <Link href={route('support_ticket')}><button  className="flex items-center gap-2 text-white text-sm"><span>{t('View Support Ticket')}</span> <span><IoIosArrowForward /></span></button></Link>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Containner */}
                    <div  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-6">
                        {/* Products */}
                        <div  className="md:flex flex-col md:flex-row gap-3 md:gap-4 xl:gap-6 bg-white">
                            {/* Products Calculations */}
                            <div  className="bg-white space-y-2 w-full h-full px-6 border border-slate-300">
                                <div  className="flex items-center gap-3 border-b py-6">
                                    <div  className="p-3 rounded-full bg-[#D42D2A] text-white">
                                        <MdOutlineShoppingCart  className="text-lg" />
                                    </div>
                                    <div>
                                        <p  className="text-lg font-semibold">{cart.length}</p>
                                        <p  className="text-sm text-slate-600">{t('Products in Cart')}</p>
                                    </div>
                                </div>

                                <div  className="flex items-center gap-3 border-b py-6">
                                    <div  className="p-3 rounded-full bg-[#3490F3] text-white">
                                        <CiHeart  className="text-lg" />
                                    </div>
                                    <div>
                                        <p  className="text-lg font-semibold">{wishlists.length}</p>
                                        <p  className="text-sm text-slate-600">{t('Products in Wishlist')}</p>
                                    </div>
                                </div>

                                <div  className="flex items-center gap-3 py-6">
                                    <div  className="p-3 rounded-full bg-[#85B567] text-white">
                                        <MdOutlineMoveToInbox  className="text-lg" />
                                    </div>
                                    <div>
                                        <p  className="text-lg font-semibold">{total_products_ordered}</p>
                                        <p  className="text-sm text-slate-600">{t('Total Products Ordered')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Default Shipping */}
                        <div  className={`bg-white flex flex-col w-full h-full px-6 py-3 border border-slate-300 ${default_address && 'gap-4'}`}>
                            <h2  className="text-lg font-semibold">Default Shipping Address</h2>
                            {default_address ?
                                <div  className="text-sm xl:text-base font-normal cursor-pointer p-2 border border-[#16A34A]">
                                    <p><strong>Address</strong> : {default_address?.address}</p>
                                    <p><strong>Country</strong> : {default_address?.country.name}</p>
                                    <p><strong>State</strong> : {default_address?.state.name}</p>
                                    <p><strong>City</strong> : {default_address?.city.name}</p>
                                    <p><strong>Phone</strong> : {default_address?.phone}</p>
                                </div> :
                                <div  className='flex flex-col justify-center items-center p-2'>
                                    <img src="/assets/address-not-found.png"  className="h-[120px]" alt="Address not found" />
                                    <p  className='text-base text-center font-medium'>Default address not found. Please add a default address!</p>
                                </div>}
                            {/* Modal */}
                            <AddressModal countries={countries} closeModal={closeModal} showModal={showModal} />
                            <button onClick={e => handelShowModal()}  className='bg-[#373D45] hover:bg-[#292933] duration-300 text-sm xl:text-base py-[10px] px-3 rounded-full border-2 text-white flex items-center justify-center gap-5 w-full'> <FaPlus  className='text-sm' /> <span>{t('Add New Address')}</span></button>
                        </div>
                    </div>
                </div>
                {/* Wishlist Container */}
                <div>
                    <div  className="flex items-center justify-between py-1">
                        <h2  className="text-base font-semibold">{t('My Wishlist')}</h2>
                        <Link href={route('wishlist')}  className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight  className="text-lg font-medium text-slate-600" /></Link>
                    </div>
                    {wishlists.length > 0 ? <div  className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {
                            wishlists.map((wishlist, i) => (
                                <div key={i}  className="z-[1]">
                                    <Suspense fallback={<ProductCardSkeletons />}>
                                        <LazyProductCard product={wishlist.product} />
                                    </Suspense>
                                </div>
                            ))
                        }
                    </div> :
                        <><NothingFound title={'Nothing in the wishlist!'} /></>
                    }
                </div>
            </div>
        </UserDashboardLayout>
    )

}
