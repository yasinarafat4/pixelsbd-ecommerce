import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";

import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaHouseUser } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft, MdSpaceDashboard } from "react-icons/md";

import Swal from "sweetalert2";


export default function Verification({ seller }) {

    const { t } = useLaravelReactI18n();

    // Click handlers
    function handleAcceptClick(id) {
        Swal.fire({
            title: "Do you want to verify this seller?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Accept(id)
            }
        });
    }
    function handleRejectClick(id) {
        Swal.fire({
            title: "Do you want to reject this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Reject(id)
            }
        });
    }

    function Accept(id) {
        router.get(route('admin.seller.approve', id))
    }
    function Reject(id) {
        router.get(route('admin.seller.reject', id))
    }

    return (
        <AdminLayout>
            <Head title={"Seller Verification Form"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span>{t('Seller Verification')}</span>
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
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-bold">{t('Seller Verification')}</h2>
                        </div>
                    </div>
                    <div  className="card-body grid grid-cols-12 gap-10">
                        <div  className="col-span-5 flex flex-col gap-4">
                            {/* Seller Info */}
                            <div>
                                <h2  className="text-lg font-semibold mb-3">{t('Seller Info')}</h2>
                                <div>
                                    <ul  className="text-sm text-slate-600 space-y-4 ms-2">
                                        <li><span  className="font-semibold">Name:</span> <span>{seller.name}</span> </li>
                                        <li><span  className="font-semibold">Email:</span> <span>{seller.email}</span> </li>
                                        <li><span  className="font-semibold">Phone:</span> <span>{seller.phone}</span> </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Shop Info */}
                            <div>
                                <h2  className="text-lg font-semibold mb-3">{t('Shop Info')}</h2>
                                <div>
                                    <ul  className="text-sm text-slate-600 space-y-4 ms-2">
                                        <li><span  className="font-semibold">Shop Name:</span> <span>{seller.shop.name}</span> </li>
                                        <li><span  className="font-semibold">Address:</span> <span>{seller.shop.address}</span> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div  className="col-span-7">
                            <h2  className="text-lg font-semibold">{t('Verification Info')}</h2>

                            {seller.shop?.verification_info?.length > 0 ? <table  className="table">
                                <tbody  className="border">
                                    {/* row 1 */}
                                    {seller.shop?.verification_info?.map((info, i) => (
                                        <tr key={i}>
                                            <th>{info.label}</th>
                                            <td>{info.type == 'file' ? <a  className="bg_primary text-white px-2 py-1 rounded text-xs" target="_blank" rel="noreferrer" href={
                                                '/' + info.value.replace('public', 'storage')}>View File</a> : info.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : <div  className="border"><NothingFound title={'No Verification Info Found!'} /></div>}


                            <div  className="flex justify-start items-center gap-2 mt-4">
                                {(seller.shop.verification_info && seller.shop.verification_status == 0 || seller.shop.verification_status == 2) &&
                                    <button onClick={e => handleAcceptClick(window.btoa(seller.id))}  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">Accept</button>
                                }
                                {(seller.shop.verification_info && seller.shop.verification_status == 0 || seller.shop.verification_status == 1) &&
                                    <button onClick={e => handleRejectClick(window.btoa(seller.id))}  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm">Reject</button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
