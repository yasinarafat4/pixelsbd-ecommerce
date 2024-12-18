/**************************************************************
 *
 *              AdminLayout.jsx
 *         Author: [PixelsBD]
 *           Date: 8/13/2024
 *
 **************************************************************/
import adminMenuList from '@/adminMenuList';
import Dropdown from '@/Components/Dropdown';
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner';
import AdminNotificationDropdown from '@/Components/Notification/AdminNotificationDropdown';
import { asset_url, placeholder1_1, placeholder6_2, placeholder_user } from '@/Helpers';
import { Link, router, usePage } from '@inertiajs/react';
import { Scrollbars } from '@om-tlh/react-custom-scrollbars';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { FaRegBell } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import { GiBroom } from 'react-icons/gi';
import { RiPlugFill } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckActivation from './CheckActivation';

export default function AdminLayout ( { children } )
{
    const { t, setLocale } = useLaravelReactI18n();
    const { flash, auth, active_locale, active_languages, admin_notification, business_settings } = usePage().props
    const deliveryBoyAddon = isAddonActive('delivery_boy');

    const otpAddon = isAddonActive( 'otp' );

    const [ isActive, setIsActive ] = useState( true );

    const now = moment( new Date() );
    const lastCheck = moment( business_settings.last_check );

    const duration = moment.duration( now.diff( lastCheck ) );

    const diffChk = duration.asHours();

    useEffect( () =>
    {
        if ( diffChk > 10 )
        {
            setIsActive( false );
            axios.get( route( 'last_check' ) );
        }
    }, [] )

    useEffect( () =>
    {
        if ( flash.success != null )
        {
            toast.success( flash.success, {
                position: "top-right",
                theme: "colored",
            } )
        }
        if ( flash.error != null )
        {
            toast.error( flash.error, {
                position: "top-right",
                theme: "colored",
            } )
        }
    }, [ flash ] )

    const [ openDrawer, setOpenDrawer ] = useState( true );
    const [ search, setSearch ] = useState( "" );

    let menu = adminMenuList();
    const filteredMenu = useMemo( () =>
    {
        if ( search )
        {
            return menu.filter(
                ( apiResultData ) =>
                    apiResultData.title.toLocaleLowerCase().includes( search.toLowerCase() ) ||
                    JSON.stringify(
                        apiResultData.submenu?.map( ( { ...rest } ) =>
                        {
                            return rest;
                        } )
                    )
                        .toLocaleLowerCase()
                        .includes( search.toLowerCase() )
            );
        }
        return menu;
    }, [ search ] );

    // Drawer open & close
    function openCloseDrawer ()
    {
        setOpenDrawer( !openDrawer );
    }



    function onLanguageChange ( e )
    {
        router.get( route( 'set.locale', e ), {}, {
            replace: true,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => { [ setLocale( e ), window.location.reload() ] }
        } )
    }

    // useEffect(() => {
    //     check_activation();
    // }, [])

    // function check_activation() {

    //     if (isActive == true) {
    //         return <CheckActivation></CheckActivation>;

    //     } else {

    //     }
    // }


    return (
        <>{
            isActive ?

                <>
                    {/* Loading */ }
                    <LoadingSpinner />

                    {/* <div  className={`${onProgress && 'blur-sm'}`}> */ }
                    <ToastContainer />
                    <div  className={ openDrawer ? 'drawer lg:drawer-open' : 'drawer' }>
                        <input id="my-drawer" type="checkbox"  className="drawer-toggle" />
                        <div  className="drawer-content bg-white">
                            <nav  className="bg-white text-[#232734] shadow-lg sticky top-0 z-50">
                                <div  className="px-4 sm:px-6 lg:px-8">
                                    <div  className="flex justify-between h-16">
                                        <div  className="flex items-center lg:hidden">
                                            <label htmlFor="my-drawer"  className="drawer-button p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                                                <svg  className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M4 6h16M4 12h16M4 18h16"
                                                    />
                                                </svg>
                                            </label>
                                            <div  className="flex">
                                                <div  className="shrink-0 flex items-center">
                                                    <Link href={ route( 'admin.dashboard' ) }>
                                                        <div  className='flex'>
                                                            <img  className="w-10 h-4" src={ asset_url(business_settings.dashboard_logo || placeholder1_1()) } alt="Dashboard Logo" />
                                                        </div>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                        <div  className="flex items-center gap-3">
                                            {/* Drawer close button */ }
                                            <div  className=" hidden lg:flex justify-start">
                                                <CgMenuLeft  className="text-2xl cursor-pointer text-[#717580] hover:text-[#3390F3] duration-500" onClick={ () => openCloseDrawer() } />
                                            </div>
                                            {/* Back to Home */ }
                                            <a  className='group' target="_blank" rel="noreferrer" href={ route( 'home' ) }>  <div  className="tooltip tooltip-right cursor-pointer p-[7px] text-slate-600 hover:text-slate-200 bg-sky-100 group-hover:bg-[#3390F3] duration-500 rounded-full" data-tip={ t( 'Website' ) }>
                                                <FaEarthAmericas  className='text-[16px] text-[#717580] group-hover:text-white duration-500' />
                                            </div></a>

                                            {/* Cache Clear */ }
                                            <a  className='group' href={ route( 'cache_clear' ) }>  <div  className="tooltip tooltip-right cursor-pointer p-[7px] text-slate-600 hover:text-slate-200 bg-sky-100 group-hover:bg-[#e45353] duration-500 rounded-full" data-tip={ t( 'Clear Cache' ) }>
                                                <GiBroom  className='text-[16px] text-[#33353a] group-hover:text-white duration-500' />
                                            </div></a>

                                            {/* Change Language */ }
                                            <select defaultValue={ active_locale } onChange={ ( e ) => onLanguageChange( e.target.value ) }  className="select max-w-xs select-sm bg-slate-100 focus:border-none focus:outline-none focus:ring-0">
                                                { active_languages && active_languages.map( ( language, i ) => (
                                                    <option key={ i } value={ language.code }> { language.name }</option>
                                                ) ) }
                                            </select>
                                        </div>

                                        <div  className="flex justify-center items-center gap-5 ms-6">
                                            {/* Notification Icon */ }
                                            <div  className="relative dropdown dropdown-end indicator">
                                                { admin_notification.length > 0 && <span  className="indicator-item py-[1px] px-[6px] rounded-full bg_secondary text-white text-[12px]">{ admin_notification.length }</span> }
                                                <div tabIndex={ 0 } role="button"><FaRegBell  className='text-[22px] text-[#717580]' /></div>
                                                <ul tabIndex={ 0 }  className="absolute top-10 dropdown-content menu bg-white rounded z-[1] w-[380px] p-0 shadow">
                                                    <AdminNotificationDropdown />
                                                </ul>
                                            </div>

                                            <div  className="ms-3 relative">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <div  className="avatar">
                                                            <div  className="w-9 aspect-square rounded-full cursor-pointer">
                                                                <img src={ asset_url(auth.admin.image || placeholder_user()) } />
                                                            </div>
                                                        </div>
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content>
                                                        <p  className='text-center text-sm py-2 border-b'>{ auth.admin.name }</p>
                                                        <Dropdown.Link  className="hover:text-white hover:bg-[#2E294E]" href={ route( 'admin.admin_profile' ) }>{ t( 'Profile' ) }</Dropdown.Link>
                                                        <Dropdown.Link  className="hover:text-white hover:bg-[#e94747] rounded-b" href={ route( 'admin.logout' ) } method="post" as="button">
                                                            { t( 'Logout' ) }
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </nav>
                            <>
                                <Scrollbars  className="min-h-[calc(100vh-133px)] text-slate-600">
                                    { children }
                                </Scrollbars>
                            </>
                            <footer  className='flex justify-center py-6 bg-white border-t'>
                                <p  className='text-slate-500 text-sm'>&copy;{ new Date().getFullYear() } - v{ business_settings.current_version }</p>
                            </footer>
                        </div>

                        {/* Side-nav */ }
                        <div  className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar"  className="drawer-overlay"></label>
                            <ul  className="menu w-[275px] min-h-screen bg-[#232734] text-white">

                                {/* Dash logo */ }
                                <div  className="shrink-0 flex justify-center items-center mb-4">
                                    <Link  className='flex' href={ route( 'admin.dashboard' ) }>
                                        <div  className='flex items-center justify-center gap-1'>
                                            <img  className="w-[180px]" src={ asset_url(business_settings.dashboard_logo || placeholder6_2()) } alt="Dashboard Logo" />
                                        </div>
                                    </Link>
                                </div>

                                <input type="search"  className="py-2 px-5 mb-4 focus:outline-none border-[1px] border-slate-200 block text-slate-200 bg-slate-700 w-full rounded-lg text-sm" name="search" value={ search } onChange={ e => setSearch( e.target.value ) } placeholder={ t( 'Search Menu...' ) } />
                                <Scrollbars  className="min-h-[calc(100vh-150px)]">

                                    {
                                        filteredMenu.map( ( menu, i ) =>
                                        {

                                            if ( menu.can && ( menu.route_current != "admin.deliveryboy.*" || deliveryBoyAddon ) && ( menu.route_current != "admin.otp.*" || otpAddon ) )
                                            {

                                                return <li key={ i }  className={ `${ menu.submenu ? 'my-1' : 'rounded my-1 hover:bg-[#3A3F50] duration-300' } ${ menu.submenu.length == 0 && route().current( menu.route_current ) && 'bg-[#3A3F50]' } ` }>
                                                    {
                                                        menu.route != null ?
                                                            <Link href={ route( menu.route ) }>
                                                                { menu.icon }
                                                                <span  className='indicator'>{ menu.title }
                                                                    { menu.indicator && <span  className='badge badge-xs badge-secondary indicator-item'>
                                                                        { menu.indicator }
                                                                    </span> }
                                                                </span>
                                                            </Link>
                                                            :
                                                            <details open={ route().current( menu.route_current ) }>
                                                                <summary  className={ `rounded hover:bg-[#3A3F50] duration-300 ${ route().current( menu.route_current ) && 'bg-[#3A3F50]' }` }>
                                                                    { menu.icon }
                                                                    <span  className='indicator'>{ menu.title }
                                                                        { menu.indicator && <span  className='badge badge-xs badge-secondary indicator-item'>
                                                                            { menu.indicator }
                                                                        </span> }
                                                                    </span>
                                                                    { menu.isPlugin == true && <RiPlugFill  className='text-[#F51350] text-[19px] rotate-90' /> }
                                                                </summary>
                                                                { menu.submenu &&
                                                                    <ul>
                                                                        { menu.submenu.map( ( submenu, i ) => (
                                                                            submenu.can && <li key={ i }  className={ `${ submenu.submenu ? 'my-1' : 'rounded my-1 hover:bg-[#3A3F50] duration-300' } ${ !submenu.submenu && route().current( submenu.route_current ) && 'bg-[#3A3F50]' } ` }>
                                                                                {
                                                                                    submenu.route != null ?
                                                                                        <Link href={ route( submenu.route ) }  className='text-sm'>
                                                                                            <span  className='indicator'>{ submenu.title }
                                                                                                { submenu.indicator && <span  className='badge badge-xs badge-secondary indicator-item'>
                                                                                                    { submenu.indicator }
                                                                                                </span> }
                                                                                            </span>
                                                                                        </Link> :
                                                                                        <details open={ route().current( submenu.route_current ) }>
                                                                                            <summary  className={ `rounded hover:bg-[#3A3F50] duration-300 ${ route().current( submenu.route_current ) && 'bg-[#3A3F50]' }` }>{ submenu.title }</summary>
                                                                                            {
                                                                                                <ul>
                                                                                                    {
                                                                                                        submenu.submenu.map( ( child, i ) =>
                                                                                                        {
                                                                                                            return child.can && <li key={ i }  className={ `rounded my-1 hover:bg-[#3A3F50] duration-300 ${ route().current( child.route_current ) && 'bg-[#3A3F50]' }` }><Link  className='text-sm' href={ route( child.route ) }>{ child.title }</Link></li>
                                                                                                        }
                                                                                                        )
                                                                                                    }
                                                                                                </ul>
                                                                                            }

                                                                                        </details>
                                                                                }
                                                                            </li>

                                                                        ) )
                                                                        }
                                                                    </ul>
                                                                }
                                                            </details>

                                                    }
                                                </li>

                                            }

                                        } )
                                    }
                                </Scrollbars>
                            </ul >
                        </div >
                    </div >
                    {/* </div> */ }
                </>
                :
                <CheckActivation />

        }</>
    );
}

