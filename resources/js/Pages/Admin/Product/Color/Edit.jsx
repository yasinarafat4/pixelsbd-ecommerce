import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MuiColorInput } from "mui-color-input";
import { BiSolidEdit } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit ( { color } )
{
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: color.name,
        color_code: color.color_code,
    } )

    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.product.color.update', color ) )
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
                                <a href={ route( 'admin.product.color.index' ) }  className="inline-flex gap-1 items-center">
                                    <IoIosColorPalette  className="text-base" />
                                    <span>{ t( 'color' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className='text-sm' />
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Edit Color' ) }</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter Color Name' ) }  className="p-[12px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Color Code */ }
                            <div  className="flex flex-col items-start">
                                <label  className="block text-sm font-medium text-slate-700">{ t( 'Color Code' ) }</label>
                                <MuiColorInput size="small" format="hex" isAlphaHidden value={ data.color_code } onChange={ e => setData( 'color_code', e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded text-sm" />
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update Color' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
