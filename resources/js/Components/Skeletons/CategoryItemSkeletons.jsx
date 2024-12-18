import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CategoryItemSkeletons() {
    return (
        <div  className='md:grid grid-cols-12 items-center w-full gap-3'>
            <div  className='md:col-span-6 lg:col-span-5 xl:col-span-4'>
                <Skeleton  className='h-[310px]' />
            </div>
            <div  className='md:col-span-6 lg:col-span-7 xl:col-span-8'>
                <div  className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4'>
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
                    <div  className='hidden lg:block border p-4'>
                        <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div  className='flex flex-col gap-2 mt-3'>
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                            <Skeleton height={20} />
                        </div>
                    </div>
                    <div  className='hidden xl:block border p-4'>
                        <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                        <div  className='flex flex-col gap-2 mt-3'>
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
