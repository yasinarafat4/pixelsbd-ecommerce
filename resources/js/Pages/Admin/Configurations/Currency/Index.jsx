import { decimal_separators, no_of_decimals, symbol_formats } from "@/Array";
import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiCurrencyLine } from "react-icons/ri";
import Select from "react-select";
import Swal from "sweetalert2";

export default function Index({ currencies, active_currencies }) {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [activeCurrency, setActiveCurrency] = useState([])
    const [defaultCurrency, setDefaultCurrency] = useState([])
    const [defaultSymbolFormat, setDefaultSymbolFormat] = useState([])
    const [defaultDecimalSeparator, setDefaultDecimalSeparator] = useState([])
    const [defaultNoOfDecimal, setDefaultNoOfDecimal] = useState([])

    useEffect(() => {
        var options = [];
        active_currencies.forEach(currency => {
            options.push({ value: currency.id, label: currency.name });
        });
        setActiveCurrency(options);

        let selected = options.filter(item => item.value == business_settings.default_currency);
        setDefaultCurrency(selected[0])
    }, [active_currencies]);


    useEffect(() => {
        let default_symbol_format = symbol_formats.filter(item => item.value == business_settings.symbol_format);
        setDefaultSymbolFormat(default_symbol_format[0] ?? { value: '1', label: '[Symbol][Amount]' })

    }, [])

    useEffect(() => {
        let default_decimal_separators = decimal_separators.filter(item => item.value == business_settings.decimal_separator);
        setDefaultDecimalSeparator(default_decimal_separators[0] ?? { value: '1', label: '1,23,456.70' })
    }, [])

    useEffect(() => {
        let default_no_of_decimals = no_of_decimals.filter(item => item.value == business_settings.no_of_decimal);
        setDefaultNoOfDecimal(default_no_of_decimals[0] ?? { value: '3', label: '123.45' })
    }, [])

    function onStatusChange(id, e) {
        router.put(route('admin.configuration.currency.update_status', id), {
            status: e.target.checked,
        })
    }
    // Add New Currency form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        symbol: "",
        code: "",
        exchange_rate: "",
    })

    // Currency foramte submit handler
    function handleSubmit(e) {
        e.preventDefault()
        post(route('admin.configuration.currency.store'),
            {
                onSuccess: () => { reset() }
            })
    }

    // Delete functionality
    const deleteData = (id) => {
        router.delete(route('admin.configuration.currency.destroy', id))
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            }
        });
    }

    // Default Currency submit handler
    function onDefaultCurrencyChange(e) {
        setDefaultCurrency(e);
    }

    function handleDefaultCurrencySubmit(e) {
        e.preventDefault()
        router.post(route('admin.configuration.update'), {
            types: ['default_currency'],
            default_currency: defaultCurrency['value'],
        })
    }

    // Symbol change handler
    function onSymbolChange(e) {
        setDefaultSymbolFormat(e)
    }

    // Decimal separator change handler
    function onDecimalSeparatorChange(e) {
        setDefaultDecimalSeparator(e)
    }

    // No of decimals submit handler
    function onNoOfDecimalsChange(e) {
        setDefaultNoOfDecimal(e)
    }


    // Currency foramte submit handler
    function handleFormateSubmit(e) {
        e.preventDefault()
        router.post(route('admin.configuration.update'), {
            types: ['symbol_format', 'decimal_separator', 'no_of_decimal'],
            symbol_format: defaultSymbolFormat['value'],
            decimal_separator: defaultDecimalSeparator['value'],
            no_of_decimal: defaultNoOfDecimal['value'],
        })

    }



    return (
        <AdminLayout>
            <Head title={"Currency"} />
            <div  className='p-4'>
                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <RiCurrencyLine  className="text-base text-slate-900" />
                                <span>{t('Currency')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div  className='flex items-start gap-5 my-5'>
                    {/* Default Currency */}
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-3 w-7/12'>
                        <div  className="border-b pb-3 px-6">
                            <h2  className="text-[16px] font-medium">{t('System Default Currency')}</h2>
                        </div>
                        <form onSubmit={handleDefaultCurrencySubmit}>
                            <div  className='grid grid-cols-1 items-center gap-4 px-6 py-6'>
                                {/* Select*/}
                                <div  className="flex justify-around gap-6">
                                    <label  className='label-text text-slate-600 text-sm text-start'>{t('Default Currency')}</label>
                                    <Select
                                        name="default_currency"
                                        placeholder={t('Select default currency')}
                                         className="w-80 rounded z-40"
                                        classNamePrefix="react-select"
                                        value={defaultCurrency}
                                        onChange={e => onDefaultCurrencyChange(e)}
                                        options={activeCurrency}
                                    />
                                    <div>
                                        <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded text-white text-md">{t('Save')}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Set Currency Formats */}
                    <div  className='card rounded-lg shadow-none bg-white border-[1px] border-slate-200 py-3 w-5/12'>
                        <div  className="border-b pb-3 px-6">
                            <h2  className="text-[16px] font-medium">{t('Set Currency Formats')}</h2>
                        </div>
                        <form onSubmit={handleFormateSubmit}>
                            <div  className='grid grid-cols-1 items-center gap-4 px-6 py-6'>
                                {/* Select 1 */}
                                <div  className="flex justify-start gap-[59px]">
                                    <label  className='label-text text-slate-600 text-sm text-start'>{t('Symbol Format')}</label>
                                    <Select
                                        name="symbol"
                                        placeholder={t('Select symbol')}
                                         className="w-80 rounded z-40"
                                        classNamePrefix="react-select"
                                        onChange={e => onSymbolChange(e)}
                                        options={symbol_formats}
                                        value={defaultSymbolFormat}
                                    />
                                </div>
                                {/* Select 2 */}
                                <div  className="flex justify-start gap-10">
                                    <label  className='label-text text-slate-600 text-sm text-start'>{t('Decimal Separator')}</label>
                                    <Select
                                        name="decimal_separator"
                                        placeholder={t('Select decimal separator')}
                                         className="w-80 rounded z-30"
                                        classNamePrefix="react-select"
                                        onChange={e => onDecimalSeparatorChange(e)}
                                        options={decimal_separators}
                                        value={defaultDecimalSeparator}
                                    />
                                </div>
                                {/* Select 3 */}
                                <div  className="flex justify-start gap-[60px]">
                                    <label  className='label-text text-slate-600 text-sm text-start'>{t('No of decimals')}</label>
                                    <Select
                                        name="no_of_decimals"
                                        placeholder={t('Select No of decimals')}
                                         className="w-80 rounded z-20"
                                        classNamePrefix="react-select"
                                        onChange={e => onNoOfDecimalsChange(e)}
                                        options={no_of_decimals}
                                        value={defaultNoOfDecimal}
                                    />
                                </div>
                            </div>
                            <div  className="flex justify-end mx-4">
                                <button type="submit"  className="bg-[#008FE1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Save')}</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div  className="flex items-start gap-5">
                    {/* All Currencies */}
                    <div  className='w-7/12 card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                        <div  className="flex items-center justify-between border-b pb-3 px-6">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{t('All Currencies')}</h2>
                            </div>
                            {/* Search*/}
                            {currencies.length > 0 && <div>
                                <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                    <IoIosSearch  className="text-xl text-slate-600" />
                                    <input autoFocus={true} name='search' type="text"  className="grow" placeholder={t('search')} />
                                </label>
                            </div>}
                        </div>
                        <div  className='card-body'>

                            {currencies.length > 0 ? <div  className="">
                                <table  className="table">
                                    {/* head */}
                                    <thead>
                                        <tr  className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{t('Currency name')}</th>
                                            <th align="left">{t('Currency symbol')}</th>
                                            <th align="left">{t('Currency code')}</th>
                                            <th align="left">{t('Exchange rate(1 USD = ?)')}</th>
                                            <th align="left">{t('Status')}</th>
                                            <th align="center">{t('Actions')}</th>
                                        </tr >
                                    </thead >
                                    <tbody>
                                        {/* row */}
                                        {currencies && currencies.map((currency, i) => (


                                            <tr key={i}  className='text-slate-600'>
                                                <td align="text-sm left">{i + 1}</td>
                                                <td align="text-sm left">{currency.name}</td>
                                                <td align="text-sm left">{currency.symbol}</td>
                                                <td align="text-sm left">{currency.code}</td>
                                                <td align="text-sm left">{currency.exchange_rate}</td>
                                                <td align="text-sm center">
                                                    <input type="checkbox" onChange={(e) => onStatusChange(currency.id, e)} checked={currency.status}  className="toggle toggle-sm toggle-success" />
                                                </td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={route('admin.configuration.currency.edit', currency.id)}>  <div data-tip={t('edit')}  className="tooltip cursor-pointer p-[10px] text-slate-600 hover:text-slate-200 bg-sky-100 hover:bg-sky-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                    <Link><div onClick={() => handleDelete(currency.id)} data-tip={t('delete')}  className="tooltip cursor-pointer p-[10px] text-red-600 hover:text-slate-200 bg-red-100 hover:bg-red-600 duration-500 rounded-full">
                                                        <FaRegTrashAlt  className='text-sm' />
                                                    </div></Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table >
                                {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {homeFAQs.from || 0} to {homeFAQs.to || 0} of {homeFAQs.total}</p>
                                <Pagination links={homeFAQs.links} />
                            </div> */}
                            </div > : <NothingFound title={"Nothing Found!"} />}
                        </div >
                    </div >
                    {/* Add New Currency */}
                    < div  className='w-5/12 card rounded-lg shadow bg-white border-[1px] border-slate-200' >
                        <div  className="flex items-center justify-start border-b py-3 px-4">
                            <div>
                                <h2  className="text-lg font-medium text-slate-600">{t('Add New Currency')}</h2>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}  className="space-y-3 py-4 px-4">
                            {/* Name */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter currency name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            {/* Symbol */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="symbol">Symbol</label>
                                <input onChange={e => setData('symbol', e.target.value)} value={data.symbol} name='symbol' id='symbol' type="text" placeholder={t('Enter currency symbol')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.symbol && <div  className="text-red-500 text-sm mt-1">{errors.symbol}</div>}
                            </div>
                            {/* Code */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="code">Code</label>
                                <input onChange={e => setData('code', e.target.value)} value={data.code} name='code' id='code' type="text" placeholder={t('Enter currency code')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.code && <div  className="text-red-500 text-sm mt-1">{errors.code}</div>}
                            </div>
                            {/* Exchange rate */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="exchange_rate">Exchange Rate</label>
                                <input onChange={e => setData('exchange_rate', e.target.value)} value={data.exchange_rate} name='exchange_rate' id='exchange_rate' type="text" placeholder={t('Enter currency exchange rate')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.exchange_rate && <div  className="text-red-500 text-sm mt-1">{errors.exchange_rate}</div>}
                            </div>
                            <div  className="flex justify-end">
                                <button type="submit"  className="bg-[#008fe1] duration-300 py-2 px-4 rounded-md text-white text-md">{t('Add Currency')}</button>
                            </div>
                        </form>

                    </div >
                </div >

            </div >
        </AdminLayout >
    )

}
