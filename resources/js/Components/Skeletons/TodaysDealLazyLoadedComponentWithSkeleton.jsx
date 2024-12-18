/* eslint-disable no-unused-vars */
import { fetchTodaysDealProductsData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TodaysDealSkeletons from './TodaysDealSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/TodaysDeal/TodaysDeal' ) );

const TodaysDealLazyLoadedComponentWithSkeleton = ( { todays_deal_products } ) =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'todaysDealProductsData' ], queryFn: fetchTodaysDealProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ?
                <TodaysDealSkeletons />
                :
                <React.Suspense fallback={ <TodaysDealSkeletons /> }>
                    <ComponentToRender todays_deal_products={ data.data } />
                </React.Suspense>
            }
        </>
    );
};

export default TodaysDealLazyLoadedComponentWithSkeleton;
