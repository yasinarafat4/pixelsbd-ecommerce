import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CategorySkeletons ()
{
    return (

        <div className='hidden lg:h-[375px] xl:h-[480px] lg:block col-span-3 border-x'>
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
            <Skeleton className='!rounded-none lg:h-[30px] xl:h-[40px]' />
        </div>
    );
}
