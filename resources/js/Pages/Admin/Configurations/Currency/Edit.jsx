import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiCurrencyLine } from "react-icons/ri";

export default function Edit ( { currency } )
{
    const { t } = useLaravelReactI18n();

    // Edit Currency form
    const { data, setData, put, processing, errors, reset } = useForm( {
        name: currency.name,
        symbol: currency.symbol,
        code: currency.code,
        exchange_rate: currency.exchange_rate,
    } )

    // Currency foramte submit handler
    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.configuration.currency.update', currency.id ) )
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
                                <a href={ route( 'admin.configuration.currency.index' ) }  className="inline-flex gap-1 items-center">
                                    <RiCurrencyLine  className="text-base" />
                                    <span>Currency</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className='text-sm' />
                                    <span>{ t( 'edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 max-w-4xl mx-auto'>
                    <div  className="flex items-center justify-start border-b py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">Edit Currency</h2>
                        </div>
                    </div>

                    <form onSubmit={ handleSubmit }  className="space-y-3 py-5 px-7">
                        {/* Name */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="name">{ t( 'Name' ) }</label>
                            <input onChange={ e => setData( 'name', e.target.value ) } value={ data.name } name='name' id='name' type="text" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                        </div>
                        {/* Symbol */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="symbol">Symbol</label>
                            <input onChange={ e => setData( 'symbol', e.target.value ) } value={ data.symbol } name='symbol' id='symbol' type="text" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            { errors.symbol && <div  className="text-red-500 text-sm mt-1">{ errors.symbol }</div> }
                        </div>
                        {/* Code */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="code">Code</label>
                            <input onChange={ e => setData( 'code', e.target.value ) } value={ data.code } name='code' id='code' type="text" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            { errors.code && <div  className="text-red-500 text-sm mt-1">{ errors.code }</div> }
                        </div>
                        {/* Exchange rate */ }
                        <div>
                            <label  className='label-text text-slate-600 text-sm' htmlFor="exchange_rate">Exchange Rate</label>
                            <input onChange={ e => setData( 'exchange_rate', e.target.value ) } value={ data.exchange_rate } name='exchange_rate' id='exchange_rate' type="text" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                            { errors.exchange_rate && <div  className="text-red-500 text-sm mt-1">{ errors.exchange_rate }</div> }
                        </div>
                        <div  className="flex justify-end">
                            <button type="submit"  className="bg-[#008fe1] duration-300 py-2 px-4 rounded-md text-white text-md">Update Currency</button>
                        </div>
                    </form>

                </div>
            </div>
        </AdminLayout>
    )

}
