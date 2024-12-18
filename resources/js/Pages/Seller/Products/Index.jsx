

import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url, placeholder1_1 } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { BsHandbag } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { PiCopy } from "react-icons/pi";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function Index ( { products } )
{
    const { t } = useLaravelReactI18n();
    const { userpermission } = usePage().props;


    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'seller.product.products.destroy', id ) )
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

    function onPublishedStatusChange ( id, e )
    {
        router.put( route( 'seller.product.published_status', id ), {
            status: e.target.checked,
        } )
    }

    function onFeaturedStatusChange ( id, e )
    {
        router.put( route( 'seller.product.featured_status', id ), {
            status: e.target.checked,
        } )
    }


    return (
        <SellerLayout>
            <Head title={ "All Products" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'seller.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BsHandbag  className="text-sm text-slate-900" />
                                    <span>{ t( 'Products' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Create button */ }
                    <div>
                        <Link href={ route( 'seller.product.products.create' ) }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><span>{ t( 'Create New' ) }</span> <FaPlus  className='text-sm' /></button>
                        </Link>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 px-6 gap-2">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Products' ) }</h2>
                        </div>
                        {/* Search*/ }
                       {products.data.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                            </label>
                        </div>}
                    </div>
                    <div  className='card-body'>

                        {products.data.length > 0 ?<div >
                            <table  className="table product-table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">{ t( '#' ) }</th>
                                        <th align="left">{ t( 'Name' ) }</th>
                                        <th align="left">{ t( 'Seller' ) }</th>
                                        <th align="left">{ t( 'Info' ) }</th>
                                        <th align="left">{ t( 'Total Stock' ) }</th>
                                        <th align="left">{ t( 'Published' ) }</th>
                                        <th align="left">{ t( 'Featured' ) }</th>
                                        <th align="left">{ t( 'Approval' ) }</th>
                                        <th align="center">{ t( 'Actions' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }

                                    { products.data.map( ( product, i ) => (

                                        <tr key={ i }  className='text-slate-600'>
                                            <td data-label='#' align="left">{ (  i + 1 ) + ( ( products.meta.current_page - 1 ) * ( products.meta.per_page ) ) }</td>
                                            <td data-label='Name' align="left"  className="xl:w-3/12">
                                                <div  className="flex items-center gap-3">
                                                    <div  className="avatar">
                                                        <div  className="mask mask-squircle h-12 w-12">
                                                            <img src={ asset_url(product?.thumbnail_image || placeholder1_1()) } alt={ product?.name } />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div  className="font-bold text-[13px] ">{ product?.name }</div>
                                                        <div  className="font-thin text-[10px] ">
                                                            {/* { product.category?.parent?.parent?.parent?.name + ' >' } */ }
                                                            { product.category?.parent?.parent?.name }
                                                            { '>' }
                                                            { product.category?.parent?.name }
                                                            { '>' }
                                                            { product.category.name }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label='Seller' align="left"  className="text-[13px]">{ product.user.name }</td>
                                            <td data-label='Info' align="left"  className="xl:w-2/12">
                                                <ul>
                                                    <li  className="text-[12px]"><span  className="font-bold">Num of Sale:</span>{ product.num_of_sale } times</li>
                                                    <li  className="text-[12px]"><span  className="font-bold">Base Price:</span> $559.990</li>
                                                    <li  className="text-[12px]"><span  className="font-bold">Rating:</span> { product.rating }</li>
                                                </ul>
                                            </td>
                                            <td data-label='Total Stock' align="left"  className="xl:w-2/12">
                                                <ul> {
                                                    product.variant_product ? product.stocks.map( ( stock, i ) => (
                                                        <li key={ i }  className="flex gap-2">
                                                            { stock.variant } - { stock.qty }
                                                            { stock.qty <= product.low_stock_qty && <div  className="badge badge-error badge-sm text-white">Low</div> }
                                                        </li>
                                                    ) )
                                                        :
                                                        product.stocks.map( ( stock, i ) => (
                                                            <li key={ i }  className="flex gap-2">
                                                                { stock.qty }
                                                                { stock.qty <= product.low_stock_qty && <div  className="badge badge-error badge-sm text-white">Low</div> }
                                                            </li>
                                                        ) )
                                                }
                                                </ul>
                                            </td>
                                            <td data-label='Published' align="left">
                                                <input type="checkbox" onChange={ e => onPublishedStatusChange( product.id, e ) } checked={ product.published }  className="toggle toggle-sm toggle-primary" />
                                            </td>
                                            <td data-label='Featured' align="left">
                                                <input type="checkbox"  onChange={ e => onFeaturedStatusChange( product.id, e ) } checked={ product.featured }  className="toggle toggle-sm toggle-primary" />
                                            </td>
                                            <td data-label='Approved' align="left">
                                                { product.approved ? <span  className="bg-green-500 py-[6px] px-[7px] rounded text-white text-[13px]">Approved</span> : <span  className="bg-orange-500 py-[6px] px-[7px] rounded text-white text-[13px]">Pending</span> }

                                            </td>
                                            <td  className="space-x-2">
                                                <Link href={ route( 'seller.product.product_edit', { lang: 'en', id: window.btoa( product.id ) } ) }>
                                                    <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div>
                                                </Link>

                                                <Link href={ route( 'seller.product.duplicate', product.id ) }>
                                                    <div data-tip={ t( 'Clone' ) }  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-slate-200 hover:bg-slate-800 duration-500 rounded-full">
                                                        <PiCopy  className='text-sm' />
                                                    </div>
                                                </Link>

                                                <Link>
                                                    <div onClick={ e => handleDelete( product.id ) } data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                </Link>
                                            </td>
                                        </tr>
                                    ) ) }

                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {products.meta.from || 0} to {products.meta.to || 0} of {products.meta.total}</p>
                                <Pagination links={products.meta.links} />
                            </div>
                        </div>: <NothingFound title={'Nothing Found!'}/>}
                    </div>
                </div>
            </div>
        </SellerLayout>
    )

}
