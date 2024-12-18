import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdContactPhone, MdSpaceDashboard } from "react-icons/md";

export default function ContactPage() {

    const { t } = useLaravelReactI18n();
    const { lang, business_settings, active_languages } = usePage().props;

    // Settings States
    const [contactPageText, setContactPageText] = useState(business_settings.contact_page_text);
    const [contactPageAddress, setContactPageAddress] = useState(business_settings.contact_page_address);
    const [contactPagePhone, setContactPagePhone] = useState(business_settings.contact_page_phone);
    const [contactPageEmail, setContactPageEmail] = useState(business_settings.contact_page_email);
    const [contactPageFacebookLink, setContactPageFacebookLink] = useState(business_settings.contact_page_facebook_link);
    const [contactPageTwitterLink, setContactPageTwitterLink] = useState(business_settings.contact_page_twitter_link);
    const [contactPageInstagramLink, setContactPageInstagramLink] = useState(business_settings.contact_page_instagram_link);
    const [contactPageLinkedinLink, setContactPageLinkedinLink] = useState(business_settings.contact_page_linkedin_link);


    // Quill module
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['clean']
        ]
    }

    // Quill formats
    const formats = [
        'header', 'color', 'background',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
    ]

    // Contact Description
    const onContactTextChange = (html) => {
        setContactPageText(html);
    }


    function updateContactInfo() {
        router.post(route('admin.configuration.update', lang), {
            types: ['contact_page_address', 'contact_page_phone', 'contact_page_email', 'contact_page_text'],
            contact_page_address: contactPageAddress,
            contact_page_phone: contactPagePhone,
            contact_page_email: contactPageEmail,
            contact_page_text: contactPageText,
        }, { preserveScroll: true })
    }

    function updateSocialLink() {
        router.post(route('admin.configuration.update', lang), {
            types: ['contact_page_facebook_link', 'contact_page_twitter_link', 'contact_page_instagram_link', 'contact_page_linkedin_link'],
            contact_page_facebook_link: contactPageFacebookLink,
            contact_page_twitter_link: contactPageTwitterLink,
            contact_page_instagram_link: contactPageInstagramLink,
            contact_page_linkedin_link: contactPageLinkedinLink,
        }, { preserveScroll: true })
    }

    return (
        <AdminLayout>
            <Head title="Contact Page" />
            <div  className="bg-[#FEFEFE] ps-5 py-6">
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
                                <MdContactPhone  className="text-lg text-slate-900" />
                                <span>{t('Contact Page')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Footer Setting */}
                <div  className="card p-5 z-10 rounded-md drop-shadow-xl bg-white border-[1px] border-slate-200 w-11/12 mx-auto">
                    {/* Tabs */}
                    <div  className={active_languages.length < 7 ? `grid grid-cols-${active_languages.length}` : "grid grid-cols-7"}>
                        {
                            active_languages.map((language, i) => (

                                <a key={i} href={route('admin.website.footer_setting', language.code)}  className={lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500'}><span  className="text-sm"> {language.name}</span></a>
                            ))
                        }
                    </div>
                    {/* Footer */}
                    <div  className="mb-4 mt-1 border rounded-md border-slate-200">
                        {/* Contact Info & Social Links */}
                        <div  className="grid grid-cols-2 gap-6 m-6">
                            {/* Contact Info*/}
                            <div  className="bg-[#F2F3F8] rounded-md">
                                <h2  className="text-[18px] font-medium py-4 px-7 border-b">Contact Info</h2>
                                <div  className="space-y-3 py-4">
                                    {/* Contact Address */}
                                    <div  className="px-7">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="contact_page_address">Contact Address</label>
                                        <input onChange={e => setContactPageAddress(e.target.value)} value={contactPageAddress} name='contact_page_address' id='contact_page_address' type="text" placeholder={t('Address')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    </div>
                                    {/* Contact Phone */}
                                    <div  className="px-7">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="contact_page_phone">Contact Phone</label>
                                        <input onChange={e => setContactPagePhone(e.target.value)} value={contactPagePhone} name='contact_page_phone' id='contact_page_phone' type="number" placeholder={t('Phone')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    </div>
                                    {/* Contact Email */}
                                    <div  className="px-7">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="contact_page_email">Contact Email</label>
                                        <input onChange={e => setContactPageEmail(e.target.value)} value={contactPageEmail} name='contact_page_email' id='contact_page_email' type="email" placeholder={t('Email')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                    </div>
                                    {/* Contact Page Text */}
                                    <div  className="px-7">
                                        <label  className='label-text text-slate-600 text-sm' htmlFor="contact_page_text">{t('Contact Page Text')}</label>
                                        <div  className='h-64 w-full border-[1px] bg-white border-slate-300 rounded p-2'>
                                            <Wysiwyg defaultValue={contactPageText} placeholder="Type your text" modules={modules} formats={formats} onWysiwygChange={e => onContactTextChange(e)} />
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <div  className="flex justify-end px-7 py-1">
                                        <button onClick={e => updateContactInfo()}  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Update')}</button>
                                    </div>
                                </div>
                            </div>
                            {/* Social Link */}
                            <div  className="self-start bg-[#F2F3F8] rounded-md pb-3">
                                <div  className="flex items-center justify-between py-4 px-7 border-b">
                                    <h2  className="text-[18px] font-medium">Social Links</h2>
                                </div>
                                {/*Social Links */}
                                <div  className="px-7 pt-3 space-y-2">
                                    <label  className='label-text text-slate-600 text-sm' htmlFor="social_links">{t('Social Links')}</label>
                                    <div  className="space-y-3">
                                        {/* Facebook */}
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaFacebookF  className="text-slate-500" />
                                            </span>
                                            <input onChange={e => setContactPageFacebookLink(e.target.value)} value={contactPageFacebookLink} name='contact_page_facebook_link' id='contact_page_facebook_link' type="url" placeholder={t('http://')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Twitter */}
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaXTwitter  className="text-slate-500" />
                                            </span>
                                            <input onChange={e => setContactPageTwitterLink(e.target.value)} value={contactPageTwitterLink} name='contact_page_twitter_link' id='contact_page_twitter_link' type="url" placeholder={t('http://')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* Instagram  */}
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaInstagram  className="text-slate-500" />
                                            </span>
                                            <input onChange={e => setContactPageInstagramLink(e.target.value)} value={contactPageInstagramLink} name='contact_page_instagram_link' id='contact_page_instagram_link' type="url" placeholder={t('http://')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                        {/* LinkedinIn  */}
                                        <div  className="flex">
                                            <span  className="py-[13px] px-[16px] border-[1px] border-r-0 bg-[#F7F8FA] border-slate-300 block text-slate-600 rounded-s-md ">
                                                <FaLinkedinIn  className="text-slate-500" />
                                            </span>
                                            <input onChange={e => setContactPageLinkedinLink(e.target.value)} value={contactPageLinkedinLink} name='contact_page_linkedin_link' id='contact_page_linkedin_link' type="url" placeholder={t('http://')}  className="p-[13px] focus:outline-none focus:border-[#3390F3] border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-e-md text-sm" />
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <div  className="flex justify-end py-5">
                                        <button onClick={e => updateSocialLink()}  className="bg-[#008FE1] duration-300 py-2 px-10 rounded-md text-white text-md">{t('Update')}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </AdminLayout >
    )

}
