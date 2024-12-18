import { currencyFormat } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "react-use-cart";
import SelectedItemCard from "../Cards/SelectedItemCard";


export default function SelectedItemDropdown ()
{
    const { t } = useLaravelReactI18n();

    const {
        cartTotal,
        items,
    } = useCart();

    return (
        <div  className="z-50">
            {/* Shopping Cart */ }
            <div  className='flex items-center bg-blue-100 px-4 py-3 gap-2 rounded-md'>
                <FaCartPlus  className='text-xl text_primary' />
                <p  className='font-semibold text-lg'>{ t( 'Shopping Cart' ) }</p>
            </div>
            {/* Item Card */ }
            <div  className='pt-3 h-[400px]'>
                <Scrollbars >
                    { items.map( ( item, i ) =>
                    (
                        <SelectedItemCard key={ i } item={ item } />
                    ) ) }
                </Scrollbars>
            </div>
            {/* Total Amount */ }
            <div  className="my-5 flex justify-between items-center border-t pt-2">
                <p  className="text-base">{ t( 'Subtotal' ) } </p>
                <p  className="text_primary text-base font-semibold">{ currencyFormat( cartTotal ) }</p>
            </div>
            <div  className="flex">
                <Link href={ route( 'cart' ) }  className="bg_primary hover:bg_primary text-white text-center duration-300 px-4 py-2 text-sm md:text-base rounded w-full">{ t( 'Proceed to Checkout' ) }</Link>
            </div>

        </div>
    )

}
