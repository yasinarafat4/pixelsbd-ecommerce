
import { fetchFeaturedCategoriesData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import FeaturedCategoriesSkeletons from './FeaturedCategoriesSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/Categories/FeaturedCategories' ) );

const FeaturedCategoriesLazyLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'featuredCategoriesData' ], queryFn: fetchFeaturedCategoriesData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ?
                <FeaturedCategoriesSkeletons />
                :
                <React.Suspense fallback={ <FeaturedCategoriesSkeletons /> }>
                    <ComponentToRender featured_categories={ data.data } />
                </React.Suspense>
            }
        </>
    );
};

export default FeaturedCategoriesLazyLoadedComponentWithSkeleton;
