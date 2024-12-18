import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Placeholder ()
{
    return (
        <div  className="">
            {/* <span  className="loading loading-dots loading-lg"></span> */ }
            <Skeleton height={300} count={ 1 } />
        </div>
    );
}
