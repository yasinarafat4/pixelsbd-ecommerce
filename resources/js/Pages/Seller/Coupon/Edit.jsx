import { coupon_type_data, flat_persent } from "@/Array";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from "moment";
import { PickerModal } from "mui-daterange-picker-plus";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDateRange, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import Select from "react-select";

export default function Edit() {

    const { t } = useLaravelReactI18n();
    const { coupon, products } = usePage().props;
    const [openDate, setOpenDate] = useState(false);
    const [anchorEl, setAnchorEl] = useState();
    const [selectedCouponType, setSelectedCouponType] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedDiscountType, setSelectedDiscountType] = useState([]);

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        type: coupon.type,
        product_ids: [],
        code: coupon.code,
        start_date: coupon.start_date,
        end_date: coupon.end_date,
        discount: coupon.discount,
        discount_type: coupon.discount_type,
        minimum_buy: "",
        maximum_discount: "",
        validation_days: "",
    })


    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        put(route('seller.coupon.update', coupon.id))
    }


    // Coupon type, discount type
    useEffect(() => {
        const findType = coupon_type_data.find(data => data.value == coupon.type);
        setSelectedCouponType(findType);

        const findDiscountType = flat_persent.find(data => data.value == coupon.discount_type);
        setSelectedDiscountType(findDiscountType);

        // const filterProducts = products.filter(item => )
    }, [])

    // Product base
    useEffect(() => {
        if (coupon.type == "product_base") {
            const parse = JSON.parse(coupon.details);
            const productIds = parse?.map((data) => (data.product_id));
            const filterProducts = products.filter(item => productIds.includes(item.id));
            const mappedProduct = filterProducts.map((data) => ({ label: data.name, value: data.id }))
            setSelectedProduct(mappedProduct)
        }
    }, [])

    // Cart base
    useEffect(() => {
        if (coupon.type == "cart_base") {
            const parse = JSON.parse(coupon.details);
            setData(prevData => ({ ...prevData, 'minimum_buy': parse.minimum_buy }));
            setData(prevData => ({ ...prevData, 'maximum_discount': parse.maximum_discount }));
        }
    }, [])

    // Welcome base
    useEffect(() => {
        if (coupon.type == "welcome_base") {
            const parse = JSON.parse(coupon.details);
            setData(prevData => ({ ...prevData, 'minimum_buy': parse.minimum_buy }));
            setData(prevData => ({ ...prevData, 'validation_days': parse.validation_days }));
        }
    }, [])


    // Select handlers
    function onSelectCouponType(e) {
        setSelectedCouponType(e);
        setData('type', e.value)
    }

    function onSelectProduct(e) {

        let productData = [];
        e.forEach(element => {
            productData.push(element.value);
        })
        setSelectedProduct(e);
        setData('product_ids', productData)
    }

    function onProductDiscountType(e) {
        setSelectedDiscountType(e);
        setData('discount_type', e.value)
    }

    // Product Date Range
    const handleDateClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpenDate(!openDate);
    };

    const handleDateClose = () => {
        setOpenDate(false);
    };

    const handleSetDate = (dateRange) => {
        setData(prevData => ({ ...prevData, 'start_date': moment(dateRange.startDate).format('YYYY-MM-DD') }));
        setData(prevData => ({ ...prevData, 'end_date': moment(dateRange.endDate).format('YYYY-MM-DD') }));
        handleDateClose();
    };

    return (
        <SellerLayout>
            <Head title={"Edit"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.marketing.coupon.index')}  className="inline-flex gap-1 items-center">
                                    <RiCoupon2Line  className="text-base text-slate-900" />
                                    <span>{t('Coupons')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className="text-sm text-slate-900" />
                                    <span>{t('Edit')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link onClick={e => window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded shadow bg-white border-[1px] border-slate-300 py-5 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Coupon Information')}</h2>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2'>
                            {/* Coupon Type */}
                            <div  className="flex flex-col px-6 py-4">
                                <label  className='label-text text-slate-600 text-sm mb-1'>{t('Coupon Type')}</label>
                                <Select
                                    name="type"
                                    placeholder={t('Select Coupon Type')}
                                     className="w-full"
                                    classNamePrefix="react-select"
                                    onChange={e => onSelectCouponType(e)}
                                    value={selectedCouponType}
                                    options={coupon_type_data}
                                />
                            </div>
                            {data.type && <hr />}
                            {data.type && <div  className="px-6">
                                <div  className="py-4 space-y-2">
                                    <h2  className="text-lg font-medium text-slate-600">{t('Add Your Coupon')}</h2>
                                    <hr />
                                    {/* Coupon Code */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="code">{t(' Coupon Code')}</label>
                                        <input onChange={e => setData('code', e.target.value)} value={data.code} name='code' id='code' type="text" placeholder={t('Enter  Coupon Code')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                        {errors.code && <div  className="text-red-500 text-sm mt-1">{errors.code}</div>}
                                    </div>
                                    {/* Minimum Shopping */}
                                    {(data.type == "cart_base" || data.type == "welcome_base") && <div>
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="minimum_buy">{t(' Minimum Shopping')}</label>
                                        <input onChange={e => setData('minimum_buy', e.target.value)} value={data.minimum_buy} name='minimum_buy' id='minimum_buy' type="number" placeholder={t('Enter Minimum Shopping')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                        {errors.minimum_buy && <div  className="text-red-500 text-sm mt-1">{errors.minimum_buy}</div>}
                                    </div>}
                                    {/* Products */}
                                    {data.type == "product_base" && <div  className="flex flex-col">
                                        <label  className='label-text text-slate-600 text-sm'>{t('Products')}</label>
                                        <Select
                                            isMulti
                                            name="product_ids"
                                            placeholder={t('Select Products')}
                                             className="w-full"
                                            classNamePrefix="react-select"
                                            onChange={e => onSelectProduct(e)}
                                            value={selectedProduct}
                                            options={products.map((product) => ({ label: product?.name, value: product.id }))}
                                        />
                                        {errors.product_ids && <div  className="text-red-500 text-sm mt-1">{errors.product_ids}</div>}
                                    </div>}
                                    {/* Date */}
                                    {(data.type == "product_base" || data.type == "cart_base") && <div  className="w-full flex flex-col">
                                        <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="discount_period">{t('Date')}</label>
                                        <div onClick={handleDateClick}  className="flex justify-between items-center p-[13px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded text-sm">
                                            <span>{data.start_date != '' ? data.start_date : 'YYYY-MM-DD'} &nbsp; to &nbsp; {data.end_date != '' ? data.end_date : 'YYYY-MM-DD'}</span>
                                            <span><MdDateRange  className="text-xl" /></span>
                                        </div>
                                        <PickerModal
                                            customProps={{
                                                onSubmit: (range) => handleSetDate(range),
                                                onCloseCallback: handleDateClose,
                                            }}
                                            modalProps={{
                                                anchorEl: anchorEl,
                                                open: openDate,
                                                onClose: handleDateClose,
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
                                            }}
                                        />
                                        {(errors.start_date || errors.end_date) && <div  className="text-red-500 text-sm mt-1">{errors.start_date + ' ' + errors.end_date}</div>}
                                    </div>}
                                    {/* Discount */}
                                    <div>
                                        <label  className='label-text text-slate-600 text-sm'>{t('Discount')}</label>
                                        <div  className='grid grid-cols-12 gap-4'>
                                            {/* Discount */}
                                            <div  className="col-span-9">
                                                <input onChange={e => setData('discount', e.target.value)} value={data.discount} name='discount' id='discount' type="number" placeholder={t('Enter Discount')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                                {errors.discount && <div  className="text-red-500 text-sm mt-1">{errors.discount}</div>}
                                            </div>
                                            {/* Amount */}
                                            <div  className="col-span-3 flex flex-col">
                                                <Select
                                                    name="discount_type"
                                                    placeholder={t('Select Discount Type')}
                                                     className="w-full rounded"
                                                    classNamePrefix="react-select"
                                                    onChange={e => onProductDiscountType(e)}
                                                    value={selectedDiscountType}
                                                    options={flat_persent}
                                                />
                                                {errors.discount_type && <div  className="text-red-500 text-sm mt-1">{errors.discount_type}</div>}
                                            </div>
                                        </div>

                                    </div>
                                    {/* Maximum Discount Amount */}
                                    {data.type == "cart_base" &&
                                        <div>
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="maximum_discount">{t('Maximum Discount Amount')}</label>
                                            <input onChange={e => setData('maximum_discount', e.target.value)} value={data.maximum_discount} name='maximum_discount' id='maximum_discount' type="number" placeholder={t('Enter Maximum Discount Amount')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded text-sm" />
                                            {errors.maximum_discount && <div  className="text-red-500 text-sm mt-1">{errors.maximum_discount}</div>}
                                        </div>
                                    }
                                    {/* Validation Days */}
                                    {
                                        data.type == "welcome_base" &&
                                        <div>
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="validation_days">{t('Validation Days')}</label>
                                            <div  className="grid grid-cols-12">
                                                <div  className="col-span-11">
                                                    <input onChange={e => setData('validation_days', e.target.value)} value={data.validation_days} name='validation_days' id='validation_days' type="number" placeholder={t('Enter Validation Days')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 focus:border-blue-600 block text-slate-600 bg-white w-full rounded-l text-sm" />
                                                </div>
                                                <div  className="col-span-1 border-[1px] border-l-0 border-slate-300 bg-slate-100 text-slate-600 w-full p-[13px] rounded-r text-sm">
                                                    <p  className="text-center">Days</p>
                                                </div>
                                            </div>
                                            {errors.validation_days && <div  className="text-red-500 text-sm mt-1">{errors.validation_days}</div>}
                                        </div>
                                    }
                                </div>
                                {/* Save Button */}
                                <div  className="flex justify-end">
                                    <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                                </div>
                            </div>}

                        </div>
                    </form>
                </div>
            </div>
        </SellerLayout>
    )

}
