
import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense, useMemo } from "react";
import { GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSectionTitle from "../HomeSectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const LazyProductCard = React.lazy(() => import('@/Components/Cards/ProductCard'));

const TodaysDeal = ({ todays_deal_products }) => {
    const { t } = useLaravelReactI18n();

    // Memoizing the product list rendering to optimize performance
    const productItems = useMemo(() => {
        return todays_deal_products.map((product, i) => (
            <SwiperSlide key={i}>
                <Suspense fallback={<ProductCardSkeletons />}>
                    <LazyProductCard product={product} />
                </Suspense>
            </SwiperSlide>
        ));
    }, [todays_deal_products]);

    return (
        <div> {todays_deal_products.length > 0 && <>
            <div className="todays_deal_products flex justify-between items-center border-b pb-1 mb-4">
                <HomeSectionTitle title={t('Todays Deal')} />
                <Link href={route('product_list', [{ 'type': 'todays-deal' }])} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={5}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    1440: {
                        slidesPerView: 6,
                        spaceBetween: 10
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {productItems}
            </Swiper>
        </>}</div>
    )

}

export default React.memo(TodaysDeal);
