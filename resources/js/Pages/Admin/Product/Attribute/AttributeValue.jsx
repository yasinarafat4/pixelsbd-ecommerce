import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaHandHoldingUsd, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdEditAttributes, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from "react-select";
import Swal from "sweetalert2";

export default function AttributeValue({ attribute }) {
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        attribute_id: attribute.id,
        value: ""
    })


    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.product.attribute_value_store'), {
            onFinish: () => {
                reset();
            }
        })
    }

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.product.attribute_value_destroy', id))
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
            <Head title={"Attribute Values"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <Link href={route('admin.product.attribute.index')} className="inline-flex gap-1 items-center">
                                    <MdEditAttributes className="text-2xl text-slate-900" />
                                    <span>{t('Attribute')}</span>
                                </Link>
                            </li>
                            <li>
                                <span className="inline-flex gap-2 items-center">
                                    <FaHandHoldingUsd className="text-lg text-slate-900" />
                                    <span>{t('Attribute Values')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    {/* Back button */}
                    <Link onClick={e => window.history.back()}>
                        <button className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft className='text-xl' /> <span>{t('Back')}</span></button>
                    </Link>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    {/* Attribute Value Table */}
                    <div className='col-span-7 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2 className="text-lg font-medium text-slate-600">{t('All Attribute Values')}</h2>
                            </div>
                            {/* Search*/}
                            <div>
                                <label className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch className="text-xl text-slate-600" />
                                    <input autoFocus={true} name='search' type="text" className="grow" placeholder={t('Search')} />
                                </label>
                            </div>
                        </div>
                        <div className='card-body'>

                            {attribute.attributeValue.length > 0 ? <div >
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{t('Value')}</th>
                                            <th align="right">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */}

                                        {attribute.attributeValue.map((value, i) => (
                                            <tr key={i} className='text-slate-600'>
                                                <td align="left">{i + 1}</td>
                                                <td align="left">
                                                    {value?.value}
                                                </td>
                                                <td align="center" className="space-x-2">
                                                    <Link href={route('admin.product.attribute_value_edit', value.id)}> <div data-tip={t('Edit')} className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={() => handleDelete(value.id)}>
                                                        <div data-tip={t('Delete')} className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <FaRegTrashAlt className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                            </div> : <NothingFound title={'Nothing Found!'} />}
                        </div>
                    </div>
                    {/* Create Attribute Value */}
                    <div className='col-span-5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 w-full mx-auto'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2 className="text-lg font-medium text-slate-600">{t('Create Attribute Value')}</h2>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* Attribute */}
                                <div>
                                    <label className='label-text text-slate-600 text-sm' htmlFor="name">{t('Attribute')} *</label>
                                    <Select
                                        isDisabled={true}
                                        id="attribute"
                                        name="attribute"
                                        placeholder={t("Select attribute value")}
                                        className="w-full rounded-lg z-30"
                                        classNamePrefix="react-select"
                                        value={{ value: attribute.id, label: attribute.title }}
                                    />
                                </div>
                                {/* Value */}
                                <div>
                                    <label className='label-text text-slate-600 text-sm' htmlFor="value">{t('Value')} *</label>
                                    <input onChange={e => setData('value', e.target.value)} value={data.value} name='value' id='value' type="text" placeholder={t("Type here")} className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    {errors.value && <div className="text-red-500 text-sm mt-1">{errors.value}</div>}
                                </div>
                            </div>
                            <div className="flex justify-end mx-4">
                                <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Add Value')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
