import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomeBenefitsSkeletons() {
    return (
        <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-4 border'>
            <Skeleton  className='h-[78px] w-[302px] !rounded-none' />
            <Skeleton  className='h-[78px] w-[302px] !rounded-none' />
            <Skeleton  className='h-[78px] w-[302px] !rounded-none' />
            <Skeleton  className='h-[78px] w-[302px] !rounded-none' />
        </div>

    );
}
