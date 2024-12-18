import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function Edit ( { blogCategory } )
{
    const { t } = useLaravelReactI18n();

    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: blogCategory.name,
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.blog.blogcategory.update', blogCategory ) )
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
                                <a href={ route( 'admin.blog.blogcategory.index' ) }  className="inline-flex gap-1 items-center">
                                    <CiBoxList  className="text-base" />
                                    <span>{ t( 'Blog Categories' ) }</span>
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
                    <>
                        <Link onClick={ e => window.history.back() }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </>
                </div>

                <div  className='col-span-5 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 h-60 max-w-3xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Edit Blog Category' ) }</h2>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* name */ }
                            <>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Category Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
