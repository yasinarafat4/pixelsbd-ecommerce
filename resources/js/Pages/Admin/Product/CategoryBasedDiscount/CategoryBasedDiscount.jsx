import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { PickerModal } from "mui-daterange-picker-plus";
import { useState } from "react";
import { MdDateRange, MdSpaceDashboard } from "react-icons/md";
import { TbShoppingBagDiscount } from "react-icons/tb";

export default function CategoryBasedDiscount({ categoryList }) {
    const { t } = useLaravelReactI18n();
    const [anchorEl, setAnchorEl] = useState();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        discount_start_date: "",
        discount_end_date: "",
    })

    // Date Range
    function handleClick(e) {
        setAnchorEl(e.currentTarget)
        setOpen(!open);
    };

    function handleClose() {
        setOpen(false);
    };

    function handleSetDateRangeOnSubmit(dateRange) {
        setData(prevData => ({ ...prevData, 'discount_start_date': moment(dateRange.startDate).format('YYYY-MM-DD') }));
        setData(prevData => ({ ...prevData, 'discount_end_date': moment(dateRange.endDate).format('YYYY-MM-DD') }));
        handleClose();
    };
    // function handleSetDateRangeOnSubmit(dateRange) {
    //     setData(prevData => ({ ...prevData, 'discount_start_date': moment(dateRange.startDate).format('YYYY-MM-DD') }));
    //     setData(prevData => ({ ...prevData, 'discount_end_date': moment(dateRange.endDate).format('YYYY-MM-DD') }));
    //     handleClose();
    // };



    return (
        <AdminLayout>
            <Head title={"Category Based Discount"} />
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
                                    <TbShoppingBagDiscount  className="text-lg text-slate-900" />
                                    <span>{t('Category Wise Product Discount')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Set Category Wise Product Discount')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>
                        {categoryList.data.length > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="center">{t('Icon')}</th>
                                        <th align="center">{t('Name')}</th>
                                        <th align="center">{t('Parent Category')}</th>
                                        <th align="center">{t('Discount')}</th>
                                        <th align="center">{t('Discount Date Range')}</th>
                                        <th align="center">{t('Seller Products')}</th>
                                        <th align="right">{t('Action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}


                                    {categoryList.data.map((category, i) => (
                                        <tr key={i} className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((categoryList.meta.current_page - 1) * (categoryList.meta.per_page))}</td>
                                            <td align="center">
                                                <div>
                                                    <div  className="avatar">
                                                        <div  className="mask mask-squircle w-10 h-10">
                                                            <img src={asset_url(category.icon)} alt={category.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td align="left">{category.name}</td>
                                            <td align="left">{category.parent?.name}</td>
                                            <td  className="w-full xl:w-[300px]" align="left">
                                                <div  className="flex items-center">
                                                    <input type="text"  className="py-[10px] px-[8px] focus:outline-none w-full rounded-l-lg border border-slate-300 focus:border-blue-600 bg-white text-slate-600" placeholder="Discount" />
                                                    <div  className="py-[10px] px-[16px] bg-[#F7F8FA] border border-slate-300 border-l-0 rounded-r-lg">
                                                        %
                                                    </div>
                                                </div>
                                            </td>
                                            <td  className="w-full xl:w-[380px]" align="left">
                                                <div onClick={handleClick}  className="flex justify-between items-center p-[10px] cursor-pointer focus:outline-none border-[1px] border-slate-300 text-slate-600 w-full rounded-lg text-sm">
                                                    <span>{data.discount_start_date != '' ? data.discount_start_date : 'YYYY-MM-DD'} &nbsp; to &nbsp; {data.discount_end_date != '' ? data.discount_end_date : 'YYYY-MM-DD'}</span>
                                                    <span><MdDateRange  className="text-xl" /></span>
                                                </div>
                                                <PickerModal
                                                    customProps={{
                                                        onSubmit: (range) => handleSetDateRangeOnSubmit(range),
                                                        onCloseCallback: handleClose,
                                                    }}
                                                    modalProps={{
                                                        anchorEl,
                                                        open,
                                                        onClose: handleClose,
                                                        slotProps: {
                                                            paper: {
                                                                sx: {
                                                                    borderRadius: "16px",
                                                                    boxShadow: "rgba(0, 0, 0, 0.21) 0px 0px 4px",
                                                                },
                                                            },
                                                        },
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        },
                                                    }}
                                                />



                                            </td>
                                            <td align="center">
                                                <input type="checkbox"
                                                    // onChange={(e) => onFeaturedStatusChange(category.id, e)} checked={category.featured}
                                                     className="toggle toggle-sm toggle-success" />
                                            </td>
                                            <td align="center">
                                                <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-8 rounded-md text-white">{t('Set')}</button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {categoryList.meta.from || 0} to {categoryList.meta.to || 0} of {categoryList.meta.total}</p>
                                <Pagination links={categoryList.meta.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
