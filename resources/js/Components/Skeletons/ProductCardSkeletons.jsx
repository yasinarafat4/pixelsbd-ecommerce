import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductCardSkeletons() {
    return (
            <div  className='border pt-2 pb-6 px-4'>
                <Skeleton  className='h-[120px] md:h-[175px]' style={{ borderRadius: '0px' }} />
                <div  className='flex flex-col gap-2 mt-3'>
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                </div>
            </div>
    );
}
