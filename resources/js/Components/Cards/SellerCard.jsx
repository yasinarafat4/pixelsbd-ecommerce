import { numberFormat, placeholder1_1, placeholder_shop_banner } from '@/Helpers';
import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { LazyLoadImage } from 'react-lazy-load-image-component';




export default function SellerCard({ shop }) {
    console.log('shop', shop);

    const { t } = useLaravelReactI18n();
    return (
        <Link href={route('shop_page', shop.slug, { sort_by: 'newest' })}>
            <div className="flex flex-col border border_secondary rounded-md">
                <div className="relative">
                    <LazyLoadImage
                        effect="blur"
                        src={shop.banner || placeholder_shop_banner()}
                        alt={shop.name}
                        className="w-full aspect-[6/1] rounded-t-md bg-gray-500 object-cover"
                    />

                    <div className='absolute left-10 -bottom-8 h-[70px] md:h-[65px] w-[70px] md:w-[65px]'>
                        <LazyLoadImage
                            effect="blur"
                            src={shop.logo || placeholder1_1()}
                            alt={shop.name}
                            className="w-full aspect-square -translate-x-1/2 rounded-full border-2 border_secondary bg-gray-300"
                        />
                    </div>
                    {/* Temporary off container */}
                    <div className='hidden absolute left-10 -bottom-7 h-[65px] md:h-[60px] w-[65px] md:w-[60px] -translate-x-1/2 rounded-full border-2 border-white text-white bg-gray-800'>
                        <div className="flex flex-col">
                            <span className='text-[9px] ms-[3px] mt-4'>Temporary</span>
                            <span className='text-[9px] ms-4'>Off</span>
                        </div>
                    </div>

                    <div className="absolute left-[100px] md:left-[87px] xl:left-[89px] flex flex-col items-start justify-start">
                        <div>
                            <p className='font-semibold text-[14px] md:text-[16px] w-40 overflow-hidden truncate' >{shop.name}</p>
                        </div>
                        <p className='flex justify-center items-center gap-1'>
                            <span className='text-[10px] md:text-xs text-slate-600'>{numberFormat(shop.rating)}</span>
                            <span className='rating rating-xs'>
                                <input aria-label='Star Rating' type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </span>
                            <span className='text-[10px] md:text-xs text-slate-500'>{t('Rating')}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-14 pb-5 text-center rounded-b-2xl">
                    <button aria-label="Reviews" className='bg-blue-100 px-[9px] md:px-[10px] py-[4px] text-[10px] md:text-xs rounded'>
                        <span className='text_primary font-semibold'>{shop.num_of_reviews}</span> {t('Reviews')}
                    </button>
                    <button aria-label="Products" className='bg-blue-100 px-[9px] md:px-[10px] py-[4px] text-[10px] md:text-xs rounded'>
                        <span className='text_primary font-semibold'>{shop.products_count}</span> {t('Products')}
                    </button>
                </div>
            </div>

        </Link>
    )

}




