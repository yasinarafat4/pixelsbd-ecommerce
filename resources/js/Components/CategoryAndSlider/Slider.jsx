import { Link } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Autoplay, Navigation } from 'swiper/modules';


const Slider = ( { sliders } ) =>
{
    const sliderItems = useMemo( () =>
    {
        return sliders?.map( ( slider, i ) => (
            <SwiperSlide key={ i }>
                <Link href={ slider.url }>
                    <div  className='h-[157px] md:h-[375px] xl:h-[480px]'>
                        <LazyLoadImage
                            alt="slider"
                            effect="blur"
                            src={ slider.photo }
                             className='h-full w-full aspect-[4/2] object-cover'
                        />
                    </div>
                </Link>
            </SwiperSlide>
        ) );
    }, [ sliders ] );

    return (
        <>
            <div  className='col-span-9 lg:h-[375px] xl:h-[480px] shadow'>
                <Swiper
                    slidesPerView={ 1 }
                    loop={ true }
                    spaceBetween={ 0 }
                    navigation={ true }
                    autoplay={ {
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    } }
                    modules={ [ Navigation, Autoplay ] }
                     className="mySwiper"
                >
                    { sliderItems }
                </Swiper>
            </div>

        </>

    )
}

export default React.memo( Slider );
