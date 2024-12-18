import { currencyFormat } from "@/Helpers";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useCart } from "react-use-cart";

export default function CheckoutTotal ()
{
    const { active_currency_symbol } = usePage().props
    const { t } = useLaravelReactI18n();
    const { cartTotal, items, setItems } = useCart();


    const [ tax, setTax ] = useState( 0 );
    const [ response, setResponse ] = useState();
    const [ message, setMessage ] = useState();
    const [ appliedCouponCode, setAppliedCouponCode ] = useState();
    const [ discount, setDiscount ] = useState( 0 );
    const [ shippingCost, setShippingCost ] = useState( 0 );
    const [ couponCode, setCouponCode ] = useState( '' );



    useEffect( () =>
    {
        const taxTotal = items.reduce( ( total, currentValue ) => total = total + currentValue.tax, 0 );
        const shippingCostTotal = items.reduce( ( total, currentValue ) => total = total + currentValue.shipping_cost, 0 );
        const discountTotal = items.reduce( ( total, currentValue ) => total = total + currentValue.discount, 0 );
        const couponCodeValue = items.reduce( ( prev, current ) =>
        {
            if ( current.coupon_applied ) prev = current.coupon_code;
            return prev;
        }, 0 );
        setAppliedCouponCode( couponCodeValue );
        setTax( taxTotal );
        setShippingCost( shippingCostTotal );
        setDiscount( discountTotal )
    }, [ items ] )

    function applyCouponCode ()
    {
        axios.post( route( 'checkout.apply_coupon_code' ), {
            code: couponCode,
            responseType: 'json'
        } ).then( function ( response )
        {
            setItems( response.data.carts )
            setResponse( response.data.response_message.response )
            setMessage( response.data.response_message.message )



        } )
    }

    function removeCouponCode ()
    {
        axios.post( route( 'checkout.remove_coupon_code' ), {
            code: appliedCouponCode,
            responseType: 'json'
        } ).then( function ( response )
        {
            setItems( response.data )



        } )
    }

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
                <div  className="flex justify-between items-center">
                    <p  className="font-normal text-base">{ t( 'Shipping' ) }</p>
                    <p  className="font-semibold text-base">{ currencyFormat( shippingCost ) }</p>
                </div>
                <div  className="flex justify-between items-center">
                    <p  className="font-normal text-base">{ t( 'Discount on product' ) }</p>
                    <p  className="font-semibold text-base">-{ currencyFormat( discount ) }</p>
                </div>
            </div>
            <hr  className="my-3" />
            <div  className="flex justify-between items-center">
                <p  className="font-bold text-lg text_primary">{ t( 'Total' ) }</p>
                <p  className="font-bold text-lg">{ currencyFormat( cartTotal + tax + shippingCost - discount ) }</p>
            </div>
            {/*  */ }
            <div  className="hidden xl:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 items-center space-y-4 py-4 w-full">
                <div  className="flex flex-col items-center gap-1">
                    <img  className="w-6" src="assets/vendor-info/delivery-truck.png" alt="Fast Delivery All Across the Country" />
                    <p  className="text-xs w-5/12 md:w-7/12 xl:w-9/12 text-center">{ t( 'Fast Delivery All Across the Country' ) }</p>
                </div>
                <div  className="flex flex-col items-center gap-1">
                    <img  className="w-6" src="assets/vendor-info/credit-card.png" alt="Safe Payment" />
                    <p  className="text-xs w-5/12 md:w-7/12 xl:w-9/12 text-center">{ t( 'Safe Payment' ) }</p>
                </div>
                <div  className="flex flex-col items-center gap-1">
                    <img  className="w-6" src="assets/vendor-info/return.png" alt="7 Days Return Policy" />
                    <p  className="text-xs w-5/12 md:w-7/12 xl:w-9/12 text-center">{ t( '7 Days Return Policy' ) }</p>
                </div>
                <div  className="flex flex-col items-center gap-1">
                    <img  className="w-6" src="assets/vendor-info/shield.png" alt="100% Authentic Products" />
                    <p  className="text-xs w-5/12 md:w-7/12 xl:w-9/12 text-center">{ t( '100% Authentic Products' ) }</p>
                </div>
            </div>
            {/* Buttons */ }
            <div  className="flex flex-col gap-2">
                {/*Apply Coupon Input */ }
                { ( discount > 0 && appliedCouponCode ) &&
                    <div  className="flex justify-between items-center bg-slate-100 p-2 my-2 xl:my-0 border border-dashed border-slate-400 rounded">
                        <div  className="text-xs">{ appliedCouponCode }</div>
                        <button data-tip={ t( 'Change Coupon' ) } onClick={ e => removeCouponCode() } type="button"  className="tooltip text-white bg-red-500 px-3 py-1 rounded">x</button>
                    </div>
                }

                <span  className={ `text-sm my-2 xl:my-0 ${ response == "success" ? "text-success" : response == "warning" ? "text-warning" : "text-error" }` }>{ message }</span>

                <div  className="join w-full">
                    <input value={ couponCode } onChange={ e => setCouponCode( e.target.value ) }  className="input join-item px-4 py-[7px] focus:outline-none border-[1px] border-slate-300 focus:border_secondary block bg-white text-slate-600 w-full rounded-s text-sm" placeholder={ t( 'Have coupon code? Apply here' ) } />
                    <button onClick={ e => applyCouponCode() }  className="join-item bg_secondary rounded-none text-sm text-white px-4 py-2">Apply</button>
                </div>
                <Link href={ route( "home" ) }><button  className="px-4 py-2 border text_primary text-sm md:text-base rounded w-full flex items-center justify-center"><RiArrowLeftSLine  className="text-xl" /><span>{ t( 'Continue Shopping' ) }</span></button></Link>
            </div>
        </div>
    )

}
