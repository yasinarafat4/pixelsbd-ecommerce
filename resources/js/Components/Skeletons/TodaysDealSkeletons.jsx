import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TodaysDealSkeletons() {
    return (
        <>
            <div  className='flex justify-between'>
            <Skeleton  className='!h-[25px] !w-[140px]' style={ { borderRadius: '4px' } } />
            <Skeleton  className='!h-[25px] !w-[100px]' style={ { borderRadius: '4px' } } />
            </div>
            <hr  className='my-3' />
            <div  className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center w-full gap-3'>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
                <div  className='border p-4'>
                    <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                    <div  className='flex flex-col gap-2 mt-3'>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                    </div>
                </div>
            </div>
        </>
    );
}
