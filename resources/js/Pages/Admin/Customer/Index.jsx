import AdminLayout from "@/Layouts/AdminLayout";

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, currencyFormat, placeholder_user } from "@/Helpers";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { BiDotsVertical, BiLockOpen, BiSolidEdit } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoBan } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ customers }) {
    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.customer.destroy', id))
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


    // Customer Ban functionality
    const banData = (id) => {
        router.put(route('admin.ban_customer', id))
    }
    const handleBanCustomer = (id, customer) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${customer.banned == 1 ? "Do you want to unban this Customer?" : "Do you really want to ban this Customer?"}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                banData(id)
            }
        });
    }

    return (
        <AdminLayout>
            <Head title={"Customers"} />
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
                                    <FaUsers  className="text-base text-slate-900" />
                                    <span>{t('Customers')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.customer.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card z-10 rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Customers')}</h2>
                        </div>
                        {/* Search*/}
                        {customers.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {customers.data.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('User')}</th>
                                        <th align="left">{t('Phone')}</th>
                                        <th align="left">{t('Current Balance')}</th>
                                        <th align="left">{t('Last Login')}</th>
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        customers.data.map((customer, index) => (
                                            <tr key={index}  className='text-slate-600'>
                                                <td align="left">
                                                    <div  className="flex justify-between items-center gap-1">
                                                        {(index + 1) + ((customers.current_page - 1) * (customers.per_page))}
                                                        <span>{customer.banned == 1 && <IoBan  className="text-base text-red-600" />}</span>
                                                    </div>
                                                </td>
                                                <td align="left">
                                                    <div  className="flex items-center justify-start gap-1">
                                                        <div>
                                                            <img  className="w-9 rounded-full border border-slate-500" src={asset_url(customer.image || placeholder_user())} alt={customer.name} />
                                                        </div>
                                                        <div>
                                                            <p>{customer.name}</p>
                                                            <p>{customer.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="left">{customer.phone}</td>
                                                <td align="left">{currencyFormat(customer.balance || 0)}</td>
                                                <td align="left">{customer.last_login ? <span>{moment(customer.last_login).format('lll')}</span> : "Not Login Yet!"}</td>
                                                <td align="right">
                                                    <div  className="flex items-center justify-start gap-2">
                                                        <Link href={route('admin.customer.edit', window.btoa(customer.id))}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                            <BiSolidEdit  className='text-sm' />
                                                        </div></Link>
                                                        <Link onClick={e => handleDelete(customer.id)}>
                                                            <div data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                                <FaRegTrashAlt  className='text-sm' />
                                                            </div>
                                                        </Link>
                                                        <div  className="dropdown dropdown-left dropdown-bottom">
                                                            <div tabIndex={0}><BiDotsVertical  className="text-2xl cursor-pointer mb-2" /></div>
                                                            <ul tabIndex={0}  className="dropdown-content z-[1] border menu p-2 shadow bg-white rounded-box w-56">
                                                                <li><Link href={route('admin.customer.show', window.btoa(customer.id))}> <FaUser /> {t('Profile')}</Link></li>
                                                                <li>
                                                                    <div  className="flex flex-col items-start">
                                                                        {customer.banned == 1 ?
                                                                            <div onClick={e => handleBanCustomer(customer.id, customer)}  className="flex items-center gap-2 text-sm"><BiLockOpen  className="text-base" />{t('Unban This Customer')}</div> : <div onClick={e => handleBanCustomer(customer.id, customer)}  className="flex items-center gap-2 text-sm"><IoBan  className="text-base" />{t('Ban This Customer')}</div>}
                                                                    </div>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {customers.from || 0} to {customers.to || 0} of {customers.total}</p>
                                <Pagination links={customers.links} />
                            </div>
                        </div> : <NothingFound title={"Nothing Found"} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
