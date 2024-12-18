import { asset_url } from '@/Helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function NothingFound({ title }) {

    return (
        <div className="flex flex-col justify-center items-center gap-2 py-8">
            <div>  <LazyLoadImage
                className="w-40 h-40 border rounded-full"
                alt="Nothing Found"
                src={asset_url("/assets/nothing_found.webp")}
                effect='blur'
            /></div>
            <p className="text-lg md:text-xl font-semibold text-center">{title}</p>
        </div>
    )

}
