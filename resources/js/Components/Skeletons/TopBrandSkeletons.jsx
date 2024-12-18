import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TopBrandSkeletons() {
    return (
        <>
            <div className='flex justify-between'>
                <Skeleton className='!h-[25px] !w-[140px]' style={{ borderRadius: '4px' }} />
                <Skeleton className='!h-[25px] !w-[100px]' style={{ borderRadius: '4px' }} />
            </div>
            <hr className='my-3' />
            <div className='my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3'>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='hidden border p-3 md:flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='hidden border p-3 md:flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='hidden border p-3 lg:flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='hidden border p-3 lg:flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='hidden border p-3 xl:flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
            </div>
        </>
    );
}
