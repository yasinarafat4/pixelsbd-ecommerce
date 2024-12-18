import { placeholder1_1 } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Rating from "react-rating";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ProductCard({ product }) {

    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;

    const [isWishlist, setIsWishlist] = useState(false);

    // Checking auth for wishlist
    useEffect(() => {
        const findId = auth.customer?.wishlists.find(item => item.product_id == product?.id);

        if (findId) {
            setIsWishlist(true);
        } else {
            setIsWishlist(false)
        }
    }, [])

    function addToWishlist() {
        // router.post(route('add_to_wish_list'), { product_id: product?.id })
        axios.post(route('add_to_wish_list'), { product_id: product?.id }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(
            response => {
                if (response.data.type == 'added') {
                    toast.success('Added to Wishlist!')
                } else {
                    toast.warning('Remove from wishlist!')
                }
                setIsWishlist(!isWishlist)
            }
        ).catch(function (error) {
            if (error.response.status == 401) {
                Swal.fire({
                    icon: "error",
                    text: "Please log in to add items to your wishlist.",
                });
            }
        });

    }

    return (
        <>
            {product &&
                <div className="inline-block w-full mx-auto">
                    <div title={product?.name} className="card hov-animate-outline w-full h-full border group rounded-none overflow-hidden p-[6px]">
                        <figure className="relative">
                            {/* Badge */}
                            {product?.has_discount && <div className="absolute top-0 left-0 badge rounded bg-red-500 text-slate-200 z-[1]">{product?.discount}</div>}
                            {/* Thumbnail */}
                            <div className="transition-transform duration-300 ease-in-out transform group-hover:scale-105 w-full">
                                <LazyLoadImage
                                    effect='blur'
                                    src={product?.thumbnail_image || placeholder1_1()}
                                    alt={product?.name}
                                    className="w-full aspect-square"
                                />
                            </div>
                            {/* View details icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg_soft_primary transition-opacity duration-300">
                                <Link aria-label={product?.name} href={route('product', product?.slug)}><MdOutlineRemoveRedEye className="text-[45px] text_primary bg-white p-3 rounded-full" /></Link>
                            </div>
                            {/* Add Wishlist */}
                            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {isWishlist ? (
                                    // Remove from Wishlist
                                    <button aria-label="Add To Wishlist" onClick={e => addToWishlist()} data-tip={t("Remove from Wishlist")} className="tooltip tooltip-left bg-white p-1 w-8 h-8 flex items-center justify-center">
                                        <FaHeart className="text-[14px] cursor-pointer text-red-600" />
                                    </button>
                                ) : (
                                    // Add to Wishlist
                                    <button aria-label="Add To Wishlist" onClick={e => addToWishlist()} data-tip={t("Add to Wishlist")} className="tooltip tooltip-left bg-white text-slate-500 p-1 w-8 h-8 flex items-center justify-center">
                                        <FaHeart className="text-[14px] cursor-pointer" />
                                    </button>
                                )}
                            </div>
                        </figure>
                        <div className="card-body p-2">
                            <div className="rating rating-sm">
                                <div className="rating rating-sm">
                                    <Rating
                                        initialRating={product?.rating}
                                        readonly
                                        emptySymbol={<input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" />}
                                        fullSymbol={<input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" />}
                                    />
                                </div>
                            </div>
                            <Link href={route('product', product?.slug)} className="text-sm font-medium z-20 hover:text_secondary duration-300 truncate ...">{product?.name}</Link>
                            {product?.has_discount
                                ?
                                <div className="flex items-end gap-1">
                                    <span className="text-base font-bold text_primary">{product?.main_price}</span>
                                    <span className="line-through text-sm text-[#646c7e] font-medium">{product?.stroked_price}</span>
                                </div>
                                :
                                <span className="text-base font-bold text_primary">{product?.main_price}</span>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )

}
