import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BrandCardSkeletons() {
    return (
            <div  className='border px-3 py-2 flex flex-col gap-1'>
                <Skeleton  className='h-[70px] md:h-[80px]' style={{ borderRadius: '0px' }} />
                <Skeleton  className='h-[20px]' style={{ borderRadius: '0px' }} />
            </div>
    );
}
