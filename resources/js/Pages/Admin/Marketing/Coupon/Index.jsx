import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { toCamel } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Index({ coupons }) {

    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.marketing.coupon.destroy', id))
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

    function onUpdateCouponStatus(e, id) {
        router.put(route('admin.marketing.update_coupon_status', id), {
            status: e.target.checked,
        },)
    }


    return (
        <AdminLayout>
            <Head title={"Coupons"} />
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
                                    <RiCoupon2Line  className="text-base text-slate-900" />
                                    <span>{t('Coupons')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */}
                    <div>
                        <Link href={route('admin.marketing.coupon.create')}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{t('Add New Coupon')}</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Coupons Information')}</h2>
                        </div>
                        {/* Search*/}
                        {coupons.total > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('Search')} />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>
                        {coupons.total > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Code')}</th>
                                        <th align="left">{t('Type')}</th>
                                        <th align="left">{t('Start Date')}</th>
                                        <th align="left">{t('End Date')}</th>
                                        <th align="left">{t('Validation Days')}</th>
                                        <th align="left">{t('Status')}</th>
                                        <th align="right">{t('Actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}

                                    {coupons.data.map((coupon, i) => {

                                        const parseDetails = coupon.type == "welcome_base" && JSON.parse(coupon.details);

                                        return <tr key={i}  className='text-slate-600'>
                                            <td>{i + 1 + (coupons.current_page - 1) * coupons.per_page}</td>
                                            <td align="left">{coupon.code}</td>
                                            <td align="left">{toCamel(coupon.type)}</td>
                                            <td align="left">{coupon.start_date}</td>
                                            <td align="left">{coupon.end_date}</td>
                                            <td align="left">{parseDetails.validation_days}</td>
                                            <td align="left">
                                                {coupon.type == "welcome_base" && <input onChange={e => onUpdateCouponStatus(e, coupon.id)} checked={coupon.status == 1} type="checkbox"  className="toggle toggle-sm toggle-success" />}
                                            </td>
                                            <td align="center"  className="space-x-2">
                                                <Link href={route('admin.marketing.coupon.edit', coupon.id)}> <div data-tip={t('Edit')}  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                    <BiSolidEdit  className='text-sm' />
                                                </div></Link>
                                                {coupon.type == "welcome_base" ? <></> : <Link >
                                                    <div onClick={e => handleDelete(coupon.id)} data-tip={t('Delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                </Link>}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div  className="flex justify-end items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {coupons.from || 0} to {coupons.to || 0} of {coupons.total}</p>
                                <Pagination links={coupons.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
