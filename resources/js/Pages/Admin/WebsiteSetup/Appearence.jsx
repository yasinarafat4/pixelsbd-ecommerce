import { timezones } from "@/Array";
import UploadModal from "@/Components/UploadModals/UploadModal";
import Wysiwyg from "@/Components/Wysiwyg";
import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { TbDeviceDesktopCog } from "react-icons/tb";
import Select from "react-select";

export default function Appearence ()
{

    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [ siteIcon, setSiteIcon ] = useState( business_settings.site_icon != "" ? business_settings.site_icon : null );
    const [ siteLogo, setSiteLogo ] = useState( business_settings.site_logo != "" ? business_settings.site_logo : null );
    const [ mobileLogo, setMobileLogo ] = useState( business_settings.mobile_logo != "" ? business_settings.mobile_logo : null );
    const [ dashboardLogo, setDashboardLogo ] = useState( business_settings.dashboard_logo != "" ? business_settings.dashboard_logo : null );
    const [ metaImage, setMetaImage ] = useState( business_settings.meta_image != "" ? business_settings.meta_image : null );

    const [ adminLoginImage, setAdminLoginImage ] = useState( business_settings.admin_login_image );
    const [ sellerLoginImage, setSellerLoginImage ] = useState( business_settings.seller_login_image );
    const [ sellerRegisterImage, setSellerRegisterImage ] = useState( business_settings.seller_register_image );
    const [ customerLoginImage, setCustomerLoginImage ] = useState( business_settings.customer_login_image );
    const [ customerRegisterImage, setCustomerRegisterImage ] = useState( business_settings.customer_register_image );
    const [ forgotPasswordImage, setForgotPasswordImage ] = useState( business_settings.forgot_password_image );
    const [ resetPasswordImage, setResetPasswordImage ] = useState( business_settings.reset_password_image );


    const [ websiteName, setWebsiteName ] = useState( business_settings.website_name )
    const [ shortName, setShortName ] = useState( business_settings.short_name )
    const [ primaryColor, setPrimaryColor ] = useState( business_settings.primary_color )
    const [ primaryHoverColor, setPrimaryHoverColor ] = useState( business_settings.primary_hover_color )
    const [ secondaryColor, setSecondaryColor ] = useState( business_settings.secondary_color )
    const [ secondaryHoverColor, setSecondaryHoverColor ] = useState( business_settings.secondary_hover_color )
    const [ metaTitle, setMetaTitle ] = useState( business_settings.meta_title )
    const [ metaDescription, setMetaDescription ] = useState( business_settings.meta_description )
    const [ showCookieAgreement, setShowCookieAgreement ] = useState( business_settings.show_cookies_agreement )
    const [ cookieAgreementText, setCookieAgreementText ] = useState( business_settings.cookies_agreement_text )
    const [ showWebsitePopup, setShowWebsitePopup ] = useState( business_settings.show_website_popup )
    const [ websitePopupContent, setWebsitePopupContent ] = useState( business_settings.website_popup_content )
    const [ showSubscribeForm, setShowSubscribeForm ] = useState( business_settings.show_subscribe_form )
    const [ headerScript, setHeaderScript ] = useState( business_settings.header_script )
    const [ footerScript, setFooterScript ] = useState( business_settings.footer_script )
    const [ allTimezones, setAllTimezones ] = useState( [] )
    const [ selectedTimezone, setSelectedTimezone ] = useState( { value: "UTC", label: "UTC" } )
    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    useEffect( () =>
    {
        var options = [];
        timezones.forEach( timezone =>
        {
            options.push( { value: timezone.zone, label: timezone.zone } );
        } );
        setAllTimezones( options );

        let selected = options.find( item => item.value == business_settings.timezone );
        setSelectedTimezone( selected )
    }, [] );


    // Timezone handler
    function onTimezoneChange ( e )
    {
        setSelectedTimezone( e );
        // setDefaultTimezone( e );
    }

    // Cookies agreement text handler
    const onCookiesAgreementTextChange = ( html ) =>
    {
        setCookieAgreementText( html )
    }
    // Popup content handler
    const onPopupContentChange = ( html ) =>
    {
        setWebsitePopupContent( html )
    }


    function updateSystemSettings ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'website_name', 'short_name', 'site_icon', 'site_logo', 'mobile_logo', 'dashboard_logo', 'timezone' ],
            website_name: websiteName,
            short_name: shortName,
            site_icon: siteIcon,
            site_logo: siteLogo,
            mobile_logo: mobileLogo,
            dashboard_logo: dashboardLogo,
            timezone: selectedTimezone[ 'value' ]
        }, { preserveScroll: true } )
    }

    function updateGeneralSettings ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'primary_color', 'primary_hover_color', 'secondary_color', 'secondary_hover_color' ],
            primary_color: primaryColor,
            primary_hover_color: primaryHoverColor,
            secondary_color: secondaryColor,
            secondary_hover_color: secondaryHoverColor
        }, { preserveScroll: true } )
    }


    function updateAuthenticationPageImages ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'admin_login_image', 'seller_login_image', 'seller_register_image', 'customer_login_image', 'customer_register_image', 'forgot_password_image', 'reset_password_image' ],
            admin_login_image: adminLoginImage,
            seller_login_image: sellerLoginImage,
            seller_register_image: sellerRegisterImage,
            customer_login_image: customerLoginImage,
            customer_register_image: customerRegisterImage,
            forgot_password_image: forgotPasswordImage,
            reset_password_image: resetPasswordImage,
        }, { preserveScroll: true } )
    }


    function updateGlobalSEO ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'meta_title', 'meta_description', 'meta_image' ],
            meta_title: metaTitle,
            meta_description: metaDescription,
            meta_image: metaImage
        }, { preserveScroll: true } )
    }

    function updateCookiesAgreement ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'show_cookies_agreement', 'cookies_agreement_text' ],
            show_cookies_agreement: showCookieAgreement,
            cookies_agreement_text: cookieAgreementText
        }, { preserveScroll: true } )
    }

    function updateWebsitePopup ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'show_website_popup', 'website_popup_content', 'show_subscribe_form' ],
            show_website_popup: showWebsitePopup,
            website_popup_content: websitePopupContent,
            show_subscribe_form: showSubscribeForm
        }, { preserveScroll: true } )
    }

    function updateCustomScript ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'header_script', 'footer_script' ],
            header_script: headerScript,
            footer_script: footerScript
        }, { preserveScroll: true } )
    }

    // Modal
    function onAddFile ( v )
    {

        if ( type == 'site_icon' )
        {
            setSiteIcon( v[ 0 ] );
        }
        else if ( type == 'site_logo' )
        {
            setSiteLogo( v[ 0 ] );
        }
        else if ( type == 'mobile_logo' )
        {
            setMobileLogo( v[ 0 ] );
        }
        else if ( type == 'dashboard_logo' )
        {
            setDashboardLogo( v[ 0 ] );
        }
        else if ( type == 'admin_login_image' )
        {
            setAdminLoginImage( v[ 0 ] );
        }
        else if ( type == 'seller_login_image' )
        {
            setSellerLoginImage( v[ 0 ] );
        }
        else if ( type == 'seller_register_image' )
        {
            setSellerRegisterImage( v[ 0 ] );
        }
        else if ( type == 'customer_login_image' )
        {
            setCustomerLoginImage( v[ 0 ] );
        }
        else if ( type == 'customer_register_image' )
        {
            setCustomerRegisterImage( v[ 0 ] );
        }
        else if ( type == 'forgot_password_image' )
        {
            setForgotPasswordImage( v[ 0 ] );
        }
        else if ( type == 'reset_password_image' )
        {
            setResetPasswordImage( v[ 0 ] );
        }
        else
        {
            setMetaImage( v[ 0 ] );
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        setSelectedImg( [] );
        if ( index == 'site_icon' && siteIcon != null )
        {
            setSelectedImg( [ siteIcon ] )
        }
        else if ( index == 'site_logo' && siteLogo != null )
        {
            setSelectedImg( [ siteLogo ] )
        }
        else if ( index == 'mobile_logo' && mobileLogo != null )
        {
            setSelectedImg( [ mobileLogo ] )
        }
        else if ( index == 'dashboard_logo' && dashboardLogo != null )
        {
            setSelectedImg( [ dashboardLogo ] )
        }
        else if ( index == 'admin_login_image' && adminLoginImage != null )
        {
            setSelectedImg( [ adminLoginImage ] )
        }
        else if ( index == 'seller_login_image' && sellerLoginImage != null )
        {
            setSelectedImg( [ sellerLoginImage ] )
        }
        else if ( index == 'seller_register_image' && sellerRegisterImage != null )
        {
            setSelectedImg( [ sellerRegisterImage ] )
        }
        else if ( index == 'customer_login_image' && customerLoginImage != null )
        {
            setSelectedImg( [ customerLoginImage ] )
        }
        else if ( index == 'customer_register_image' && customerRegisterImage != null )
        {
            setSelectedImg( [ customerRegisterImage ] )
        }
        else if ( index == 'forgot_password_image' && forgotPasswordImage != null )
        {
            setSelectedImg( [ forgotPasswordImage ] )
        }
        else if ( index == 'reset_password_image' && resetPasswordImage != null )
        {
            setSelectedImg( [ resetPasswordImage ] )
        } else if ( index == 'meta_image' && metaImage != null )
        {
            setSelectedImg( [ metaImage ] )
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Romove Images
    function removeFile ( type )
    {
        if ( type == 'site_icon' )
        {
            setSiteIcon( null );
        }
        else if ( type == 'site_logo' )
        {
            setSiteLogo( null );
        }
        else if ( type == 'mobile_logo' )
        {
            setMobileLogo( null );
        }
        else if ( type == 'dashboard_logo' )
        {
            setDashboardLogo( null );
        }
        else if ( type == 'admin_login_image' )
        {
            setAdminLoginImage( null );
        }
        else if ( type == 'seller_login_image' )
        {
            setSellerLoginImage( null );
        }
        else if ( type == 'seller_register_image' )
        {
            setSellerRegisterImage( null );
        }
        else if ( type == 'customer_login_image' )
        {
            setCustomerLoginImage( null );
        }
        else if ( type == 'customer_register_image' )
        {
            setCustomerRegisterImage( null );
        }
        else if ( type == 'forgot_password_image' )
        {
            setForgotPasswordImage( null );
        }
        else if ( type == 'reset_password_image' )
        {
            setResetPasswordImage( null );
        }
        else
        {
            setMetaImage( null );
        }
    }

    return (
        <AdminLayout>
            <Head title="Appearence" />
            {/* Modal */ }
            { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }

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
                                <TbDeviceDesktopCog  className="text-base text-slate-900" />
                                <span>{ t( 'Appearence' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Appearence Settings */ }
                <div  className="space-y-4">
                    {/*---Website Settings---*/ }
                    <div  className='card  z-10 rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Website Settings' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Frontend Website Name */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="website_name">{ t( 'Website Name' ) }</label>
                                <input name='website_name' id='website_name' type="text" value={ websiteName } onChange={ e => setWebsiteName( e.target.value ) } placeholder={ t( 'Website Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                            </div>

                            {/* Frontend Short Name */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="short_name">{ t( 'Short Name' ) }</label>
                                <input name='short_name' id='short_name' type="text" value={ shortName } onChange={ e => setShortName( e.target.value ) } placeholder={ t( 'Short Name' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                            </div>

                            {/* Site Icon */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start flex flex-col' htmlFor="site_icon">
                                    <span  className="uppercase"> { t( 'Site Icon' ) }</span>  <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'site_icon' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ siteIcon ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { siteIcon && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'site_icon' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(siteIcon) } alt={ 'Site Iocn' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                            {/* Site Logo  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start flex flex-col' htmlFor="site_logo">
                                    <span  className="uppercase"> { t( 'Site Logo' ) }</span>  <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 6:2 )' ) }</span>
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'site_logo' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ siteLogo ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { siteLogo && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'site_logo' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(siteLogo) } alt={ 'Site Logo' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Logo  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start flex flex-col' htmlFor="mobile_logo">
                                    <span  className="uppercase"> { t( 'Mobile Logo' ) }</span>  <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 1:1 )' ) }</span>
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'mobile_logo' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ mobileLogo ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { mobileLogo && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'mobile_logo' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(mobileLogo) } alt={ 'Site Logo' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Logo  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start flex flex-col' htmlFor="dashboard_logo">
                                    <span  className="uppercase"> { t( 'Dashboard Logo' ) }</span>  <span  className="text-blue-600 text-[12px]">{ ( '(Image aspect ratio should be 6:2 )' ) }</span>
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'dashboard_logo' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ dashboardLogo ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { dashboardLogo && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'dashboard_logo' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(dashboardLogo) } alt={ 'Dashboard Logo' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>

                            {/* System Timezone */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase'>{ t( 'System Timezone' ) }</label>
                                <Select
                                    name="system_timezone"
                                    placeholder={ t( 'Select Timezone' ) }
                                     className="w-8/12 rounded"
                                    classNamePrefix="react-select"
                                    onChange={ e => onTimezoneChange( e ) }
                                    value={ selectedTimezone }
                                    options={ allTimezones }
                                />
                            </div>
                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateSystemSettings() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---General Settings---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b  px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'General Settings' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4  px-8 py-6'>
                            {/* Website Primary Color */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="primary_color">{ t( 'Website Primary Color' ) }</label>
                                <MuiColorInput size="small" format="hex" isAlphaHidden value={ primaryColor } onChange={ e => setPrimaryColor( e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-8/12 rounded text-sm" />
                            </div>

                            {/* Website Primary Hover Color */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="primary_hover_color">{ t( 'Website Primary Hover Color' ) }</label>
                                <MuiColorInput size="small" format="hex" isAlphaHidden value={ primaryHoverColor } onChange={ e => setPrimaryHoverColor( e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-8/12 rounded text-sm" />
                            </div>

                            {/* Website Secondary Color */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="secondary_color">{ t( 'Website Secondary Color' ) }</label>
                                <MuiColorInput size="small" format="hex" isAlphaHidden value={ secondaryColor } onChange={ e => setSecondaryColor( e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-8/12 rounded text-sm" />
                            </div>

                            {/* Website Secondary Hover Color */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="secondary_hover_color">{ t( 'Website Secondary Hover Color' ) }</label>
                                <MuiColorInput size="small" format="hex" isAlphaHidden value={ secondaryHoverColor } onChange={ e => setSecondaryHoverColor( e ) } placeholder={ t( 'Enter Hex Color Code' ) }  className="focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-8/12 rounded text-sm" />
                            </div>
                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateGeneralSettings() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---Authentication Page Images---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Authentication Page Images' ) } <span  className="text-blue-600 text-[12px]">{ ( '(Images aspect ratio should be 3:2 )' ) }</span></h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Admin Login Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="admin_login_image">
                                    { t( 'Admin Login Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'admin_login_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ adminLoginImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { adminLoginImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'admin_login_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(adminLoginImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Seller Login Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="seller_login_image">
                                    { t( 'Seller Login Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'seller_login_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ sellerLoginImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { sellerLoginImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'seller_login_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(sellerLoginImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Seller Register Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="seller_register_image">
                                    { t( 'Seller Register Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'seller_register_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ sellerRegisterImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { sellerRegisterImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'seller_register_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(sellerRegisterImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Customer Login Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="customer_login_image">
                                    { t( 'Customer Login Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'customer_login_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ customerLoginImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { customerLoginImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'customer_login_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(customerLoginImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Customer Register Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="customer_register_image">
                                    { t( 'Customer Register Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'customer_register_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ customerRegisterImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { customerRegisterImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'customer_register_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(customerRegisterImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Forgot Password Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="forgot_password_image">
                                    { t( 'Forgot Password Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'forgot_password_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ forgotPasswordImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { forgotPasswordImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'forgot_password_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(forgotPasswordImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Reset Password Page Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="reset_password_image">
                                    { t( 'Reset Password Page Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'reset_password_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ resetPasswordImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { resetPasswordImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'reset_password_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(resetPasswordImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateAuthenticationPageImages() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---Global SEO---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Global SEO' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Meta Title */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="meta_title">{ t( 'Meta Title' ) }</label>
                                <input name='meta_title' id='meta_title' type="text" value={ metaTitle } onChange={ e => setMetaTitle( e.target.value ) } placeholder={ t( 'Enter Meta Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm" />
                            </div>
                            {/* Meta Description */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="meta_description">{ t( 'Meta Description' ) }</label>
                                <textarea
                                    value={ metaDescription }
                                    onChange={ e => setMetaDescription( e.target.value ) }
                                    name='meta_description'
                                    id='meta_description'
                                    type="text"
                                    placeholder={ t( 'Enter Meta Description' ) }
                                    rows="3"
                                     className="textarea p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm"
                                />
                            </div>
                            {/* Meta Image  */ }
                            <div  className='flex justify-between'>
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="meta_image">
                                    { t( 'Meta Image' ) }
                                </label>
                                <div  className="w-8/12">
                                    <div
                                        onClick={ e => { handelShowModal( 'meta_image' ) } }
                                         className="cursor-pointer grid grid-cols-12 items-center"
                                    >
                                        <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                            <p  className="text-white text-sm uppercase">Choose File</p>
                                        </div>
                                        <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                            <p  className="ps-4 font-medium">{ metaImage ? '1 file chosen' : '0 file chosen' }</p>
                                        </div>
                                    </div>
                                    <div  className="flex items-center gap-3">
                                        { metaImage && <div  className="relative">
                                            <IoMdClose onClick={ e => { removeFile( 'meta_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                            <img  className='h-32 border rounded-xl p-3 mt-3' src={ asset_url(metaImage) } alt={ 'Meta Image' } />
                                        </div> }
                                    </div>
                                </div>
                            </div>
                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateGlobalSEO() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---Cookies Agreement---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Cookies Agreement' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Cookies Agreement Text */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="cookies_agreement_text">{ t( 'Cookies Agreement Text' ) }</label>
                                <div  className='h-60 w-8/12'>
                                    <Wysiwyg defaultValue={ cookieAgreementText } placeholder="Cookies Agreement Text" onWysiwygChange={ e => onCookiesAgreementTextChange( e ) } />
                                </div >
                            </div>

                            {/* Show Cookies Agreement */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="show_cookies_agreement">{ t( 'Show Cookies Agreement?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setShowCookieAgreement( e.target.checked ) } checked={ showCookieAgreement }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>

                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateCookiesAgreement() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---Website Popup---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Website Popup' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>
                            {/* Show Website Popup */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="show_website_popup">{ t( 'Show Website Popup ?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setShowWebsitePopup( e.target.checked ) } checked={ showWebsitePopup }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>

                            {/* Popup Content */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="popup_content">{ t( 'Popup Content' ) }</label>
                                <div  className='h-60 w-8/12'>
                                    <Wysiwyg defaultValue="" placeholder="Popup Content" onWysiwygChange={ e => onPopupContentChange( e ) } />
                                </div >
                            </div>

                            {/* Show Subscriber Form */ }
                            <div  className="grid grid-cols-12">
                                <label  className='col-span-4 label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="show_subscriber_form">{ t( 'Show Subscriber Form ?' ) }</label>
                                <div  className="col-span-8 ">
                                    <input type="checkbox" onChange={ e => setShowSubscribeForm( e.target.checked ) } checked={ showSubscribeForm }  className="toggle toggle-sm toggle-success" />
                                </div>
                            </div>

                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateWebsitePopup() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>

                    {/*---Custom Script---*/ }
                    <div  className='card rounded-lg drop-shadow-xl bg-white border-[1px] border-slate-200 w-9/12 mx-auto'>
                        <div  className="border-b px-8 py-6">
                            <h2  className="text-[16px] font-medium">{ t( 'Custom Script' ) }</h2>
                        </div>
                        <div  className='grid grid-cols-1 items-center gap-4 px-8 py-6'>

                            {/* Header custom script */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="header_script">{ t( 'Header custom script - before </head>' ) }</label>
                                <textarea
                                    onChange={ e => setHeaderScript( e.target.value ) }
                                    value={ headerScript }
                                    name='header_script'
                                    id='header_script'
                                    type="text"
                                    placeholder={ t( 'Write script with <script>...</script> tag' ) }
                                    rows="3"
                                     className="textarea p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm"
                                />
                            </div>
                            {/* Footer custom script */ }
                            <div  className="flex justify-between">
                                <label  className='label-text text-[12px] text-slate-600 text-start uppercase' htmlFor="footer_script">{ t( 'Footer custom script - before </body>' ) }</label>
                                <textarea
                                    onChange={ e => setFooterScript( e.target.value ) }
                                    value={ footerScript }
                                    name='footer_script'
                                    id='footer_script'
                                    type="text"
                                    placeholder={ t( 'Write script with <script>...</script> tag' ) }
                                    rows="3"
                                     className="textarea p-[13px] focus:outline-none border-[1px] border-slate-200 block bg-white text-slate-600 w-8/12 rounded text-sm"
                                />
                            </div>
                            {/* Button */ }
                            <div  className="flex justify-end">
                                <button onClick={ e => updateCustomScript() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
