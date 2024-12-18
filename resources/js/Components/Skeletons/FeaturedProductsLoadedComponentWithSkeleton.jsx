
import { fetchFeaturedProductsData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import FeaturedProductsSkeletons from './FeaturedProductsSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/FeaturedProducts/FeaturedProducts' ) );

const FeaturedProductsLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'featuredProductsData' ], queryFn: fetchFeaturedProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    if ( isError ) return <p>Error: { isError.message }</p>;

    return (
        <>
            { isLoading ?
                <FeaturedProductsSkeletons />
                :
                <React.Suspense fallback={ <FeaturedProductsSkeletons /> }>
                    <ComponentToRender featured_products={ data.data } />
                </React.Suspense>
            }
        </>
    );
};

export default FeaturedProductsLoadedComponentWithSkeleton;
