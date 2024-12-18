import { asset_url, placeholder6_1, placeholder6_2 } from '@/Helpers';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaPinterest } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { RiTwitterXFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function DefaultThemeFooter ()
{

    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        email: "",
    } )

    // Form submit functionality
    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'subscriber_store' ), {
            onFinish: () =>
            {
                reset();
            }
        } )
    }

    return (
        <>
            {/* Footer */ }
            <div className='bg-[#184261] text-white space-y-3 py-5 mt-4'>
                <div className={ `grid grid-cols-1 md:grid-cols-2 ${ ( business_settings.footer_links && business_settings.footer_links_title ) ? 'lg:grid-cols-4' : 'lg:grid-cols-3' }  xl:max-w-7xl gap-8 md:gap-5 lg:gap-1 mx-auto px-4 xl:px-0` }>
                    <>
                        <div className='mb-1 space-y-2'>
                            <Link aria-label="Footer Logo" href={ route( 'home' ) }>
                                <div className="w-[120px] lg:w-[160px] xl:w-[170px]">
                                    <LazyLoadImage
                                        className='w-full aspect-[6/2]'
                                        src={ asset_url( business_settings.footer_logo || placeholder6_2() ) }
                                        alt={ 'footer logo' }
                                        effect='blur'
                                    />
                                </div>
                            </Link>
                            <div className='w-10/12 text-sm' dangerouslySetInnerHTML={ { __html: business_settings.footer_about_description } }></div>
                        </div>
                    </>

                    { ( business_settings.footer_links && business_settings.footer_links_title ) &&

                        <div className='w-full flex flex-col gap-2'>
                            <strong className="text-lg font-medium text-white">{ business_settings.footer_links_title }</strong>
                            { business_settings.footer_links.map( ( footer_link, i ) => (
                                <Link key={ i } className="link link-hover text-sm" href={ footer_link.link }>{ footer_link.label }</Link>
                            ) ) }
                        </div> }


                    <div className='flex flex-col gap-2'>
                        <strong className="text-lg font-medium text-white">{ t( 'Account & Shipping Info' ) }
                        </strong>
                        <Link className="link link-hover text-sm" href={ route( 'about_us' ) }>{ t( 'About us' ) }</Link>
                        <Link className="link link-hover text-sm" href={ route( 'refund_policy' ) }>{ t( 'Refund Policy' ) }</Link>
                        <Link className="link link-hover text-sm" href={ route( 'return_policy' ) }>{ t( 'Return Policy' ) }</Link>
                        <Link className="link link-hover text-sm" href={ route( 'privacy_policy' ) }>{ t( 'Privacy Policy' ) }</Link>
                        <Link className="link link-hover text-sm" href={ route( 'terms_and_conditions' ) }>{ t( 'Terms & Conditions' ) }</Link>
                    </div>
                    <div className=''>
                        <form className='w-full' onSubmit={ handleSubmit }>
                            <strong className="text-lg font-medium text-white">{ t( 'Newsletter' ) }</strong>
                            <fieldset className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">{ t( 'Subscribe to our new channel to get latest updates' ) }
                                    </span>
                                </label>
                                <div className="join">
                                    <input required onChange={ e => setData( 'email', e.target.value ) } value={ data.email } name='email' id='email' type="email" placeholder="username@site.com" className="input input-bordered bg-white text-slate-600 join-item w-10/12" />
                                    <button type='submit' className="btn bg_primary hover:bg_primary text-slate-200 join-item">{ t( 'Subscribe' ) }</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <hr className='xl:max-w-7xl mx-auto' />
                <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-4 xl:max-w-7xl mx-auto px-4 xl:px-0'>
                    <div className='md:col-span-1'>
                        <>
                            { ( business_settings.app_store_link || business_settings.play_store_link ) && <h2 className='text-lg font-semibold uppercase'>{ t( 'Download Our App' ) }</h2> }
                            <div className='flex items-center gap-3 mt-2'>
                                { business_settings.app_store_link &&
                                    <a aria-label="App Store" href={ business_settings.app_store_link } target='_blank' rel="noreferrer">
                                        <LazyLoadImage
                                            className='h-[45px]'
                                            src={ asset_url( "/assets/apple_app.webp" ) }
                                            alt={ 'App Store Image' }
                                            effect='blur'
                                        />
                                        {/* </div> */ }
                                    </a> }
                                { business_settings.play_store_link &&
                                    <a aria-label="Play Store" href={ business_settings.play_store_link } target='_blank' rel="noreferrer">
                                        <LazyLoadImage
                                            className='h-[45px]'
                                            src={ asset_url( "/assets/google_app.webp" ) }
                                            alt={ 'Play Store Image' }
                                            effect='blur'
                                        />
                                    </a> }
                            </div>
                        </>
                    </div>
                    { business_settings.payment_method_image && <div className='md:col-span-2 flex justify-center md:justify-end'>
                        <>
                            <LazyLoadImage
                                className='lg:h-[50px] aspect-[6/1]'
                                src={ asset_url( business_settings.payment_method_image || placeholder6_1() ) }
                                alt="Payment Method Image"
                                effect='blur'
                            />
                        </>

                    </div> }
                </div>
            </div>
            <div className='bg-[#24495F]'>
                <footer className="footer py-6 px-10 xl:px-0 xl:max-w-7xl mx-auto text-white border-base-300">
                    <aside className="items-center grid-flow-col">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                        <div dangerouslySetInnerHTML={ { __html: business_settings.copyright_text } }></div>
                    </aside>
                    {/* social media */ }
                    <nav className="md:place-self-center md:justify-self-end">
                        <div className="grid grid-flow-col gap-2">
                            { business_settings.twitter_link && <a aria-label="Twitter" href={ business_settings.twitter_link } target="_blank" title="Twitter" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <RiTwitterXFill className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }
                            { business_settings.linkedin_link && <a aria-label="LinkedIn" href={ business_settings.linkedin_link } target="_blank" title="LinkedIn" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <FaLinkedinIn className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }
                            { business_settings.google_plus_link && <a aria-label="Google" href={ business_settings.google_plus_link } target="_blank" title="Google" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <FaGooglePlusG className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }
                            { business_settings.facebook_link && <a aria-label="Facebook" href={ business_settings.facebook_link } target="_blank" title="Facebook" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <FaFacebookF className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }
                            { business_settings.instagram_link && <a aria-label="Instagram" href={ business_settings.instagram_link } target="_blank" title="Instagram" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <FiInstagram className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }
                            { business_settings.pinterest_link && <a aria-label="Pinterest" href={ business_settings.pinterest_link } target="_blank" title="Pinterest" className='group' rel="noreferrer">
                                <div className='p-2 bg-[#35576C] group-hover:bg-white duration-500 rounded-full'>
                                    <FaPinterest className='text-white group-hover:text-[#35576C] duration-500 w-4 h-4' />
                                </div>
                            </a> }

                        </div>
                    </nav>
                </footer>
            </div>
        </>
    )
}
