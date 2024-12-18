
import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Rating from "react-rating";

export default function MoreStoreItemCard ( { store_product } )
{

    return (
        <>
            <div className="mx-[8px] card">
                <div className="overflow-hidden grid grid-cols-7 md:grid-cols-8 bg-white group w-full h-[145px] md:h-[135px] lg:h-[120px] border-[1px] border-[#82ade5] rounded">
                    <figure className="col-span-3 relative overflow-hidden cursor-pointer">
                        { store_product.discount_in_percentage > 0 && <div className="absolute top-1 left-1 badge rounded bg-red-500 text-slate-200 z-[1]">{ store_product.discount_in_percentage }%</div> }
                        <LazyLoadImage
                            effect='blur'
                            src={ store_product?.thumbnail_image || placeholder1_1() }
                            alt={ store_product?.name }
                            className="w-full h-full object-cover p-2 mix-blend-multiply z-0"
                        />
                    </figure>
                    <div className="col-span-4 md:col-span-5 card-body p-3">
                        <Link href={ route( 'product', store_product.slug ) } className="text-sm font-semibold group-hover:text_secondary duration-300 truncate ...">
                            { store_product?.name }
                        </Link>
                        <div className="rating rating-sm">
                            <Rating
                                initialRating={ store_product.rating }
                                readonly
                                emptySymbol={ <input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                                fullSymbol={ <input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                            />
                        </div>

                        { store_product.home_price != store_product.home_discounted_price
                            ?
                            <div className="flex items-end gap-1">
                                <span className="text-base font-bold text_primary">{ store_product.home_discounted_price }</span>
                                <span className="line-through text-sm text-[#646c7e] font-medium">{ store_product.home_price }</span>
                            </div>
                            :
                            <span className="text-base font-bold text_primary">{ store_product.home_price }</span>
                        }
                    </div>
                </div>
            </div>

        </>

    )

}
