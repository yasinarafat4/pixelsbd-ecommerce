import { useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { PickerModal } from "mui-daterange-picker-plus";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import Select from "react-select";

export function ProductBaseCoupon ()
{
    const { t } = useLaravelReactI18n();
    const [ openProductDate, setOpenProductDate ] = useState( false );
    const [ productAnchorEl, setProductAnchorEl ] = useState();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        products: [],
        product_coupon_code: "",
        product_start_date: "",
        product_end_date: "",
        product_discount: "",
        product_amount_percent: "",
    } )

    const productAmountData = [
        { value: 'amount', label: 'Amount' },
        { value: 'percent', label: 'Percent' },
    ]

    const productsData = [
        { value: '1', label: 'Product 1' },
        { value: '2', label: 'Product 2' },
        { value: '3', label: 'Product 3' },
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
    function onSelectProduct ( e )
    {
        let productData = [];
        e.forEach( element =>
        {
            productData.push( element.value );
        } )
        setData( 'products', productData )
    }

    function onProductAmountPercent ( e )
    {
        setData( 'product_amount_percent', e.value )
    }

    // Product Date Range
    const handleProductDateClick = ( e ) =>
    {
        setProductAnchorEl( e.currentTarget )
        setOpenProductDate( !openProductDate );
    };

    const handleProductDateClose = () =>
    {
        setOpenProductDate( false );
    };

    const handleSetProductDate = ( productDateRange ) =>
    {
        setData( prevData => ( { ...prevData, 'product_start_date': moment( productDateRange.startDate ).format( 'DD-MM-YYYY' ) } ) );
        setData( prevData => ( { ...prevData, 'product_end_date': moment( productDateRange.endDate ).format( 'DD-MM-YYYY' ) } ) );
        handleProductDateClose();
    };

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <div  className="py-4 space-y-2">
                    <h2  className="text-lg font-medium text-slate-600">Add Your Coupon</h2>
                    <hr />
                    {/* Coupon Code */ }
                    <div>
                        <label  className='label-text text-slate-600 text-sm' htmlFor="product_coupon_code">{ t( ' Coupon Code' ) }</label>
                        <input onChange={ e => setData( 'product_coupon_code', e.target.value ) } value={ data.product_coupon_code } name='product_coupon_code' id='product_coupon_code' type="text" placeholder={ t( 'Enter  Coupon Code' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                        { errors.product_coupon_code && <div  className="text-red-500 text-sm mt-1">{ errors.product_coupon_code }</div> }
                    </div>
                    {/* Products & Date */ }
                    <div  className='grid grid-cols-2 gap-4'>
                        {/* Products */ }
                        <div  className="flex flex-col">
                            <label  className='label-text text-slate-600 text-sm'>{ t( 'Products' ) }</label>
                            <Select
                                isMulti
                                name="products"
                                placeholder={ t( 'Select Products' ) }
                                 className="w-full rounded"
                                classNamePrefix="react-select"
                                onChange={ e => onSelectProduct( e ) }
                                defaultValue={ data.products }
                                options={ productsData }
                            />
                        </div>
                        {/* Date */ }
                        <div  className="w-full flex flex-col">
                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_period">{ t( 'Date' ) }</label>
                            <div onClick={ handleProductDateClick }  className="flex justify-between items-center p-[13px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded-lg text-sm">
                                <span>{ data.product_start_date != '' ? data.product_start_date : 'DD-MM-YYYY' } &nbsp; to &nbsp; { data.product_end_date != '' ? data.product_end_date : 'DD-MM-YYYY' }</span>
                                <span><MdDateRange  className="text-xl" /></span>
                            </div>
                            <PickerModal
                                customProps={ {
                                    onSubmit: ( range ) => handleSetProductDate( range ),
                                    onCloseCallback: handleProductDateClose,
                                } }
                                modalProps={ {
                                    anchorEl: productAnchorEl,
                                    open: openProductDate,
                                    onClose: handleProductDateClose,
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
                    {/* Discount & Amount */ }
                    <div>
                        <label  className='label-text text-slate-600 text-sm'>{ t( 'Discount' ) }</label>
                        <div  className='grid grid-cols-12 gap-4'>
                            {/* Discount */ }
                            <div  className="col-span-9">
                                <input onChange={ e => setData( 'product_discount', e.target.value ) } value={ data.product_discount } name='product_discount' id='product_discount' type="number" placeholder={ t( 'Enter Discount' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 w-full rounded-lg text-sm" />
                                { errors.product_discount && <div  className="text-red-500 text-sm mt-1">{ errors.product_discount }</div> }
                            </div>
                            {/* Amount */ }
                            <div  className="col-span-3 flex flex-col">
                                <Select
                                    name="product_amount_percent"
                                    placeholder={ t( 'Select Amount/Percent' ) }
                                     className="w-full rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onProductAmountPercent( e ) }
                                    defaultValue={ data.product_amount_percent }
                                    options={ productAmountData }
                                />
                            </div>
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

