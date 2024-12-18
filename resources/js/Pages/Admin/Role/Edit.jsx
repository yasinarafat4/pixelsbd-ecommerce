import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

export default function Edit ( { role, permissions, selectedPermissions } )
{

    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: role.name,
        permission: selectedPermissions,
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.staff.role.update', role ) )
    }

    function handleChange ( permission )
    {
        const isCheck = data?.permission?.some( check => check === permission.name )
        if ( isCheck )
        {
            setData( 'permission', data.permission.filter( ( check ) => check !== permission.name ) )
        } else
        {
            setData( 'permission', data.permission.concat( permission.name ) )
        }
    }

    return (
        <AdminLayout>
            <Head title={ "Edit" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.staff.role.index' ) }  className="inline-flex gap-1 items-center">
                                    <RiUserSettingsLine  className="text-sm" />
                                    <span>{ t( 'Role' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className="text-sm text-slate-900" />
                                    <span>{ t( 'Edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link onClick={ e => window.history.back() }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 px-4 max-w-5xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Edit Role' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 py-6'>
                            {/* name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'enter_name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                        </div>
                        <div>
                            <label  className='label-text text-base text-slate-600'>{ t( 'Select Permission' ) }</label>
                            <div  className='grid grid-cols-4 gap-2'>
                                { permissions.map( ( permission, index ) => (
                                    <div key={ index }  className='flex items-center gap-1 rounded-md hover:shadow-xl duration-500 border border-slate-400 px-2 py-1'>
                                        <input  className='cursor-pointer checkbox' value={ permission.id } onChange={ () => handleChange( permission ) } type="checkbox" name={ permission.name } id={ permission.id } checked={ data?.permission?.some( check => check === permission.name ) }
                                        />
                                        <label  className='cursor-pointer text-[15px]' htmlFor={ permission.id }>{ permission.name }</label>
                                    </div>
                                ) ) }
                            </div>
                        </div>

                        <div  className="flex justify-end mt-5">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
