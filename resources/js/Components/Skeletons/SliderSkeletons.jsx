import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SliderSkeletons ()
{
    return (

        <div className='col-span-9'>
            <Skeleton className='w-full h-[150px] md:h-[369px] xl:h-[478px]' style={ { borderRadius: '0px' } } />
        </div>
    );
}
