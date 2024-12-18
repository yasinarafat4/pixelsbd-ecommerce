import { fetchAllBrandsData } from "@/Api";
import NothingFound from "@/Components/NothingFound";
import PageTitle from "@/Components/PageTitle/PageTitle";
import AllBrandSkeletons from "@/Components/Skeletons/AllBrandSkeletons";
import BrandCardSkeletons from "@/Components/Skeletons/BrandCardSkeletons";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";

const LazyBrandCard = React.lazy(() => import('@/Components/Cards/BrandCard'));

export default function AllBrands() {
    const { t } = useLaravelReactI18n();
    const { data, isLoading, isError } = useQuery({ queryKey: ['allBrandsData'], queryFn: fetchAllBrandsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });
    console.log('data', data);

    return (
        <DefaultThemeLayout>
            <Head title="All Brands" />
            {/* Top section */}
            {isLoading ? <AllBrandSkeletons /> : <>
                <div className="border-b py-2">
                    <PageTitle title={'Brands'} />
                    <p className="text-sm lg:text-base">{data.data.length} {data.data.length > 1 ? 'Brands' : 'Brand'} Found!</p>
                </div>

                {data.data.length > 0 ? <div className="my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                    {
                        data.data.map((brand, i) => (
                            <div key={i}>
                                {/* <BrandCardSkeletons /> */}
                                <Suspense fallback={<BrandCardSkeletons />}>
                                    <LazyBrandCard brand={brand} />
                                </Suspense>
                            </div>
                        ))
                    }

                </div> : <NothingFound title={"No Brands Found!"} />}
            </>}

        </DefaultThemeLayout>
    )

}
