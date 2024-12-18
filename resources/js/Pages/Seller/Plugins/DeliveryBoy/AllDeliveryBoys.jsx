import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import SellerGoToCollectionPopup from "@/Components/Popups/SellerGoToCollectionPopup";
import SellerGoToPaymentPopup from "@/Components/Popups/SellerGoToPaymentPopup";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from "react";
import { BiDotsVertical, BiLockOpen } from "react-icons/bi";
import { FaMoneyCheckAlt, FaPlus, FaRegEdit } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoBan } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";

export default function AllDeliveryBoys() {

    const { t } = useLaravelReactI18n();
    const { delivery_boys, default_currency_symbol } = usePage().props
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [deliveryBoyData, setDeliveryBoyData] = useState();

    // Modal Handlers
    function onShowCollectionModal(deliveryBoy) {
        setDeliveryBoyData(deliveryBoy);
        setShowCollectionModal(true)
    }
    function closeCollectionModal() {
        setShowCollectionModal(false)
    };

    function onShowPaymentModal(deliveryBoy) {
        setDeliveryBoyData(deliveryBoy);
        setShowPaymentModal(true)
    }
    function closePaymentModal() {
        setShowPaymentModal(false)
    };

    const isBan = false;
    return (
        <SellerLayout>
            <Head title={"All Delivery Boys"} />
            {/* Modal */}
            {showCollectionModal && <SellerGoToCollectionPopup closeModal={closeCollectionModal} showModal={showCollectionModal} deliveryBoy={deliveryBoyData} />}
            {showPaymentModal && <SellerGoToPaymentPopup closeModal={closePaymentModal} showModal={showPaymentModal} deliveryBoy={deliveryBoyData} />}

            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
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
                                    <PiUsersFourFill  className="text-base text-slate-900" />
                                    <span>{t('All Delivery Boys')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('seller.deliveryboy.create_delivery_boy')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Add New Delivery Boy')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Delivery Boys')}</h2>
                        </div>
                        {/* Search*/}
                        <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>
                    </div>
                    <div  className='card-body'>
                        {delivery_boys.total > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Name')}</th>
                                        <th align="left">{t('Email Address')}</th>
                                        <th align="left">{t('Phone')}</th>
                                        <th align="left">{t('City')}</th>
                                        <th align="left">{t('Earning')}</th>
                                        <th align="left">{t('Collection')}</th>
                                        <th align="right">{t('Options')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {delivery_boys.data.map((delivery_boy, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((delivery_boys.current_page - 1) * (delivery_boys.per_page))}</td>
                                            <td align="left">{delivery_boy.name}</td>
                                            <td align="left">{delivery_boy.email}</td>
                                            <td align="left">{delivery_boy.phone}</td>
                                            <td align="left">{delivery_boy.city.name}</td>
                                            <td align="left">{default_currency_symbol + delivery_boy.total_earning}</td>
                                            <td align="left">{default_currency_symbol + delivery_boy.total_collection}</td>
                                            <td align="center">
                                                <div  className="dropdown dropdown-left dropdown-bottom">
                                                    <div tabIndex={0}><BiDotsVertical  className="text-2xl cursor-pointer mb-2" /></div>
                                                    <ul tabIndex={0}  className="dropdown-content menu z-50 px-[1px] py-1 border shadow bg-white rounded-box w-56">

                                                        <li><a href={route('seller.deliveryboy.edit_delivery_boy', delivery_boy)}><FaRegEdit  className="text-sm" />{t('Edit')}</a></li>
                                                        <li>
                                                            <div  className="flex flex-col items-start">
                                                                {isBan == true ?
                                                                    <div  className="flex items-center gap-2 text-sm"><BiLockOpen  className="text-base" />{t('Unban This Delivery Boy')}</div> : <div  className="flex items-center gap-2 text-sm"><IoBan  className="text-base" />{t('Ban This Delivery Boy')}</div>}
                                                            </div>
                                                        </li>
                                                        <li><button type="button" onClick={e => onShowCollectionModal(delivery_boy)}><FaHandHoldingDollar  className="text-lg" />{t('Go to Collection')}</button></li>
                                                        <li><button type="button" onClick={e => onShowPaymentModal(delivery_boy)}><FaMoneyCheckAlt  className="text-base" />{t('Go to Payment')}</button></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {delivery_boys.from || 0} to {delivery_boys.to || 0} of {delivery_boys.total}</p>
                                <Pagination links={delivery_boys.links} />
                            </div>
                        </div> : <NothingFound title={"Nothing Found!"} />}
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
