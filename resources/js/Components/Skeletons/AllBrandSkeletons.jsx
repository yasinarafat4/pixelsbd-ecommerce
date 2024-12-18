import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AllBrandSkeletons() {
    return (
        <>
            <div className='flex flex-col gap-1'>
                <Skeleton className='!h-[32px] !w-[100px]' style={{ borderRadius: '4px' }} />
                <Skeleton className='!h-[24px] !w-[140px]' style={{ borderRadius: '4px' }} />
            </div>
            <hr className='my-2' />
            {/* Row 1 */}
            <div className='my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
            </div>
            {/* Row 2 */}
            <div className='my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
                <div className='border p-3 flex flex-col gap-1'>
                    <Skeleton className='h-[120px]' style={{ borderRadius: '0px' }} />
                    <Skeleton className='h-[24px]' style={{ borderRadius: '0px' }} />
                </div>
            </div>
        </>
    );
}
