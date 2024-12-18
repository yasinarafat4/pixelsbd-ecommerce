/* eslint-disable */

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbSettingsUp } from "react-icons/tb";
import useGeoLocation from "react-ipgeolocation";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function HeaderSetting ()
{

    const { t } = useLaravelReactI18n();
    const { lang, business_settings, active_languages } = usePage().props

    const location = useGeoLocation();

    const [ headerMenu, setHeaderMenu ] = useState( business_settings.header_menu ?? [] );


    const [ showLanguageSwitcher, setShowLanguageSwitcher ] = useState( business_settings.show_language_switcher );
    const [ showCurrencySwitcher, setShowCurrencySwitcher ] = useState( business_settings.show_currency_switcher );
    const [ stikcyHeader, setStikcyHeader ] = useState( business_settings.sticky_header );
    const [ helpLineNumber, setHelpLineNumber ] = useState();

    useEffect( () =>
    {
        setTimeout( () =>
        {
            setHelpLineNumber( business_settings.help_line_number );
        }, 1000 );
    }, [] );

    // Dynamic add inputs
    const handleAddInput = () =>
    {
        setHeaderMenu( [ ...headerMenu, { label: "", link: "" } ] );
    };


    const handleInputChange = ( event, index ) =>
    {
        let { name, value } = event.target;
        let onChangeValue = [ ...headerMenu ];
        onChangeValue[ index ][ name ] = value;
        setHeaderMenu( onChangeValue );
    };

    const handleDeleteInput = ( index ) =>
    {
        const newArray = [ ...headerMenu ];
        newArray.splice( index, 1 );
        setHeaderMenu( newArray );
    };

    function updateHeader ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'show_language_switcher', 'show_currency_switcher', 'sticky_header', 'help_line_number', 'header_menu' ],
            show_language_switcher: showLanguageSwitcher,
            show_currency_switcher: showCurrencySwitcher,
            sticky_header: stikcyHeader,
            help_line_number: helpLineNumber,
            header_menu: headerMenu,
        }, { preserveScroll: true } )

    }


    return (
        <AdminLayout>
            <Head title="Appearence" />
            <div  className="bg-[#FEFEFE] ps-5 py-6">
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
                                <TbSettingsUp  className="text-base text-slate-900" />
                                <span>{ t( 'Header Setting' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div  className="my-6">
                    {/* Tabs */ }
                    <div  className={ active_languages.length < 7 ? `w-9/12 mx-auto grid grid-cols-${ active_languages.length }` : "w-9/12 mx-auto grid grid-cols-7" }>
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.website.header_setting', language.code ) }  className={ lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500' }><span  className="text-sm"> { language.name }</span></a>
                            ) )
                        }
                    </div>
                    {/* Header Setting */ }
                    <div  className='card z-10 rounded-t rounded-b-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Header Setting' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Show Language Switcher */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="show_language_switcher">{ t( 'Show Language Switcher?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setShowLanguageSwitcher( e.target.checked ) } checked={ showLanguageSwitcher }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>
                            {/* Show Currency Switcher */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="show_currency_switcher">{ t( 'Show Currency Switcher?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setShowCurrencySwitcher( e.target.checked ) } checked={ showCurrencySwitcher }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>
                            {/* Enable Stikcy Header? */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="sticky_header">{ t( 'Enable stikcy header?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setStikcyHeader( e.target.checked ) } checked={ stikcyHeader }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>
                            <hr />
                            {/* Help line number */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="help_line_number">{ t( 'Help line number' ) }</label>
                                <div  className="col-span-8">
                                    <PhoneInput
                                        inputClass="w-full p-[13px] focus:outline-none !border-[1px] !border-slate-200 block text-slate-600 rounded-lg text-sm"
                                        dropdownClass="!z-50"
                                        masks={ { bd: '....-......' } }
                                        enableSearch
                                        country={ location.country?.toLowerCase() }
                                        value={ helpLineNumber }
                                        onChange={ e => setHelpLineNumber( e ) }
                                    />
                                </div>
                            </div>




                            <hr />
                            <div>
                                <h2  className="text-[14px] text-start font-medium">Header Nav Menu</h2>
                                {/* Dynamic add inputs body*/ }
                                <div  className="container">
                                    { headerMenu.map( ( item, index ) => (
                                        <div  className="input_container" key={ index }>
                                            <input
                                                name="label"
                                                placeholder="Label"
                                                type="text"
                                                 className="w-full text-sm rounded-md border bg-white text-slate-600 border-slate-300 focus:outline-none px-4 py-2"
                                                value={ item.label }
                                                onChange={ ( event ) => handleInputChange( event, index ) }
                                            />
                                            <input
                                                name="link"
                                                type="text"
                                                placeholder="Link with http:// Or https://"
                                                 className="w-full text-sm rounded-md border bg-white text-slate-600 border-slate-300 focus:outline-none px-4 py-2"
                                                value={ item.link }
                                                onChange={ ( event ) => handleInputChange( event, index ) }
                                            />
                                            <button  className="border p-3 rounded-full bg-red-100 hover:bg-red-600 text-red-600 hover:text-white duration-300" onClick={ e => handleDeleteInput( index ) }><RxCross2  className="text-base" /></button>
                                        </div>
                                    ) ) }
                                    <button  className="mt-2 py-3 px-4 text-sm font-medium rounded bg-slate-100 hover:bg-[#A7AAB7] hover:text-white duration-300 w-28" onClick={ e => handleAddInput() }>Add New</button>
                                </div>
                            </div>

                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateHeader() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
