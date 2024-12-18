
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { useLaravelReactI18n } from "laravel-react-i18n";

import { FaTruck } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";


export default function TrackOrder ()
{
    const { t } = useLaravelReactI18n();


    // Reload page by button click
    const refreshPage = () =>
    {
        window.location.reload();
    }

    return (
        <DefaultThemeLayout>

            <div  className="text-base m-4 bg-white border border-[#b3d5fa] shadow p-4 md:p-6 rounded-lg">
                <div  className="flex justify-end">
                    <button onClick={ refreshPage }  className="flex items-center gap-[1px] hover:text_secondary duration-300 font-normal"> <IoMdRefresh /><p  className="text-sm">{ t( 'Refresh' ) }</p></button>
                </div>
                <h2  className="mb-4 text-2xl text-center font-semibold">{ t( 'Track Order' ) }</h2>
                <div  className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center lg:px-28 xl:px-40">
                    <input type="text" placeholder={ t( 'Order id' ) }  className="input input-bordered input-sm rounded focus:outline-none py-4 input-info w-full lg:max-w-xs" />
                    <input type="number" placeholder={ t( 'Your phone number' ) }  className="input input-bordered input-sm rounded focus:outline-none py-4 input-info w-full lg:max-w-xs" />
                    <button  className="w-full px-4 py-[7px] bg_primary text-sm font-semibold text-white rounded">{ t( 'Track Order' ) }</button>
                </div>


                <div  className="my-10 flex flex-col justify-center items-center">
                    <FaTruck  className="truck text-6xl " />
                    <p  className=" text-slate-400 text-center text-base">{ t( 'Enter your order ID & phone number to get delivery updates' ) }</p>
                </div>
            </div>
        </DefaultThemeLayout>
    )

}
