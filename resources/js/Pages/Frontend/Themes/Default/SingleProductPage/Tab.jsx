
import { ProductContext } from '@/ProductContext';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useContext, useState } from 'react';
import { GiStarsStack } from 'react-icons/gi';
import Rating from 'react-rating';

export default function Tab ()
{
    const { t } = useLaravelReactI18n();
    const [ activeTab, setActiveTab ] = useState( 'overview' );
    const product = useContext( ProductContext );

    const isReview = true;

    const handleTabClick = ( tab ) =>
    {
        setActiveTab( tab );
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <button
                    className={ `px-4 py-2 rounded-3xl ${ activeTab === 'overview' ? 'bg_primary text-white' : 'bg-white text-black'
                        }` }
                    onClick={ () => handleTabClick( 'overview' ) }
                >
                    { t( 'Overview' ) }
                </button>
                <button
                    className={ `px-4 py-2 rounded-3xl ${ activeTab === 'reviews' ? 'bg_primary text-white' : 'bg-white text-black'
                        }` }
                    onClick={ () => handleTabClick( 'reviews' ) }
                >
                    { t( 'Reviews' ) }
                </button>
            </div>
            <div className="mt-4">
                { activeTab === 'overview' &&
                    <div>
                        <p className='text-sm mb-2'>Product Description:</p>
                        <ul className='text-sm list-disc ms-6'>
                            <li><strong>Who is this product for?</strong> The target audience can be gender (i.e. male or female), an age group (i.e. college students or retirees), a lifestyle demographic (i.e. new mothers or car enthusiasts) or some other defined group of people.</li>
                            <li> <strong>What are the product&apos;s basic details?</strong> This includes attributes such as dimensions, materials, product features, cost and functions.</li>
                            <li><strong>When should someone use the product?</strong> Is it meant to be used during a certain time of day, seasonally or for a specific type of occasion? Just as important is pointing out if a product can or should be used every day or year-round. These details will help speak to the product&apos;s long-term value.</li>
                            <li>                        <strong>Where should someone use the product?</strong> Is it meant for indoor or outdoor use, for your car or your home?</li>
                            <li><strong>Why is this product useful or better than the competition?</strong> This can be anything from quality to value to features. Think about the product benefits to your customers and consider how images can complement your product copy.</li>
                            <li><strong>How does the product work?</strong> This may not be necessary for every product, but it&apos;s a must-have feature if you are selling anything with moving parts or electronics.</li>
                        </ul>
                    </div>
                }
                { activeTab === 'reviews' &&
                    <>
                        {
                            isReview ?
                                < div>
                                    <div className='grid grid-cols-1 md:grid-cols-8'>
                                        <div className='col-span-3 text-center space-y-1 md:space-y-2'>
                                            <div className='flex items-end gap-2'>
                                                <h2 className='text-3xl xl:text-4xl font-bold'>{ product.rating }</h2>
                                                <p>out of 5 (<span>1</span> { t( 'Reviews' ) })</p>
                                            </div>
                                            <div className='flex flex-col gap-2 justify-center items-center'>
                                                <div className="rating space-x-1">
                                                    <Rating
                                                        initialRating={ product.rating }
                                                        readonly
                                                        emptySymbol={ <input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                                                        fullSymbol={ <input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                                                    />
                                                </div>
                                                {/* Rate Button */ }
                                                <button className='text-[14px] w-8/12 px-4 py-2 bg_secondary hover:bg_secondary duration-300 text-white'>
                                                    { t( 'Rate this Product' ) }
                                                </button>
                                            </div>

                                        </div>
                                        <div className='col-span-5 mt-4 md:mt-0'>
                                            <ul>
                                                <li className='grid grid-cols-12 gap-4 md:gap-5 items-center'>
                                                    <p className='col-span-4 xl:col-span-3 text-sm'>{ t( 'excellent' ) }:</p>
                                                    <div className='col-span-7 xl:col-span-8'><progress className="progress progress-primary w-full" value="100" max="100"></progress></div>
                                                    <p className='col-span-1'>1</p>
                                                </li>
                                                <li className='grid grid-cols-12 gap-4 md:gap-5 items-center'>
                                                    <p className='col-span-4 xl:col-span-3 text-sm'>{ t( 'good' ) }:</p>
                                                    <div className='col-span-7 xl:col-span-8'><progress className="progress progress-primary w-full" value={ 0 } max="100"></progress></div>
                                                    <p className='col-span-1'>0</p>
                                                </li>
                                                <li className='grid grid-cols-12 gap-4 md:gap-5 items-center'>
                                                    <p className='col-span-4 xl:col-span-3 text-sm'>{ t( 'average' ) }:</p>
                                                    <div className='col-span-7 xl:col-span-8'><progress className="progress progress-primary w-full" value={ 0 } max="100"></progress></div>
                                                    <p className='col-span-1'>0</p>
                                                </li>
                                                <li className='grid grid-cols-12 gap-4 md:gap-5 items-center'>
                                                    <p className='col-span-4 xl:col-span-3 text-sm'>{ t( 'below_average' ) }:</p>
                                                    <div className='col-span-7 xl:col-span-8'><progress className="progress progress-primary w-full" value={ 0 } max="100"></progress></div>
                                                    <p className='col-span-1'>0</p>
                                                </li>
                                                <li className='grid grid-cols-12 gap-4 md:gap-5 items-center'>
                                                    <p className='col-span-4 xl:col-span-3 text-sm'>{ t( 'poor' ) }:</p>
                                                    <div className='col-span-7 xl:col-span-8'><progress className="progress progress-primary w-full" value={ 0 } max="100"></progress></div>
                                                    <p className='col-span-1'>0</p>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div>
                                        <p className='text-center py-2 px-4 rounded bg-[#F3F4F5] w-full my-10'>
                                            { t( 'Product Reviews' ) }
                                        </p>
                                        <div className='flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <p className='text-sm'>User Name</p>
                                                    <div className='rating rating-sm'>
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 me-1" /> <span className='text-sm'>5/5</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-sm'>
                                                asdf
                                            </div>
                                            <div className='text-sm'>
                                                Apr-13-2022

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                :
                                <div className='flex flex-col justify-center items-center space-y-4'>
                                    <GiStarsStack className='text-[#D6D9DD] text-[70px]' />
                                    <p className='text-sm'>No Review Given Yet!</p>
                                </div>
                        }
                    </>
                }
            </div>
        </div>
    );
};

