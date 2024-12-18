import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryItemBanner from "./CategoryItemBanner";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const LazyProductCard = React.lazy( () => import( '@/Components/Cards/ProductCard' ) );

const CategoryItem = ( { home_categories } ) =>
{

    return (
        home_categories?.map( ( category_product, i ) => (
                <div key={ i } className="category_product my-2 md:grid md:grid-cols-12 lg:grid-cols-10 xl:grid-cols-12 justify-center items-center border p-2 rounded-sm gap-2" >
                    <div  className="md:col-span-6 lg:col-span-4">
                        <CategoryItemBanner category={ category_product } />
                    </div>
                    <div  className="md:col-span-6 lg:col-span-6 xl:col-span-8">
                        <>
                            <Swiper
                                slidesPerView={ 2 }
                                spaceBetween={ 8 }
                                navigation={ true }
                                breakpoints={ {
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 5,
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
                                { category_product.products.data.map( ( product, i ) => (
                                    <SwiperSlide key={ i }>
                                        <Suspense fallback={ <ProductCardSkeletons /> }>
                                            <LazyProductCard product={ product } />
                                        </Suspense>
                                    </SwiperSlide>
                                ) ) }
                            </Swiper>
                        </>
                    </div>
                </div >
        ) )

    )

}

export default React.memo( CategoryItem )
