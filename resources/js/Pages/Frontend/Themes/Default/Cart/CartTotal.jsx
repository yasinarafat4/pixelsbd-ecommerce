import { currencyFormat } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useCart } from "react-use-cart";

export default function CartTotal ()
{

    const { active_currency_symbol } = usePage().props
    const { t } = useLaravelReactI18n();
    const [ tax, setTax ] = useState();

    const { items, cartTotal } = useCart();

    useEffect( () =>
    {
        const taxTotal = items.reduce( ( total, currentValue ) => total = total + currentValue.tax, 0 );
        setTax( taxTotal );
    }, [ items ] )

    return (
        <div>
            <div  className="flex flex-col space-y-2">
                <div  className="flex justify-between items-center">
                    <p  className="font-normal text-base">{ t( 'Sub total' ) }</p>
                    <p  className="font-semibold text-base">{ currencyFormat( cartTotal ) }</p>
                </div>
                <div  className="flex justify-between items-center">
                    <p  className="font-normal text-base">{ t( 'Tax' ) }</p>
                    <p  className="font-semibold text-base">{ currencyFormat( tax ) }</p>
                </div>
            </div>
            <hr  className="my-3" />
            <div  className="flex justify-between items-center">
                <p  className="font-normal text-base text_primary">{ t( 'Total' ) }</p>
                <p  className="font-semibold text-base">{ currencyFormat( cartTotal + tax ) }</p>
            </div>
            {/* Buttons */ }
            <hr  className="my-7" />
            <div  className="flex flex-col gap-2">
                <Link href={ route( 'checkout' ) }>
                    <button  className="bg_primary hover:bg_primary text-white duration-300 px-4 py-2 text-sm md:text-base rounded w-full">{ t( 'Proceed to Checkout' ) }</button>
                </Link>
                <Link href={ route( "home" ) }><button  className="px-4 py-2 border text_primary text-sm md:text-base rounded w-full flex items-center justify-center"><RiArrowLeftSLine  className="text-xl" /><span>{ t( 'Continue Shopping' ) }</span></button></Link>
            </div>
        </div>
    )

}
