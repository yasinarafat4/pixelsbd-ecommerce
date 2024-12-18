
import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import ChatWithSellerModel from "@/Components/Popups/ChatWithSellerModel";
import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import { asset_url, currencyFormat, placeholder1_1, placeholder_shop_banner } from "@/Helpers";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { ProductContext } from "@/ProductContext";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense, useContext, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose, IoFilterSharp } from "react-icons/io5";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "react-rating";

const LazyProductCard = React.lazy( () => import( '@/Components/Cards/ProductCard' ) );

export default function ShopPage ( { shop, products, minimum_price, maximum_price, colors } )
{

    const { t } = useLaravelReactI18n();
    const { categories, auth, business_settings } = usePage().props;
    let queryParams = usePage().props.ziggy.query;
    const product = useContext( ProductContext );

    let sort_by = queryParams.sort_by || '';
    let min_price = parseInt( queryParams.min_price ) || '';
    let max_price = parseInt( queryParams.max_price ) || '';
    let color_name = queryParams.color || '';

    const [ showModal, setShowModal ] = useState( false );
    const [ sortValue, setSortValue ] = useState( sort_by );
    const [ rangeValue, setRangeValue ] = useState( [ min_price ? min_price : minimum_price ?? 0, max_price ? max_price : maximum_price ?? 0 ] );
    const [ selectedColor, setSelectedColor ] = useState( color_name );

    // Sorting
    function onSortByChange ( e )
    {
        setSortValue( e.target.value );
        router.visit( route( 'shop_page', { 'slug': shop.slug, 'sort_by': e.target.value, 'min_price': min_price, 'max_price': max_price, 'color': color_name } ) )
    }

    // filter by price range
    function onInput ( e )
    {
        setRangeValue( e )
        router.visit( route( 'shop_page', { 'slug': shop.slug, 'sort_by': sort_by, 'min_price': e[ 0 ], 'max_price': e[ 1 ], 'color': color_name } ) )
    }

    //   filter by color
    function onColorClick ( color )
    {
        if ( color_name == color )
        {
            setSelectedColor( '' );
            router.visit( route( 'shop_page', { 'slug': shop.slug, 'sort_by': sort_by, 'min_price': min_price, 'max_price': max_price } ) )
        } else
        {
            setSelectedColor( color );
            router.visit( route( 'shop_page', { 'slug': shop.slug, 'sort_by': sort_by, 'min_price': min_price, 'max_price': max_price, 'color': color } ) )
        }
    }


    // Modal Handlers
    function handelShowModal ()
    {
        setShowModal( true )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    return (
        <DefaultThemeLayout>
            <Head title={ "Shop Page" } />
            <div>
                {/* Chat With Seller Modal */ }
                { showModal && <ChatWithSellerModel product={ product } closeModal={ closeModal } showModal={ showModal } /> }

                <div className="md:relative">
                    <div className="my-3 h-[100px] md:h-[180px] lg:h-[250px] xl:h-[280px]">
                        <img className="rounded w-full h-full" src={ asset_url( shop.shop_banner || placeholder_shop_banner() ) } alt={ shop.name } />
                    </div>
                    <div className="md:absolute border md:border-0 left-2 bottom-2 flex flex-col md:flex-row justify-between items-start gap-3 md:gap-10 py-[10px] px-[10px] md:px-[15px] bg-white rounded">
                        <div className="flex justify-between md:justify-center items-center gap-2">
                            <img className="w-[70px] h-[70px] rounded border p-1" src={ asset_url( shop.logo || placeholder1_1() ) } alt={ shop.name } />
                            <div className="flex flex-col">
                                <h2 className="text-base font-semibold text_primary">{ shop.name }</h2>
                                <div className="rating rating-xs flex items-center gap-2">
                                    <Rating
                                        initialRating={ shop.rating }
                                        readonly
                                        emptySymbol={ <input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" /> }
                                        fullSymbol={ <input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" /> }
                                    />
                                    <p className="text-xs">({ shop.rating.toFixed( 2 ) })</p> | <p className="text_primary text-xs font-medium">{ shop.num_of_reviews } Reviews</p>
                                </div>
                                <p className="text_primary text-xs">{ shop.num_of_sale } Orders</p>
                            </div>
                        </div>
                        { ( business_settings.conversation_system && auth?.customer ) && <button onClick={ e => handelShowModal() } className="flex justify-center items-center gap-2 bg_primary px-3 py-2 w-full md:w-20 text-white rounded">
                            <BsChatText />
                            <span className="text-sm">{ t( 'Chat' ) }</span>
                        </button> }
                    </div>
                </div>
                <hr />
                <div className='relative lg:grid lg:grid-cols-11 xl:grid-cols-12 gap-3 xl:gap-6 lg:my-5 text-slate-600'>
                    {/* Sidebar for Large Devices */ }
                    <div className='hidden lg:block lg:col-span-3 xl:col-span-3 space-y-5'>
                        {/* Categories */ }
                        <details open tabIndex={ 0 } className="collapse collapse-open collapse-arrow cursor-pointer bg-white border border-slate-300 p-2 rounded-sm">
                            <input type="checkbox" />
                            <summary className="collapse-title text-lg font-medium">{ t( 'Categories' ) }</summary>
                            <div className="collapse-content">
                                <div className='h-[400px] shadow-lg'>
                                    <Scrollbars className="">
                                        {
                                            categories.map( ( category, i ) => (
                                                <Link href={ route( 'catgeory_wise_product', category.slug ) } key={ i }>
                                                    <div className="border-1 border-b px-2 py-[8px] mr-3 border-slate-300 text_primary hover:bg_soft_primary duration-500 text-[11px] md:text-[14px] flex justify-between items-center">
                                                        <div className='flex items-center gap-2'>
                                                            <img className='w-6' src={ asset_url( category.icon || placeholder1_1() ) } alt={ category.name } /> <span>{ category.name }</span>
                                                        </div>
                                                        <div>
                                                            <IoIosArrowForward className='text-slate-400 text-lg' />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) )
                                        }
                                    </Scrollbars>
                                </div>
                            </div>
                        </details>
                        {/* Price Range */ }
                        <div className="bg-white border border-slate-300 py-4 px-4 xl:px-6 space-y-7 rounded-sm">
                            <div className="text-lg font-medium text-slate-600">{ t( 'Price Range' ) }</div>
                            <RangeSlider onInput={ e => onInput( e ) } defaultValue=
                                { rangeValue } min={ minimum_price } max={ maximum_price } id="range-slider-yellow" />
                            <div className=" flex justify-between items-center">
                                <span>{ currencyFormat( rangeValue[ 0 ] ) }</span>
                                <span>{ currencyFormat( rangeValue[ 1 ] ) }</span>
                            </div>
                        </div>
                        {/* Filter by Color */ }
                        <details open tabIndex={ 0 } className="collapse collapse-arrow bg-white border border-slate-300 p-2 rounded-sm">
                            <input type="checkbox" />
                            <summary className="collapse-title text-lg font-medium">{ t( 'Filter by Color' ) }</summary>
                            <div className="collapse-content">
                                <div className="grid grid-cols-4 xl:grid-cols-5 px-4 gap-2">
                                    {
                                        colors.map( ( color, i ) => (
                                            <div key={ i } style={ { borderColor: selectedColor == color.name ? '#0f1112' : 'text-slate-300' } } className='flex justify-center items-center cursor-pointer h-10 w-10 rounded-[4px] tooltip tooltip-top border' data-tip={ color.name }>
                                                <div onClick={ e => onColorClick( color.name ) } style={ { backgroundColor: color.color_code } } className="h-[30px] w-[30px] p-1 rounded-[5px] flex items-center justify-center border">
                                                    { selectedColor == color.name && <GiCheckMark className="text-slate-300 text-base" /> }
                                                </div>
                                            </div>
                                        ) )
                                    }
                                </div>
                            </div>
                        </details>
                    </div>
                    {/* Sidebar  for Small Devices*/ }
                    <div className="lg:hidden drawer drawer-end z-50">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-72 md:w-80 min-h-full bg-white text-slate-600">
                                {/* Drawer close button */ }
                                <div className="flex justify-start py-3">
                                    <IoClose className="text-2xl cursor-pointer" onClick={ () => document.getElementById( 'my-drawer-4' ).checked = false } />
                                </div>
                                <div className='space-y-3'>
                                    {/* Categories */ }
                                    <details open tabIndex={ 0 } className="collapse collapse-open collapse-arrow cursor-pointer bg-white border border-slate-300 p-2 rounded-sm">
                                        <input type="checkbox" />
                                        <summary className="collapse-title text-lg font-medium">{ t( 'Categories' ) }</summary>
                                        <div className="collapse-content">
                                            <div className='h-[400px] shadow-lg'>
                                                <Scrollbars className="">
                                                    {
                                                        categories.map( ( category, i ) => (
                                                            <Link href={ route( 'catgeory_wise_product', category.slug ) } key={ i }>
                                                                <div className="border-1 border-b px-2 py-[8px] mr-3 border-slate-300 text_primary hover:bg_soft_primary duration-500 text-[11px] md:text-[14px] flex justify-between items-center">
                                                                    <div className='flex items-center gap-2'>
                                                                        <img className='w-6' src={ asset_url( category.icon || placeholder1_1() ) } alt={ category.name } /> <span>{ category.name }</span>
                                                                    </div>
                                                                    <div>
                                                                        <IoIosArrowForward className='text-slate-400 text-lg' />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ) )
                                                    }
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </details>
                                    {/* Price Range */ }
                                    <div className="bg-white border border-slate-300 py-4 px-4 space-y-7 rounded-sm">
                                        <div className="text-lg font-medium text-slate-600">{ t( 'Price Range' ) }</div>
                                        <RangeSlider onInput={ e => onInput( e ) } defaultValue=
                                            { rangeValue } min={ minimum_price } max={ maximum_price } id="range-slider-yellow" />
                                        <div className=" flex justify-between items-center">
                                            <span>{ currencyFormat( rangeValue[ 0 ] ) }</span>
                                            <span>{ currencyFormat( rangeValue[ 1 ] ) }</span>
                                        </div>
                                    </div>
                                    {/* Filter by Color */ }
                                    <details open tabIndex={ 0 } className="collapse collapse-arrow bg-white border border-slate-300 p-2 rounded-sm">
                                        <input type="checkbox" />
                                        <summary className="collapse-title text-lg font-medium">{ t( 'Filter by Color' ) }</summary>
                                        <div className="collapse-content">
                                            <div className="grid grid-cols-4 px-4 gap-2">
                                                {
                                                    colors.map( ( color, i ) => (
                                                        <div key={ i } style={ { borderColor: selectedColor == color.name ? '#0f1112' : 'text-slate-300' } } className='flex justify-center items-center cursor-pointer h-10 w-10 rounded-[4px] tooltip tooltip-top border' data-tip={ color.name }>
                                                            <div onClick={ e => onColorClick( color.name ) } style={ { backgroundColor: color.color_code } } className="h-[30px] w-[30px] p-1 rounded-[5px] flex items-center justify-center border">
                                                                { selectedColor == color.name && <GiCheckMark className="text-slate-300 text-base" /> }
                                                            </div>
                                                        </div>
                                                    ) )
                                                }
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </ul>
                        </div>
                    </div>
                    {/* Products */ }
                    <div className='lg:col-span-8 xl:col-span-9 space-y-3 md:space-y-0 text-slate-600'>
                        {/* Sorting for Small Devices */ }
                        <div className="lg:hidden flex flex-col w-full gap-4 justify-between items-center py-2">
                            <div className="w-full flex justify-between">
                                <select value={ sortValue } onChange={ e => onSortByChange( e ) } className="select select-bordered rounded-sm w-7/12 md:w-4/12 focus:outline-none border-slate-300 bg-white text-slate-600">
                                    <option value={ '' }>Sort by</option>
                                    <option value={ 'newest' } >Newest</option>
                                    <option value={ 'oldest' } >Oldest</option>
                                    <option value={ 'price-asc' } >Price low to high</option>
                                    <option value={ 'price-desc' } >Price high to low</option>
                                </select>
                                <div className="drawer-content">
                                    {/* Open Drawer Button */ }
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-sm bg-white border border-slate-200 rounded-none"><IoFilterSharp className=" text-xl" /></label>
                                </div>
                            </div>
                        </div>
                        {/* Sorting for Large Devices */ }
                        <div className="hidden w-full lg:flex flex-col lg:flex-row gap-2 justify-between items-center  border-b pb-1">
                            <div className="w-full">
                                <h2 className="font-semibold text-2xl w-full">{ shop.name} Products</h2>
                                <p className="text-sm">{products.meta.total} {products.meta.total > 1 ? 'Items' : 'Item'} Found!</p>
                            </div>
                            <select value={ sortValue } onChange={ e => onSortByChange( e ) } className="select select-bordered rounded-sm w-5/12 xl:w-4/12 focus:outline-none border-slate-300 bg-white text-slate-600">
                                <option value={ '' }>Sort by</option>
                                <option value={ 'newest' } >Newest</option>
                                <option value={ 'oldest' } >Oldest</option>
                                <option value={ 'price-asc' } >Price low to high</option>
                                <option value={ 'price-desc' } >Price high to low</option>
                            </select>
                        </div>
                        { products.meta.total > 0 ? <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 xl:gap-4 pt-2">
                                {
                                    products.data.map( ( product, i ) => (
                                        <div key={ i } className="z-[1]">
                                            <Suspense fallback={ <ProductCardSkeletons /> }>
                                                <LazyProductCard product={ product } />
                                            </Suspense>
                                        </div>
                                    ) )
                                }
                            </div>
                            <div className="flex justify-end items-center mt-2">
                                <Pagination links={ products.meta.links } />
                            </div>
                        </div> : <NothingFound title={ 'No Product Found!' } /> }
                    </div>
                </div>
            </div>
        </DefaultThemeLayout>
    )

}




