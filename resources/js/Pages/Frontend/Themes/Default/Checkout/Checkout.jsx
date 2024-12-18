import AddressModal from "@/Components/Popups/AddressModal";
import { asset_url } from "@/Helpers";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import CheckoutTotal from "./Partial/CheckoutTotal";


export default function Checkout({ carts, address_id, countries, payment_methods, cod }) {
    const { t } = useLaravelReactI18n();
    const { flash, auth, business_settings } = usePage().props

    const location = useGeoLocation();
    const { cartTotal, items, setItems } = useCart();
    const [addressId, setAddressId] = useState(address_id);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [addressData, setAdressData] = useState()
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [total, setTotal] = useState();


    useEffect(() => {
        const taxTotal = items.reduce((total, currentValue) => total = total + currentValue.tax, 0);
        const shippingCostTotal = items.reduce((total, currentValue) => total = total + currentValue.shipping_cost, 0);
        const discountTotal = items.reduce((total, currentValue) => total = total + currentValue.discount, 0);
        setTax(taxTotal);
        setShippingCost(shippingCostTotal);
        setDiscount(discountTotal)
        setTotal(parseFloat((parseFloat(cartTotal) + parseFloat(tax) + parseFloat(shippingCost)) - parseFloat(discount)).toFixed(2))
    }, [items])


    useEffect(() => {
        setItems(carts);
    }, [carts])

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        agree: false,
        name: "",
        email: "",
        phone: "",
        address: "",
        country_id: "",
        state_id: "",
        city_id: "",
        zip_code: "",
        payment_option: "",
        additional_info: ""
    })

    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault()
        if (data.agree) {
            post(route('payment.checkout'))
        } else {
            toast.error('flash.error', {
                position: "top-right",
                theme: "colored",
            })
        }
    }

    function OnAddressChange(id, country_id, city_id) {

        setAddressId(id)
        axios.post(route('checkout.updateDeliveryAddress'), {
            address_id: id,
            country_id: country_id,
            city_id: city_id
        }).then(function (response) {
            setItems(response.data);
        })

    }

    function OnPaymentMethodChange(e) {
        setData('payment_option', e.target.value)
    }

    // Country change handler
    function OnCountryChange(e) {
        setData('country_id', e.value)
        axios.get(route('state_by_country', e.value)).then(function (response) {

            setStates(response.data)

        })
    }
    // Country change handler
    function OnStateChange(e) {
        setData('state_id', e.value)
        axios.get(route('city_by_state', e.value)).then(function (response) {

            setCities(response.data)

        })
    }
    // Country change handler
    function OnCityChange(e) {
        setData('city_id', e.value)
    }

    // Modal Handlers
    function handelShowModal(address) {
        setShowModal(true);
        setAdressData(address);
    }

    function closeModal() {
        setShowModal(false)
    };


    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('address.destroy', id))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            }
        });
    }

    return (
        <DefaultThemeLayout>
            <Head title="Checkout" />
            <div  className="my-4 md:px-2 xl:px-0">
                <h2  className="text-xl font-bold text-start">{t('Checkout')}</h2>
                <div  className="my-2">
                    <div  className="grid grid-cols-1 lg:grid-cols-12 gap-2 xl:gap-4">
                        {/* Table */}
                        <div  className="lg:col-span-8 overflow-x-auto self-start bg-white border border-[#D3DFEF] rounded-lg p-4">
                            <form onSubmit={handleSubmit}>
                                <div  className="flex flex-col items-end gap-4">
                                    <div  className="w-full">
                                        {/* <ShippingInfo /> */}

                                        <details open  className="collapse collapse-arrow bg-white border border-slate-400 rounded py-4">
                                            <summary  className="collapse-title min-h-0 py-0 text-black flex items-center justify-between">
                                                <div  className="flex items-center gap-1"> <FaCircleInfo  className="text-xl" /> <span  className='text-xl font-semibold'>{t('Shipping Info')}</span></div>
                                            </summary >
                                            <div  className="collapse-content">
                                                {/* Modal */}
                                                {showModal && <AddressModal countries={countries} closeModal={closeModal} showModal={showModal} addressData={addressData} />}
                                                {auth.customer ?
                                                    <>
                                                        <div  className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 p-2">
                                                            {
                                                                auth.customer?.addresses?.map((address, i) => {
                                                                    return (
                                                                        <label key={i}  className={`text-sm font-normal cursor-pointer border p-2 flex justify-between ${addressId == address.id ? 'border_primary rounded' : ''}`}>
                                                                            <div>
                                                                                <input hidden type="radio" onChange={e => OnAddressChange(address.id, address.country_id, address.city_id)} value={address.id} defaultChecked={address.id == addressId} name="address_id" id="address_id" />
                                                                                <p><strong>Address</strong> : {address.address}</p>
                                                                                <p><strong>Country</strong> : {address.country}</p>
                                                                                <p><strong>State</strong> : {address.state}</p>
                                                                                <p><strong>City</strong> : {address.city}</p>
                                                                                <p><strong>Phone</strong> : {address.phone}</p>
                                                                            </div>
                                                                            <div>
                                                                                <div  className="dropdown dropdown-end">
                                                                                    <div tabIndex={0}  className="btn btn-xs !min-h-9 border border_primary hover:border_primary bg-white hover:bg-white"><BiDotsVertical  className="text-xl" /></div>
                                                                                    <ul tabIndex={0}  className="menu dropdown-content bg-white rounded z-[1] w-52 p-2 shadow">
                                                                                        <li onClick={e => handelShowModal(address)}  className="hover:bg-blue-600 hover:text-white duration-300 rounded"><a>{t('Edit Address')}</a></li>
                                                                                        <li onClick={e => handleDelete(address.id)}  className="hover:bg-red-600 hover:text-white duration-300 rounded"><a>{t('Delete Address')}</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </label>
                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                        {/* Add New Adress */}
                                                        <div  className="px-2">
                                                            <button type="button" onClick={e => handelShowModal(null)}  className="py-3 w-full border rounded-sm bg-[#f3f1f1] hover:bg-[#D7D7D7] duration-300 flex flex-col justify-center items-center">
                                                                <AiOutlinePlus  className="text-2xl" />
                                                                <span  className="text-sm md:text-base font-semibold">{t('Add New Adress')}</span>
                                                            </button>
                                                        </div>
                                                    </>

                                                    :
                                                    <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                                        {/* Name */}
                                                        <div>
                                                            <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}*</label>
                                                            <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter Name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded text-sm" />
                                                            {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                                        </div>

                                                        {/* Email */}
                                                        <div>
                                                            <label  className='label-text text-slate-600 text-sm' htmlFor="email">{t('Email')}*</label>
                                                            <input onChange={e => setData('email', e.target.value)} value={data.email} name='email' id='email' type="email" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded text-sm" />
                                                            {flash.error?.email && <div  className="text-red-500 text-sm mt-1">{flash.error?.email}</div>}
                                                        </div>
                                                        {/* Address */}
                                                        <div  className='w-full mb-4'>
                                                            <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="address">{t('Address')}*</label>
                                                            <textarea
                                                                onChange={e => setData('address', e.target.value)}
                                                                value={data.address}
                                                                name='address'
                                                                id='address'
                                                                type="text"
                                                                placeholder={t('Your Address')}
                                                                rows="2"
                                                                 className="textarea p-3 block w-full border-[1px] bg-white text-slate-600 border-slate-300 rounded text-sm focus:outline-none"
                                                            />
                                                        </div>

                                                        {/* Country */}
                                                        <div  className="flex flex-col">
                                                            <label  className='label-text text-slate-600 text-sm'>{t('Country')}*</label>
                                                            <Select
                                                                name="country"
                                                                placeholder={t('Select Your Country')}
                                                                 className="w-full rounded"
                                                                classNamePrefix="react-select"
                                                                onChange={(e) => OnCountryChange(e)}
                                                                options={countries.map((country) => ({ value: country.id, label: country.name }))}
                                                            />
                                                        </div>
                                                        {/* State */}
                                                        <div  className="flex flex-col">
                                                            <label  className='label-text text-slate-600 text-sm'>{t('State')}*</label>
                                                            <Select
                                                                name="state"
                                                                placeholder={t('Select Your State')}
                                                                 className="w-full rounded"
                                                                classNamePrefix="react-select"
                                                                onChange={(e) => OnStateChange(e)}
                                                                options={states.map((state) => ({ value: state.id, label: state.name }))}
                                                            />
                                                        </div>
                                                        {/* City */}
                                                        <div  className="flex flex-col">
                                                            <label  className='label-text text-slate-600 text-sm'>{t('City')}*</label>
                                                            <Select
                                                                name="city"
                                                                placeholder={t('Select Your City')}
                                                                 className="w-full rounded"
                                                                classNamePrefix="react-select"
                                                                onChange={(e) => OnCityChange(e)}
                                                                options={cities.map((city) => ({ value: city.id, label: city.name }))}
                                                            />
                                                        </div>
                                                        {/* Phone */}
                                                        <div>
                                                            <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{t('Phone')}*</label>
                                                            <PhoneInput
                                                                inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-300 block text-slate-600 w-full rounded text-sm"
                                                                dropdownClass="!z-50"
                                                                masks={{ bd: '....-......' }}
                                                                enableSearch
                                                                country={location.country?.toLowerCase()}
                                                                preventDefault
                                                                value={data.phone}
                                                                onChange={e => setData('phone', e)}
                                                                inputProps={{ name: 'phone', id: 'phone' }}
                                                            />
                                                        </div>
                                                        {/* Zip Code */}
                                                        <div>
                                                            <label  className='label-text text-slate-600 text-sm' htmlFor="zip_code">{t('Zip Code')}</label>
                                                            <input onChange={e => setData('zip_code', e.target.value)} value={data.zip_code} name='zip_code' id='zip_code' type="text" placeholder={t("Your Zip Code")}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded text-sm" />
                                                            {errors.zip_code && <div  className="text-red-500 text-sm mt-1">{errors.zip_code}</div>}
                                                        </div>

                                                        <div  className="bg-cyan-100 p-2 mt-8 text-sm text-center">
                                                            {t('If you have already used the same mail address or phone number before, please ')}
                                                            <Link href={route('login')}  className="text-base font-semibold text-red-600">{t('Login')}</Link>
                                                            {t(' first to continue')}
                                                        </div>
                                                    </div>


                                                }

                                            </div>

                                        </details >
                                    </div>
                                    <div  className="w-full">
                                        <details  className="collapse collapse-arrow bg-white border border-slate-400 rounded py-4">
                                            <summary  className="collapse-title min-h-0 py-0 text-black flex items-center justify-between">
                                                <div  className="flex items-center gap-1"> <MdPayments  className="text-xl" /> <span  className='text-xl font-semibold'>{t('Payment Info')}</span></div>
                                            </summary>
                                            <div  className="collapse-content p-4">
                                                {/* Aditional Info */}
                                                <div  className="p-2">
                                                    <label  className='label-text text-base text-slate-600 font-semibold' htmlFor="additional_info">{t('Any Aditional Info?')}</label>
                                                    <textarea onChange={e => setData('additional_info', e.target.value)} value={data.additional_info}  className="p-[13px] focus:outline-none border-[1px] border-slate-400 focus:border_primary block bg-white text-slate-600 w-full text-sm" name="additional_info" id="additional_info" rows="4" placeholder={t('Type your text...')}>
                                                    </textarea>
                                                </div>
                                                {/* Payment Methods */}
                                                <div  className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                                                    {payment_methods.map((payment_method, i) => (
                                                        <label key={i}  className={`text-sm font-normal cursor-pointer border p-2 ${data.payment_option == payment_method.name ? 'border_primary' : ''}`}>
                                                            <input hidden type="radio" onChange={e => OnPaymentMethodChange(e)} name="payment_option" value={payment_method.name} />
                                                            <span  className="flex items-center justify-between rounded-0 p-1">
                                                                <span  className="">{payment_method.name}</span>
                                                                <span  className="rounded h-10 overflow-hidden">
                                                                    <LazyLoadImage
                                                                         className="h-10 w-full"
                                                                        src={asset_url('/assets/payment_methods/' + payment_method.image)}
                                                                        alt={payment_method.name}
                                                                        effect='blur'
                                                                    />
                                                                </span>
                                                            </span>
                                                        </label>
                                                    ))}
                                                    {cod &&
                                                        <label  className={`text-sm font-normal cursor-pointer border p-2 ${data.payment_option == 'cash_on_delivery' ? 'border_primary' : ''}`}>
                                                            <input hidden type="radio" onChange={e => OnPaymentMethodChange(e)} name="payment_option" value="cash_on_delivery" />
                                                            <span  className="flex items-center justify-between rounded-0 p-1">
                                                                <span  className="">{t('Cash on Delivery')}</span>
                                                                <span  className="rounded h-10 overflow-hidden">
                                                                    <LazyLoadImage
                                                                         className="h-10 w-full"
                                                                        src="/assets/payment_methods/cod.webp"
                                                                        alt="payment_methods"
                                                                        effect='blur'
                                                                    />
                                                                </span>
                                                            </span>
                                                        </label>
                                                    }
                                                </div>
                                                {/* Wallet Balence*/}
                                                {(auth.customer && business_settings.wallet_system) &&
                                                    <div  className="border border-slate-400 p-10 mx-2 flex flex-col justify-center items-center gap-3">
                                                        <div  className="flex items-center gap-2">
                                                            <span>Your Wallet Balence:</span>
                                                            <span>{auth?.customer?.balance}</span>
                                                        </div>

                                                        {parseFloat(total) > parseFloat(auth.customer.without_symbol_balance) ?
                                                            <span  className="text-sm font-normal cursor-not-allowed border border-slate-400 p-2">Insufficient Balance</span>
                                                            :
                                                            <label  className={`text-sm font-normal cursor-pointer border border-slate-400 p-2 ${data.payment_option == 'wallet' ? 'border_primary' : ''}`}>
                                                                <input hidden type="radio" onChange={e => OnPaymentMethodChange(e)} name="payment_option" value="wallet" />
                                                                <span  className="rounded-0 p-1">
                                                                    <span  className="">{t('Pay with Wallet')}</span>
                                                                </span>
                                                            </label>}
                                                    </div>
                                                }

                                                <div  className="p-4 text-sm ">
                                                    <label  className="cursor-pointer items-center">
                                                        <input type="checkbox" onChange={e => setData('agree', e.target.checked)} name="agree_checkbox" id="agree_checkbox" />
                                                        <span  className="ms-2">{t('I agree to the')} </span>
                                                    </label>
                                                    <Link href={route('terms_and_conditions')}  className="font-bold text_primary hover:border-b border_primary duration-75 ">{t('Terms and Conditions')}</Link>,
                                                    <Link href={route('return_policy')}  className="font-bold text_primary hover:border-b border_primary duration-75  ms-1">{t('Return Policy')}</Link> &
                                                    <Link href={route('privacy_policy')}  className="font-bold text_primary hover:border-b border_primary duration-75  ms-1">{t('Privacy Policy')}</Link>
                                                </div>

                                                <div  className="flex justify-end mx-2">
                                                    <button type="submit" disabled={!data.agree}  className={`${data.agree ? '' : 'cursor-not-allowed opacity-50'} disabled bg_primary hover:bg_primary text-white duration-300 px-4 py-2 text-sm md:text-base rounded`}>{t('Confirm Checkout')}</button>
                                                </div>
                                            </div>
                                        </details >
                                    </div >
                                </div >
                            </form >

                        </div >
                        {/* Cart total*/}
                        <div  className="flex justify-center items-center sticky top-20 lg:col-span-4 self-start shadow-lg p-4 lg:p-2 xl:p-4 border border-slate-300 rounded-md">
                            <CheckoutTotal />
                        </div >
                    </div >
                </div >
            </div >
        </DefaultThemeLayout >
    )

}
