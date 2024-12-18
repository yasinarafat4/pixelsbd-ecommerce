/* eslint-disable */

import SellerUploadModal from "@/Components/UploadModals/SellerUploadModal";
import { asset_url, isNullOrEmpty } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Index({ shop }) {


    const { t } = useLaravelReactI18n();
    const { business_settings, errors } = usePage().props;


    const [name, setName] = useState(shop.name ?? '');

    const [phoneNumber, setPhoneNumber] = useState('');


    const [address, setAddress] = useState(shop.address ?? '');
    const [metaTitle, setMetaTitle] = useState(shop.meta_title ?? '');
    const [metaDescription, setMetaDescription] = useState(shop.meta_description ?? '');
    const [shippingCost, setShippingCost] = useState(shop.shipping_cost ?? '');
    const [latitude, setLatitude] = useState(shop.delivery_pickup_latitude ?? '');
    const [longitude, setLongitude] = useState(shop.delivery_pickup_longitude ?? '');
    const [facebook, setFacebook] = useState(shop.facebook ?? '');
    const [instagram, setInstagram] = useState(shop.instagram ?? '');
    const [twitter, setTwitter] = useState(shop.twitter ?? '');
    const [google, setGoogle] = useState(shop.google ?? '');
    const [youtube, setYoutube] = useState(shop.youtube ?? '');
    const [logo, setLogo] = useState(shop.logo ?? null);
    const [shopBanner, setShopBanner] = useState(shop.shop_banner ?? null);


    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState();
    const [selectedImg, setSelectedImg] = useState([]);
    const location = useGeoLocation();


    //Set phone number
    useEffect(() => {
        setTimeout(() => {
            if (!isNullOrEmpty(shop?.phone)) {
                setPhoneNumber(shop?.phone);
            }
        }, 1000);
    }, []);

    // Modal
    function onAddFile(v) {

        if (type == 'logo') {
            setLogo(v[0]);
        }
        else {
            setShopBanner(v[0]);
        }
        closeModal();
    }

    function handelShowModal(index) {
        setSelectedImg([]);
        if (index == 'logo' && !isNullOrEmpty(logo)) {
            setSelectedImg([logo])
        }
        else if (index == 'shop_banner' && !isNullOrEmpty(shopBanner)) {
            setSelectedImg([shopBanner])
        }
        setShowModal(true)
        setType(index)
    }

    function closeModal() {
        setShowModal(false)
    };

    // Romove Images
    function removeFile(type) {
        if (type == 'logo') {
            setLogo(null);
        }
        else if (type == 'shop_banner') {
            setShopBanner(null);
        }
    }

    function updateShopInfo() {
        router.put(route('seller.update_shop_info', shop.id), {
            'name': name,
            'phone': phoneNumber,
            'logo': logo,
            'shop_banner': shopBanner,
            'address': address,
            'shipping_cost': shippingCost,
            'meta_title': metaTitle,
            'meta_description': metaDescription,
        }
        );
    }

    function updateDeliveryPickupPoint() {
        router.put(route('seller.update_delivery_pickup_point', shop.id), {
            'delivery_pickup_latitude': latitude,
            'delivery_pickup_longitude': longitude,
        }
        );
    }
    function updateSocialMediaLinks() {
        router.put(route('seller.update_social_media_links', shop.id), {
            'facebook': facebook,
            'instagram': instagram,
            'twitter': twitter,
            'google': google,
            'youtube': youtube
        }
        );
    }

    return (
        <SellerLayout>
            <Head title={"Shop Setting"} />
            <div  className='p-4'>

                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <RiCoupon2Line  className="text-base text-slate-900" />
                                <span>{t('Shop Setting')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Modal */}
                {showModal && <SellerUploadModal selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                {/* Shop Settings */}
                <div  className="space-y-4">
                    {/*---Basic Info---*/}
                    <div  className='card  z-10 rounded-lg bg-white border-[1px] w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-4">
                            <h2  className="text-[16px] font-semibold">{t('Basic Info')}</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Shop Name */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="name">{t('Shop Name')} <span  className="text-red-600 text-base">*</span></label>
                                <div  className="w-10/12">
                                    <input name='name' value={name} onChange={e => setName(e.target.value)} id='name' type="text" placeholder={t('Shop Name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-full rounded text-sm" />
                                    {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                            </div>
                            {/* Shop Logo  */}
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="logo">
                                    {t('Shop Logo')}
                                </label>
                                <div  className="w-10/12">
                                    <div
                                        onClick={e => { handelShowModal('logo') }}
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{logo ? '1 file chosen' : '0 file chosen'}</p>
                                        </div>
                                    </div>
                                    <span  className="text-blue-600 text-[12px]">{('(Image aspect ratio should be 1:1 )')}</span>
                                    <div  className="flex items-center gap-3">
                                        {logo && <div  className="relative">
                                            <IoMdClose onClick={e => { removeFile('logo') }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={asset_url(logo)} alt={'shop Logo'} />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            {/* Shop Banner  */}
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="shop_banner">
                                    {t('Shop Banner')}
                                </label>
                                <div  className="w-10/12">
                                    <div
                                        onClick={e => { handelShowModal('shop_banner') }}
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{shopBanner ? '1 file chosen' : '0 file chosen'}</p>
                                        </div>
                                    </div>
                                    <span  className="text-blue-600 text-[12px]">{('(Image aspect ratio should be 6:2 )')}</span>
                                    <div  className="flex items-center gap-3">
                                        {shopBanner && <div  className="relative">
                                            <IoMdClose onClick={e => { removeFile('shop_banner') }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={asset_url(shopBanner)} alt={'Top Banner'} />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            {/* Shop Phone */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="shop_phone">{t('Shop Phone')}</label>
                                <div  className="w-10/12">
                                    <PhoneInput
                                        inputClass="p-[13px] focus:outline-none !border-[1px] !border-slate-300 block text-slate-600 w-full rounded text-sm"
                                        dropdownClass="!z-50"
                                        masks={{ bd: '....-......' }}
                                        enableSearch
                                        country={location.country?.toLowerCase()}
                                        preventDefault
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e)}
                                    />
                                    {errors.phone && <div  className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                                </div>
                            </div>
                            {/* Address */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="address">{t('Shop Address')}</label>
                                <div  className="w-10/12">
                                    <input name='address' value={address} onChange={e => setAddress(e.target.value)} id='address' type="text" placeholder={t('Enter Shop Address')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 rounded text-sm w-full" />
                                    {errors.address && <div  className="text-red-500 text-sm mt-1">{errors.address}</div>}
                                </div>
                            </div>
                            {/* Shipping Cost */}
                            {business_settings.shipping_type == "seller_wise_shipping" && <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="shipping_cost">{t('Shipping Cost')}</label>
                                <input name='shipping_cost' value={shippingCost} onChange={e => setShippingCost(e.target.value)} id='shipping_cost' type="number" placeholder={t('Enter Shipping Cost')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>}
                            {/* Meta Title */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="meta_title">{t('Meta Title')}</label>
                                <input name='meta_title' value={metaTitle} onChange={e => setMetaTitle(e.target.value)} id='meta_title' type="text" placeholder={t('Enter Meta Title')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Meta Description */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="meta_description">{t('Meta Description')}</label>
                                <textarea
                                    name='meta_description'
                                    id='meta_description'
                                    type="text"
                                    placeholder={t('Enter Meta Description')}
                                    rows="3"
                                    value={metaDescription}
                                    onChange={e => setMetaDescription(e.target.value)}
                                     className="textarea p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm"
                                />
                            </div>
                            {/* Button */}
                            <div  className="flex justify-end">
                                <button onClick={e => updateShopInfo()}  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </div>
                    </div>
                    {/*---Delivery Boy Pickup Point---*/}
                    <div  className='card  z-10 rounded-lg bg-white border-[1px] w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-4">
                            <h2  className="text-[16px] font-semibold">{t('Delivery Boy Pickup Point')}</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Latitude */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="delivery_pickup_latitude">{t('Latitude')}</label>
                                <input name='delivery_pickup_latitude' value={latitude} onChange={e => setLatitude(e.target.value)} id='delivery_pickup_latitude' type="number" placeholder={t('Enter Latitude')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Longitude */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="delivery_pickup_longitude">{t('Longitude')}</label>
                                <input name='delivery_pickup_longitude' value={longitude} onChange={e => setLongitude(e.target.value)} id='delivery_pickup_longitude' type="number" placeholder={t('Enter Longitude')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Button */}
                            <div  className="flex justify-end">
                                <button onClick={e => updateDeliveryPickupPoint()}  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </div>
                    </div>
                    {/*---Social Media Link---*/}
                    <div  className='card  z-10 rounded-lg bg-white border-[1px] w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-4">
                            <h2  className="text-[16px] font-semibold">{t('Social Media Link')}</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Facebook */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="facebook">{t('Facebook')}</label>
                                <input name='facebook' value={facebook} onChange={e => setFacebook(e.target.value)} id='facebook' type="text" placeholder={t('Insert Facebook link with https')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Instagram */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="instagram">{t('Instagram')}</label>
                                <input name='instagram' value={instagram} onChange={e => setInstagram(e.target.value)} id='instagram' type="text" placeholder={t('Insert Instagram link with https')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Twitter */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="twitter">{t('Twitter')}</label>
                                <input name='twitter' value={twitter} onChange={e => setTwitter(e.target.value)} id='twitter' type="text" placeholder={t('Insert Twitter link with https')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Google */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="google">{t('Google')}</label>
                                <input name='google' value={google} onChange={e => setGoogle(e.target.value)} id='google' type="text" placeholder={t('Insert Google link with https')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Youtube */}
                            <div  className="flex justify-between">
                                <label  className='label-text text-[14px] text-start text-slate-600' htmlFor="youtube">{t('Youtube')}</label>
                                <input name='youtube' value={youtube} onChange={e => setYoutube(e.target.value)} id='youtube' type="text" placeholder={t('Insert Youtube link with https')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-10/12 rounded text-sm" />
                            </div>
                            {/* Button */}
                            <div  className="flex justify-end">
                                <button onClick={e => updateSocialMediaLinks()}  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </SellerLayout>
    )

}
