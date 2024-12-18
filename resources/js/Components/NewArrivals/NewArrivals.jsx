import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeSectionTitle from "../HomeSectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import React, { Suspense } from "react";
import { Navigation } from 'swiper/modules';
import HorizontalProductCardSkeletons from "../Skeletons/HorizontalProductCardSkeletons";

const LazyNewArrivalsCard = React.lazy(() => import('@/Components/Cards/HorizontalProductCard'));

const NewArrivals = ({ new_arrivals }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div>{new_arrivals.length > 0 && <>
            <div className="new_arrivals flex justify-between items-center border-b pb-1 mb-4">
                <HomeSectionTitle title={t('New Arrivals')} />

                <Link href={route('product_list', [{ 'type': 'new-arrival', 'sort_by': 'newest' }])} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={5}
                navigation={true}
                breakpoints={{
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    1440: {
                        slidesPerView: 5,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {new_arrivals.map((product, i) => (
                    <SwiperSlide key={i}>
                        {/* <NewArrivalsCardSkeletons /> */}
                        <Suspense fallback={<HorizontalProductCardSkeletons />}>
                            <LazyNewArrivalsCard product={product} />
                        </Suspense>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>}</div>
    )

}

export default React.memo(NewArrivals);
