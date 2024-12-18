
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSectionTitle from "../HomeSectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import React, { Suspense, useMemo } from "react";
import { Navigation } from 'swiper/modules';
const LazyCategoryCard = React.lazy(() => import('@/Components/Cards/CategoryCard'));

const FeaturedCategories = ({ featured_categories }) => {
    console.log('featured_categories', featured_categories);

    const { t } = useLaravelReactI18n();

    // Memoizing the featured categories rendering to optimize performance
    const categoryItems = useMemo(() => {
        return featured_categories.map((category, i) => (
            <SwiperSlide key={i}>
                <Suspense fallback={<>Loading...</>}>
                    <LazyCategoryCard category={category} />
                </Suspense>
            </SwiperSlide>
        ));
    }, [featured_categories]);

    return (
        <div> {featured_categories.length > 0 && <>
            <div className="featured_categories flex justify-between items-center pb-3 border-b mb-4">
                <HomeSectionTitle title={t('Categories')} />
                <Link href={route('categories')} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>
            <>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={4}
                    navigation={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 6,
                            spaceBetween: 5,
                        },
                        1024: {
                            slidesPerView: 7,
                            spaceBetween: 5,
                        },
                        1440: {
                            slidesPerView: 9,
                            spaceBetween: 5,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {categoryItems}
                </Swiper>
            </>
        </>}</div>
    )

}

export default React.memo(FeaturedCategories);
