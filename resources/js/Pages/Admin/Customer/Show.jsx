import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Show({ customer }) {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={"Customer Profile"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <div  className="inline-flex gap-1 items-center">
                                    <FaUsers  className="text-lg" />
                                    <Link href={route('admin.customer.index')}>{t('Customers')}</Link>
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
                        <Link onClick={e => window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /><span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>
                <div  className="border border-slate-300 rounded-lg max-w-3xl mx-auto p-6 space-y-6">
                    { /* Seller profile image */}
                    <div  className="flex flex-col items-center justify-center gap-1">
                        <div  className="border border-slate-300 p-2 rounded-full h-40 w-40">
                            <img  className='w-full h-full rounded-full object-cover' src={asset_url(customer.image || '/assets/user.png')} alt={customer.name} />
                        </div>
                        <h2  className="text-2xl font-semibold">{customer.name}</h2>
                    </div>
                    <div  className="space-y-2">
                        <h2  className="text-2xl font-semibold">Basic Information</h2>
                        <hr  className="bg-slate-300 h-[2px]" />
                        <div  className="pt-5">
                            <ul  className="space-y-2">
                                <li  className="flex justify-between "><span  className="font-semibold">Phone Number :</span> <span>{customer.phone ? customer.phone : "No number found!"}</span> </li>
                                <li  className="flex justify-between "><span  className="font-semibold">Email :</span> <span>{customer.email}</span> </li>
                                <li  className="flex justify-between "><span  className="font-semibold">Registered On :</span> <span>{moment(customer.created_at).startOf('hour').fromNow()}</span> </li>
                                <li  className="flex justify-between" ><span  className="font-semibold">Last Login :</span> {customer.last_login ? <span>{moment(customer.last_login).format('lll')}</span> : "Not Login Yet!"}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    )

}
