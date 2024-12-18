import { fetchCategoriesData, fetchSlidersData } from '@/Api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategorySkeletons from '../Skeletons/CategorySkeletons';
import SliderSkeletons from '../Skeletons/SliderSkeletons';

const Category = React.lazy( () => import( '@/Components/CategoryAndSlider/Category' ) );
const Slider = React.lazy( () => import( '@/Components/CategoryAndSlider/Slider' ) );
const CategoryAndSlider = () =>
{
    const { data: categoriesData, isLoading: categoriesIsLoading, isError: categoriesIsError } = useQuery( { queryKey: [ 'categoriesData' ], queryFn: fetchCategoriesData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );
    const { data: slidersData, isLoading: slidersIsLoading, isError: slidersIsError } = useQuery( { queryKey: [ 'slidersData' ], queryFn: fetchSlidersData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    if ( categoriesIsError )
        return <p>Error: { categoriesIsError.message }</p>;
    if ( slidersIsError )
        return <p>Error: { slidersIsError.message }</p>;
    return (
        <div className='relative lg:grid grid-cols-12'>
            { categoriesIsLoading ?
                <CategorySkeletons />
                :
                <React.Suspense fallback={ <CategorySkeletons /> }>
                    <Category categories={ categoriesData.data } />
                </React.Suspense> }

            { slidersIsLoading ?
                <SliderSkeletons />
                :
                <React.Suspense fallback={ <SliderSkeletons /> }>
                    <Slider sliders={ slidersData.data } />
                </React.Suspense> }
        </div>
    );
}

export default CategoryAndSlider;
