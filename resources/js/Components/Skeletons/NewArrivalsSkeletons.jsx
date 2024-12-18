import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function NewArrivalsSkeletons() {
    return (
        <>
            <div className='flex justify-between'>
                <Skeleton className='!h-[30px] !w-[140px]' style={{ borderRadius: '4px' }} />
                <Skeleton className='!h-[30px] !w-[92px]' style={{ borderRadius: '4px' }} />
            </div>
            <hr className='my-3' />
            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[6px]'>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[115px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className='hidden md:block'><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[115px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className='hidden md:block'><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[115px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className='hidden lg:block'><Skeleton className='h-[122px] lg:h-[100px] xl:h-[115px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className='hidden xl:block'><Skeleton className='h-[115px] w-full' style={{ borderRadius: '4px' }} /></div>
            </div>
        </>
    );
}
