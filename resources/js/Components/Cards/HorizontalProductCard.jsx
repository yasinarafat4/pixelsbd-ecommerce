import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Rating from "react-rating";

export default function HorizontalProductCard ( { product } )
{

    return (
        <div className="card">
            <div className="relative flex items-center h-[135px] md:h-[110px] xl:h-[125px] w-full overflow-hidden bg-white border border-slate-300 group hover:border_secondary hover:drop-shadow-xl duration-300 rounded">
                <figure className="overflow-hidden rounded-none w-2/5">
                    { product.has_discount && <div className="absolute top-1 left-1 badge rounded bg-red-500 text-slate-200 z-[1]">{ product.discount }</div> }
                    <LazyLoadImage
                        effect="blur"
                        src={ product?.thumbnail_image || placeholder1_1() }
                        alt={ product?.name }
                        className="w-full aspect-square p-2 object-cover"
                    />
                </figure>
                <div className="card-body p-2 w-3/5">
                    <Link href={ route( 'product', product.slug ) } className="text-sm font-semibold group-hover:text_secondary duration-300 truncate ...">
                        { product?.name }
                    </Link>
                    <div className="rating rating-sm">
                        <Rating
                            initialRating={ product.rating }
                            readonly
                            emptySymbol={ <input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                            fullSymbol={ <input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                        />
                    </div>

                    { product.has_discount
                        ?
                        <div className="flex items-end gap-1">
                            <span className="text-sm font-bold text_primary">{ product.main_price }</span>
                            <span className="line-through text-sm text-[#646c7e] font-medium">{ product.stroked_price }</span>
                        </div>
                        :
                        <span className="text-sm font-bold text_primary">{ product.main_price }</span>
                    }
                </div>
            </div>
        </div>
    )
}
