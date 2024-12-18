import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, router, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Index ( { permissions } )
{
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",

    } )
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.staff.permission.store' ), {
            onSuccess: () => [ toast.success( 'Permission created!' ),
            reset()
            ],
        } )
    }

    // Delete functionality
    const deleteData = ( permission ) =>
    {
        router.delete( route( 'admin.staff.permission.destroy', permission ) )
    }

    const handleDelete = ( permission ) =>
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
                deleteData( permission )
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
                                    <RiShieldKeyholeFill  className="text-base text-slate-900" />
                                    <span>Permission</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="flex flex-row gap-4">
                    {/* Permission Table */ }
                    <div  className='basis-2/4 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">Permission</h2>
                            </div>
                            {/* Search*/ }
                            <div>
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                                </label>
                            </div>
                        </div>
                        <div  className='card-body'>
                            <div >
                                <table  className="table">
                                    {/* head */ }
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="center">{ t( 'Name' ) }</th>
                                            <th align="right">{ t( 'Actions' ) }</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */ }
                                        { permissions.map( ( permission, index ) => (
                                            <tr key={ index }  className='text-slate-600'>
                                                <td align="left">{ index + 1 }</td>
                                                <td align="center">{ permission.name }</td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.staff.permission.edit', permission ) }> <div data-tip={ t( 'Edit' ) }  className="tooltip p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full ">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div>
                                                    </Link>

                                                    <Link><div onClick={ () => handleDelete( permission ) } data-tip={ t( 'Delete' ) }  className="tooltip p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table>
                                {/* <div  className="flex justify-between items-center mt-2">
    <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
    <Pagination links={homeFAQs.links} />
</div> */}
                            </div>
                        </div>
                    </div>
                    {/* Create Permission */ }
                    <div  className='basis-2/4 card h-56 rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 w-full mx-auto'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">Create Permission</h2>
                            </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                            {/* name */ }
                            <div  className="p-4">
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( "Type here" ) }  className="p-[12px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Create' ) }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
