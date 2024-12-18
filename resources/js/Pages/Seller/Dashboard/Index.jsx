import NothingFound from '@/Components/NothingFound';
import { asset_url, currencyFormat, numberFormat, placeholder1_1 } from '@/Helpers';
import SellerLayout from '@/Layouts/SellerLayout';

import { Head, Link, usePage } from '@inertiajs/react';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Line } from 'react-chartjs-2';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsBagPlus, BsBoxSeam, BsHouseGear } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { IoAnalyticsOutline } from 'react-icons/io5';
import { MdDirectionsRun } from 'react-icons/md';
import { PiStarLight } from 'react-icons/pi';
import { TbSettingsDollar, TbShoppingBagCheck, TbShoppingBagX } from 'react-icons/tb';
import { TfiPlus } from 'react-icons/tfi';
import Rating from 'react-rating';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


export default function Index() {
    const { t } = useLaravelReactI18n();
    const { auth, active_locale, total_products, product_rating, total_orders, total_sale, this_year_sales, previous_year_sales, category_wise_product_counts,
        total_new_order, total_cancelled_order, total_on_delivery_order, total_delivered_order, products
    } = usePage().props

    var months = Object.keys(this_year_sales);
    var thisYearData = Object.values(this_year_sales);
    var previousYearData = Object.values(previous_year_sales);

    const lineChartOptions = {
        plugins: {
            legend: {
                display: true,
                align: 'center',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const salesData = {
        labels: months,
        datasets: [
            {
                label: 'Previous Year Sales',
                data: previousYearData,
                borderColor: '#FF6384',
            },
            {
                label: 'Current Year Sales',
                data: thisYearData,
                borderColor: '#19C562'
            }
        ]
    }

    return (
        <SellerLayout>
            <Head title="Seller Dashboard" />
            <div className="bg-white p-5 space-y-5">
                {/* Configure Text  */}
                <div className=''>
                    <h2 className='text-xl font-semibold'>Seller Dashboard</h2>
                </div>
                <div className='space-y-5'>
                    {/* Top */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>

                        {/* Products */}
                        <div className="p-[25px] bg-[#2E294E] text-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                            <div className="flex justify-between items-center py-[15px]">
                                <div className='text-white'>
                                    <p className="text-sm font-normal">{t('Products')}</p>
                                    <h1 className="text-3xl font-semibold">{total_products}</h1>
                                </div>
                                <div>
                                    <BsBoxSeam className="text-6xl text-white font-normal" />
                                </div>
                            </div>
                        </div>
                        {/* Rating */}
                        <div className="p-[25px] bg-[#2E294E] text-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                            <div className="flex justify-between items-center py-[15px]">
                                <div className='text-white'>
                                    <p className="text-sm font-normal">{t('Rating')}</p>
                                    <h1 className="text-3xl font-semibold">{numberFormat(product_rating || 0)}</h1>
                                </div>
                                <div>
                                    <PiStarLight className="text-7xl text-white font-normal" />
                                </div>
                            </div>
                        </div>
                        {/* Total Order */}
                        <div className="p-[25px] bg-[#2E294E] text-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                            <div className="flex justify-between items-center py-[15px]">
                                <div className='text-white'>
                                    <p className="text-sm font-normal">{t('Total Order')}</p>
                                    <h1 className="text-3xl font-semibold">{total_orders}</h1>
                                </div>
                                <div>
                                    <CiViewList className="text-7xl text-white font-normal" />
                                </div>
                            </div>
                        </div>
                        {/* Total Sales */}
                        <div className="p-[25px] bg-[#2E294E] text-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                            <div className="flex justify-between items-center py-[15px]">
                                <div className='text-white'>
                                    <p className="text-sm font-normal">{t('Total Sales')}</p>
                                    <h1 className="text-3xl font-semibold">{currencyFormat(total_sale)}</h1>
                                </div>
                                <div className='border-l-2 border-b-2 p-2'>
                                    <IoAnalyticsOutline className="text-5xl text-white font-normal" />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Center */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-full gap-5'>
                        {/* Total Sales */}
                        <div className='col-span-2 space-y-5'>
                            <div className="p-5 bg-[#E9E9F0] rounded-lg space-y-5">
                                <div>
                                    <h2 className="text-lg text-black font-semibold">{t('Sales Stat')}</h2>
                                    {/* Line Chart */}
                                    <div className='h-full w-full mx-auto'>
                                        <Line options={lineChartOptions} data={salesData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Category Wise Product*/}
                        <div className="px-5 border border-slate-300 bg-white rounded-lg space-y-5">
                            <div className='border-b border-slate-300 py-4'>
                                <h2 className="text-lg text-black font-semibold">{t('Category wise product count')}</h2>
                            </div>
                            <div className='space-y-2'>
                                {category_wise_product_counts.length > 0 ?
                                    <ul>
                                        {category_wise_product_counts.map((category_wise_product, i) => (

                                            <li key={i} className='flex justify-between items-center text-sm'><span>{category_wise_product.name[active_locale]}</span><span>{category_wise_product.product_count}</span></li>
                                        ))
                                        }
                                    </ul>
                                    :
                                    <p className='text-base font-semibold text-center'>No Product Count Yet!</p>}
                            </div>
                        </div>
                        {/*Orders */}
                        <div className="px-5 py-4 border border-slate-300 bg-white rounded-lg space-y-5">
                            <div>
                                <h2 className="text-lg text-black font-semibold">{t('Orders')}</h2>
                                {/* <p  className='text-sm text-slate-500 font-semibold'>This Month</p> */}
                            </div>
                            <div className='space-y-2'>
                                <ul>
                                    <li className='flex flex-col justify-start items-start gap-5'>
                                        <div className='flex justify-center items-center gap-7'>
                                            <BsBagPlus className='text-3xl' />
                                            <div>
                                                <p className="text-sm text-black font-semibold">{t('New Order')}</p>
                                                <h1 className="text-3xl text-[#A9A3CC] font-semibold">{total_new_order}</h1>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-7'>
                                            <TbShoppingBagX className='text-3xl' />
                                            <div>
                                                <p className="text-sm text-black font-semibold">{t('Cancelled')}</p>
                                                <h1 className="text-3xl text-[#A9A3CC] font-semibold">{total_cancelled_order}</h1>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-7'>
                                            <MdDirectionsRun className='text-3xl' />
                                            <div>
                                                <p className="text-sm text-black font-semibold">{t('On Delivery')}</p>
                                                <h1 className="text-3xl text-[#A9A3CC] font-semibold">{total_on_delivery_order}</h1>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center gap-7'>
                                            <TbShoppingBagCheck className='text-3xl' />
                                            <div>
                                                <p className="text-sm text-black font-semibold">{t('Delivered')}</p>
                                                <h1 className="text-3xl text-[#A9A3CC] font-semibold">{total_delivered_order}</h1>
                                            </div>
                                        </div>

                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className='grid grid-cols-5 gap-4'>
                        {/* Add New product */}
                        <Link href={route('seller.product.products.create')}>
                            <div className="flex flex-col justify-center items-center h-full gap-3 py-[30px] bg-white border border-slate-300 rounded-lg">
                                <h2 className="text-lg text-black font-semibold">{t('Add New product')}</h2>
                                <TfiPlus className="text-6xl" />
                            </div>
                        </Link>
                        {/* Money Withdraw */}
                        <Link href={route('seller.money_withdraw')}>
                            <div className="flex flex-col justify-center items-center h-full gap-3 p-5 bg-white border border-slate-300 rounded-lg">
                                <h2 className="text-lg text-black font-semibold">{t('Money Withdraw')}</h2>
                                <BiMoneyWithdraw className="text-7xl font-normal" />
                            </div>
                        </Link>
                        {/* Shop Settings */}
                        <div className='py-[10px] bg-[#E9E9F0] rounded-lg'>
                            <div className="flex flex-col justify-center items-center h-full gap-3">
                                <h2 className="text-lg text-black font-semibold">{t('Shop Settings')}</h2>
                                <BsHouseGear className="text-4xl" />
                                <Link href={route('seller.shop_setting.index')} className='py-2 w-10/12 mx-auto text-center bg-[#2E294E] text-white rounded-md'>{t('Go to Shop Setting')}</Link>
                            </div>
                        </div>
                        {/* Payment Settings */}
                        <div className='py-[10px] bg-[#E9E9F0] rounded-lg'>
                            <div className="flex flex-col justify-center items-center h-full gap-3">
                                <h2 className="text-lg text-black font-semibold">{t('Payment Settings')}</h2>
                                <TbSettingsDollar className="text-4xl" />
                                <Link href={route('seller.seller_profile')} className='py-2 w-10/12 mx-auto text-center bg-[#2E294E] text-white rounded-md'>{t('Configure Now')}</Link>
                            </div>
                        </div>
                        {/* Verify */}
                        <div className="flex justify-center items-center bg-white border border-slate-300 rounded-lg p-5">
                            {
                                auth.seller?.shop?.verification_status == 1 ?
                                    <div>
                                        <img className='w-full h-full' src={asset_url("/assets/verified.webp")} alt="verified" />
                                    </div>
                                    : auth.seller?.shop?.verification_status == 2 ?
                                        <div className='flex flex-col justify-center items-center'>
                                            <img className='w-8/12 h-full' src={asset_url("/assets/rejected.webp")} alt="rejected" />
                                            <Link href={route('seller.seller_verification')} className='py-2 px-3 bg-black text-white rounded'>Re-submit</Link>
                                        </div>
                                        :
                                        <div className='flex flex-col justify-center items-center'>
                                            <img className='w-8/12 h-full' src={asset_url("/assets/not-approved.webp")} alt="verified" />
                                            <Link href={route('seller.seller_verification')} className='py-2 px-3 bg-black text-white rounded'>Verify Now</Link>
                                        </div>
                            }
                        </div>
                    </div>
                    {/* Top Products */}
                    <div className="border border-slate-300 rounded-lg">
                        <div className='flex justify-between items-center border-b p-4'>
                            <h2 className='text-xl font-semibold'>Top Products</h2>
                            <Link href={route('seller.product.products.index')} className='text-sm font-medium text_primary hover:text_primary hover:underline duration-300'>View All Products</Link>
                        </div>
                        {products.length > 0 ? <div className="grid grid-cols-6 gap-4 p-4">
                            {
                                products.map((product, i) => (
                                    <div key={i} className='group border border-slate-300 hover:border_secondary duration-300 rounded-md'>
                                        <div className='p-2'>
                                            <img src={product.thumbnail_image || placeholder1_1()} alt={product?.name} />
                                        </div>
                                        <div className='px-4 py-3 border-t group-hover:border-slate-400 duration-300'>
                                            {product?.has_discount
                                                ?
                                                <div className="flex items-end gap-1">
                                                    <span className="text-base font-bold text_primary">{product?.main_price}</span>
                                                    <span className="line-through text-sm text-[#646c7e] font-medium">{product?.stroked_price}</span>
                                                </div>
                                                :
                                                <span className="text-base font-bold text_primary">{product?.main_price}</span>
                                            }
                                            {
                                                <div className='flex items-center gap-1'>
                                                    <div className="rating rating-sm">
                                                        <Rating
                                                            initialRating={product.rating}
                                                            readonly
                                                            emptySymbol={<input aria-label="Empty Rating" type="radio" name="rating-7" className="mask mask-star-2 bg-gray-400" />}
                                                            fullSymbol={<input aria-label="Star Rating" type="radio" name="rating-7" className="bg_secondary mask mask-star-2" />}
                                                        />
                                                    </div>
                                                    <p className='text-xs'>({numberFormat(product.rating || 0)})</p>
                                                </div>
                                            }
                                            <Link href={route('seller.product.product_edit', { lang: 'en', id: window.btoa(product.id) })}>
                                                <p className='text-[#2E294E] hover:text_secondary duration-300 text-sm font-semibold truncate ...'>{product?.name}</p>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div> : <NothingFound title={"No Product Found!"} />}
                    </div>
                </div>
            </div>
        </SellerLayout >
    );
}
