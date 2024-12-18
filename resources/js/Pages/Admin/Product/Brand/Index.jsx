import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, placeholder1_1 } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import { CiMedal } from "react-icons/ci";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index ( { brands } )
{

    const { t } = useLaravelReactI18n();

    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.product.brand.destroy', id ) )
    }

    const handleDelete = ( id ) =>
    {
        Swal.fire( {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        } ).then( ( result ) =>
        {
            if ( result.isConfirmed )
            {
                deleteData( id )
            }
        } );
    }

    return (
        <AdminLayout>
            <Head title={ "Brand" } />
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
                                    <CiMedal  className="text-base text-slate-900" />
                                    <span>{ t( 'Brand' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */ }
                    <div>
                        <Link href={ route( 'admin.product.brand.create' ) }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{ t( 'Create New' ) }</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Brands' ) }</h2>
                        </div>
                        {/* Search*/ }
                        { brands.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                            </label>
                        </div> }
                    </div>
                    <div  className='card-body'>

                        { brands.data.length > 0 ? <div >
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="center">{ t( 'Logo' ) }</th>
                                        <th align="center">{ t( 'Name' ) }</th>
                                        <th align="center">{ t( 'Created' ) }</th>
                                        <th align="center">{ t( 'Updated' ) }</th>
                                        <th align="right">{ t( 'Actions' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }

                                    {
                                        brands.data.map( ( brand, index ) => (
                                            <tr key={ index }  className='text-slate-600'>
                                                <td align="left">{ ( index + 1 ) + ( ( brands.meta.current_page - 1 ) * ( brands.meta.per_page ) ) }</td>
                                                <td align="center">
                                                    <div>
                                                        <div  className="avatar">
                                                            <div  className="mask mask-squircle w-16 h-16">
                                                                <img src={ asset_url(brand.logo || placeholder1_1()) } alt={ 'brand name' } />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="center">{ brand.name }</td>
                                                <td align="center">{ moment( brand.created_at ).format( 'YYYY-MM-DD , h:mm:ss a' ) }</td>
                                                <td align="center">{ moment( brand.created_at ).format( 'YYYY-MM-DD , h:mm:ss a' ) }</td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.product.brand_edit', { id: brand.id, lang: 'en' } ) }>  <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={ () => handleDelete( brand.id ) }> <div data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div></Link>
                                                </td>
                                            </tr>
                                        ) )
                                    }
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing { brands.meta.from || 0 } to { brands.meta.to || 0 } of { brands.meta.total }</p>
                                <Pagination links={ brands.meta.links } />
                            </div>
                        </div> : <NothingFound title={ 'Nothing Found!' } /> }
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
