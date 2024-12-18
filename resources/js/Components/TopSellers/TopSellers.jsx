import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import TopSellersCard from "../Cards/SellerCard";
import HomeSectionTitle from "../HomeSectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import React from "react";
import { Navigation } from 'swiper/modules';

const TopSellers = ({ shops }) => {
    const { t } = useLaravelReactI18n();

    return (
        <>
            {shops.length > 0 && <div className="flex justify-between items-center border-b pb-1 mb-4">
                <HomeSectionTitle title={t('Top Sellers')} />
                <Link href={route('all_sellers')} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>}
            <>
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 8,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 8,
                        },
                        1440: {
                            slidesPerView: 5,
                            spaceBetween: 8,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        shops.map((shop, i) => (
                            <SwiperSlide key={i}>  <TopSellersCard shop={shop} /></SwiperSlide>
                        ))
                    }
                </Swiper>
            </>
        </>
    )

}

export default React.memo(TopSellers)




