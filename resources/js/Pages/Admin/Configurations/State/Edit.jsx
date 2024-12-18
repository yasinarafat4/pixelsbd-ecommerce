import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaHouseFlag } from "react-icons/fa6";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from "react-select";

export default function Edit ( { countries, state } )
{
    const { t } = useLaravelReactI18n();

    let queryParams = usePage().props.ziggy.query;

    const [ selectedCountry, setSelectedCountry ] = useState( [] );

    // Edit form
    const { data, setData, put, processing, errors, reset } = useForm( {
        search: queryParams.search,
        country: queryParams.country,
        page: queryParams.page,
        name: state.name,
        country_id: state.country_id,
    } )

    useEffect( () =>
    {
        let selected = [];
        let filter = countries.filter( ( country ) => country.name == state.country.name )
        filter.map( ( item ) =>
        {
            selected.push( { value: item.id, label: item.name } )
        } )
        setSelectedCountry( selected[ 0 ] )

    }, [] )

    // Country change handler
    function OnCountryChange ( e )
    {
        setSelectedCountry( e );
        setData( 'country_id', e.value )
    }

    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.configuration.shipping.state.update', state.id ) )
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
                                <Link href={ route( 'admin.configuration.shipping.state.index' ) }  className="inline-flex gap-1 items-center">
                                    <FaHouseFlag  className="text-base" />
                                    <span>States</span>
                                </Link>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className="text-base text-slate-900" />
                                    <span>{ t( 'Edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link  onClick={e=> window.history.back()} method="get" data={ queryParams }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">Update State</h2>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'enter_name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Select Country */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'Country' ) }</label>
                                <Select
                                    name="country"
                                    placeholder={ t( 'Select Country' ) }
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={ OnCountryChange }
                                    value={ selectedCountry }
                                    options={ countries.map( state => ( { value: state.id, label: state.name } ) ) }
                                />
                            </div>

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
