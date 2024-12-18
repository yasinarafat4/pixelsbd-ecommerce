
import { fetchTopSellersData } from '@/Api';
import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TopSellerSkeletons from './TopSellerSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/TopSellers/TopSellers' ) );

const TopSellersLazyLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'topSellersData' ], queryFn: fetchTopSellersData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    const { business_settings } = usePage().props
    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { business_settings.vendor_system &&
                <>
                    { isLoading ? <TopSellerSkeletons />
                        :
                        <React.Suspense fallback={ <TopSellerSkeletons /> }>
                            <ComponentToRender shops={ data.data } />
                        </React.Suspense> }
                </>
            }
        </>
    );
};

export default TopSellersLazyLoadedComponentWithSkeleton;
