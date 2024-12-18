import Placeholder from "@/Components/Placeholder";
import { usePage } from "@inertiajs/react";
import React, { Suspense } from "react";

const LazyProductDescription = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/Overview/ProductDescription'));
const LazyProductReviews = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/Overview/ProductReviews'));
const LazyProductQueries = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/Overview/ProductQueries'));

export default function Overview() {
    const { business_settings } = usePage().props;
    return (
        <div  className="pb-5 lg:pb-0">
            <div  className="flex justify-center items-center border-[1px] bg-white border-[#aed3fa] shadow bg:white rounded-md mt-[20px] md:mt-[60px] xl:mt-[80px] lg:me-4 px-0 py-3 md:p-6">
                <Suspense fallback={<Placeholder />}>
                    <LazyProductDescription />
                </Suspense>
            </div>
            <div  className="h-fit flex justify-center items-center border-[1px] bg-white border-[#aed3fa] shadow bg:white rounded-md mt-[20px] lg:me-4 px-0 py-3 md:p-6">
                <Suspense fallback={<Placeholder />}>
                    <LazyProductReviews />
                </Suspense>
            </div>
            {business_settings.product_query_activation && <div  className="flex justify-center items-center border-[1px] bg-white border-[#aed3fa] shadow bg:white rounded-md mt-[20px] lg:me-4 px-0 py-3 md:p-6">
                <Suspense fallback={<Placeholder />}>
                    <LazyProductQueries />
                </Suspense>
            </div>}
        </div>
    )

}
