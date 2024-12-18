import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

import { BiSolidEdit } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import Swal from "sweetalert2";



export default function Index({ roles }) {
    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (role) => {
        router.delete(route('admin.staff.role.destroy', role))
    }

    const handleDelete = (role) => {
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
                deleteData(role)
            }
        });
    }

    return (
        <AdminLayout>
            <Head title={"Role"} />
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
                                    <RiUserSettingsLine  className="text-sm text-slate-900" />
                                    <span>{t('Role')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.staff.role.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Create New')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">Role</h2>
                        </div>
                        {/* Search*/}
                        {roles.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>

                        {roles.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Title')}</th>
                                        <th align="center">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {roles.map((role, index) => (
                                        <tr key={index}  className='text-slate-600'>
                                            <td width={'10%'} align="left">{index + 1}</td>
                                            <td width={'70%'} align="left">{role.name}</td>
                                            <td width={'20%'} align="right"  className="flex items-center justify-start gap-2">
                                                <Link href={route('admin.staff.role.edit', role)}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                    <BiSolidEdit  className='text-sm' />
                                                </div></Link>
                                                <Link><div onClick={() => handleDelete(role)} data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                    <FaRegTrashAlt  className='text-sm' />
                                                </div></Link>

                                            </td>
                                        </tr>
                                    ))}
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
