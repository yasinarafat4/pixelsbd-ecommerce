import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { asset_url, currencyFormat, placeholder1_1 } from "@/Helpers";
import { FreeMode, Navigation } from 'swiper/modules';

export default function TopSellersAndProducts ()
{
    const { t } = useLaravelReactI18n();
    const { active_locale, business_settings } = usePage().props
    const [ intervalType, setIntervalType ] = useState( 'all' )
    const [ loading, setLoading ] = useState( false )
    const [ topSellersAndProducts, setTopSellersAndProducts ] = useState( [] )
    const [ activeTab, setActiveTab ] = useState( 0 );

    useEffect( () =>
    {
        fetchData( intervalType )
    }, [] )

    function OnTabClick ( type )
    {
        setIntervalType( type )
        setLoading( true )
        fetchData( type )
    }

    function fetchData ( type )
    {
        axios.post( route( 'admin.dashboard.top_sellers_products_section' ), { 'interval_type': type }, { responseType: "json" } )
            .then( response =>
            {
                setTopSellersAndProducts( response.data )
                setLoading( false )
            } )
    }
    return (
        <div  className="self-start h-[450px] lg:col-span-2 p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
            <div>
                <h2  className="text-lg text-slate-900 font-medium">{ t( 'Top Seller & Products' ) }</h2>
            </div>
            <div  className='h-full space-y-2'>
                <div  className='flex justify-between items-center'>
                    <h3  className='text-[#AAACBD] text-sm font-medium'>{ t( 'By Sales' ) }</h3>
                    {/* Tabs */ }
                    <ul  className='flex items-center gap-2'>
                        <li onClick={ e => OnTabClick( 'all' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white rounded-md ${ intervalType == 'all' && 'bg-[#009EF7] text-white' }` }>{ t( 'All' ) }</li>
                        <li onClick={ e => OnTabClick( 'DAY' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'DAY' && 'bg-[#009EF7] text-white' }` }>{ t( 'Today' ) }</li>
                        <li onClick={ e => OnTabClick( 'WEEK' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'WEEK' && 'bg-[#009EF7] text-white' }` }>{ t( 'Week' ) }</li>
                        <li onClick={ e => OnTabClick( 'MONTH' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'MONTH' && 'bg-[#009EF7] text-white' }` }>{ t( 'Month' ) }</li>
                    </ul>
                </div>
                { loading ?
                    <div  className="h-full flex items-center justify-center">
                        <span  className="loading loading-dots loading-lg text-slate-400"></span>
                    </div>
                    : <div  className="slider-container">
                        <Swiper
                            spaceBetween={ 6 }
                            slidesPerView={ 8 }
                            freeMode={ true }
                            watchSlidesProgress={ true }
                            modules={ [ FreeMode, Navigation ] }
                        >
                            { topSellersAndProducts?.map( ( seller, i ) => (
                                <SwiperSlide key={ i }  className="cursor-pointer">
                                    <div  className="flex flex-col justify-center items-center gap-1" onClick={ e => setActiveTab( i ) }>
                                        <div  className={ `cursor-pointer mask mask-square h-20 w-20 rounded-lg hover:border-2 border-[#009df6] ${ activeTab == i && 'border-2 border-[#009df6]' }` }>
                                            <img
                                                 className='rounded-lg p-1'
                                                src={ asset_url(seller.logo || placeholder1_1()) }
                                                alt={ seller.shop_name } />
                                        </div>
                                        <p  className='text-xs'>{ seller.shop_name }</p>
                                    </div>
                                </SwiperSlide>
                            ) ) }
                        </Swiper>
                        {
                            topSellersAndProducts.map( ( topSellersAndProduct, i ) => (
                                <div  className={ `${ activeTab == i ? 'block' : 'hidden' }` } key={ i }>
                                    <table  className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    { t( 'Item' ) }</th>
                                                <th>{ t( 'Quantity' ) }</th>
                                                <th>{ t( 'Total Price' ) }</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                topSellersAndProduct.products.map( ( product, i ) => (
                                                    <tr key={ i }>
                                                        <td  className='hover:text-[#009DF6] duration-500'>
                                                            <Link href={ route( 'admin.product.product_edit', { lang: 'en', id: window.btoa( product.product_id ) } ) }> <div  className="flex items-center gap-3">
                                                                <div  className="avatar">
                                                                    <div  className="mask mask-squircle h-12 w-12">
                                                                        <img
                                                                            src={ asset_url(product.thumbnail_image) }
                                                                            alt={ product.name[ active_locale ] } />
                                                                    </div>
                                                                </div>
                                                                <div>{ product.name[ active_locale ] }</div>
                                                            </div></Link>
                                                        </td>
                                                        <td>X { product.total_quantity }</td>
                                                        <td>{ currencyFormat( product.sale ) }</td>
                                                    </tr>
                                                ) )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ) )
                        }

                    </div> }
            </div>

        </div>
    )
}


