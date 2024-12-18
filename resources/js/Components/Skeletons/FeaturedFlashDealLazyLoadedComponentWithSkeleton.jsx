
import { fetchFeaturedFlashDealData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import HomeFlashDealSkeletons from './HomeFlashDealSkeletons';
const ComponentToRender = React.lazy(() => import('@/Components/FlashDeal/FeaturedFlashDeal'));

const FeaturedFlashDealLazyLoadedComponentWithSkeleton = () => {
    const { data, isLoading, isError } = useQuery({ queryKey: ['featuredFlashDealeData'], queryFn: fetchFeaturedFlashDealData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });

    if (isError) return <p>Error: {isError.message}</p>;
    return (
        <>
            {isLoading ?
                <HomeFlashDealSkeletons />
                :
                <React.Suspense fallback={<HomeFlashDealSkeletons />}>
                    <ComponentToRender featured_flash_deal={data.data} />
                </React.Suspense>
            }
        </>
    );
};

export default FeaturedFlashDealLazyLoadedComponentWithSkeleton;
