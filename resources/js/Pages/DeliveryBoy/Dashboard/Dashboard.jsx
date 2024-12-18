import { currencyFormat } from "@/Helpers";
import DeliveryBoyLayout from "@/Layouts/DeliveryBoyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { AiFillCloseCircle, AiFillDollarCircle } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { LuCalendarCheck } from "react-icons/lu";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RxStack } from "react-icons/rx";
import { TbShoppingCartCancel } from "react-icons/tb";

export default function Dashboard ()
{
    const { t } = useLaravelReactI18n();
    const { auth, active_local, total_completed_delivery, total_pending_delivery, total_cancelled_delivery, total_request_to_cancel, total_earning, delivery_boy_info } = usePage().props

    return (
        <DeliveryBoyLayout>
            {/* Page Title */ }
            <Head title="Delivery Boy Dashboard" />
            <div  className="py-10 lg:py-3">
                {/* Top Section */ }
                <div  className="flex justify-between items-start mb-3">
                    <h2  className="text-xl xl:text-2xl font-bold">{ t( 'Dashboard' ) }</h2>
                    <div  className="text-end">
                        <h3  className="text-base">{ moment().format( 'll' ) }</h3>
                        <p  className="text-sm text-slate-500 font-medium">{ moment().format( 'dddd, LT' ) }</p>
                    </div>
                </div>
                {/* Contents */ }
                <div  className="space-y-5 lg:space-y-6 xl:space-y-10">
                    {/* Content 1 */ }
                    <div  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 xl:gap-10">
                        {/* Completed Delivery */ }
                        <div  className="bg-[#292933] flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-1 border border-green-800 rounded-full">
                                <GoCheckCircleFill  className="text-[40px] md:text-[60px] text-[#58BA00]" />
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-base font-medium">{ t( 'Completed Delivery' ) }</h2>
                                <p  className="text-2xl font-bold">{ total_completed_delivery }</p>
                            </div>
                        </div>
                        {/* Pending Delivery */ }
                        <div  className="bg-[#292933] flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-[6px] border border-blue-800 rounded-full">
                                <BsFillClockFill  className="text-[35px] md:text-[55px] text-[rgb(25,90,231)]" />
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-base font-medium">{ t( 'Pending Delivery' ) }</h2>
                                <p  className="text-2xl font-bold">{ total_pending_delivery }</p>
                            </div>
                        </div>
                        {/* Total Collected */ }
                        <div  className="bg-[#292933] flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-[6px] border border-orange-800 rounded-full">
                                <div  className="bg-[#FF5500] rounded-full p-1">
                                    <RxStack  className="text-[28px] md:text-[46px]" />
                                </div>
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-base font-medium">{ t( 'Total Collected' ) }</h2>
                                <p  className="text-2xl font-bold">{ delivery_boy_info.total_collection }</p>
                            </div>
                        </div>
                        {/* Earnings */ }
                        <div  className="bg-[#292933] flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-[2px] border border-sky-800 rounded-full">
                                <AiFillDollarCircle  className="text-[40px] md:text-[60px] text-[#3faeda]" />
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-base font-medium">{ t( 'Earnings' ) }</h2>
                                <p  className="text-2xl font-bold">{ currencyFormat( total_earning || 0 ) }</p>
                            </div>
                        </div>
                        {/* Cancelled Delivery */ }
                        <div  className="bg-[#292933] flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-[2px] border border-red-800 rounded-full">
                                <AiFillCloseCircle  className="text-[40px] md:text-[60px] text-[#E71927]" />
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-base font-medium">{ t( 'Cancelled Delivery' ) }</h2>
                                <p  className="text-2xl font-bold">{ total_cancelled_delivery }</p>
                            </div>
                        </div>
                        {/* Request to Cancel */ }
                        <div  className="bg-[#292933] duration-300 flex items-center gap-4 px-4 md:px-6 py-10 md:py-12">
                            <div  className="p-[6px] border border-[#e29c8c] rounded-full">
                                <div  className="bg-[#FBE0DA] rounded-full p-[6px] md:p-3">
                                    <TbShoppingCartCancel  className="text-[18px] lg:text-[28px] text-[#292933]" />
                                </div>
                            </div>
                            <div  className="text-white">
                                <h2  className="text-sm md:text-lg lg:text-xl font-semibold">{ t( 'Request to Cancel' ) }</h2>
                                <p  className="text-2xl font-bold">{ total_request_to_cancel }</p>
                            </div>
                        </div>
                    </div>
                    {/* Content 2 */ }
                    <div  className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-10">
                        {/* On The Way Deliveries */ }
                        <Link href={ route( 'delivery_boy.on_the_way_delivery' ) }>
                            <div  className="flex flex-col justify-center items-center bg-[#F5F5F5] hover:bg-[#DAE0E5] duration-300 border py-7 md:py-10 space-y-4">
                                <div  className="bg-[#D43533] p-4 rounded-full">
                                    <GrMapLocation  className="text-[30px] xl:text-[50px] text-white" />
                                </div>
                                <h2  className="text-sm md:text-[15px] xl:text-[16px] font-bold text-[#D43533]">{ t( 'On The Way Deliveries' ) }</h2>
                            </div>
                        </Link>

                        {/* Picked Up Deliveries */ }
                        <Link href={ route( 'delivery_boy.picked_up_delivery' ) }>
                            <div  className="flex flex-col justify-center items-center bg-[#F5F5F5] hover:bg-[#DAE0E5] duration-300 border py-7 md:py-10 space-y-4">
                                <div  className="bg-[#F3AF3D] p-4 rounded-full">
                                    <MdShoppingCartCheckout  className="text-[30px] xl:text-[50px] text-white" />
                                </div>
                                <h2  className="text-sm md:text-[15px] xl:text-[16px] font-bold text-[#F3AF3D]">{ t( 'Picked Up Deliveries' ) }</h2>
                            </div>
                        </Link>

                        {/* Assigned Deliveries */ }
                        <Link href={ route( 'delivery_boy.assigned_delivery' ) }>
                            <div  className="flex flex-col justify-center items-center bg-[#F5F5F5] hover:bg-[#DAE0E5] duration-300 border py-7 md:py-10 space-y-4">
                                <div  className="bg-[#0084B4] p-4 rounded-full">
                                    <LuCalendarCheck  className="text-[30px] xl:text-[50px] text-white" />
                                </div>
                                <h2  className="text-sm md:text-[15px] xl:text-[16px] font-bold text-[#0084B4]">{ t( 'Assigned Deliveries' ) }</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </DeliveryBoyLayout>
    );
};

