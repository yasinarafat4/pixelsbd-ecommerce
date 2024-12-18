import { isNullOrEmpty } from "@/Helpers";
import { router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Select from "react-select";
import Modal from "../Modal";


export default function AddressModal({ countries, closeModal, showModal, addressData }) {

    const { t } = useLaravelReactI18n();
    const { errors } = usePage().props;
    const location = useGeoLocation();
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [phoneNumber, setPhoneNumber] = useState('');


    // form functionality
    const { data, setData, post, processing, reset } = useForm({
        phone: addressData?.phone ?? '',
        address: addressData?.address ?? '',
        country_id: addressData?.country_id ?? '',
        state_id: addressData?.state_id ?? '',
        city_id: addressData?.city_id ?? '',
        zip_code: addressData?.zip_code ?? '',
    })

    //Set phone number
    useEffect(() => {
        setTimeout(() => {
            if (!isNullOrEmpty(addressData?.phone)) {
                setPhoneNumber(addressData?.phone);
            }
        }, 1000);
    }, []);

    //Set country
    useEffect(() => {
        let country = {};
        let co = countries.filter(country => country.id == addressData?.country_id);
        country = { value: co[0]?.id, label: co[0]?.name }
        setSelectedCountry(country);
        if (addressData?.country_id) {
            axios.get(route('state_by_country', addressData?.country_id)).then(function (response) {
                setStates(response.data)

            })
        }

    }, [addressData?.country_id])

    //Set State
    useEffect(() => {
        let state = {};
        let st = states.filter(state => state.id == addressData?.state_id);
        state = { value: st[0]?.id, label: st[0]?.name }
        setSelectedState(state);
        if (addressData?.state_id) {
            axios.get(route('city_by_state', addressData?.state_id)).then(function (response) {
                setCities(response.data)

            })
        }
    }, [states])

    //Set city
    useEffect(() => {
        let city = {};
        let ct = cities.filter(city => city.id == addressData?.city_id);
        city = { value: ct[0]?.id, label: ct[0]?.name }
        setSelectedCity(city);
    }, [cities])


    // Country change handler
    function OnCountryChange(e) {
        setData('country_id', e.value)
        setSelectedCountry(e);
        axios.get(route('state_by_country', e.value)).then(function (response) {
            setStates(response.data)

        })
    }
    // Country change handler
    function OnStateChange(e) {
        setData('state_id', e.value)
        setSelectedState(e);
        axios.get(route('city_by_state', e.value)).then(function (response) {
            setCities(response.data)

        })
    }
    // Country change handler
    function OnCityChange(e) {
        setData('city_id', e.value)
        setSelectedCity(e);
    }

    // Form submit functionality
    function AddressFormSubmit(e) {
        e.preventDefault()
        if (addressData?.id) {
            router.put(route('update_address', addressData?.id), data, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('add_address'), {
                onSuccess: () => closeModal(),
            });
        }
    }

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="xl" show={showModal} onClose={closeModal} closeable={false}>
                <div  className="flex justify-between py-3 px-6">
                    <h2  className="text-lg md:text-xl lg:text-[20px] font-medium p-5 text-slate-600">{t('New Address')}</h2>
                    <button onClick={closeModal}  className="text-slate-500 hover:text-slate-600 duration-300"><MdOutlineClose  className="text-2xl" /></button>
                </div>
                <hr />
                <div  className="px-6 py-4">
                    <form onSubmit={e => AddressFormSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 pb-5'> {/* Address */}
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
                                {errors.address && <div  className="text-red-500 text-sm mt-1">{errors.address}</div>}
                            </div>

                            {/* Country */}
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{t('Country')}*</label>
                                <Select
                                    name="country"
                                    placeholder={t('Select Your Country')}
                                     className="w-full rounded bg-white text-slate-600"
                                    classNamePrefix="react-select"
                                    onChange={(e) => OnCountryChange(e)}
                                    value={selectedCountry}
                                    options={countries.map((country) => ({ value: country.id, label: country.name }))}
                                />
                                {errors.country_id && <div  className="text-red-500 text-sm mt-1">{errors.country_id}</div>}
                            </div>
                            {/* State */}
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{t('State')}*</label>
                                <Select
                                    name="state"
                                    placeholder={t('Select Your State')}
                                     className="w-full rounded bg-white text-slate-600"
                                    classNamePrefix="react-select"
                                    onChange={(e) => OnStateChange(e)}
                                    value={selectedState}
                                    options={states.map((state) => ({ value: state.id, label: state.name }))}
                                />
                                {errors.state_id && <div  className="text-red-500 text-sm mt-1">{errors.state_id}</div>}
                            </div>
                            {/* City */}
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{t('City')}*</label>
                                <Select
                                    name="city"
                                    placeholder={t('Select Your City')}
                                     className="w-full rounded bg-white text-slate-600"
                                    classNamePrefix="react-select"
                                    onChange={(e) => OnCityChange(e)}
                                    value={selectedCity}
                                    options={cities.map((city) => ({ value: city.id, label: city.name }))}
                                />
                                {errors.city_id && <div  className="text-red-500 text-sm mt-1">{errors.city_id}</div>}
                            </div>
                            {/* Phone */}
                            <>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="phone">{t('Phone')}*</label>
                                <PhoneInput
                                    inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-300 block text-slate-600 w-full rounded text-sm"
                                    dropdownClass="!z-50"
                                    masks={{ bd: '....-......' }}
                                    enableSearch
                                    country={location.country?.toLowerCase()}
                                    preventDefault
                                    value={phoneNumber}
                                    onChange={e => setData('phone', e)}
                                    inputProps={{ name: 'phone', id: 'phone' }}
                                />
                                {errors.phone && <div  className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                            </>
                            {/* Zip Code */}
                            <>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="zip_code">{t('Zip Code')}</label>
                                <input onChange={e => setData('zip_code', e.target.value)} value={data.zip_code} name='zip_code' id='zip_code' type="text" placeholder={t("Your Zip Code")}  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block bg-white text-slate-600 w-full rounded text-sm" />
                                {errors.zip_code && <div  className="text-red-500 text-sm mt-1">{errors.zip_code}</div>}
                            </>
                        </div>
                        {/* Buttons */}
                        <div  className="flex items-center justify-end gap-2 px-4">
                            <button type="button" onClick={closeModal}  className="px-4 py-2 bg_secondary rounded text-white font-medium">Close</button>
                            <button type="button" onClick={e => AddressFormSubmit(e)}  className="px-8 py-2 bg_primary rounded text-white font-medium">Save</button>
                        </div>
                    </form>
                </div>
            </Modal >
        </>
    )

}
