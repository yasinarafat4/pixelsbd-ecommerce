import { fetchMoreStoreItemsData, fetchSimilarProductsData } from "@/Api";
import Placeholder from "@/Components/Placeholder";
import ImageGallarySkeletons from "@/Components/Skeletons/ImageGallarySkeletons";
import MoreStoreItemSkeletons from "@/Components/Skeletons/MoreStoreItemSkeletons";
import ProductInfoSkeletons from "@/Components/Skeletons/ProductInfoSkeletons";
import SingleProductBenefitsSkeletons from "@/Components/Skeletons/SingleProductBenefitsSkeletons";
import VendorInfoSkeletons from "@/Components/Skeletons/VendorInfoSkeletons";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { ProductContext } from "@/ProductContext";
import { Head, usePage } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import VendorInfo from "./VendorInfo";

const LazyImageGallery = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/ImageGallery'));
const LazyProductInfo = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/ProductInfo'));
const LazyOverview = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/Overview/Overview'));
const LazyMoreStoreItem = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/MoreStoreItem'));
const LazyVendorInfo = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/VendorInfo'));
const LazyBenefits = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/Benefits'));
const LazySimilarProducts = React.lazy(() => import('@/Pages/Frontend/Themes/Default/SingleProductPage/SimilarProducts'));

export default function SingleProductPage({ product, breadcrumbs }) {
    const { t } = useLaravelReactI18n();

    const { data: moreStoreItemsData, isLoading: moreStoreItemsLoading, isError: moreStoreItemsError } = useQuery({ queryKey: ['moreStoreItemsData', product.id, product.user.id, product.user.user_type], queryFn: fetchMoreStoreItemsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });
    const { data: similarProductsData, isLoading: similarProductsLoading, isError: similarProductsError } = useQuery({ queryKey: ['similarProductsData', product.id, product.category.id], queryFn: fetchSimilarProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });

    const { business_settings } = usePage().props;

    return (
        <DefaultThemeLayout>
            <Head title={product?.name} />
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs text-slate-600 mt-3 pe-2 truncate ...">
                <ul>
                    <li>
                        <a href={route('categories')} className="inline-flex gap-1 items-center">
                            <MdSpaceDashboard className="text-base" />
                            <span>{t('Category')}</span>
                        </a>
                    </li>
                    {breadcrumbs.map((breadcrumb, i) => (<li key={i}>
                        <span className="inline-flex gap-1 items-center">
                            <span>{breadcrumb.name}</span>
                        </span>
                    </li>))}

                    <li>
                        <span className="inline-flex gap-1 items-center">
                            <span className="truncate ...">{product?.name}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <ProductContext.Provider value={product}>
                <div className="md:grid grid-cols-12 my-4">
                    <div className="md:col-span-12 lg:col-span-9">
                        <div className="md:grid grid-cols-5">
                            <div className="col-span-2">
                                {/* <ImageGallarySkeletons /> */}
                                <Suspense fallback={<ImageGallarySkeletons />}>
                                    <LazyImageGallery />
                                </Suspense>
                            </div>
                            <div className="col-span-3">
                                {/* <ProductInfoSkeletons /> */}
                                <Suspense fallback={<ProductInfoSkeletons />}>
                                    <LazyProductInfo />
                                </Suspense>
                            </div>
                        </div>
                        <Suspense fallback={<Placeholder />}>
                            <LazyOverview />
                        </Suspense>
                    </div>
                    <div className="md:hidden lg:block lg:col-span-3">
                        <Suspense fallback={<SingleProductBenefitsSkeletons />}>
                            {/* <SingleProductBenefitsSkeletons /> */}
                            <LazyBenefits />
                        </Suspense>

                        {business_settings.vendor_system &&
                            <Suspense fallback={<VendorInfoSkeletons />}>
                                {/* <VendorInfoSkeletons /> */}
                                <LazyVendorInfo />
                            </Suspense>
                        }
                        {moreStoreItemsLoading ? <MoreStoreItemSkeletons /> : <Suspense fallback={<MoreStoreItemSkeletons />}>
                            <LazyMoreStoreItem more_store_products={moreStoreItemsData.data} />
                        </Suspense>}

                    </div>
                </div>

                <div className="hidden md:block lg:hidden">
                    <div className={`grid grid-cols-2 gap-4`}>
                        <div>
                            {moreStoreItemsLoading ? <MoreStoreItemSkeletons /> : <Suspense fallback={<MoreStoreItemSkeletons />}>
                                <LazyMoreStoreItem more_store_products={moreStoreItemsData.data} />
                            </Suspense>}
                        </div>
                        <div>
                            {business_settings.vendor_system &&
                                <VendorInfo />
                            }
                        </div>
                    </div>
                </div>
                <div>

                    {similarProductsLoading ? <Placeholder /> : <Suspense fallback={<Placeholder />}>
                        <LazySimilarProducts similar_products={similarProductsData.data} product={product} />
                    </Suspense>}
                </div>
            </ProductContext.Provider>
        </DefaultThemeLayout >
    );
}
