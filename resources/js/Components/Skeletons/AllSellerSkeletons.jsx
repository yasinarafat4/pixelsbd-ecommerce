import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AllSellerSkeletons() {
    return (
        <>
            <div className='flex flex-col items-center md:flex-row justify-between mt-4 mb-2 gap-2'>
                <div><Skeleton className='!h-[30px] !w-[80px]' style={{ borderRadius: '4px' }} /></div>
                <div><Skeleton className='!h-[35px] !w-[300px] md:!w-[370px] lg:!w-[330px] xl:!w-[400px]' style={{ borderRadius: '10px' }} /></div>
            </div>
            <hr className='my-1' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-3'>
                <div>
                    <Skeleton className='w-full h-[160px] md:h-[172px] lg:h-[160px]' style={{ borderRadius: '6px' }} />
                </div>
                <div className='hidden md:block'>
                    <Skeleton className='w-full h-[160px] md:h-[172px] lg:h-[160px]' style={{ borderRadius: '6px' }} />
                </div>
                <div className='hidden md:block'>
                    <Skeleton className='w-full h-[160px] md:h-[172px] lg:h-[160px]' style={{ borderRadius: '6px' }} />
                </div>
                <div className='hidden lg:block'>
                    <Skeleton className='w-full h-[160px] md:h-[172px] lg:h-[160px]' style={{ borderRadius: '6px' }} />
                </div>
            </div>
        </>
    );
}
