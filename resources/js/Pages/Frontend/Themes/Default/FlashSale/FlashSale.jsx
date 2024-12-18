

import { fetchFlashDealsData } from "@/Api";
import FlashDealTimer from "@/Components/FlashDeal/FlashDealTimer";
import NothingFound from "@/Components/NothingFound";
import PageTitle from "@/Components/PageTitle/PageTitle";
import AllFlashDealSkeletons from "@/Components/Skeletons/AllFlashDealSkeletons";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";

export default function FlashSale() {

    const { data, isLoading, isError } = useQuery({ queryKey: ['flashDealsData'], queryFn: fetchFlashDealsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });
    console.log('flashDealsData', data);

    return (
        <DefaultThemeLayout>
            <Head title="Flash Sale" />
            {/* Top section */}
            <div className="border-b py-2">
                <PageTitle title={'Flash Sale'} />
            </div>
            {isLoading ? <AllFlashDealSkeletons/> : <>{data.data.length > 0 ? <div className="my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-5">
                {
                    data.data.map((flashDeal, index) => (
                        <FlashDealTimer key={index} flashDeal={flashDeal} />
                    ))
                }
            </div> : <NothingFound title={"No Flash Sale Found!"} />}</>}
        </DefaultThemeLayout>
    )

}
