import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SingleProductBenefitsSkeletons() {
    return (
        <div  className='flex flex-col gap-4 w-full rounded-md border px-6 py-4'>
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
        </div>

    );
}
