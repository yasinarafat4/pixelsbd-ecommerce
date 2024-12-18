import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomeFlashDealSkeletons() {
    return (
        <div className='md:grid grid-cols-12 w-full gap-2'>
            <div className='md:col-span-5 lg:col-span-4'>
                <div className='relative'>
                    <div>
                        <Skeleton className='h-[280px] md:h-[390px] !rounded-none' />
                    </div>
                    <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white flex justify-center items-center gap-2 md:gap-3 border p-2'>
                        <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                        <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                        <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                        <Skeleton className='border-2 md:border-4 border-slate-300 h-[60px] !w-[60px] lg:h-[65px] lg:!w-[65px] xl:h-[85px] xl:!w-[85px] !rounded-full' />
                    </div>
                </div>
            </div>
            <div className='md:col-span-7 lg:col-span-8'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-2'>
                        <Skeleton className='!h-[30px] !w-[140px]' style={{ borderRadius: '4px' }} />
                        <Skeleton className='!h-[25px] !w-[190px] md:!w-[240px]' style={{ borderRadius: '4px' }} />
                    </div>
                    <Skeleton className='!h-[25px] !w-[100px]' style={{ borderRadius: '4px' }} />
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4'>
                    <div className='border pt-2 pb-6 px-4'>
                        <Skeleton className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div className='flex flex-col gap-2 mt-3'>
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                        </div>
                    </div>
                    <div className='border pt-2 pb-6 px-4'>
                        <Skeleton className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div className='flex flex-col gap-2 mt-3'>
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                        </div>
                    </div>
                    <div className='hidden lg:block border pt-2 pb-6 px-4'>
                        <Skeleton className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div className='flex flex-col gap-2 mt-3'>
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                        </div>
                    </div>
                    <div className='hidden xl:block border pt-2 pb-6 px-4'>
                        <Skeleton className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div className='flex flex-col gap-2 mt-3'>
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
