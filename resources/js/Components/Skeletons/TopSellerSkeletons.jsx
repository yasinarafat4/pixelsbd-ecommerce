import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TopSellerSkeletons ()
{
    return (
        <>
            <div  className='flex justify-between'>
            <Skeleton  className='!h-[25px] !w-[140px]' style={ { borderRadius: '4px' } } />
            <Skeleton  className='!h-[25px] !w-[100px]' style={ { borderRadius: '4px' } } />
            </div>
            <hr  className='my-1' />
            <div  className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                <div>
                    <Skeleton  className='w-full h-[145px] md:h-[140px]' style={ { borderRadius: '6px' } } />
                </div>
                <div  className='hidden md:block'>
                    <Skeleton  className='w-full h-[140px]' style={ { borderRadius: '6px' } } />
                </div>
                <div  className='hidden md:block'>
                    <Skeleton  className='w-full h-[140px]' style={ { borderRadius: '6px' } } />
                </div>
                <div  className='hidden lg:block'>
                    <Skeleton  className='w-full h-[140px]' style={ { borderRadius: '6px' } } />
                </div>
                <div  className='hidden xl:block'>
                    <Skeleton  className='w-full h-[140px]' style={ { borderRadius: '6px' } } />
                </div>
            </div>
        </>
    );
}
