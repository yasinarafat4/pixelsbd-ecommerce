import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductInfoSkeletons() {
    return (
        <div  className='flex flex-col gap-8 px-5'>
            <div  className='flex flex-col gap-3'>
                <Skeleton height={30} />
                <Skeleton width={250} height={25} />
            </div>
            <div  className='flex flex-col gap-3'>
                <Skeleton width={250} height={25} />
                <Skeleton width={250} height={25} />
                <Skeleton width={250} height={25} />
            </div>
            <Skeleton width={180} height={40} />
        </div>

    );
}
