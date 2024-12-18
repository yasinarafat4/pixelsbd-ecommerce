import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function OfferBannerSkeletons() {
    return (
        <div  className={`bg-white`}>
            <Skeleton
                 className={"!rounded-none h-[140px] md:h-[180px] xl:h-[300px] w-full"}
            />
        </div>
    );
}
