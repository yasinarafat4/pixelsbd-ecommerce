import { Link } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules


const OfferBanner = ({ offer_banner }) => {

    // Memoizing the banner items rendering
    const bannerItems = useMemo(() => {
        return offer_banner.map((banner, i) => (
            <SwiperSlide key={i}>
                <Link aria-label='Offer banner url' href={banner.url}>
                    <LazyLoadImage
                        effect="blur"
                        src={banner.photo}
                        alt="offer banner"
                        className='h-[140px] md:h-[180px] xl:h-[300px] w-full object-cover'
                    />
                </Link>
            </SwiperSlide>
        ))
    }, [offer_banner]);

    return (
        <div>
            {offer_banner.length > 0 && <div className="offer_banner slider-container slider-offer_banner mt-1">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={1}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={false}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: offer_banner.length,
                            spaceBetween: 10,
                        },
                        1440: {
                            slidesPerView: offer_banner.length,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {bannerItems}
                </Swiper>
            </div>}
        </div>
    )

}

export default React.memo(OfferBanner)
