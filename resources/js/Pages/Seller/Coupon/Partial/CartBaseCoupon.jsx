
import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { PickerModal } from "mui-daterange-picker-plus";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import Select from "react-select";

export function CartBaseCoupon ()
{
    const { t } = useLaravelReactI18n();
    const [ openCartDate, setOpenCartDate ] = useState( false );
    const [ cartAnchorEl, setCartAnchorEl ] = useState();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        cart_coupon_code: "",
        cart_start_date: "",
        cart_end_date: "",
        cart_discount: "",
        cart_amount_percent: "",
        cart_minimum_shopping: "",

    } )

    const cartAmountData = [
        { value: 'amount', label: 'Amount' },
        { value: 'percent', label: 'Percent' },
    ]


    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        // post('/banner', {
        //     onSuccess: () => window.location.href = "/banner",
        // })
    }

    // Select change handler
    function onCartAmountPercent ( e )
    {
        setData( 'cart_amount_percent', e.value )
    }

    // Cart Date Range
    const handleCartDateClick = ( e ) =>
    {
        setCartAnchorEl( e.currentTarget )
        setOpenCartDate( !openCartDate );
    };

    const handleCartDateClose = () =>
    {
        setOpenCartDate( false );
    };

    const handleSetCartDate = ( cartDateRange ) =>
    {
        setData( prevData => ( { ...prevData, 'cart_start_date': moment( cartDateRange.startDate ).format( 'DD-MM-YYYY' ) } ) );
        setData( prevData => ( { ...prevData, 'cart_end_date': moment( cartDateRange.endDate ).format( 'DD-MM-YYYY' ) } ) );
        handleCartDateClose();
    };

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <div  className="py-4 space-y-2">
                    <h2  className="text-lg font-medium text-slate-600">Add Your Cart Base Coupon</h2>
                    <hr />
                    {/* Coupon Code & Minimum Shopping */ }
                    <div  className='grid grid-cols-2 gap-4'>
                        {/* Coupon Code */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="cart_coupon_code">{ t( ' Coupon Code' ) }</label>
                            <input onChange={ e => setData( 'cart_coupon_code', e.target.value ) } value={ data.cart_coupon_code } name='cart_coupon_code' id='cart_coupon_code' type="text" placeholder={ t( 'Enter Coupon Code' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                            { errors.cart_coupon_code && <div  className="text-red-500 text-sm mt-1">{ errors.cart_coupon_code }</div> }
                        </div>
                        {/* Minimum Shopping */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="cart_minimum_shopping">{ t( ' Minimum Shopping' ) }</label>
                            <input onChange={ e => setData( 'cart_minimum_shopping', e.target.value ) } value={ data.cart_minimum_shopping } name='cart_minimum_shopping' id='cart_minimum_shopping' type="number" placeholder={ t( 'Enter Minimum Shopping' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                            { errors.cart_minimum_shopping && <div  className="text-red-500 text-sm mt-1">{ errors.cart_minimum_shopping }</div> }
                        </div>
                    </div>
                    {/* Discount & Amount */ }
                    <div>
                        <label  className='label-text text-slate-600 text-sm'>{ t( 'Discount' ) }</label>
                        <div  className='grid grid-cols-12 gap-4'>
                            {/* Discount */ }
                            <div  className="col-span-9">
                                <input onChange={ e => setData( 'cart_discount', e.target.value ) } value={ data.cart_discount } name='cart_discount' id='cart_discount' type="number" placeholder={ t( 'Enter Discount' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                                { errors.cart_discount && <div  className="text-red-500 text-sm mt-1">{ errors.cart_discount }</div> }
                            </div>
                            {/* Amount */ }
                            <div  className="col-span-3 flex flex-col">
                                <Select
                                    name="cart_amount_percent"
                                    placeholder={ t( 'Select Amount/Percent' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onCartAmountPercent( e ) }
                                    defaultValue={ data.cart_amount_percent }
                                    options={ cartAmountData }
                                />
                            </div>
                        </div>
                    </div>
                    {/* Maximum Discount Amount & Date */ }
                    <div  className='grid grid-cols-2 gap-4'>
                        {/* Maximum Discount Amount */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="maximum_discount_amount">{ t( 'Maximum Discount Amount' ) }</label>
                            <input onChange={ e => setData( 'maximum_discount_amount', e.target.value ) } value={ data.maximum_discount_amount } name='maximum_discount_amount' id='maximum_discount_amount' type="number" placeholder={ t( 'Enter Maximum Discount Amount' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                            { errors.maximum_discount_amount && <div  className="text-red-500 text-sm mt-1">{ errors.maximum_discount_amount }</div> }
                        </div>
                        {/* Date */ }
                        <div  className="w-full flex flex-col">
                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_period">{ t( 'Date' ) }</label>
                            <div onClick={ handleCartDateClick }  className="flex justify-between items-center p-[13px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded-lg text-sm">
                                <span>{ data.cart_start_date != '' ? data.cart_start_date : 'DD-MM-YYYY' } &nbsp; to &nbsp; { data.cart_end_date != '' ? data.cart_end_date : 'DD-MM-YYYY' }</span>
                                <span><MdDateRange  className="text-xl" /></span>
                            </div>
                            <PickerModal
                                customProps={ {
                                    onSubmit: ( range ) => handleSetCartDate( range ),
                                    onCloseCallback: handleCartDateClose,
                                } }
                                modalProps={ {
                                    anchorEl: cartAnchorEl,
                                    open: openCartDate,
                                    onClose: handleCartDateClose,
                                    slotProps: {
                                        paper: {
                                            sx: {
                                                borderRadius: "16px",
                                                boxShadow: "rgba(0, 0, 0, 0.21) 0px 0px 4px",
                                            },
                                        },
                                    },
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left",
                                    },
                                } }
                            />
                        </div>
                    </div>
                </div>
                {/* Save Button */ }
                <div  className="flex justify-end">
                    <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Save' ) }</button>
                </div>
            </form>
        </div>
    );
};
