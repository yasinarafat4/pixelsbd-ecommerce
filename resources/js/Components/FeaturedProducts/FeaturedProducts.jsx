import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React, { Suspense, useMemo } from "react";
import { GoArrowRight } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSectionTitle from '../HomeSectionTitle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const LazyProductCard = React.lazy(() => import('@/Components/Cards/ProductCard'));

const FeaturedProducts = ({ featured_products }) => {

    const { t } = useLaravelReactI18n();

    // Memoizing the featured products rendering to optimize performance
    const productItems = useMemo(() => {
        return featured_products.map((product, i) => (
            <SwiperSlide key={i}>
                <Suspense fallback={<ProductCardSkeletons />}>
                    <LazyProductCard product={product} />
                </Suspense>
            </SwiperSlide>
        ));
    }, [featured_products]);

    return (
        <div> {featured_products.length > 0 && <>
            <div className="featured_products flex justify-between items-center border-b pb-1 mb-4">
                <HomeSectionTitle title={t('Featured Products')} />
                <Link href={route("product_list", [{ 'type': 'featured' }])} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
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

export default React.memo(FeaturedProducts);
