import { currencyFormat } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, usePage } from "@inertiajs/react";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Tooltip } from "chart.js";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Bar } from "react-chartjs-2";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHandHoldingUsd, FaUsers } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { PiMedalFill } from "react-icons/pi";
import { TbReportMoney } from "react-icons/tb";


ChartJS.register( ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement );

export default function EarningReport ()
{
    const { t } = useLaravelReactI18n();

    const { total_sale, sale_this_month, this_year_sales, previous_year_sales, total_payouts_amount, payouts_this_month, total_categories, top_categories, total_brands, top_brands } = usePage().props

    var months = Object.keys( this_year_sales );
    var thisYearSaleData = Object.values( this_year_sales );
    var previousYearSaleData = Object.values( previous_year_sales );

    const totalSalesOptions = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                display: true
            },
            y: {
                display: false
            }
        },
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
    const totalSalesData = {
        labels: months,
        datasets: [
            {
                label: 'Previous Year Sales',
                data: previousYearSaleData,
                backgroundColor: [
                    '#8F60EE',
                ],
                barThickness: 6,
            },
            {
                label: 'Current Year Sales',
                data: thisYearSaleData,
                backgroundColor: [
                    '#19C562',
                ],
                barThickness: 6,
            }
        ]
    }

    const totalPayoutsOptions = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                display: true,
            },
            y: {
                display: false,

            }
        },
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

    const totalPayoutsData = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [
            {
                label: 'Previous Year',
                data: [ 100, 725, 5487, 878, 5787, 224, 477, 5655, 22, 6744, 1545, 923 ],
                backgroundColor: [
                    '#8F60EE',
                ],
                barThickness: 6,
            },
            {
                label: 'Current Year',
                data: [ 1007, 825, 3487, 6878, 6787, 2224, 2477, 555, 422, 244, 545, 2923 ],
                backgroundColor: [
                    '#19C562',
                ],
                barThickness: 6,
            }
        ]
    }

    const NetSalesOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const NetSalesData = {
        labels: [ 'Product Sales', 'Commission', 'Seller Subscription', 'Customer Subscription', 'Delivery' ],
        datasets: [
            {
                label: 'All',
                data: [ 100, 200, 300, 344, 675 ],
                backgroundColor: [
                    '#8F60EE',
                ],

            },
            {
                label: 'Today',
                data: [ 10, 400, 500, 52, 74 ],
                backgroundColor: [
                    '#FF6384',
                ],

            },
            {
                label: 'Week',
                data: [ 103, 40, 540, 152, 744 ],
                backgroundColor: [
                    '#36A2EB',
                ],

            },
            {
                label: 'Month',
                data: [ 150, 600, 700, 452, 74 ],
                backgroundColor: [
                    '#FFCD56'
                ],

            }
        ]
    };

    const PayoutsOptions = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const PayoutsData = {
        labels: [ 'Seller Payout', 'Product Refund', 'Delivery Boy' ],
        datasets: [
            {
                label: 'All',
                data: [ 100, 200, 300 ],
                backgroundColor: [
                    '#8F60EE',
                ],

            },
            {
                label: 'Today',
                data: [ 10, 400, 500 ],
                backgroundColor: [
                    '#FF6384',
                ],

            },
            {
                label: 'Week',
                data: [ 103, 40, 540 ],
                backgroundColor: [
                    '#36A2EB',
                ],

            },
            {
                label: 'Month',
                data: [ 150, 600, 700 ],
                backgroundColor: [
                    '#FFCD56'
                ],

            }
        ]
    };

    const SaleAnalyticsOptions = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                display: true
            },
            y: {
                display: true
            }
        },
        plugins: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const SaleAnalyticsData = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [
            {
                label: 'All',
                data: [ 100, 200, 300, 344, 675, 100, 200, 300, 344, 675, 434, 352 ],
                backgroundColor: [
                    '#349CE2',
                ],
            },
            {
                label: 'Today',
                data: [ 200, 300, 400, 444, 775, 200, 300, 400, 444, 775, 534, 452 ],
                backgroundColor: [
                    '#8F60EE',
                ],

            },
            {
                label: 'Week',
                data: [ 300, 400, 500, 544, 875, 300, 400, 500, 544, 875, 634, 552 ],
                backgroundColor: [
                    '#FF6384',
                ],

            },
            {
                label: 'Month',
                data: [ 400, 500, 600, 644, 675, 100, 300, 600, 644, 975, 734, 652 ],
                backgroundColor: [
                    '#FFCD56',
                ],
            }
        ]
    }

    const PayoutsAnalyticsOptions = {
        indexAxis: 'x',
        responsive: true,
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            }
        },
        plugins: {
            legend: {
                display: true,
                align: 'end',
                labels: {
                    boxWidth: 13,
                    padding: 20
                }
            }
        }
    }

    const PayoutsAnalyticsData = {
        labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [
            {
                label: 'All',
                data: [ 0.5, 0.4, 0.2, 0.3, 0.5, 0.9, 0.7, 0.8, 0.9, 0.6, 0.5, 1 ],
                backgroundColor: [
                    '#349CE2',
                ],
            },
            {
                label: 'Today',
                data: [ 0.7, 0.3, 0.4, 0.6, 0.2, 0.6, 0.9, 0.7, 0.5, 0.4, 0.8, 0.7 ],
                backgroundColor: [
                    '#8F60EE',
                ],

            },
            {
                label: 'Week',
                data: [ 0.6, 0.7, 0.3, 0.7, 0.5, 0.8, 0.4, 0.7, 0.8, 0.9, 0.6, 0.8 ],
                backgroundColor: [
                    '#FF6384',
                ],

            },
            {
                label: 'Month',
                data: [ 0.8, 0.4, 0.2, 0.8, 0.3, 0.5, 0.7, 0.8, 0.9, 0.5, 0.6, 0.5 ],
                backgroundColor: [
                    '#FFCD56',
                ],
            }
        ]
    }


    return (
        <AdminLayout>
            <Head title={ "Earning Report" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <TbReportMoney  className="text-base text-slate-900" />
                                    <span>{ t( 'Earning Report' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className='px-7 py-2 bg-[#FEFEFE]'>
                    {/* Earning Report */ }
                    <div  className="grid grid-cols-4 gap-7">
                        {/* Total Sales */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-7">
                            <div  className="flex justify-between items-start">
                                <div>
                                    <h1  className="text-3xl font-semibold">{ currencyFormat( total_sale ) }</h1>
                                    <p  className="text-sm text-slate-400 font-medium">{ t( 'Total Sales Alltime' ) }</p>
                                </div>
                                <div>
                                    <FaUsers  className="text-4xl text-[#D5D6DB] font-semibold" />
                                </div>
                            </div>
                            <div  className="flex justify-between bg-[#009EF7] text-white text-sm px-3 py-[13px] rounded-[10px]">
                                <span>{ t( 'Sales this month' ) }</span>
                                <span>{ currencyFormat( sale_this_month ) }</span>
                            </div>
                            {/* Total Sales Chart */ }
                            <div  className='h-full w-full mx-auto'>
                                <Bar options={ totalSalesOptions } data={ totalSalesData } />
                            </div>
                        </div>

                        {/* Payouts */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-7">
                            <div  className="flex justify-between items-start">
                                <div>
                                    <h1  className="text-3xl font-semibold">{ currencyFormat( total_payouts_amount ) }</h1>
                                    <p  className="text-sm text-slate-400 font-medium">{ t( 'Payouts' ) }</p>
                                </div>
                                <div>
                                    <FaHandHoldingUsd  className="text-4xl text-[#D5D6DB] font-semibold" />
                                </div>
                            </div>
                            <div  className="flex justify-between bg-[#F0416C] text-white text-sm px-3 py-[13px] rounded-[10px]">
                                <span>{ t( 'Payouts this month' ) }</span>
                                <span>{ currencyFormat( payouts_this_month ) }</span>
                            </div>
                            {/* Total Payouts Chart */ }
                            <div  className='h-full w-full mx-auto'>
                                <Bar options={ totalPayoutsOptions } data={ totalPayoutsData } />
                            </div>
                        </div>

                        {/* Total Category */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-7">
                            <div  className="flex justify-between items-start">
                                <div>
                                    <h1  className="text-3xl font-semibold">{ total_categories }</h1>
                                    <p  className="text-sm text-slate-400 font-medium">{ t( 'Total Category' ) }</p>
                                </div>
                                <div>
                                    <BiCategoryAlt  className="text-4xl text-[#D5D6DB] font-semibold" />
                                </div>
                            </div>

                            <ul  className="list-disc">
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#F68DA7]" /> <span  className="text-slate-500">{ t( 'Cellphones & Tabs' ) }</span></div>
                                    <div>$1,494.000</div>
                                </li>
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#FFDD66]" /> <span  className="text-slate-500">{ t( 'Men Clothing & Fashion' ) }</span></div>
                                    <div>$1,415.850</div>
                                </li>
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#66C5FA]" /> <span  className="text-slate-500">{ t( 'Computer & Accessories' ) }</span></div>
                                    <div>$1,324.230</div>
                                </li>

                            </ul>
                        </div>

                        {/* Total Brands */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-7">
                            <div  className="flex justify-between items-start">
                                <div>
                                    <h1  className="text-3xl font-semibold">{ total_brands }</h1>
                                    <p  className="text-sm text-slate-400 font-medium">{ t( 'Total Brands' ) }</p>
                                </div>
                                <div>
                                    <PiMedalFill  className="text-4xl text-[#D5D6DB] font-semibold" />
                                </div>
                            </div>
                            <ul>
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#19C553]" /> <span  className="text-slate-500">{ t( 'Samsung' ) }</span></div>
                                    <div>$1,494.000</div>
                                </li>
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#009EF7]" /> <span  className="text-slate-500">{ t( 'Lenovo' ) }</span></div>
                                    <div>$579.000</div>
                                </li>
                                <li  className="flex justify-between items-end text-[13px]">
                                    <div  className="flex items-center"><GoDotFill  className="text-xl text-[#8F60EE]" /> <span  className="text-slate-500">{ t( 'Nike' ) }</span></div>
                                    <div>$560.000</div>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Net Sales & Payouts Charts */ }
                    <div  className="grid grid-cols-2 gap-7 pt-7">
                        {/* Net Sales */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
                            <div>
                                <h2  className="text-lg font-bold">{ t( 'Net Sales' ) }</h2>
                                <p  className="text-sm text-slate-400 font-medium">{ t( 'By Sale Category' ) }</p>
                            </div>
                            {/* Net Sales Chart */ }
                            <div>
                                <Bar options={ NetSalesOptions } data={ NetSalesData } />
                            </div>
                        </div>
                        {/* Payouts */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
                            <div>
                                <h2  className="text-lg font-bold">{ t( 'Payouts' ) }</h2>
                                <p  className="text-sm text-slate-400 font-medium">{ t( 'By Expense Category' ) }</p>
                            </div>
                            {/* Payouts Chart */ }
                            <div>
                                <Bar options={ PayoutsOptions } data={ PayoutsData } />
                            </div>
                        </div>
                    </div>

                    {/* Sale Analytics & Payouts Analytics Charts */ }
                    <div  className="grid grid-cols-2 gap-7 pt-7">
                        {/* Sale Analytics */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
                            <div>
                                <h2  className="text-lg font-bold">{ t( 'Sale Analytics' ) }</h2>
                            </div>
                            {/* Sale Analytics Chart */ }
                            <div>
                                <Bar options={ SaleAnalyticsOptions } data={ SaleAnalyticsData } />
                            </div>
                        </div>
                        {/* Payouts Analytics */ }
                        <div  className="p-7 bg-white drop-shadow-lg border border-slate-200 rounded-lg">
                            <div>
                                <h2  className="text-lg font-bold">{ t( 'Payouts Analytics' ) }</h2>
                            </div>
                            {/* Payouts Chart */ }
                            <div>
                                <Bar options={ PayoutsAnalyticsOptions } data={ PayoutsAnalyticsData } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
