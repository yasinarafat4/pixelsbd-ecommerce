import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaCity, FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Index ( { cities, states } )
{
    const { t } = useLaravelReactI18n();
    let queryParams = usePage().props.ziggy.query;

    const [ selectedState, setSelectedState ] = useState( [] );
    const [ search, setSearch ] = useState( queryParams.search ?? '' );


    // Add New Currency form
    const { data, setData, post, processing, errors, reset } = useForm( {
        search: queryParams.search,
        state: queryParams.state,
        page: queryParams.page,
        name: "",
        state_id: "",
        cost: "",
    } )

    // Currency foramte submit handler
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'admin.configuration.shipping.city.store' ),
            {
                onSuccess: () => { reset() }
            } )
    }

    useEffect( () =>
    {
        let selected = [];
        let filter = states.filter( ( state ) => state.name == queryParams.state )
        filter.map( ( item ) =>
        {
            selected.push( { value: item.id, label: item.name } )
        } )
        setSelectedState( selected[ 0 ] )
        setData( 'state_id', selected[ 0 ]?.value )
    }, [] )

    function OnCityStatusChange ( e, id )
    {
        router.put( route( 'admin.configuration.shipping.city.status', id ), {
            status: e.target.checked,
        } )
    }

    // State change handler
    function OnStateChange ( e )
    {
        setSelectedState( e );
        setData( 'state_id', e.value )
    }

    function OnFilterClick ()
    {
        router.visit( route( 'admin.configuration.shipping.city.index' ), {
            data: {
                search: search,
                state: selectedState.label
            }
        } )

    }

    // Delete functionality
    const deleteData = ( id ) =>
    {
        router.delete( route( 'admin.configuration.shipping.city.destroy', id ) )
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
            <Head title={ "Shipping Cities" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <Link href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span >{ t( 'Dashboard' ) }</span>
                                </Link>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaCity  className="text-base text-slate-900" />
                                    <span>{ t( 'Cities' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*  */ }
                <div  className="flex items-start gap-2">
                    {/* All Currencies */ }
                    <div  className='w-8/12 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="grid grid-cols-12 border-b pb-3 px-6 gap-3">
                            <div  className="col-span-2">
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'All Cities' ) }</h2>
                            </div>
                            {/* Search and Filter*/ }
                            { cities.data.length > 0 && <div  className="w-full col-span-4">
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={ true } onChange={ e => setSearch( e.target.value ) } value={ search } name='search' type="text"  className="grow w-full" placeholder={ t( 'search' ) } />
                                </label>
                            </div> }
                            { cities.data.length > 0 && <div  className="flex items-center gap-1 w-full col-span-6">
                                <Select
                                    name="state"
                                    placeholder={ t( ' Select State' ) }
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={ e => OnStateChange( e ) }
                                    value={ selectedState }
                                    options={ states.map( state => ( { value: state.id, label: state.name } ) ) }
                                />

                                <div  className="flex justify-end">
                                    <button type="submit" onClick={ ( e ) => OnFilterClick() }  className="bg-[#008fe1] duration-300 py-3 px-5 rounded text-white text-[14px]">{ t( 'Filter' ) }</button>
                                </div>
                            </div> }
                        </div>

                        <div  className='card-body'>
                            { cities.data.length > 0 ? <div>
                                <table  className="table">
                                    {/* head */ }
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{ t( 'Name' ) }</th>
                                            <th align="left">{ t( 'State' ) }</th>
                                            <th align="left">{ t( 'Area Wise Shipping Cost' ) }</th>
                                            <th align="left">{ t( 'Status' ) }</th>
                                            <th align="right">{ t( 'Options' ) }</th>
                                        </tr >
                                    </thead >
                                    <tbody>
                                        {/* row */ }
                                        { cities.data.map( ( city, i ) => (
                                            <tr key={ i }  className='text-slate-600 border-b'>
                                                <td align="text-sm left">{ ( i + 1 ) + ( ( cities.current_page - 1 ) * ( cities.per_page ) ) }</td>
                                                <td align="text-sm left">{ city.name }</td>
                                                <td align="text-sm left">{ city.state.name }</td>
                                                <td align="text-sm left">{ city.cost }</td>
                                                <td align="text-sm center">
                                                    <input type="checkbox" onChange={ ( e ) => OnCityStatusChange( e, city.id ) } checked={ city.status == 1 }  className="toggle toggle-sm toggle-success" />
                                                </td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.configuration.shipping.city.edit', city.id ) } method="get" data={ queryParams }>  <div data-tip={ t( 'edit' ) }  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link><div onClick={ e => handleDelete( city.id ) } data-tip={ t( 'delete' ) }  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div></Link>
                                                </td>
                                            </tr>
                                        ) ) }
                                    </tbody>
                                </table >
                                <div  className="m-4">
                                    <p  className='text-slate-600 text-sm'>Showing { cities.from || 0 } to { cities.to || 0 } of { cities.total }</p>
                                    <div  className="flex flex-col items-end">
                                        <Pagination links={ cities.links } />
                                    </div>
                                </div>
                            </div > : <NothingFound title={ "Nothing Found!" } /> }
                        </div >
                    </div>

                    {/* Add New City */ }
                    < div  className='w-4/12 card rounded-lg shadow bg-white border-[1px] border-slate-200' >
                        <div  className="flex items-center justify-start border-b py-3 px-4">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{ t( 'Add New City' ) }</h2>
                            </div>
                        </div>

                        <form onSubmit={ handleSubmit }  className="space-y-3 py-4 px-4">
                            {/* Name */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                                <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( 'Enter city name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                            </div>
                            {/* Select State */ }
                            <div  className="flex flex-col">
                                <label  className='label-text text-slate-600 text-sm'>{ t( 'State' ) }</label>
                                <Select
                                    name="state"
                                    placeholder={ t( 'Select State' ) }
                                     className="w-full rounded z-40"
                                    classNamePrefix="react-select"
                                    onChange={ e => OnStateChange( e ) }
                                    value={ selectedState }
                                    options={ states.map( state => ( { value: state.id, label: state.name } ) ) }
                                />
                                { errors.state_id && <div  className="text-red-500 text-sm mt-1">Select state</div> }
                            </div>
                            {/* cost */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="cost">{ t( 'Shipping Cost' ) }</label>
                                <input onChange={ e => setData( 'cost', e.target.value ) } value={ data.cost } name='cost' id='cost' type="text" placeholder={ t( 'Enter shipping Cost' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.cost && <div  className="text-red-500 text-sm mt-1">{ errors.cost }</div> }
                            </div>
                            <div  className="flex justify-end">
                                <button type="submit"  className="bg-[#008fe1] duration-300 py-2 px-4 rounded-md text-white text-md">{ t( 'Save' ) }</button>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
            {/*  */ }
        </AdminLayout>
    )

}
