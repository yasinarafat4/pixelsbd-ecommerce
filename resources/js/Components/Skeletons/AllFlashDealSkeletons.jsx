import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AllFlashDealSkeletons() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:gap-3 xl:gap-5 mt-1'>
            <div className='relative'>
                <div>
                    <Skeleton className='h-[280px] md:h-[390px] !rounded-none' />
                </div>
                <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white flex justify-center items-center gap-2 md:gap-3 border p-2'>
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] md:!w-[70px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] md:!w-[70px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] md:!w-[70px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] md:!w-[70px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                </div>
            </div>

            <div className='relative'>
                <div>
                    <Skeleton className='h-[280px] md:h-[390px] !rounded-none' />
                </div>
                <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white flex justify-center items-center gap-2 md:gap-3 border p-2'>
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                </div>
            </div>

            <div className='relative'>
                <div>
                    <Skeleton className='h-[280px] md:h-[390px] !rounded-none' />
                </div>
                <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white flex justify-center items-center gap-2 md:gap-3 border p-2'>
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                    <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] md:h-[70px] lg:h-[65px] xl:h-[85px]  md:!w-[70px] lg:!w-[65px] xl:!w-[85px] !rounded-full' />
                </div>
            </div>
        </div>
    );
};
