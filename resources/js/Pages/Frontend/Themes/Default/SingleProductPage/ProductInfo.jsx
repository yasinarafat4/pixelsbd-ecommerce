
import { numberFormat } from '@/Helpers';
import { ProductContext } from '@/ProductContext';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useContext, useEffect, useState } from 'react';
import { FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';

export default function ProductInfo() {
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;
    const { setItems } = useCart();
    const productcontext = useContext(ProductContext);
    const product = productcontext

    const [isWishlist, setIsWishlist] = useState(false);
    const [responseData, setResponseData] = useState();

    // Colors default value
    useEffect(() => {
        product.colors?.map((color, i) => {
            if (i == 0) {
                setData('color', color.name);
            }
        })

    }, [])

    // Attribute Default Value
    useEffect(() => {
        product.choice_options?.forEach((choice_options) => {
            choice_options.values.map((value, i) => {
                if (i == 0) {
                    setData(prevData => ({ ...prevData, ['attribute_' + choice_options.attribute]: value }))
                }
            })
        })

    }, [])

    const { data, setData, post, processing, errors, reset } = useForm({
        id: product.id,
        quantity: product.min_qty,
    })

    // Color change handler
    function handleColorChange(color) {
        setData('color', color.name);
    };

    // Size change handler
    function handleAttributeChange(attribute, value) {
        setData(prevData => ({ ...prevData, ['attribute_' + attribute]: value }))
    };

    // Quantity functionalities
    function increaseQuantity() {
        setData('quantity', responseData.max_limit == data.quantity ? responseData.max_limit : data.quantity + 1)
    }

    function decreaseQuantity() {
        setData('quantity', data.quantity > product.min_qty ? data.quantity - 1 : product.min_qty)
    }

    useEffect(() => {
        // setTimeout(() => {
        axios({
            method: 'post',
            url: route('product.variant_price'),
            data: data,
            responseType: 'json'
        }).then(function (response) {
            setResponseData(response.data)
            if (data.quantity > response.data.max_limit) {
                setData('quantity', response.data.max_limit)
            }
        });
        // }, 3000);
    }, [data])

    function addToCart(params) {
        axios({
            method: 'post',
            url: route('add_to_cart'),
            data: data,
            responseType: 'json'
        }).then(function (response) {
            setItems(response.data)
        });

    }

    function buyNow(params) {
        axios({
            method: 'post',
            url: route('add_to_cart'),
            data: data,
            responseType: 'json'
        }).then(function (response) {
            setItems(response.data)
            router.visit(route('cart'));
        });

    }

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
        <div className="relative mt-16 md:mt-0 px-1 md:px-6 space-y-3">
            <h2 className="text-xl font-bold">{product?.name}</h2>
            <div className="flex items-start gap-2">
                {/* Reviews & Rating */}
                <div className="rating rating-xs md:rating-sm">
                    <Rating
                        initialRating={product.rating}
                        readonly
                        emptySymbol={<input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" />}
                        fullSymbol={<input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" />}
                    />
                    <span className="text-[12px]">({numberFormat(product.rating)})</span>
                </div>
                <div className="text-xs md:text-sm text-[#4B566B] font-medium"><span> | {product.reviews.length}</span> {t('Reviews')}
                </div>
            </div>
            <hr />
            {/* Price */}
            {product.has_discount ?
                <div className="flex items-end gap-2">
                    <p className="text-[13px] md:text-[15px] lg:text-[16px] xl:text-xl font-bold text_primary">{product.main_price}</p>
                    <p className="text-[11px] md:text-[14px] lg:text-[15px] xl:text-[17px] line-through font-semibold text-[#646c7e]">{product.stroked_price}</p>
                    <p className="text-[10px] md:text-[12px] xl:text-[17px] font-semibold text-[#646c7e]">/{product.unit}</p>
                    {product.has_discount &&
                        <span className="text-[7px] xl:text-[14px] bg_secondary p-[2px] md:p-1 text-white font-semibold">{product.discount}</span>
                    }
                </div>
                :
                <div className="flex items-end gap-2">
                    <p className="text-[13px] md:text-[15px] lg:text-[16px] xl:text-xl font-bold text_primary">{product.main_price}</p>
                    <p className="text-[10px] md:text-[12px] xl:text-[17px] font-semibold text-[#646c7e]">/{product.unit}</p>
                </div>
            }
            <div className='space-y-5'>
                {/* Color and size for cloth*/}
                {
                    product.variant_product &&
                    <div className='space-y-5'>
                        <div className='flex items-center gap-2'>
                            <span className='font-semibold'>{t('Color')}:</span>
                            <div className="flex space-x-2">
                                {product.colors?.map((color, i) => {
                                    return <label key={i} className="flex tooltip items-center cursor-pointer" data-tip={color.name} >
                                        <input
                                            type="radio"
                                            name="color"
                                            value={color.name}
                                            className="hidden"
                                            onChange={e => handleColorChange(color)}
                                        />
                                        <div className={`border ${data.color === color.name ? 'p-1 border-red-600' : 'p-1 border-gray-300'}`}>
                                            <span style={{ backgroundColor: color.color_code }}
                                                className="w-5 h-5 rounded flex justify-center items-center"
                                            >
                                                {data.color === color.name && <div><FaCheck className='h-3 w-3 text-white' /></div>}
                                            </span>
                                        </div>
                                    </label>
                                })}
                            </div>
                        </div>

                        {product.choice_options?.map((choice_options, i) => (
                            <div key={i} className='flex items-center gap-2'>
                                <span className='font-semibold'>{choice_options.attribute}:</span>
                                <div className="flex space-x-2">
                                    {choice_options.values.map((value, i) => (
                                        <label data-tip={value.label} className='tooltip cursor-pointer' key={i}>
                                            <input className="hidden" type="radio"
                                                data-tip={value.label}
                                                value={value.label}
                                                name="size"
                                                onChange={() => handleAttributeChange(choice_options.attribute, value)} />
                                            <div className={`tooltip px-2 py-1 rounded-xl border text-xs ${data['attribute_' + choice_options.attribute] === value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white hover:bg-blue-500 hover:text-white duration-300 text-black border-slate-500'
                                                }`}>
                                                {value.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {/* Quantity */}
                <div className="flex items-center gap-2">
                    <span className='font-semibold'>{t('Quantity')}:</span>
                    <div className='border-[1px] border-[#3F00E7] rounded'>
                        <button onClick={decreaseQuantity} className="px-4 py-1 bg-[#FAFAFC] text-[#3F00E7] rounded">-</button>
                        <span>{data.quantity}</span>
                        <button onClick={increaseQuantity} className="px-4 py-1 bg-[#FAFAFC] text-[#3F00E7] rounded">+</button>
                    </div>
                    <div>
                        {product.stock_visibility_state == 'quantity' && <span id="available-quantity">( {responseData?.quantity} {t('available')})</span>}

                        {product.stock_visibility_state == 'text' && <span id="available-quantity">({t('In Stock')})</span>}

                    </div>
                </div>
            </div>
            {/* Total Price */}
            <div className="flex items-center gap-2">
                <span className='font-semibold'>{t('Total Price')}:</span>
                <span className='font-semibold text-[#3F00E7]'>{responseData?.price}</span><span className='text-xs'>({t('Tax')} : incl.)</span>
            </div>
            {/* Buttons */}
            <div className='flex items-center gap-3'>
                {responseData?.in_stock == 0 &&
                    <button className='text-sm md:text-base px-4 py-2 bg-slate-400 rounded text-white cursor-not-allowed'>
                        {t('Out of Stock')}
                    </button>
                }

                {responseData?.in_stock == 1 &&
                    <div className='flex items-center gap-3'>
                        <button onClick={e => buyNow()} className='text-[12px] md:text-base px-4 py-2 bg_secondary hover:bg_secondary duration-300 rounded text-white'>
                            {t('Buy Now')}
                        </button>
                        <button onClick={e => addToCart()} className='text-[12px] md:text-base px-4 py-2 bg_primary hover:bg_primary duration-300 rounded text-white'>
                            {t('Add to Cart')}
                        </button>
                    </div>
                }
                {/* Wishlist Button */}
                {
                    isWishlist ?
                        <button aria-level="Remove from Wishlist"
                            className='px-4 py-[10px] border rounded flex items-center gap-1'
                            onClick={e => addToWishlist()}
                        >

                            <FaHeart className='text-red-600 text-sm md:text-lg' />
                        </button> : <button aria-level="Add to Wishlist"
                            className='px-3 py-2 border rounded flex items-center gap-1'
                            onClick={e => addToWishlist()}
                        >
                            <FaRegHeart className='text-sm md:text-lg' />
                        </button>}
            </div>

        </div >
    );
}
