import AdminLayout from "@/Layouts/AdminLayout";

import { Head, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RiHomeGearFill } from "react-icons/ri";
import BannerOneContents from "./BannerOneContents";
import BannerThreeContents from "./BannerThreeContents";
import BannerTwoContents from "./BannerTwoContents";
import CategoryProducts from "./CategoryProducts";
import CouponSection from "./CouponSection";
import HomeSlider from "./HomeSlider";
import TopBrands from "./TopBrands";

export default function HomePageSetting ( { tab, categories, brands } )
{
    const { t } = useLaravelReactI18n();
    const [ index, setIndex ] = useState( tab ?? 'home_slider' );

    const handleTabChange = ( e ) =>
    {
            router.visit( route( 'admin.website.homepage_setting', [ { tab: e } ] ), {
                preserveState: true,
                preserveScroll: true,
                replace: true
            } )
        setIndex( e )
    }

    return (
        <AdminLayout>
            <Head title="Select Homepage" />
            <div  className="bg-[#FEFEFE] ps-5 py-6">
                {/* Breadcrumbs */ }
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{ t( 'Dashboard' ) }</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <RiHomeGearFill  className="text-lg text-slate-900" />
                                <span>{ t( 'Homepage Setting' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Contentes */ }
                <div  className="mr-6 my-4">
                    <div  className="border px-4 py-3">
                        <h2  className="text-[16px] font-medium">{ t( 'Homepage Settings' ) }</h2>
                    </div>
                    <div  className="drawer drawer-open">
                        <input id="my-drawer-2" type="checkbox"  className="drawer-toggle" />

                        {/* Tabs Content Here */ }
                        <div  className="drawer-content py-4 ps-6">

                            {/* Home Slider */ }
                            {
                                index === "home_slider" && (
                                    <div>
                                        <HomeSlider />
                                    </div>
                                )
                            }

                            {/* Banner Level One */ }
                            {
                                index === "banner_1" && (
                                    <div>
                                        <BannerOneContents />
                                    </div>
                                )
                            }

                            {/* Banner Level Two */ }
                            {
                                index === "banner_2" && (
                                    <div>
                                        <BannerTwoContents />
                                    </div>
                                )
                            }

                            {/* Banner Level Three */ }
                            {
                                index === "banner_3" && (
                                    <div>
                                        <BannerThreeContents />
                                    </div>
                                )
                            }

                            {/* Coupon Section */ }
                            {
                                index === "coupon_section" && (
                                    <div>
                                        <CouponSection />
                                    </div>
                                )
                            }

                            {/* Category Products */ }
                            {
                                index === "home_categories" && (
                                    <div>
                                        <CategoryProducts categories={ categories } />
                                    </div>
                                )
                            }

                            {/* Top Brands */ }
                            {
                                index === "top_brands" && (
                                    <div>
                                        <TopBrands brands={ brands } />
                                    </div>
                                )
                            }

                        </div>
                        <div  className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar"  className="drawer-overlay"></label>
                            <ul  className="menu p-4 gap-2" >
                                {/* Tabs Here */ }
                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "home_slider" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ ( e ) => handleTabChange( 'home_slider' ) }>
                                    {t('Home Slider')}
                                </li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "banner_1" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ ( e ) => handleTabChange( 'banner_1' ) }>
                                    {t('Banner Section 1')}
                                </li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "banner_2" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ () => handleTabChange( 'banner_2' ) }>{t('Banner Section 2')}</li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "banner_3" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ () => handleTabChange( 'banner_3' ) }>{t('Banner Section 3')}</li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "coupon_section" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ () => handleTabChange( 'coupon_section' ) }>{t('Coupon Section')}</li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "home_categories" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ () => handleTabChange( 'home_categories' ) }>{t('Category Wise Products')}</li>

                                <li  className={ `tab tab-bordered text-slate-600 flex justify-center items-start w-64 ${ index === "top_brands" ? "text-blue-600 bg-[#F1FAFD] py-5" : "hover:text-blue-600 hover:bg-[#F1FAFD] py-5 duration-300" }` }
                                    onClick={ () => handleTabChange( 'top_brands' ) }>{t('Top Brands')}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
