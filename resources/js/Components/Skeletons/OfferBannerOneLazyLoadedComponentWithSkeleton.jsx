
import { fetchBannerOneData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import OfferBannerSkeletons from './OfferBannerSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/OfferBanner/OfferBanner' ) );

const OfferBannerOneLazyLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'bannerOneData' ], queryFn: fetchBannerOneData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ? <OfferBannerSkeletons /> : <React.Suspense fallback={ <OfferBannerSkeletons /> }>
                <ComponentToRender offer_banner={ data.data } />
            </React.Suspense> }
        </>
    );
};

export default OfferBannerOneLazyLoadedComponentWithSkeleton;
