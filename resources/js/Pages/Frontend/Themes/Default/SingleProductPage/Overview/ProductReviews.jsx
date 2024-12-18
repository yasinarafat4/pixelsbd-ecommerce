import OrderReviewPopup from '@/Components/Popups/OrderReviewPopup';
import { asset_url, numberFormat } from '@/Helpers';
import { ProductContext } from '@/ProductContext';
import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { useContext, useState } from 'react';
import { GiStarsStack } from 'react-icons/gi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from 'react-rating';

export default function ProductReviews ()
{
    const { t } = useLaravelReactI18n();
    const { review_status } = usePage().props;

    const product = useContext( ProductContext );

    const [ showModal, setShowModal ] = useState( false );
    const [ productS, setProductS ] = useState();

    // Modal Handlers
    function handelShowModal ( product )
    {
        setProductS( product )
        setShowModal( true )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    return (
        <div  className="container mx-auto px-4">
            <h2  className="md:text-xl font-semibold mb-4">Ratings & Reviews</h2>
            < div>
                { review_status == 1 &&
                    <div  className='flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 border border_secondary bg_soft_secondary p-6'>
                        <div  className='flex flex-col md:flex-row items-center md:items-end gap-2'>
                            <div  className='flex items-end gap-1 md:gap-3'>
                                <h2  className='text-3xl xl:text-5xl font-normal'>{ numberFormat( product.rating ) }</h2>
                                <p  className='text-sm md:text-base'>Out of 5 (<span>{ product.reviews.length }</span> { t( 'Reviews' ) })</p>
                            </div>
                            <div  className="rating rating-sm space-x-1">
                                <Rating
                                    initialRating={ product.rating }
                                    readonly
                                    emptySymbol={ <input type="radio" name="rating-7"  className="mask mask-star-2 bg-gray-400" /> }
                                    fullSymbol={ <input type="radio" name="rating-7"  className="bg-[#FFA707] mask mask-star-2" /> }
                                />
                            </div>
                        </div>
                        <div  className=''>
                            {/* Popup */ }
                            { showModal && <OrderReviewPopup closeModal={ closeModal } showModal={ showModal } product={ productS } /> }
                            {/* Rate Button */ }
                            <button type="button" onClick={ e => handelShowModal( product ) }  className='text-[14px] w-full px-4 py-2 bg_secondary hover:bg_secondary duration-300 text-white'>
                                { t( 'Rate this Product' ) }
                            </button>
                        </div>
                    </div> }
                { product.reviews.length > 0 ?

                    <div  className='flex flex-col gap-6 mt-4'>
                        {/* Review */ }
                        {
                            product.reviews.map( ( review, i ) => (
                                <div key={ i }  className='flex flex-col items-start space-y-3 justify-start border px-4 py-2 md:px-6 md:py-3 rounded shadow'>
                                    <div  className='flex justify-between items-start w-full'>
                                        <div  className='flex items-center gap-1 md:gap-2'>
                                            <div  className="avatar">
                                                <div  className="w-10 md:w-12 rounded-full">
                                                        <LazyLoadImage
                                                             className='w-full h-full'
                                                            src={asset_url(review.user.image)} alt={review.user.name}
                                                            effect='blur'
                                                        />
                                                </div>
                                            </div>
                                            <div  className="flex flex-col items-start">
                                                <p  className='text-[13px] md:text-sm'>{ review.user.name }</p>
                                                <div  className='rating rating-sm'>
                                                    <input type="radio" name="rating-2"  className="mask mask-star-2 bg-orange-400 me-1" /> <span  className='text-[13px] md:text-sm'>{ review.rating }/5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p  className='text-sm text-slate-500'>
                                            {/* {moment(review.created_at).startOf('hour').fromNow()} */ }
                                            { moment( review.created_at ).startOf( 'hour' ).fromNow() }
                                        </p>
                                    </div>
                                    <div  className='text-sm'>
                                        { review.comment }
                                    </div>
                                </div>
                            ) )
                        }
                        {/* Pagination */ }
                        {/* <div  className="flex justify-between items-center mt-2">
                                    <Pagination links={reviews.meta.links} />
                                </div> */}
                    </div>
                    :
                    <div  className='flex flex-col justify-center items-center mt-2 space-y-4'>
                        <GiStarsStack  className='text-[#D6D9DD] text-[70px]' />
                        <p  className='text-sm'>{ t( 'No Review Given Yet' ) }!</p>
                    </div> }
            </div>

        </div>
    );
}
