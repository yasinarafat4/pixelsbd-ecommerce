import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ImageGallarySkeletons() {
    return (
        <>
            <>
                <Skeleton  className='h-[300px] md:h-[290px] xl:h-[380px]' style={{ borderRadius: '0px' }} />
            </>
            <div  className='flex items-center gap-3 mt-2'>
                <><Skeleton  className='h-[50px] xl:h-[65px] !w-[50px] xl:!w-[65px]' style={{ borderRadius: '0px' }} /></>
                <><Skeleton  className='h-[50px] xl:h-[65px] !w-[50px] xl:!w-[65px]' style={{ borderRadius: '0px' }} /></>
                <><Skeleton  className='h-[50px] xl:h-[65px] !w-[50px] xl:!w-[65px]' style={{ borderRadius: '0px' }} /></>
                <><Skeleton  className='h-[50px] xl:h-[65px] !w-[50px] xl:!w-[65px]' style={{ borderRadius: '0px' }} /></>
                <><Skeleton  className='h-[50px] xl:h-[65px] !w-[50px] xl:!w-[65px]' style={{ borderRadius: '0px' }} /></>
            </div>
        </>

    );
}
