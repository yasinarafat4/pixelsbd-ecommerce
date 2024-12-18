import NothingFound from "@/Components/NothingFound";
import { asset_url, placeholder_user } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt, FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({ staffs }) {

    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.staff.staffs.destroy', id))
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
        <AdminLayout>
            <Head title={"Staffs"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('ashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaUsers  className="text-base text-slate-900" />
                                    <span>{t('Staffs')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.staff.staffs.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Add New Staff')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card z-10 rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('All Staffs')}</h2>
                        </div>
                        {/* Search*/}
                        {staffs.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {staffs.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Name')}</th>
                                        <th align="left">{t('Email')}</th>
                                        <th align="left">{t('Phone')}</th>
                                        <th align="left">{t('Role')}</th>
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {
                                        staffs.map((staff, index) => (
                                            <tr key={index}  className='text-slate-600'>
                                                <td align="left">{index + 1}</td>
                                                <td align="left">
                                                    <div  className="flex items-center justify-start gap-1">
                                                        <div  className="border border-slate-400 rounded-full">
                                                            <img  className="w-8 rounded-full" src={asset_url(staff.image || placeholder_user())} alt={staff.name} />
                                                        </div>
                                                        <p>{staff.name}</p>
                                                    </div>
                                                </td>
                                                <td align="left">{staff.email}</td>
                                                <td align="left">{staff.phone}</td>
                                                <td align="left">{staff?.role[0]}</td>

                                                {/* <td>
                                                <div>
                                                    {customer.status == 1 ? <div  className='cursor-pointer text-white bg-green-700 py-1 px-2 text-xs rounded-sm w-full text-center'>Active</div> : <div  className='cursor-pointer text-white bg-red-700 py-1 px-2 text-xs rounded-sm w-full text-center'>InActive</div>}
                                                </div>
                                            </td> */}
                                                <td align="right"  className="space-x-2">
                                                    <Link href={route('admin.staff.staffs.edit', staff.id)}> <div data-tip={t('edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link > <div onClick={() => handleDelete(staff.id)} data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div></Link>

                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                        </div> : <NothingFound title={"Nothing Found!"} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
