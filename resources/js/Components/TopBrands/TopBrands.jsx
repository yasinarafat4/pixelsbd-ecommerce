import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";
import { GoArrowRight } from "react-icons/go";

import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSectionTitle from "../HomeSectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import BrandCardSkeletons from "../Skeletons/BrandCardSkeletons";

const LazyBrandCard = React.lazy(() => import('@/Components/Cards/BrandCard'));

const TopBrands = ({ top_brands }) => {
    const { t } = useLaravelReactI18n();


    return (
        <>
            {top_brands.length > 0 && <div className="top_brands flex justify-between items-center border-b pb-1 mb-4">
                <HomeSectionTitle title={t('Top Brands')} />
                <Link href={route('brands')} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>}
            <>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                        1440: {
                            slidesPerView: 7,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {top_brands.map((brand, i) => (
                        <SwiperSlide key={i}>
                            {/* <BrandCardSkeletons /> */}
                            <Suspense fallback={<BrandCardSkeletons />}>
                                <LazyBrandCard brand={brand} />
                            </Suspense>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </>
    )

}
export default React.memo(TopBrands)
