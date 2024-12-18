import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CouponSkeletons() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-1 md:mt-3 mb-8'>
            <div>
                <Skeleton className='w-full h-[200px]' style={{ borderRadius: '8px' }} />
            </div>
            <div>
                <Skeleton className='w-full h-[200px]' style={{ borderRadius: '8px' }} />
            </div>
            <div>
                <Skeleton className='w-full h-[200px]' style={{ borderRadius: '8px' }} />
            </div>
        </div>
    );
}
