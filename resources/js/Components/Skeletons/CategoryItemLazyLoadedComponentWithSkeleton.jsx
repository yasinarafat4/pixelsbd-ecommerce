
import { fetchHomeCategoriesData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryItemSkeletons from './CategoryItemSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/Categories/CategoryItem' ) );

const CategoryItemLazyLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'homeCategoriesData' ], queryFn: fetchHomeCategoriesData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ?
                <CategoryItemSkeletons />
                :
                <React.Suspense fallback={ <CategoryItemSkeletons /> }>
                    <ComponentToRender home_categories={ data.data } />
                </React.Suspense>
            }
        </>
    );
};

export default CategoryItemLazyLoadedComponentWithSkeleton;
