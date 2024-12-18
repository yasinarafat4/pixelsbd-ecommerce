import RechargeWalletPopup from "@/Components/Popups/RechargeWalletPopup";
import { asset_url } from "@/Helpers";
import { usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";

export default function RechargeWallet ( { payment_methods } )
{
    const { t } = useLaravelReactI18n();
    const { auth } = usePage().props
    const [ showModal, setShowModal ] = useState( false );

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
        <div  className="grid md:grid-cols-2 items-center lg:gap-3 bg-[#292933] py-3 md:py-6 md:h-80 xl:h-full w-full px-4 md:px-5 lg:px-6 xl:px-10">
            <div  className="space-y-8">
                <div  className="space-y-1 md:space-y-3 border-b-2 border-slate-400 border-dashed p-2">
                    <p  className="text-gray-300 text-xl">{ t( 'Wallet Balance' ) }</p>
                    <p  className="flex justify-between items-end text-3xl font-bold"><span  className="text-white">{ auth.customer.balance }</span> <LuWallet  className="text-[#373D45] text-5xl -rotate-45" /></p>
                </div>
                {/* Modal */ }
                { showModal && <RechargeWalletPopup payment_methods={ payment_methods } closeModal={ closeModal } showModal={ showModal } /> }
                <button onClick={ e => handelShowModal() }  className='bg-[#373D45] hover:bg-[#292933] duration-300 text-sm md:text-base py-2 md:py-[10px] px-3 rounded-full border md:border-2 text-white flex items-center justify-center gap-3 md:gap-5 w-full'> <FaPlus  className='text-sm' /> <span>{ t( 'Recharge Wallet' ) }</span></button>
            </div>
            <div  className="my-6 hidden md:block">
                <img  className="w-9/12 mx-auto" src={asset_url("/assets/wallet.png")} alt="wallet image" />
            </div>
        </div>
    );
};
