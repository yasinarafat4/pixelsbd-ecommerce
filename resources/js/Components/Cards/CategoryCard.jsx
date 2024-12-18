import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";


export default function CategoryCard ( { category } )
{
    return (
        <div  className="card border hover:border_secondary duration-300 group cursor-pointer inline-block w-full rounded-sm">
            <Link href={ route( 'catgeory_wise_product', category.slug ) }>
                <figure  className="relative h-[70px] w-[70px] md:h-[75px] md:w-[75px] mx-auto border overflow-hidden my-3 rounded-full">
                    <div  className="transition-transform duration-150 ease-in transform group-hover:scale-95 cursor-pointer w-full h-full">
                        <LazyLoadImage
                            threshold={ 100 }
                            effect="blur"
                            src={ category.banner || placeholder1_1() }
                            alt="category"
                             className="w-full h-full object-cover"
                        />
                    </div>
                </figure>
                <div  className="card-body p-2 text-white bg_secondary">
                    <h2  className="text-sm text-center font-semibold duration-300 truncate ...">
                        { category.name }
                    </h2>
                </div>
            </Link>
        </div>
    )
}
