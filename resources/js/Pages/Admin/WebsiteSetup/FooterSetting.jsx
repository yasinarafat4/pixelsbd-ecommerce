import UploadModal from "@/Components/UploadModals/UploadModal";
import Wysiwyg from "@/Components/Wysiwyg";
import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbSettingsDown } from "react-icons/tb";

export default function FooterSetting ()
{

    const { t } = useLaravelReactI18n();
    const { lang, business_settings, active_languages } = usePage().props;

    const [ showModal, setShowModal ] = useState( false );
    const [ type, setType ] = useState();

    // Settings States
    const [ footerLogo, setFooterLogo ] = useState( business_settings.footer_logo );
    const [ footerAboutDescription, setFooterAboutDescription ] = useState( business_settings.footer_about_description );
    const [ playStoreLink, setPlayStoreLink ] = useState( business_settings.play_store_link );
    const [ appStoreLink, setAppStoreLink ] = useState( business_settings.app_store_link );
    const [ contactAddress, setContactAddress ] = useState( business_settings.contact_address );
    const [ contactPhone, setContactPhone ] = useState( business_settings.contact_phone );
    const [ contactEmail, setContactEmail ] = useState( business_settings.contact_email );
    const [ footerLinks, setFooterLinks ] = useState( business_settings.footer_links ?? [] );
    const [ footerLinksTitle, setFooterLinksTitle ] = useState( business_settings.footer_links_title );
    const [ copyrightText, setCopyrightText ] = useState( business_settings.copyright_text );
    const [ facebookLink, setFacebookLink ] = useState( business_settings.facebook_link );
    const [ twitterLink, setTwitterLink ] = useState( business_settings.twitter_link );
    const [ instagramLink, setInstagramLink ] = useState( business_settings.instagram_link );
    const [ linkedinLink, setLinkedinLink ] = useState( business_settings.linkedin_link );
    const [ googlePlusLink, setGooglePlusLink ] = useState( business_settings.google_plus_link );
    const [ pinterestLink, setPinterestLink ] = useState( business_settings.pinterest_link );
    const [ downloadAppLink, setDownloadAppLink ] = useState( business_settings.seller_app_link );
    const [ paymentMethodImage, setPaymentMethodImage ] = useState( business_settings.payment_method_image );
    const [ limit, setLimit ] = useState( 1 );
    const [ selectedImg, setSelectedImg ] = useState( [] );

    // Footer About Description Change
    const onFooterAboutDescriptionChange = ( html ) =>
    {
        setFooterAboutDescription( html );
    }

    // Footer Copyright Text Change
    const onFooterCopyrightTextChange = ( html ) =>
    {
        setCopyrightText( html );
    }

    // Modal
    function onAddFile ( v )
    {
        if ( type == 'footer_logo' )
        {
            setFooterLogo( v[ 0 ] )
        } else
        {
            setPaymentMethodImage( v[ 0 ] )
        }
        closeModal();
    }

    function handelShowModal ( index )
    {
        setSelectedImg( [] )
        if ( index == 'footer_logo' && footerLogo != null )
        {
            setSelectedImg( [ footerLogo ] )
        }
        else if ( index == 'payment_method_image' && paymentMethodImage != null )
        {
            setSelectedImg( [ paymentMethodImage ] )
        }
        setShowModal( true )
        setType( index )
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Image Remove Handlers
    function removeFile ( type )
    {
        if ( type == 'footer_logo' )
        {
            setFooterLogo( null );
        }
        else if ( type == 'payment_method_image' )
        {
            setPaymentMethodImage( null );
        }
    };




    // Dynamic add inputs
    function handleAddInput ()
    {
        setFooterLinks( [ ...footerLinks, { label: "", link: "" } ] );
    };


    function handleInputChange ( event, index )
    {
        let { name, value } = event.target;
        let onChangeValue = [ ...footerLinks ];
        onChangeValue[ index ][ name ] = value;
        setFooterLinks( onChangeValue );
    };

    function handleDeleteInput ( index )
    {
        const newArray = [ ...footerLinks ];
        newArray.splice( index, 1 );
        setFooterLinks( newArray );
    };

    // Widget Update Handlers
    function updateAboutWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'footer_logo', 'footer_about_description', 'play_store_link', 'app_store_link' ],
            footer_logo: footerLogo,
            footer_about_description: footerAboutDescription,
            play_store_link: playStoreLink,
            app_store_link: appStoreLink,
        }, { preserveScroll: true } )
    }

    function updateContactInfoWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'contact_address', 'contact_phone', 'contact_email' ],
            contact_address: contactAddress,
            contact_phone: contactPhone,
            contact_email: contactEmail,
        }, { preserveScroll: true } )
    }

    function updateLinkWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'footer_links', 'footer_links_title' ],
            footer_links: footerLinks,
            footer_links_title: footerLinksTitle,
        }, { preserveScroll: true } )

    }

    function updateCopyrightWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'copyright_text' ],
            copyright_text: copyrightText
        }, { preserveScroll: true } )
    }

    function updateSocialLinkWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'facebook_link', 'twitter_link', 'instagram_link', 'linkedin_link', 'google_plus_link', 'pinterest_link' ],
            facebook_link: facebookLink,
            twitter_link: twitterLink,
            instagram_link: instagramLink,
            linkedin_link: linkedinLink,
            google_plus_link: googlePlusLink,
            pinterest_link: pinterestLink
        }, { preserveScroll: true } )
    }

    function updateDownloadAppLink ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'seller_app_link' ],
            seller_app_link: downloadAppLink
        }, { preserveScroll: true } )
    }

    function updatePaymentMethodsWidget ()
    {
        router.post( route( 'admin.configuration.update', lang ), {
            types: [ 'payment_method_image' ],
            payment_method_image: paymentMethodImage
        }, { preserveScroll: true } )
    }

    return (
        <AdminLayout>
            <Head title="Footer Setting" />
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
                                <TbSettingsDown  className="text-base text-slate-900" />
                                <span>{ t( 'Footer Setting' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Footer Setting */ }
                <div  className="card p-5 z-10 rounded-md drop-shadow-xl bg-white border-[1px] border-slate-200 w-11/12 mx-auto">
                    {/* Tabs */ }
                    <div  className={ active_languages.length < 7 ? `grid grid-cols-${ active_languages.length }` : "grid grid-cols-7" }>
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.website.footer_setting', language.code ) }  className={ lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500' }><span  className="text-sm"> { language.name }</span></a>
                            ) )
                        }
                    </div>
                    {/* Footer Widget */ }
                    <div  className="mb-4 mt-1 border rounded-md border-slate-200">
                        <div  className="py-3 border-b border-slate-200">
                            <span  className="ps-4 text-[18px] font-medium">Footer Widget</span>
                        </div>
                        <div  className="">
                            {/* About & Contact Info Widget */ }
                            <div  className="grid grid-cols-2 gap-6 m-6">
                                {/* About Widget*/ }
                                <div  className="bg-[#F2F3F8] rounded-md">
                                    <h2  className="text-[18px] font-medium py-4 px-7 border-b">About Widget</h2>
                                    <div  className="space-y-3 py-4">

                                        {/* Modal */ }
                                        { showModal && <UploadModal limit={ limit } selected={ selectedImg } onAddFile={ onAddFile } closeModal={ closeModal } showModal={ showModal } /> }
                                        {/* Footer Logo */ }
                                        <div  className='flex flex-col px-7'>
                                            <label  className='label-text text-slate-600 text-sm'>
                                                { t( 'Footer Logo' ) }
                                            </label>
                                            <div  className="w-full">
                                                <div
                                                    onClick={ e => handelShowModal( 'footer_logo' ) }
                                                     className="cursor-pointer grid grid-cols-12 items-center"
                                                >
                                                    <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                        <p  className="text-white text-sm uppercase">Choose File</p>
                                                    </div>
                                                    <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                        <p  className="ps-4 font-medium">{ footerLogo ? '1 file choosen' : '0 file choosen' }</p>
                                                    </div>
                                                </div>
                                                <div  className="flex items-center gap-3">
                                                    { footerLogo && <div  className="relative">
                                                        <IoMdClose onClick={ e => { removeFile( 'footer_logo' ) } }  className="text-xl text_primary absolute top-2 right-0 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                        <img  className='w-full h-32 border rounded-xl p-3 mt-3' src={ asset_url(footerLogo) } alt={ 'footer logo' } />
                                                    </div> }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer About Description */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="footer_about_description">{ t( 'Footer About Description' ) }</label>
                                            <div  className='h-64 w-full border-[1px] bg-white border-slate-300 rounded p-2'>
                                                <Wysiwyg defaultValue={ footerAboutDescription } placeholder="Footer About Description" onWysiwygChange={ e => onFooterAboutDescriptionChange( e ) } />
                                            </div>
                                        </div>
                                        {/* Play Store Link */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="play_store_link">Play Store Link</label>
                                            <input onChange={ e => setPlayStoreLink( e.target.value ) } value={ playStoreLink } name='play_store_link' id='play_store_link' type="url" placeholder={ t( 'Play Store Link' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                        </div>
                                        {/* App Store Link */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="app_store_link">App Store Link</label>
                                            <input onChange={ e => setAppStoreLink( e.target.value ) } value={ appStoreLink } name='app_store_link' id='app_store_link' type="url" placeholder={ t( 'App Store Link' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                        </div>
                                        {/* Button */ }
                                        <div onClick={ e => updateAboutWidget() }  className="flex justify-end px-7 py-1">
                                            <button  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Contact Info Widget*/ }
                                <div  className="bg-[#F2F3F8] rounded-md h-[391px]">
                                    <h2  className="text-[18px] font-medium py-4 px-7 border-b">Contact Info Widget</h2>
                                    <div  className="space-y-3 py-4">
                                        {/* Contact Address */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="contact_address">Contact Address</label>
                                            <input onChange={ e => setContactAddress( e.target.value ) } value={ contactAddress } name='contact_address' id='contact_address' type="text" placeholder={ t( 'Address' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                        </div>
                                        {/* Contact Phone */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="contact_phone">Contact Phone</label>
                                            <input onChange={ e => setContactPhone( e.target.value ) } value={ contactPhone } name='contact_phone' id='contact_phone' type="number" placeholder={ t( 'Phone' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                        </div>
                                        {/* Contact Email */ }
                                        <div  className="px-7">
                                            <label  className='label-text text-slate-600 text-sm' htmlFor="contact_email">Contact Email</label>
                                            <input onChange={ e => setContactEmail( e.target.value ) } value={ contactEmail } name='contact_email' id='contact_email' type="email" placeholder={ t( 'Email' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                        </div>
                                        {/* Button */ }
                                        <div  className="flex justify-end px-7 py-1">
                                            <button onClick={ e => updateContactInfoWidget() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Link Widget */ }
                            <div  className="bg-[#F2F3F8] rounded-md m-6">
                                <h2  className="text-[18px] font-medium py-4 px-7 border-b">Link Widget</h2>
                                {/* Services */ }
                                <div  className="py-4 px-10 space-y-3">
                                    <div>
                                        <h3  className="text-[16px] font-medium">Title</h3>
                                        {/* Title */ }
                                        <div>
                                            <input onChange={ ( event ) => setFooterLinksTitle( event.target.value ) } name='label' id='label' value={ footerLinksTitle } type="text" placeholder={ t( 'Title' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-200 block bg-white text-slate-600 w-11/12 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3  className="text-[16px] font-medium">Links</h3>
                                        {/* Dynamic Input */ }
                                        <div  className="container">
                                            { footerLinks.map( ( item, index ) => (
                                                <div  className="grid grid-cols-12 items-center justify-between gap-3 py-2" key={ index }>
                                                    <div  className="col-span-5">
                                                        <input
                                                            name="label"
                                                            placeholder="Label"
                                                            type="text"
                                                             className="w-full text-sm rounded-md border border-slate-300 focus:outline-none bg-white text-slate-600 px-4 py-3"
                                                            value={ item.label }
                                                            onChange={ ( event ) => handleInputChange( event, index ) }
                                                        />
                                                    </div>
                                                    <div  className="col-span-6">
                                                        <input
                                                            name="link"
                                                            type="text"
                                                            placeholder="Link with http:// Or https://"
                                                             className="w-full text-sm rounded-md border border-slate-300 focus:outline-none bg-white text-slate-600 px-4 py-3"
                                                            value={ item.link }
                                                            onChange={ ( event ) => handleInputChange( event, index ) }
                                                        />
                                                    </div>
                                                    <div  className="col-span-1">
                                                        <button  className="border p-3 rounded-full bg-red-100 hover:bg-red-600 text-red-600 hover:text-white duration-300" onClick={ e => handleDeleteInput( index ) }><RxCross2  className="text-base" /></button>
                                                    </div>
                                                </div>
                                            ) ) }
                                            <button  className="mt-2 py-2 px-3 text-[13px] font-normal rounded bg-[#E3E6EC] text-black hover:bg-[#A5A9B7] hover:text-white duration-300 w-24" onClick={ e => handleAddInput() }>Add New</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Button */ }
                                <div  className="flex justify-end px-7 py-5">
                                    <button onClick={ e => updateLinkWidget() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */ }
                    <div  className="mb-4 mt-1 border rounded-md border-slate-200">
                        <div  className="py-3 border-b border-slate-200">
                            <span  className="ps-4 text-[18px] font-medium">Footer Bottom</span>
                        </div>
                        <div  className="space-y-6 m-6">
                            {/* Copyright Widget */ }
                            <div  className="bg-[#F2F3F8] rounded-md pb-3">
                                <h2  className="text-[18px] font-medium py-4 px-7 border-b">Copyright Widget</h2>
                                <div  className="space-y-3 py-4">
                                    {/* Copyright Text */ }
                                    <div  className="px-7">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="copyright_text">{ t( 'Copyright Text' ) }</label>
                                        <div  className='h-64 w-full border-[1px] bg-white border-slate-300 rounded p-2'>
                                            <Wysiwyg defaultValue={ copyrightText } placeholder="Copyright Text" onWysiwygChange={ e => onFooterCopyrightTextChange( e ) } />
                                        </div>
                                    </div>
                                </div>
                                {/* Button */ }
                                <div  className="flex justify-end px-7 py-5">
                                    <button onClick={ e => updateCopyrightWidget() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                </div>
                            </div>
                            {/* Social Link Widget */ }
                            <div  className="bg-[#F2F3F8] rounded-md pb-3">
                                <div  className="flex items-center justify-between py-4 px-7 border-b">
                                    <h2  className="text-[18px] font-medium">Social Link Widget</h2>
                                    <input type="checkbox"  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                {/*Social Links */ }
                                <div  className="px-7 pt-3 space-y-2">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="social_links">{ t( 'Social Links' ) }</label>
                                    <div  className="space-y-3">
                                        {/* Facebook */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaFacebookF  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setFacebookLink( e.target.value ) } value={ facebookLink } name='facebook_link' id='facebook_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Twitter */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaXTwitter  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setTwitterLink( e.target.value ) } value={ twitterLink } name='twitter_link' id='twitter_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Instagram  */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaInstagram  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setInstagramLink( e.target.value ) } value={ instagramLink } name='instagram_link' id='instagram_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* LinkedinIn  */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaLinkedinIn  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setLinkedinLink( e.target.value ) } value={ linkedinLink } name='linkedin_link' id='linkedin_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Google Plus  */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaGooglePlusG  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setGooglePlusLink( e.target.value ) } value={ googlePlusLink } name='google_plus_link' id='google_plus_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Pinterest  */ }
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaPinterestP  className="text-slate-500" />
                                            </span>
                                            <input onChange={ e => setPinterestLink( e.target.value ) } value={ pinterestLink } name='pinterest_link' id='pinterest_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                    </div>
                                    {/* Button */ }
                                    <div  className="flex justify-end py-5">
                                        <button onClick={ e => updateSocialLinkWidget() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                    </div>
                                </div>

                            </div>
                            {/* Download App Link */ }
                            <div  className="bg-[#F2F3F8] rounded-md pb-3">
                                <h2  className="text-[18px] font-medium py-3 px-7 border-b">Download App Link</h2>
                                {/* Link */ }
                                <div  className="py-3 px-7">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="seller_app_link">{ t( 'Seller App Link' ) }</label>
                                    <input onChange={ e => setDownloadAppLink( e.target.value ) } value={ downloadAppLink } name='seller_app_link' id='seller_app_link' type="url" placeholder={ t( 'http://' ) }  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] bg-white border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                                </div>
                                {/* Button */ }
                                <div  className="flex justify-end px-7 py-5">
                                    <button onClick={ e => updateDownloadAppLink() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                </div>
                            </div>
                            {/* Payment Methods Widget */ }
                            <div  className="bg-[#F2F3F8] rounded-md pb-3">
                                <h2  className="text-[18px] font-medium py-3 px-7 border-b">Payment Methods Widget</h2>

                                <div  className='flex flex-col px-7'>
                                    <label  className='label-text text-slate-600 text-sm pt-3' htmlFor="payment_method_image">
                                        { t( 'Payment Methods' ) }
                                    </label>
                                    <div  className="w-full">
                                        <div
                                            onClick={ e => handelShowModal( 'payment_method_image' ) }
                                             className="cursor-pointer grid grid-cols-12 items-center"
                                        >
                                            <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                <p  className="text-white text-sm uppercase">Choose File</p>
                                            </div>
                                            <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                <p  className="ps-4 font-medium">{ paymentMethodImage ? '1 file choosen' : '0 file choosen' }</p>
                                            </div>
                                        </div>
                                        <div  className="flex items-center gap-3">
                                            { paymentMethodImage && <div  className="relative">
                                                <IoMdClose onClick={ e => { removeFile( 'payment_method_image' ) } }  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                                <img  className='w-full h-32 border rounded-xl p-3 mt-3' src={ asset_url(paymentMethodImage) } alt={ 'payment Method Image' } />
                                            </div> }
                                        </div>
                                    </div>
                                </div>
                                {/* Button */ }
                                <div  className="flex justify-end px-7 py-5">
                                    <button onClick={ e => updatePaymentMethodsWidget() }  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{ t( 'Update' ) }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </AdminLayout >
    )

}
