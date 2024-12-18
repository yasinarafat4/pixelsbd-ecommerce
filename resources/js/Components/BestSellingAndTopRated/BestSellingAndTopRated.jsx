import { fetchBestSellingProductsData, fetchTopRatedProductsData } from "@/Api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BestSellingSkeletons from "../Skeletons/BestSellingSkeletons";
import TopRatedSkeletons from "../Skeletons/TopRatedSkeletons";

const BestSelling = React.lazy( () => import( '@/Components/BestSellingAndTopRated/BestSelling' ) );
const TopRated = React.lazy( () => import( '@/Components/BestSellingAndTopRated/TopRated' ) );
export default function BestSellingAndTopRated ()
{
    const { data: bestSellingData, isLoading: bestSellingIsLoading, isError: bestSellingIsError } = useQuery( { queryKey: [ 'bestSellingProductsData' ], queryFn: fetchBestSellingProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    const { data: topRatedData, isLoading: topRatedIsLoading, isError: topRatedIsError } = useQuery( { queryKey: [ 'topRatedProductsData' ], queryFn: fetchTopRatedProductsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    if ( bestSellingIsError ) return <p>Error: { bestSellingIsError.message }</p>;
    if ( topRatedIsError ) return <p>Error: { topRatedIsError.message }</p>;
    return (
        <div className={ 'grid grid-cols-1 lg:grid-cols-2 gap-4' }>
            { bestSellingIsLoading ?
                <BestSellingSkeletons />
                :
                <React.Suspense fallback={ <BestSellingSkeletons /> }>
                    <BestSelling best_selling={ bestSellingData.data } />
                </React.Suspense>
            }
            { topRatedIsLoading ?
                <TopRatedSkeletons />
                :
                <React.Suspense fallback={ <TopRatedSkeletons /> }>
                    <TopRated top_rated={ topRatedData.data } />
                </React.Suspense>
            }
        </div>
    );
}
