import { ProductContext } from "@/ProductContext";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useContext, useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { placeholder1_1 } from "@/Helpers";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ImageGallery() {
    const { t } = useLaravelReactI18n();

    const productcontext = useContext(ProductContext);
    const product = productcontext

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div  className="slider-container">
            <Swiper
                slidesPerView={1}
                spaceBetween={1}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
            >
                {product.photos.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div title="Click to Zoom"  className="">
                            <InnerImageZoom
                                src={img.path || placeholder1_1()}
                                zoomSrc={img.path || placeholder1_1()}
                                zoomScale={1}
                                fadeDuration={0}
                                height={500}
                                width={500}
                                fullscreenOnMobile={true}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={6}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                 className="thumbSwiper"
            >
                {product.photos.map((img, i) => (
                    <SwiperSlide key={i}  className="cursor-pointer">
                        <div  className="h-[48px] xl:h-[65px]">
                            <LazyLoadImage
                                effect='blur'
                                 className="h-full w-full"
                                src={img.path || placeholder1_1()}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )

}
