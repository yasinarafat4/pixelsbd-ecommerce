import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TopRatedSkeletons ()
{
    return (
        <div  className='border p-2 xl:p-3'>
             <div  className='flex justify-between mb-1'>
                <Skeleton  className='!h-[25px] !w-[140px]' style={ { borderRadius: '4px' } } />
                <Skeleton  className='!h-[25px] !w-[100px]' style={ { borderRadius: '4px' } } />
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2 xl:gap-3'>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
                <div className=''><Skeleton className='h-[122px] md:h-[105px] lg:h-[100px] xl:h-[120px] w-full' style={{ borderRadius: '4px' }} /></div>
            </div>
        </div>
    );
}
