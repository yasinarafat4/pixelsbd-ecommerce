import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FeaturedProductsSkeletons ()
{
    return (
        <>
            <div  className='flex justify-between'>
                <Skeleton height={ 30 } width={ 200 } style={ { borderRadius: '4px' } } />
                <Skeleton height={ 30 } width={ 105 } style={ { borderRadius: '4px' } } />
            </div>
            <hr  className='my-3' />
            <div  className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center w-full gap-3'>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
                <div  className='border p-2'>
                    <Skeleton  className='h-[120px] md:h-[198px]' style={ { borderRadius: '0px' } } />
                    <div  className='flex flex-col gap-3 mt-2'>
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                        <Skeleton height={ 20 } />
                    </div>
                </div>
            </div>
        </>
    );
}
