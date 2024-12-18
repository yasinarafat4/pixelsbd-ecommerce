import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function VendorInfoSkeletons() {
    return (
            <div  className='flex items-start gap-4 border my-2 p-2 rounded-md'>
                <Skeleton  className='h-[75px] !w-[75px]' style={{ borderRadius: '100%' }} />
                <div  className='flex flex-col gap-2 w-full'>
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                </div>
            </div>
    );
}
