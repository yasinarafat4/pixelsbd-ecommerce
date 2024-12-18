import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MoreStoreItemSkeletons() {
    return (
        <div className='!rounded-md border p-3'>
            <Skeleton className='h-[28px] !w-[200px] mb-1' style={{ borderRadius: '2px' }} />
            <div className='space-y-3'>
                <div className='flex items-start gap-4 border my-1 p-2 rounded'>
                    <Skeleton className='h-[100px] !w-[100px]' style={{ borderRadius: '5px' }} />
                    <div className='flex flex-col gap-2 w-full'>
                        <Skeleton height={20} />
                        <Skeleton height={20} width={110} />
                        <Skeleton height={20} width={135} />
                    </div>
                </div>
                <div className='flex items-start gap-4 border my-1 p-2 rounded'>
                    <Skeleton className='h-[100px] !w-[100px]' style={{ borderRadius: '5px' }} />
                    <div className='flex flex-col gap-2 w-full'>
                        <Skeleton height={20} />
                        <Skeleton height={20} width={110} />
                        <Skeleton height={20} width={135} />
                    </div>
                </div>
                <div className='flex items-start gap-4 border my-1 p-2 rounded'>
                    <Skeleton className='h-[100px] !w-[100px]' style={{ borderRadius: '5px' }} />
                    <div className='flex flex-col gap-2 w-full'>
                        <Skeleton height={20} />
                        <Skeleton height={20} width={110} />
                        <Skeleton height={20} width={135} />
                    </div>
                </div>
            </div>
        </div>
    );
}
