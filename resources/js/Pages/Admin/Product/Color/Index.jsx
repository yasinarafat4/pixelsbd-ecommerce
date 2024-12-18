import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MuiColorInput } from "mui-color-input";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosColorPalette, IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index ( { colors } )
{
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",
        color_code: "",
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.product.color.store' ), {
            onFinish: () =>
            {
                reset();
            }
        } )
    }

    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.product.color.destroy', id ) )
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
            <Head title={ "Color" } />
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
                                    <IoIosColorPalette  className="text-base text-slate-900" />
                                    <span>{ t( 'color' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-12 gap-4">
                    {/* Color Table */ }
                    <div  className='col-span-7 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'Color' ) }</h2>
                            </div>
                            {/* Search*/ }
                            { colors.data.length > 0 && <div>
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                                </label>
                            </div> }
                        </div>
                        <div  className='card-body'>
                            { colors.data.length > 0 ? <div>
                                <table  className="table">
                                    {/* head */ }
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="center">{ t( 'Name' ) }</th>
                                            <th align="center">{ t( 'Code' ) }</th>
                                            <th align="right">{ t( 'Actions' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */ }

                                        { colors.data.map( ( color, i ) => (
                                            <tr key={ i }  className='text-slate-600'>
                                                <td align="left">{ ( i + 1 ) + ( ( colors.current_page - 1 ) * ( colors.per_page ) ) }</td>
                                                <td align="center">{ color.name }</td>
                                                <td align="center">
                                                    <div  className="flex items-center justify-start gap-1">
                                                        <div style={ { backgroundColor: color.color_code } }  className="h-4 w-4 rounded border"></div>
                                                        <div>{ color.color_code }</div>
                                                    </div>
                                                </td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.product.color.edit', color.id ) }> <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link onClick={ e => handleDelete( color.id ) }>
                                                        <div data-tip={ t( 'Delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                            <FaRegTrashAlt  className='text-sm' />
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table>
                                <div  className="flex justify-between items-center mt-2">
                                    <p  className='text-slate-600 text-sm'>Showing { colors.from || 0 } to { colors.to || 0 } of { colors.total }</p>
                                    <Pagination links={ colors.links } />
                                </div>
                            </div> : <NothingFound title={ 'Nothing Found!' } /> }
                        </div>
                    </div>
                    {/* Color Create */ }
                    <div  className='col-span-5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 w-full mx-auto'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'Add Color' ) }</h2>
                            </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                            <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* name */ }
                                <div>
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                    <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } required name='name' id='name' type="text" placeholder={ t( 'Enter Color Name' ) }  className="p-[12px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                    { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                                </div>
                                {/* Color Code */ }
                                <div  className="flex flex-col items-start">
                                    <label  className="block text-sm font-medium text-slate-700">{ t( 'Color Code' ) }</label>
                                    <MuiColorInput size="small" format="hex" isAlphaHidden value={ data.color_code } onChange={ e => setData( 'color_code', e ) } required placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                                </div>
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Add Color' ) }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
