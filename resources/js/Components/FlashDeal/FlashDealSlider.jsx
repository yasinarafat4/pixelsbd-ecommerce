import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import ProductCardSkeletons from "../Skeletons/ProductCardSkeletons";

const LazyProductCard = React.lazy( () => import( '@/Components/Cards/ProductCard' ) );

export default function FlashDealSlider ( { flashDeal } )
{



    return (
        <div className="flashDeal slider-container slider-flash">
            <Swiper
                slidesPerView={ 2 }
                spaceBetween={ 1 }
                navigation={ true }
                breakpoints={ {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                } }
                modules={ [ Navigation ] }
                 className="mySwiper"
            >
                {
                    flashDeal.products.data.map( ( product, i ) => (
                        <SwiperSlide key={ i }>
                            <Suspense fallback={ <ProductCardSkeletons /> }>
                                <LazyProductCard product={ product } />
                            </Suspense>
                        </SwiperSlide>
                    ) )
                }
            </Swiper>

        </div>
    )
}
