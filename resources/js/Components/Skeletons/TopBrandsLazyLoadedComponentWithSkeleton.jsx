
import { fetchTopBrandsData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TopBrandSkeletons from './TopBrandSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/TopBrands/TopBrands' ) );

const TopBrandsLazyLoadedComponentWithSkeleton = () =>
{
    const { data, isLoading, isError } = useQuery( { queryKey: [ 'topBrandsData' ], queryFn: fetchTopBrandsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    if ( isError ) return <p>Error: { isError.message }</p>;
    return (
        <>
            { isLoading ? <TopBrandSkeletons /> :
                <React.Suspense fallback={ <TopBrandSkeletons /> }>
                    <ComponentToRender top_brands={ data.data } />
                </React.Suspense> }
        </>
    );
};

export default TopBrandsLazyLoadedComponentWithSkeleton;
