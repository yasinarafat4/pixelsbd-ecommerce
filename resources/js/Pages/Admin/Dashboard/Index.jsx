import { asset_url, currencyFormat, numberFormat, placeholder_user } from '@/Helpers';
import AdminLayout from '@/Layouts/AdminLayout';

import { Head, Link, usePage } from '@inertiajs/react';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { Doughnut, Line } from 'react-chartjs-2';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaArchive, FaRegClock, FaUsers } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { GoDotFill } from 'react-icons/go';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';
import { PiMedalFill } from 'react-icons/pi';
import { TbShoppingCartCheck, TbTruck } from 'react-icons/tb';
import InhouseTopBrands from './inhouse_top_brands';
import InhouseTopCategories from './inhouse_top_categories';
import TopSellersAndProducts from './top_sellers_and_products';

ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement );


export default function Index ()
{
    const { t } = useLaravelReactI18n();
    const { auth, active_locale, total_customers, top_customers, total_products, total_inhouse_products, total_sellers_products, total_categories,
        top_categories, total_brands, top_brands, total_sale, sale_this_month, admin_sale_this_month, seller_sale_this_month, this_year_sales, previous_year_sales, total_order, total_placed_order, total_pending_order, total_confirmed_order, total_picked_up_order, total_shipped_order, total_inhouse_sale, payment_type_wise_inhouse_sale, inhouse_product_rating, total_inhouse_pending_order, total_inhouse_order, business_settings, env_data } = usePage().props;


    var months = Object.keys( this_year_sales );
    var thisYearData = Object.values( this_year_sales );
    var previousYearData = Object.values( previous_year_sales );

    const DoughnutChartOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const InhouseData = {
        labels: payment_type_wise_inhouse_sale.map( row =>
            row.payment_type
                .split( '_' )
                .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
                .join( ' ' )
        ),
        datasets: [
            {
                data: payment_type_wise_inhouse_sale.map( row =>
                    row.total_amount
                ),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCD56',
                ],

            }
        ]
    };

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
        <AdminLayout
            user={ auth.customer }
            header={ <h2  className="font-semibold text-xl text-gray-800 leading-tight">{ t( 'Dashboard' ) }</h2> }
        >
            <Head title="Admin Dashboard" />
            <div  className="p-5 space-y-5">
                {/* Configure Text  */ }
                { ( !env_data.MAIL_USERNAME.value || !env_data.MAIL_PASSWORD.value ) && <div  className='bg-[#D1ECF1] px-5 py-3 rounded border border-slate-300'>
                    <p  className='text-[13px] text-slate-600 font-medium'>{ t( 'Please Configure SMTP Setting to work all email sending functionality,' ) }
                        <Link href={ route( 'admin.configuration.smtp_setting' ) }  className='font-semibold text-slate-900 ms-1'>{ t( 'Configure Now' ) }</Link></p>
                </div> }

                <div  className="grid grid-cols-1 lg:grid-cols-4 gap-5">

                    {/* Total Customers */ }
                    <div  className="p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div  className="flex justify-between items-start">
                            <div>
                                <h1  className="text-3xl font-semibold">{ total_customers }</h1>
                                <p  className="text-sm text-slate-600 font-medium">{ t( 'Total Customers' ) }</p>
                            </div>
                            <div>
                                <FaUsers  className="text-4xl text-[#D5D6DB] font-semibold" />
                            </div>
                        </div>
                        <ul>
                            <li  className="flex flex-col items-start text-[13px]">
                                <div  className="flex items-center"><GoDotFill  className="text-xl text-[#F0416C]" /> <span  className="text-slate-500">{ t( ' Top Customers' ) }</span></div>
                                <div  className="avatar-group -space-x-3 rtl:space-x-reverse">
                                    { top_customers.map( ( customer, i ) => (

                                        <div key={ i } title={ customer.name }  className="avatar border-white hover:z-10 duration-300 cursor-pointer">
                                            <div  className="w-8">
                                                <img src={ asset_url(customer.image || placeholder_user()) } alt={ customer.name } />
                                            </div>
                                        </div>
                                    ) ) }
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Total Products */ }
                    <div  className="p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div  className="flex justify-between items-start">
                            <div>
                                <h1  className="text-3xl font-semibold">{ total_products }</h1>
                                <p  className="text-sm text-slate-600 font-medium">{ t( 'Total Products' ) }</p>
                            </div>
                            <div>
                                <FaArchive  className="text-4xl text-[#D5D6DB] font-semibold" />
                            </div>
                        </div>
                        <ul>
                            <li  className="flex justify-between items-end text-[13px]">
                                <div  className="flex items-center"><GoDotFill  className="text-xl text-[#19C553]" /> <span  className="text-slate-500">{ t( ' Inhouse Products' ) }</span></div>
                                <div>{ total_inhouse_products }</div>
                            </li>
                            <li  className="flex justify-between items-end text-[13px]">
                                <div  className="flex items-center"><GoDotFill  className="text-xl text-[#009EF7]" /> <span  className="text-slate-500">{ t( ' Sellers Products' ) }</span></div>
                                <div>{ total_sellers_products }</div>
                            </li>
                        </ul>
                    </div>

                    {/* Total Category */ }
                    <div  className="p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div  className="flex justify-between items-start">
                            <div>
                                <h1  className="text-3xl font-semibold">{ total_categories }</h1>
                                <p  className="text-sm text-slate-600 font-medium">{ t( 'Total Category' ) }</p>
                            </div>
                            <div>
                                <BiCategoryAlt  className="text-4xl text-[#D5D6DB] font-semibold" />
                            </div>
                        </div>

                        <ul>
                            { top_categories.map( ( category, i ) => (
                                <li key={ i }  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#F68DA7]" /> <span  className="text-slate-500">{ category.name[ active_locale ] }</span></div>
                                    <div>{ currencyFormat( category.total ) }</div>
                                </li>
                            ) ) }
                        </ul>
                    </div>

                    {/* Total Brands */ }
                    <div  className="p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div  className="flex justify-between items-start">
                            <div>
                                <h1  className="text-3xl font-semibold">{ total_brands }</h1>
                                <p  className="text-sm text-slate-600 font-medium">{ t( 'Total Brands' ) }</p>
                            </div>
                            <div>
                                <PiMedalFill  className="text-4xl text-[#D5D6DB] font-semibold" />
                            </div>
                        </div>
                        <ul>
                            { top_brands.map( ( brand, i ) => (
                                <li key={ i }  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#19C553]" /> <span  className="text-slate-500">{ brand.name[ active_locale ] }</span></div>
                                    <div>{ currencyFormat( brand.total ) }</div>
                                </li>
                            ) ) }

                        </ul>
                    </div>

                    {/* Total Sales */ }
                    <div  className="p-5 col-span-2 bg-[#F1FAFD] drop-shadow-lg border border-slate-200 rounded-lg space-y-2">
                        <div>
                            <h1  className="text-3xl font-semibold text-[#009EF7]">{ currencyFormat( total_sale ) }</h1>
                            <p  className="text-sm text-[#009EF7] font-medium">{ t( 'Total Sales' ) }</p>
                        </div>
                        <div  className='flex justify-between items-center gap-5'>
                            {/* Sales this month */ }
                            <div  className="flex flex-col justify-center items-center w-full bg-[#009EF7] text-white text-sm px-3 py-[13px] rounded-[7px]">
                                <span  className='text-lg font-semibold'>{ currencyFormat( sale_this_month ) }</span>
                                <span>{ t( 'Sales this month' ) }</span>
                            </div>
                            {/*  */ }
                            <div  className="flex flex-col justify-center items-center w-full bg-[#FF4069] text-white text-sm px-3 py-[13px] rounded-[7px]">
                                <span  className='text-lg font-semibold'>{ currencyFormat( admin_sale_this_month.total_sale ) }</span>
                                <span>{ t( 'Inhouse Sales this month' ) }</span>
                            </div>
                            <div  className="flex flex-col justify-center items-center w-full bg-[#8F60EE] text-white text-sm px-3 py-[13px] rounded-[7px]">
                                <span  className='text-lg font-semibold'>{ currencyFormat( seller_sale_this_month.total_sale ) }</span>
                                <span>{ t( 'Seller Sales this month' ) }</span>
                            </div>
                        </div>
                        <div>
                            <h2  className="text-sm text-[#009EF7] font-medium">{ t( 'Sales Stat' ) }</h2>
                            {/* Line Chart */ }
                            <div  className='w-full mx-auto'>
                                <Line options={ lineChartOptions } data={ salesData } />
                            </div>
                        </div>
                    </div>

                    {/* In-house Store */ }
                    <div  className="lg:col-span-2 p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div  className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div  className='flex flex-col justify-between gap-5 h-full'>
                                <div  className='space-y-4'>
                                    <h2  className="text-lg text-slate-900 font-medium">{ t( 'In-house Store' ) }</h2>
                                    <div>
                                        <h1  className="text-4xl font-semibold">{ currencyFormat( total_inhouse_sale ) }</h1>
                                        <p  className="text-sm text-slate-900 font-medium">{ t( 'Total Sales' ) }</p>
                                    </div>
                                    {/* Doughnut Chart */ }
                                    <div  className='h-72 w-72 mx-auto'>
                                        <Doughnut options={ DoughnutChartOptions } data={ InhouseData } />
                                    </div>
                                </div>
                                <Link href={ route( 'admin.orders.index' ) }>
                                    <button  className=' bg-[#F4EFFE] hover:bg-[#8F60EE] text-[#8F60EE] hover:text-white duration-500 py-[11px] px-4 w-full text-[15px] rounded-lg'>{ t( 'All In-house Orders' ) }</button>
                                </Link>
                            </div>
                            <div  className='flex flex-col gap-3'>
                                {/* Inhouse Product */ }
                                <div  className='flex flex-col items-start justify-start bg-[#EEF0F2] p-7 rounded-lg'>
                                    <h1  className='text-4xl text-slate-900 font-medium'>{ total_inhouse_products }</h1>
                                    <p  className='text-[15px] text-[#009EF7]  font-medium'>{ t( 'Inhouse Product' ) }</p>
                                </div>

                                {/* Ratings */ }
                                <div  className='flex flex-col items-start justify-start bg-[#EEF0F2] p-7 rounded-lg'>
                                    <h1  className='text-4xl text-slate-900 font-medium'>{ numberFormat( inhouse_product_rating || 0 ) }</h1>
                                    <p  className='text-[15px] text-[#FFC234]  font-medium'>{ t( 'Ratings' ) }</p>
                                </div>

                                {/* Pending Orders */ }
                                <div  className='flex flex-col items-start justify-start bg-[#EEF0F2] p-7 rounded-lg'>
                                    <h1  className='text-4xl text-slate-900 font-medium'>{ total_inhouse_pending_order }</h1>
                                    <p  className='text-[15px] text-[#8F60EE]  font-medium'>{ t( 'Pending Orders' ) }</p>
                                </div>

                                {/* Total Orders */ }
                                <div  className='flex flex-col items-start justify-start bg-[#EEF0F2] p-7 rounded-lg'>
                                    <h1  className='text-4xl text-slate-900 font-medium'>{ total_inhouse_order }</h1>
                                    <p  className='text-[15px] text-[#8F60EE]  font-medium'>{ t( 'Total Orders' ) }</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Sellers */ }
                    {/* <div  className="p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
                        <div>
                            <h1  className="text-3xl font-semibold">0</h1>
                            <p  className="text-sm text-slate-600 font-medium">{ t( 'Total Sellers' ) }</p>
                        </div>
                        <ul>
                            <li  className="flex justify-between items-end text-[13px]">
                                <div  className="flex items-center"><GoDotFill  className="text-xl text-[#19C553]" /> <span  className="text-sm text-slate-900 font-medium">{ t( 'Approved Sellers' ) }</span></div>
                                <div  className="text-sm text-slate-900 font-medium">0</div>
                            </li>
                            <li  className="flex justify-between items-end text-[13px]">
                                <div  className="flex items-center"><GoDotFill  className="text-xl text-[#F0416C]" /> <span  className="text-sm text-slate-900 font-medium">{ t( 'Pending Sellers' ) }</span></div>
                                <div  className="text-sm text-slate-900 font-medium">0</div>
                            </li>
                        </ul>
                        <div  className="flex flex-col items-start border-b border-dashed pb-2 text-[13px]">
                            <div  className="flex items-center"><GoDotFill  className="text-xl text-[#FFC700]" /> <span  className="text-slate-500">{ t( ' Top Sellers' ) }</span></div>
                            <div  className="avatar-group -space-x-3 rtl:space-x-reverse">
                                <div title='User Name'  className="avatar hover:z-10 duration-300 cursor-pointer">
                                    <div  className="w-8">
                                        <img src="/assets/user.png" />
                                    </div>
                                </div>
                                <div title='User Name'  className="avatar hover:z-10 duration-300 cursor-pointer">
                                    <div  className="w-8">
                                        <img src="/assets/user.png" />
                                    </div>
                                </div>
                                <div title='User Name'  className="avatar hover:z-10 duration-300 cursor-pointer">
                                    <div  className="w-8">
                                        <img src="/assets/user.png" />
                                    </div>
                                </div>
                                <div title='User Name'  className="avatar hover:z-10 duration-300 cursor-pointer">
                                    <div  className="w-8">
                                        <img src="/assets/user.png" />
                                    </div>
                                </div>
                                <div title='User Name'  className="avatar hover:z-10 duration-300 cursor-pointer">
                                    <div  className="w-8">
                                        <img src="/assets/user.png" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div  className='flex flex-col gap-4'>
                            <Link href={ route( 'admin.seller.index' ) }>
                                <button  className='bg-[#E6FFF3] hover:bg-[#19C553] text-[#19C553] hover:text-[white] duration-500 py-[11px] px-4 w-full text-[15px] rounded-lg'>{ t( 'All Sellers' ) }</button>
                            </Link>
                            <Link>
                                <button  className='bg-[#FFF4F8] hover:bg-[#F14E77] text-[#F14E77] hover:text-[white] duration-500 py-[11px] px-4 w-full text-[15px] rounded-lg'>{ t( 'Pending Sellers' ) }</button>
                            </Link>
                        </div>
                    </div> */}
                    <div  className="lg:col-span-2 self-start grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
                        <div  className='flex flex-col gap-3'>
                            {/* Total Order */ }
                            <div  className='bg-[#F4EFFE] rounded-lg p-5 flex flex-col justify-between gap-5 h-full'>
                                <div>
                                    <h1  className="text-3xl font-semibold text-[#8F60EE]">{ total_order }</h1>
                                    <p  className="text-sm text-slate-500 font-medium">{ t( 'Total Order' ) }</p>
                                </div>
                                <Link href={ route( 'admin.orders.index' ) }>
                                    <button  className='bg-[#8F60EE] hover:bg-[#F0416C] text-white duration-500 py-[11px] px-4 w-full text-[15px] rounded-lg'>{ t( 'All Orders' ) }</button>
                                </Link>
                            </div>
                            {/* Pending Orders */ }
                            <div  className='flex justify-between items-center bg-[#F0416C] text-white px-9 py-7 rounded-lg'>
                                <div  className='flex items-center gap-2'>
                                    <FaRegClock  className='text-2xl font-medium' />
                                    <p  className='text-[15px] font-medium'>{ t( 'Pending Orders' ) }</p>
                                </div>
                                <div  className='text-2xl font-medium'>{ total_pending_order }</div>
                            </div>
                        </div>

                        <div  className='flex flex-col gap-3'>
                            {/* Order Placed */ }
                            <div  className='flex justify-between items-center bg-[#F1FAFD] px-9 py-7 rounded-lg'>
                                <div  className='flex items-center gap-2'>
                                    <MdOutlineCollectionsBookmark  className='text-3xl text-[#009EF7]' />
                                    <p  className='text-[15px] text-slate-900 font-medium'>{ t( 'Order placed' ) }</p>
                                </div>
                                <div  className='text-2xl text-[#009EF7] font-medium'>{ total_placed_order }</div>
                            </div>
                            {/* Confirmed Order */ }
                            <div  className='flex justify-between items-center bg-[#E6FFF3] px-9 py-7 rounded-lg'>
                                <div  className='flex items-center gap-2'>
                                    <TbShoppingCartCheck  className='text-3xl text-[#19C562]' />
                                    <p  className='text-[15px] text-slate-900 font-medium'>{ t( 'Confirmed Order' ) }</p>
                                </div>
                                <div  className='text-2xl text-[#19C562] font-medium'>{ total_confirmed_order }</div>
                            </div>
                            {/* Pickedup Order */ }
                            <div  className='flex justify-between items-center bg-[#FFF4F8] px-9 py-7 rounded-lg'>
                                <div  className='flex items-center gap-2'>
                                    <FiBox  className='text-3xl text-[#F1416C]' />
                                    <p  className='text-[15px] text-slate-900 font-medium'>{ t( 'Pickedup Order' ) }</p>
                                </div>
                                <div  className='text-2xl text-[#F1416C] font-medium'>{ total_picked_up_order }</div>
                            </div>
                            {/* On the Way Order */ }
                            <div  className='flex justify-between items-center bg-[#FFF9E3] px-9 py-7 rounded-lg'>
                                <div  className='flex items-center gap-2'>
                                    <TbTruck  className='text-3xl text-[#FFC700]' />
                                    <p  className='text-[15px] text-slate-900 font-medium'>{ t( 'On the Way Order' ) }</p>
                                </div>
                                <div  className='text-2xl text-[#FFC700] font-medium'>{ total_shipped_order }</div>
                            </div>
                        </div>
                    </div>

                    {/* In-house Top Category */ }
                    <InhouseTopCategories />

                    {/* In-house Top Brands */ }
                    <InhouseTopBrands />

                    {/* Top Seller & Products */ }
                    { business_settings.vendor_system && <TopSellersAndProducts /> }
                </div>
            </div>
        </AdminLayout>
    );
}
