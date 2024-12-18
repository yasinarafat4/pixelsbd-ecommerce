import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Show({ seller }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={"Seller Profile"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                            <li>
                                <div  className="inline-flex gap-1 items-center">
                                    <FaUsers  className="text-lg" />
                                    <Link href={route('admin.seller.index')}>{t('Sellers')}</Link>
                                </div>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaUser  className="text-sm text-slate-900" />
                                    <span>{t('Customer Profile')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /><span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>
                <div  className="border border-slate-300 rounded-lg max-w-6xl mx-auto p-6 space-y-6">
                    { /* Seller profile image */}
                    <div  className="flex flex-col items-center justify-center gap-1">
                        <div  className="border border-slate-300 p-2 rounded-full">
                            <img  className='w-44 h-44 rounded-full' src={asset_url(seller.image || '/assets/user.png')} alt={seller.name} />
                        </div>
                        <h2  className="text-2xl font-semibold">{seller.name}</h2>
                        <p  className="text-sm text-slate-600">{seller.email}</p>
                    </div>
                    <hr  className="bg-slate-300 h-[2px]" />
                    <div  className="space-y-3">
                        <h2  className="text-xl font-medium">{t('About')} {seller.name}</h2>
                        <div  className="space-y-1">
                            <p  className="text-sm font-medium">{t('First Name')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.f_name}</span></p>
                            <p  className="text-sm font-medium">{t('Last Name')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.l_name}</span></p>
                            <p  className="text-sm font-medium">{t('Email')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.email}</span></p>
                            <p  className="text-sm font-medium">{t('Phone')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.phone}</span></p>
                        </div>
                    </div>
                    <div  className="space-y-3">
                        <h2  className="text-xl font-medium">{t('Payout Info')}</h2>
                        <div  className="space-y-1">
                            <p  className="text-sm font-medium">{t('Bank Name')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.bank_name}</span></p>
                            <p  className="text-sm font-medium">{t('Bank Account Name')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.holder_name}</span></p>
                            <p  className="text-sm font-medium">{t('Bank Account Number')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.account_no}</span></p>
                            <p  className="text-sm font-medium">{t('Bank Routing Number')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.bank_routing_no}</span></p>

                        </div>
                    </div>
                    <div  className="space-y-3">
                        <h2  className="text-xl font-medium">{t('Shop Info')}</h2>
                        <div  className="space-y-1">
                            <p  className="text-sm font-medium">{t('Total Products')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.products_count}</span></p>
                            <p  className="text-sm font-medium">{t('Total Sales')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.shop.num_of_sale}</span></p>
                            <p  className="text-sm font-medium">{t('Total Reviews')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.shop.num_of_reviews}</span></p>
                            <p  className="text-sm font-medium">{t('Shipping Cost')} : <span  className="font-normal text-slate-600 text-[13px]">{seller.shop.shipping_cost}</span></p>

                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout >
    )

}
