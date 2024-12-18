/* eslint-disable no-unused-vars */
import { fetchNewArrivalProductsData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import NewArrivalsSkeletons from './NewArrivalsSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/NewArrivals/NewArrivals' ) );

const NewArrivalsLazyLoadedComponentWithSkeleton = ( { newest_products } ) =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'newArrivalProductsData' ], queryFn: fetchNewArrivalProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ?
                <NewArrivalsSkeletons />
                :
                <React.Suspense fallback={ <NewArrivalsSkeletons /> }>
                    <ComponentToRender new_arrivals={ data.data } />
                </React.Suspense>
            }
        </>
    );
};

export default NewArrivalsLazyLoadedComponentWithSkeleton;
