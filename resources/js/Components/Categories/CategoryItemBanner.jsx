import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function CategoryItemBanner ( { category } )
{

    const { t } = useLaravelReactI18n();

    return (
        <div  className="bg-white group">
            <div  className="relative h-full md:h-[310px] lg:h-[315px] w-full overflow-hidden rounded py-0">
                <div  className='z-10 bg-white'>
                    <div className="md:h-[310px] lg:h-[315px] transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                        <LazyLoadImage
                            effect="blur"
                            src={ category.banner || placeholder1_1() }
                            alt={ category.name }
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 bg-slate-800 transition-opacity duration-300">
                        <div  className='flex flex-col items-center justify-center'>
                            <Link href={ route( 'catgeory_wise_product', category.slug ) }  className="text-[16px] cursor-pointer text-white opacity-100 group-hover:bg-black px-4 py-1 rounded-full">{ t( 'Browse All' ) }</Link>
                            <span  className="text-[14px] text-white mt-16">{ category.name }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
