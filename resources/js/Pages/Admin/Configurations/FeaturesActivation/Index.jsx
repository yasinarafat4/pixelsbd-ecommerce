import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { VscActivateBreakpoints } from "react-icons/vsc";


export default function Index({ env_data }) {
    const { t } = useLaravelReactI18n();

    const { business_settings } = usePage().props

    const [maintenanceMode, setMaintenanceMode] = useState(business_settings.maintenance_mode)
    const [vendorSystem, setVendorSystem] = useState(business_settings.vendor_system)
    const [walletSystem, setWalletSystem] = useState(business_settings.wallet_system)
    const [couponSystem, setCouponSystem] = useState(business_settings.coupon_system)
    const [conversationSystem, setConversationSystem] = useState(business_settings.conversation_system)
    const [productManageByAdmin, setProductManageByAdmin] = useState(business_settings.product_manage_by_admin)
    const [productApproveByAdmin, setProductApproveByAdmin] = useState(business_settings.product_approve_by_admin)
    const [emailVerification, setEmailVerification] = useState(business_settings.email_verification)
    const [productQueryActivation, setProductQueryActivation] = useState(business_settings.product_query_activation)
    const [guestCheckout, setGuestCheckout] = useState(business_settings.guest_checkout)
    const [facebookLogin, setFacebookLogin] = useState(business_settings.facebook_login)
    const [googleLogin, setGoogleLogin] = useState(business_settings.google_login)
    const [twitterLogin, setTwitterLogin] = useState(business_settings.twitter_login)
    const [appleLogin, setAppleLogin] = useState(business_settings.apple_login)

    let force_https = env_data.value;

    function updateSettings(type, e) {
        router.post(route('admin.configuration.features.activation'), {
            type: type,
            value: e.target.checked
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <AdminLayout>
            <Head title={"Features Activation"} />
            <div  className='p-10 bg-[#FAFBFB]'>
                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600 mb-5">
                    <ul>
                        <li>
                            <Link href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span >{t('Dashboard')}</span>
                            </Link>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <VscActivateBreakpoints  className="text-xl text-slate-900" />
                                <span>{t('Features Activation')}</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div  className="space-y-8">
                    {/* System */}
                    <div>
                        <h2  className="text-2xl mb-2 text-center font-semibold text-[#8F949B]">System</h2>
                        <div  className="grid grid-cols-2 gap-5">
                            {/* HTTPS Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-4 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">HTTPS Activation</h2>
                                </div>
                                <div  className="p-8 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => updateSettings('FORCE_HTTPS', e)} checked={force_https == 'On'}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                            {/* Maintenance Mode Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-4 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Maintenance Mode Activation</h2>
                                </div>
                                <div  className="p-8 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('maintenance_mode', e); setMaintenanceMode(e.target.checked) }} checked={maintenanceMode}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Business Related */}
                    <div  className="space-y-5">
                        <h2  className="text-2xl text-center font-semibold text-[#8F949B]">Business Related</h2>
                        <div  className="grid grid-cols-3 gap-5">
                            {/* Seller System Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Seller System Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('vendor_system', e); setVendorSystem(e.target.checked) }} checked={vendorSystem}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                            {/* Wallet System Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Wallet System Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('wallet_system', e); setWalletSystem(e.target.checked) }} checked={walletSystem}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                            {/* Coupon System Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Coupon System Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('coupon_system', e); setCouponSystem(e.target.checked) }} checked={couponSystem}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                            {/* Conversation Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Conversation Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('conversation_system', e); setConversationSystem(e.target.checked) }} checked={conversationSystem}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                            {/* Product Query Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Product Query Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('product_query_activation', e); setProductQueryActivation(e.target.checked) }} checked={productQueryActivation}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div>
                        </div>
                        <div  className="grid grid-cols-3 gap-5">
                            {/* Seller Product Manage By Admin */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Seller Product Manage By Admin</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('product_manage_by_admin', e); setProductManageByAdmin(e.target.checked) }} checked={productManageByAdmin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    After activate this option Cash On Delivery of Seller product will be managed by Admin.
                                </div>
                            </div>
                            {/* Admin Approval On Seller Product */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Admin Approval On Seller Product</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('product_approve_by_admin', e); setProductApproveByAdmin(e.target.checked) }} checked={productApproveByAdmin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    After activate this option, Admin approval need to seller product.
                                </div>
                            </div>
                            {/* Email Verification */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Email Verification</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('email_verification', e); setEmailVerification(e.target.checked) }} checked={emailVerification}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure SMTP correctly to enable this feature. <Link href={route('admin.configuration.smtp_setting')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                            {/* Guest Checkout Activation */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Guest Checkout Activation</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('guest_checkout', e); setGuestCheckout(e.target.checked) }} checked={guestCheckout}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure SMTP correctly to enable this feature. <Link href={route('admin.configuration.smtp_setting')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                            {/* Wholesale Product for Seller */}
                            {/* <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Wholesale Product for Seller
                                    </h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox"  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div> */}
                            {/* Auction Product for Seller */}
                            {/* <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Auction Product for Seller
                                    </h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox"  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* Social Media Login */}
                    <div  className="space-y-5">
                        <h2  className="text-2xl text-center font-semibold text-[#8F949B]">Social Media Login</h2>
                        <div  className="grid grid-cols-3 gap-5">
                            {/* Facebook login */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Facebook login</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('facebook_login', e); setFacebookLogin(e.target.checked) }} checked={facebookLogin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure Facebook Client correctly to enable this feature. <Link href={route('admin.configuration.social_media_logins')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                            {/* Google login */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Google login</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('google_login', e); setGoogleLogin(e.target.checked) }} checked={googleLogin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure Google Client correctly to enable this feature. <Link href={route('admin.configuration.social_media_logins')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                            {/* Twitter login */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Twitter login</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('twitter_login', e); setTwitterLogin(e.target.checked) }} checked={twitterLogin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure Twitter Client correctly to enable this feature. <Link href={route('admin.configuration.social_media_logins')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                            {/* Apple login */}
                            <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200'>
                                <div  className="border-b py-3 px-5 flex items-center justify-between">
                                    <h2  className="text-[16px] font-medium">Apple login</h2>
                                </div>
                                <div  className="p-6 flex justify-center items-center">
                                    <input type="checkbox" onChange={(e) => { updateSettings('apple_login', e); setAppleLogin(e.target.checked) }} checked={appleLogin}  className="toggle h-[22px] w-[46px] toggle-success" />
                                </div>
                                <div  className="py-3 px-8 mb-6 mx-6 bg-[#CCE5FF] text-xs text-center rounded border border-blue-300">
                                    You need to configure Apple Client correctly to enable this feature. <Link href={route('admin.configuration.social_media_logins')}  className="text-[#3593E1] hover:text-blue-600 duration-300 font-medium">Configure Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
