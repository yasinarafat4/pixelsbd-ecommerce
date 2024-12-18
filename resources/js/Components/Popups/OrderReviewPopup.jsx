import { asset_url } from "@/Helpers";
import { useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import 'react-phone-input-2/lib/style.css';
import Rating from "react-rating";
import Modal from "../Modal";


export default function OrderReviewPopup ( { closeModal, showModal, product } )
{

    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props;
    const [ previewImages, setPreviewImages ] = useState( [] );
    const [ review, setReview ] = useState();

    useEffect( () =>
    {
        const findReview = product.reviews.find( review => review.user.id == auth.customer.id )
        setReview( findReview );
    }, [] )

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        product_id: product.id,
        rating: 0,
        comment: '',
        review_images: [],
    } )

    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'reviews.store' ), { onSuccess: () => { closeModal( true ) } } )
    }

    function handleReviewImage ( e )
    {
        let images = [];

        for ( let i = 0; i < e.target.files.length; i++ )
        {
            images.push( URL.createObjectURL( e.target.files[ i ] ) )
        }
        setPreviewImages( images )
        setData( 'review_images', e.target.files )
    }

    return (
        <>

            <Modal maxWidth="xl" show={ showModal } onClose={ closeModal } closeable={ false }>
                <div className="flex justify-between px-3 md:px-6 ">
                    <h2 className="text-lg md:text-xl lg:text-[20px] font-medium p-5">{ t( 'Review' ) }</h2>
                    <button onClick={ closeModal } className="text-slate-500 hover:text-slate-600 duration-300"><MdOutlineClose className="text-2xl" /></button>
                </div>
                <hr />
                { review ?
                    <div className="py-4 px-6 space-y-2">
                        <div className="">
                            <label className='label-text text-sm font-medium text-slate-600'>{ t( 'Rating' ) } ({ review.rating }/5)</label>
                            <div className="rating rating-md w-full">
                                <Rating
                                    initialRating={ review.rating }
                                    readonly
                                    emptySymbol={ <input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                                    fullSymbol={ <input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className='label-text text-slate-600 text-sm font-medium' htmlFor="comment">{ t( 'Comment' ) }</label>
                            <p className="bg-[#F3F4F6] p-4 border border-slate-300 rounded cursor-text">{ review.comment }</p>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4" >
                            {
                                review.photos && review.photos.split( ',' ).map( ( img, i ) => (
                                    <img key={ i } className="h-20 md:h-28 aspect-square object-cover" src={ asset_url( img ) } alt="Image" />
                                ) )
                            }
                        </div>
                    </div>
                    :
                    <div className="px-3 md:px-6 py-3 md:py-4">
                        <form onSubmit={ e => handleSubmit( e ) }>
                            <div className='px-4 space-y-2'>
                                {/* Product */ }
                                <>
                                    <label className='label-text text-sm font-medium text-slate-600'>{ t( 'Product' ) }</label>
                                    <p>{ product?.name }</p>
                                </>
                                {/* Rating */ }
                                <>
                                    <label className='label-text text-sm font-medium text-slate-600'>{ t( 'Rating' ) }</label>
                                    <div className="rating rating-md w-full">
                                        <Rating
                                            onChange={ e => setData( 'rating', e ) }
                                            initialRating={ data.rating }
                                            fractions={ 2 }
                                            emptySymbol={ <input type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                                            fullSymbol={ <input type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                                        />
                                    </div>
                                </>
                                {/* Comment */ }
                                <div className='w-full'>
                                    <label className='label-text text-slate-600 text-sm font-medium' htmlFor="comment">{ t( 'Comment' ) }</label>
                                    <textarea
                                        onChange={ e => setData( 'comment', e.target.value ) }
                                        value={ data.comment }
                                        name='comment'
                                        id='comment'
                                        type="text"
                                        placeholder={ t( 'Your Review' ) }
                                        rows="4"
                                        className="textarea p-3 block w-full border-[1px] border-slate-300 rounded text-sm focus:outline-none"
                                    />
                                </div>
                                {/* Review Images */ }
                                <div className="py-4 space-y-2">
                                    <div className='w-full'>
                                        <label className='label-text text-slate-600 text-sm font-medium'>{ t( 'Review Images' ) }</label>
                                        <input onChange={ e => handleReviewImage( e ) } multiple type="file" className="file-input file-input-bordered w-full mb-1" />
                                        <p className="text_primary text-xs">These images are visible in product review page gallery. Upload square images.</p>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2" >
                                        {
                                            previewImages && previewImages.map( ( img, i ) => (
                                                <img key={ i } className="h-20 aspect-square" src={ asset_url( img ) } alt="Image" />
                                            ) )
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* Buttons */ }
                            <div className="flex items-center justify-end gap-2 px-4">
                                <button type="button" onClick={ closeModal } className="px-4 py-2 bg_secondary rounded text-white font-medium text-sm">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg_primary rounded text-white font-medium text-sm">Submit Review</button>
                            </div>
                        </form>
                    </div>
                }
            </Modal >

        </>
    )

}
