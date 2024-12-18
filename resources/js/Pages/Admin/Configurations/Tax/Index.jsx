import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdSpaceDashboard } from "react-icons/md";


export default function Index ()
{
    const { t } = useLaravelReactI18n();

    // / Add New Currency form
    const { data, setData, post, processing, errors, reset } = useForm( {
        tax_type: "",
    } )

    // Currency foramte submit handler
    function handleSubmit ( e )
    {
        e.preventDefault()
    }

    return (
        <AdminLayout>
            <Head title={ "Vat & Tax" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LiaFileInvoiceDollarSolid  className="text-base text-slate-900" />
                                    <span>Vat & Tax</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>

                    <div  className="flex items-start gap-5">

                        {/* All Taxes */ }
                        <div  className='basis-3/5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                            <div  className="flex items-center justify-between border-b pb-3 px-6">
                                <div>
                                    <h2  className="text-lg font-medium text-slate-600">All Taxes</h2>
                                </div>
                                {/* Search*/ }
                                <div>
                                    <div  className="shadow bg-white rounded flex items-center mr-2">
                                        <input name='search' type="text"  className="w-full grow rounded input h-10 input-bordered focus:outline-none" placeholder="Search" />
                                        <button  className="-ms-8 bg-blue-600 hover:bg-blue-700 duration-300 p-[10px] rounded-e-md">
                                            <IoIosSearch  className="text-xl text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div  className='card-body'>

                                <div >
                                    <table  className="table">
                                        {/* head */ }
                                        <thead>
                                            <tr  className='text-slate-600'>
                                                <th align="left">#</th>
                                                <th align="left">Tax Type</th>
                                                <th align="center">{ t( 'Status' ) }</th>
                                                <th align="right">{ t( 'Actions' ) }</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* row */ }

                                            <tr  className='text-slate-600'>
                                                <td align="left">1</td>
                                                <td align="left">Tax</td>
                                                <td align="center">
                                                    <input type="checkbox"  className="toggle toggle-sm toggle-success" />
                                                </td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.configuration.tax.edit', 1 ) }>  <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link><div data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div></Link>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    {/* <div  className="flex justify-between items-center mt-2">
            <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
            <Pagination links={homeFAQs.links} />
        </div> */}
                                </div>
                            </div>
                        </div>
                        {/* Add New Tax */ }
                        <div  className='basis-2/5 card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                            <div  className="flex items-center justify-start border-b py-3 px-4">
                                <div>
                                    <h2  className="text-lg font-medium text-slate-600">Add New Tax</h2>
                                </div>
                            </div>

                            <form onSubmit={ handleSubmit }  className="space-y-3 py-4 px-4">
                                {/* tax Type */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="tax_type">Tax Type</label>
                                    <input onChange={ e => setData( 'tax_type', e.target.value ) } value={ data.tax_type } name='tax_type' id='tax_type' type="text" placeholder={t("Type here")}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    { errors.tax_type && <div  className="text-red-500 text-sm mt-1">{ errors.tax_type }</div> }
                                </div>
                                <div  className="flex justify-end">
                                    <button type="submit"  className="bg-[#008fe1] duration-300 py-2 px-4 rounded-md text-white text-md">Add Tax</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
