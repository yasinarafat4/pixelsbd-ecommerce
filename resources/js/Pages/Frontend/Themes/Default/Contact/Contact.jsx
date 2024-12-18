
import DefaultThemeLayout from '@/Layouts/DefaultThemeLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';

export default function Contact ()
{

    const { business_settings } = usePage().props;


    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            title: "Our Address",
            details: business_settings.contact_page_address,
        },
        {
            icon: <FaPhoneAlt />,
            title: "Phone Number",
            details: business_settings.contact_page_phone,
        },
        {
            icon: <FaEnvelope />,
            title: "Email Address",
            details: business_settings.contact_page_email,
        },
    ];

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm( {
        name: "",
        email: "",
        phone: "",
        message: "",
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        post( route( 'contact.post' ), {
            onFinish: () =>
            {
                reset();
            }
        } )
    }

    return (
        <DefaultThemeLayout>
            <Head title="Contact" />
            <div  className="min-h-screen">
                <div  className="p-4 lg:px-16 space-y-10">
                    <div  className="relative space-y-10">
                        <div  className='h-40 md:h-60 bg_primary flex justify-center items-center'>
                            <h1  className='text-white text-2xl lg:text-4xl font-semibold py-4 px-8 border shadow-xl'>Contact Us</h1>
                        </div>
                        {/* Contact Information */ }
                        <div  className="md:absolute top-2/3 w-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 md:gap-5 xl:gap-10 px-6 md:px-10 lg:px-32 xl:px-40">
                            { contactInfo.map( ( info, index ) => (
                                <div key={ index }  className="bg-white rounded-lg shadow-md flex flex-col items-center text-center space-y-2 p-6 md:p-3 xl:p-6">
                                    <div  className="text_primary text-lg xl:text-2xl font-semibold">
                                        { info.icon }
                                    </div>
                                    <h3  className="text-base font-semibold">{ info.title }</h3>
                                    <p  className="text-xs xl:text-sm text-gray-600">{ info.details }</p>
                                </div>
                            ) ) }
                        </div>
                    </div>
                    <div  className='md:h-10 xl:h-20 hidden md:block'></div>
                    {/* Contact Form */ }
                    <div  className="flex flex-col-reverse lg:flex-row gap-8 ">
                        <div  className="w-full">
                            <form onSubmit={ e => handleSubmit( e ) }  className="space-y-2">
                                {/* Name */ }
                                <div>
                                    <span  className="label-text">Name</span>
                                    <input type="text" id="name" value={ data.name } onChange={ ( e ) => setData( 'name', e.target.value ) } placeholder="Enter your name"  className="input w-full input-bordered focus:outline-none focus:border-2 focus:border_primary text-sm rounded-none" />
                                    { errors.name && <div  className="text-red-500 text-sm mt-1">{ errors.name }</div> }
                                </div>
                                {/* Email */ }
                                <div>
                                    <span  className="label-text">Email</span>
                                    <input type="email" id="email" value={ data.email } onChange={ ( e ) => setData( 'email', e.target.value ) } placeholder="Enter your email"  className="input w-full input-bordered focus:outline-none focus:border-2 focus:border_primary text-sm rounded-none" />
                                    { errors.email && <div  className="text-red-500 text-sm mt-1">{ errors.email }</div> }
                                </div>
                                {/* Phone */ }
                                <div>
                                    <span  className="label-text">Phone</span>
                                    <input type="number" id="phone" value={ data.phone } onChange={ ( e ) => setData( 'phone', e.target.value ) } placeholder="Enter your mobile number"  className="input w-full input-bordered focus:outline-none focus:border-2 focus:border_primary text-sm rounded-none" />
                                </div>
                                {/* Message */ }
                                <div>
                                    <span  className="label-text">Message</span>
                                    <textarea rows={ 4 } id="message" value={ data.message } onChange={ ( e ) => setData( 'message', e.target.value ) }  className="textarea w-full input-bordered focus:outline-none focus:border-2 focus:border_primary text-sm rounded-none" placeholder="Enter your message"></textarea>
                                    { errors.message && <div  className="text-red-500 text-sm mt-1">{ errors.message }</div> }
                                </div>

                                <button type="submit"  className="w-full bg_primary text-white py-3 rounded-full font-semibold transition duration-200">Submit</button>
                            </form>
                        </div>

                        {/* Contact Text */ }
                        <div  className="flex flex-col justify-between gap-5 w-full">
                            <div  className='space-y-4'>
                                <h2  className="text-4xl font-semibold">Get in Touch</h2>
                                <div dangerouslySetInnerHTML={ { __html: business_settings.contact_page_text } } ></div>
                            </div>

                            {/* Social Media Icons */ }
                            <div  className="flex space-x-4">
                                <a href={ business_settings.contact_page_facebook_link } target='_blank' rel="noreferrer" aria-label="Facebook"  className="text-2xl text-[#1877F2]">
                                    <FaFacebookF />
                                </a>
                                <a href={ business_settings.contact_page_twitter_link } target='_blank' rel="noreferrer" aria-label="Twitter"  className="text-2xl text-[#1DA1F2]">
                                    <FaTwitter />
                                </a>
                                <a href={ business_settings.contact_page_instagram_link } target='_blank' rel="noreferrer" aria-label="Instagram"  className="text-2xl text-[#E4405F]">
                                    <FaInstagram />
                                </a>
                                <a href={ business_settings.contact_page_linkedin_link } target='_blank' rel="noreferrer" aria-label="LinkedIn"  className="text-2xl text-[#0077B5]">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DefaultThemeLayout>
    );
}


