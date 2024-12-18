
import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { AiOutlinePieChart } from 'react-icons/ai';
import { BiSolidUserDetail } from 'react-icons/bi';
import { BsShopWindow } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { GrSystem } from "react-icons/gr";
import { IoMegaphoneOutline } from 'react-icons/io5';
import { LuArchive } from 'react-icons/lu';
import { MdOutlineDashboardCustomize, MdOutlineDisplaySettings, MdOutlinePhonelinkLock } from 'react-icons/md';
import { PiPersonSimpleHikeFill } from 'react-icons/pi';
import { RiFileUploadLine } from 'react-icons/ri';
import { TbSettingsCog, TbUserSquare } from 'react-icons/tb';
import { TfiHeadphoneAlt } from "react-icons/tfi";

export default function adminMenuList ()
{
    const { t } = useLaravelReactI18n();
    const { admin_conversation_count, admin_ticket_count, userpermission, business_settings, admin_cancel_requests_count, admin_order_view_count } = usePage().props


    return [
        {
            can: userpermission.includes( 'Dashboard' ),
            title: t( 'Dashboard' ),
            route: 'admin.dashboard',
            route_current: 'admin.dashboard',
            icon: <MdOutlineDashboardCustomize  className='text-base' />,
            submenu: [

            ]
        },
        {
            can: userpermission.includes( 'Products' ),
            title: t( 'Products' ),
            route: null,
            route_current: 'admin.product.*',
            icon: <LuArchive  className='text-base' />,
            submenu: [
                {
                    can: userpermission.includes( 'Create Product' ),
                    title: t( 'Add New Products' ),
                    route: 'admin.product.products.create',
                    route_current: 'admin.product.products.create',
                },
                {
                    can: userpermission.includes( 'All Products' ),
                    title: t( 'All Products' ),
                    route: 'admin.product.products.index',
                    route_current: 'admin.product.products.index',
                },
                {
                    can: userpermission.includes( 'In House Products' ),
                    title: t( 'In House Products' ),
                    route: 'admin.product.admin',
                    route_current: 'admin.product.admin',
                },
                {
                    can: userpermission.includes( 'Seller Products' ) && business_settings.vendor_system,
                    title: t( 'Seller Products' ),
                    route: 'admin.product.seller',
                    route_current: 'admin.product.seller',
                },
                // {
                //     can: userpermission.includes( 'Bulk Import' ),
                //     title: t( 'Bulk Import' ),
                //     route: 'admin.product.bulk_import',
                //     route_current: 'admin.product.bulk_import',
                // },
                // {
                //     can: userpermission.includes( 'Bulk Export' ),
                //     title: t( 'Bulk Export' ),
                //     route: 'admin.product.bulk_import',
                //     route_current: 'admin.product.bulk_import',
                // },
                {
                    can: userpermission.includes( 'Categories' ),
                    title: t( 'Categories' ),
                    route: 'admin.product.category.index',
                    route_current: 'admin.product.category.index',
                },
                // {
                //     can: userpermission.includes( 'Category Based Discount' ),
                //     title: t( 'Category Based Discount' ),
                //     route: 'admin.product.category_based_discount',
                //     route_current: 'admin.product.category_based_discount',
                // },
                {
                    can: userpermission.includes( 'Brands' ),
                    title: t( 'Brands' ),
                    route: 'admin.product.brand.index',
                    route_current: 'admin.product.brand.index',
                },
                {
                    can: userpermission.includes( 'Colors' ),
                    title: t( 'Colors' ),
                    route: 'admin.product.color.index',
                    route_current: 'admin.product.color.index',
                },
                {
                    can: userpermission.includes( 'Attributes' ),
                    title: t( 'Attributes' ),
                    route: 'admin.product.attribute.index',
                    route_current: 'admin.product.attribute.index',
                },
                {
                    can: userpermission.includes( 'Product Reviews' ),
                    title: t( 'Product Reviews' ),
                    route: 'admin.product.product_review',
                    route_current: 'admin.product.product_review',
                },
            ]
        },
        {
            can: userpermission.includes( 'Orders' ),
            title: t( 'Orders' ),
            route: null,
            route_current: 'admin.orders.*',
            icon: <FaChartBar  className='text-base' />,
            indicator: admin_order_view_count ? '!' : '',
            submenu: [
                {
                    can: userpermission.includes( 'All Orders' ),
                    title: t( 'All Orders' ),
                    route: 'admin.orders.index',
                    route_current: 'admin.orders.index',
                },
                {
                    can: userpermission.includes( 'Inhouse Orders' ),
                    title: t( 'Inhouse Orders' ),
                    route: 'admin.orders.inhouse_orders',
                    route_current: 'admin.orders.inhouse_orders',
                },
                {
                    can: userpermission.includes( 'Seller Orders' ) && business_settings.vendor_system,
                    title: t( 'Seller Orders' ),
                    route: 'admin.orders.seller_orders',
                    route_current: 'admin.orders.seller_orders',
                },
            ]
        },
        {
            can: userpermission.includes( 'Delivery Boy' ),
            title: t( 'Delivery Boy' ),
            route: null,
            route_current: 'admin.deliveryboy.*',
            icon: <PiPersonSimpleHikeFill  className='text-lg' />,
            indicator: admin_cancel_requests_count ? '!' : '',
            isPlugin: true,
            submenu: [
                {
                    can: userpermission.includes( 'All Delivery Boys' ),
                    title: t( 'All Delivery Boys' ),
                    route: 'admin.deliveryboy.all_delivery_boys',
                    route_current: 'admin.deliveryboy.all_delivery_boys',
                },
                {
                    can: userpermission.includes( 'Payment Histories' ),
                    title: t( 'Payment Histories' ),
                    route: 'admin.deliveryboy.payment_histories',
                    route_current: 'admin.deliveryboy.payment_histories',
                },
                {
                    can: userpermission.includes( 'Collected Histories' ),
                    title: t( 'Collected Histories' ),
                    route: 'admin.deliveryboy.collected_histories',
                    route_current: 'admin.deliveryboy.collected_histories',
                },
                {
                    can: userpermission.includes( 'Delivery Boy Cancel Request' ),
                    title: t( 'Cancel Requests' ),
                    route: 'admin.deliveryboy.cancel_request',
                    route_current: 'admin.deliveryboy.cancel_request',
                    indicator: admin_cancel_requests_count || '',
                },
                {
                    can: userpermission.includes( 'Delivery Boy Configuration' ),
                    title: t( 'Configurations' ),
                    route: 'admin.deliveryboy.configuration',
                    route_current: 'admin.deliveryboy.configuration',
                },

            ]
        },
        {
            can: userpermission.includes( 'Customers' ),
            title: t( 'Customers' ),
            route: null,
            route_current: 'admin.customer.*',
            icon: <BiSolidUserDetail  className='text-xl' />,
            submenu: [
                {
                    can: userpermission.includes( 'All Customers' ),
                    title: t( 'All Customers' ),
                    route: 'admin.customer.index',
                    route_current: 'admin.customer.index',
                },
            ]
        },
        {
            can: userpermission.includes( 'Sellers' ) && business_settings.vendor_system,
            title: t( 'Sellers' ),
            route: null,
            route_current: 'admin.seller.*',
            icon: <BsShopWindow  className='text-base' />,
            submenu: [
                {
                    can: userpermission.includes( 'Create Seller' ),
                    title: t( 'Add New Seller' ),
                    route: 'admin.seller.create',
                    route_current: 'admin.seller.create',
                },
                {
                    can: userpermission.includes( 'All Sellers' ),
                    title: t( 'All Sellers' ),
                    route: 'admin.seller.index',
                    route_current: 'admin.seller.index',
                },
                {
                    can: userpermission.includes( 'Seller Payouts' ),
                    title: t( 'Payouts' ),
                    route: 'admin.seller.payouts',
                    route_current: 'admin.seller.payouts',
                },
                {
                    can: userpermission.includes( 'Seller Payout Requests' ),
                    title: t( 'Payout Requests' ),
                    route: 'admin.seller.payout_requests',
                    route_current: 'admin.seller.payout_requests',
                },
                {
                    can: userpermission.includes( 'Seller Commission' ),
                    title: t( 'Seller Commission' ),
                    route: 'admin.seller.seller_commission',
                    route_current: 'admin.seller.seller_commission',
                },
                {
                    can: userpermission.includes( 'Seller Verification Form' ),
                    title: t( 'Seller Verification Form' ),
                    route: 'admin.seller.seller_verification_form',
                    route_current: 'admin.seller.seller_verification_form',
                },
            ]
        },
        {
            can: userpermission.includes( 'Reports' ),
            title: t( 'Reports' ),
            route: null,
            route_current: 'admin.report.*',
            icon: <AiOutlinePieChart  className='text-xl' />,
            submenu: [
                {
                    can: userpermission.includes( 'Earning Report' ),
                    title: t( 'Earning Report' ),
                    route: 'admin.report.earning_report',
                    route_current: 'admin.report.earning_report',
                },
                {
                    can: userpermission.includes( 'Inhouse Productsale' ),
                    title: t( 'Inhouse Productsale' ),
                    route: 'admin.report.inhouse_product_sale',
                    route_current: 'admin.report.inhouse_product_sale',
                },
                {
                    can: userpermission.includes( 'Seller Productsale' ) && business_settings.vendor_system,
                    title: t( 'Seller Product Sale' ),
                    route: 'admin.report.seller_product_sale',
                    route_current: 'admin.report.seller_product_sale',
                },
                {
                    can: userpermission.includes( 'Products Stock' ),
                    title: t( 'Products Stock' ),
                    route: 'admin.report.products_stock',
                    route_current: 'admin.report.products_stock',
                },
                {
                    can: userpermission.includes( 'Products Wishlist' ),
                    title: t( 'Products Wishlist' ),
                    route: 'admin.report.products_wishlist',
                    route_current: 'admin.report.products_wishlist',
                },
                {
                    can: userpermission.includes( 'User Searches' ),
                    title: t( 'User Searches' ),
                    route: 'admin.report.user_searches',
                    route_current: 'admin.report.user_searches',
                },
                {
                    can: userpermission.includes( 'Commission History' ),
                    title: t( 'Commission History' ),
                    route: 'admin.report.commission_history',
                    route_current: 'admin.report.commission_history',
                },
                {
                    can: userpermission.includes( 'Wallet Recharge History' ),
                    title: t( 'Wallet Recharge History' ),
                    route: 'admin.report.wallet_recharge_history',
                    route_current: 'admin.report.wallet_recharge_history',
                },
            ]
        },
        {
            can: userpermission.includes( 'Blogs' ),
            title: t( 'Blogs' ),
            route: null,
            route_current: 'admin.blog.*',
            icon: <FaPenToSquare  className='text-base' />,
            submenu: [
                {
                    can: userpermission.includes( 'All Blogs' ),
                    title: t( 'All Posts' ),
                    route: 'admin.blog.blogs.index',
                    route_current: 'admin.blog.blogs.index',
                },
                {
                    can: userpermission.includes( 'Blog Categories' ),
                    title: t( 'Categories' ),
                    route: 'admin.blog.blogcategory.index',
                    route_current: 'admin.blog.blogcategory.index',
                },
            ]
        },
        {
            can: userpermission.includes( 'Marketing' ),
            title: t( 'Marketing' ),
            route: null,
            route_current: 'admin.marketing.*',
            icon: <IoMegaphoneOutline  className='text-lg' />,
            submenu: [
                {
                    can: userpermission.includes( 'Flash Deals' ),
                    title: t( 'Flash Deals' ),
                    route: 'admin.marketing.flashdeal.index',
                    route_current: 'admin.marketing.flashdeal.*',
                },
                {
                    can: userpermission.includes( 'Dynamic Pop-up' ),
                    title: t( 'Dynamic Pop-up' ),
                    route: 'admin.marketing.dynamicpopup.index',
                    route_current: 'admin.marketing.dynamicpopup.*',
                },
                {
                    can: userpermission.includes( 'Newsletters' ),
                    title: t( 'Newsletters' ),
                    route: 'admin.marketing.newsletters',
                    route_current: 'admin.marketing.newsletters',
                },
                {
                    can: userpermission.includes( 'Notifications' ),
                    title: t( 'Notifications' ),
                    route: null,
                    route_current: 'admin.marketing.notification*',
                    submenu: [
                        {
                            can: userpermission.includes( 'Notification Settings' ),
                            title: t( 'Notification Settings' ),
                            route: 'admin.marketing.notification.notification_settings',
                            route_current: 'admin.marketing.notification.notification_settings',
                        },
                        {
                            can: userpermission.includes( 'Notification Types' ),
                            title: t( 'Notification Types' ),
                            route: 'admin.marketing.notification.notification_types',
                            route_current: 'admin.marketing.notification.notification_types',
                        },
                        {
                            can: userpermission.includes( 'Custom Notification' ),
                            title: t( 'Custom Notification' ),
                            route: 'admin.marketing.notification.custom_notification',
                            route_current: 'admin.marketing.notification.custom_notification',
                        },
                        {
                            can: userpermission.includes( 'Custom Notification History' ),
                            title: t( 'Custom Notification History' ),
                            route: 'admin.marketing.notification.custom_notification_history',
                            route_current: 'admin.marketing.notification.custom_notification_history',
                        },
                    ]
                },
                {
                    can: userpermission.includes( 'Subscribers' ),
                    title: t( 'Subscribers' ),
                    route: 'admin.marketing.subscribers',
                    route_current: 'admin.marketing.subscribers',
                },
                {
                    can: userpermission.includes( 'Coupons' ),
                    title: t( 'Coupons' ),
                    route: 'admin.marketing.coupon.index',
                    route_current: 'admin.marketing.coupon.index',
                },
            ]
        },
        {
            can: userpermission.includes( 'Support' ),
            title: t( 'Support' ),
            route: null,
            route_current: 'admin.support.*',
            indicator: admin_ticket_count || admin_conversation_count ? '!' : '',
            icon: <TfiHeadphoneAlt  className='text-sm' />,
            submenu: [
                {
                    can: userpermission.includes( 'Support Tickets' ),
                    title: t( 'Tickets' ),
                    route: 'admin.support.tickets.index',
                    route_current: 'admin.support.tickets.index',
                    indicator: admin_ticket_count ? admin_ticket_count : '',
                },
                {
                    can: userpermission.includes( 'Product Conversations' ),
                    title: t( 'Product Conversations' ),
                    route: 'admin.support.conversations',
                    route_current: 'admin.support.conversations',
                    indicator: admin_conversation_count ? admin_conversation_count : ''
                },
                {
                    can: userpermission.includes( 'Product Queries' ) && business_settings.product_query_activation,
                    title: t( 'Product Queries' ),
                    route: 'admin.support.query.index',
                    route_current: 'admin.support.query.index',
                },
                {
                    can: userpermission.includes( 'Contact Messages' ),
                    title: t( 'Contact Messages' ),
                    route: 'admin.support.contact_messages',
                    route_current: 'admin.support.contact_messages',
                },
            ]
        },
        {
            can: userpermission.includes( 'OTP System' ),
            title: t( 'OTP System' ),
            route: null,
            route_current: 'admin.otp.*',
            icon: <MdOutlinePhonelinkLock  className='text-lg' />,
            isPlugin: true,
            submenu: [
                {
                    can: userpermission.includes( 'OTP Configuration' ),
                    title: t( 'OTP Configuration' ),
                    route: 'admin.otp.otp_configuration',
                    route_current: 'admin.otp.otp_configuration',
                },
                {
                    can: userpermission.includes( 'SMS Templates' ),
                    title: t( 'SMS Templates' ),
                    route: 'admin.otp.sms_templates',
                    route_current: 'admin.otp.sms_templates',
                },
            ]
        },
        {
            can: userpermission.includes( 'Uploaded Files' ),
            title: t( 'Uploaded Files' ),
            route: 'admin.upload.index',
            route_current: 'admin.upload.*',
            icon: <RiFileUploadLine  className='text-lg' />,
            submenu: []
        },
        {
            can: userpermission.includes( 'Website Setup' ),
            title: t( 'Website Setup' ),
            route: null,
            route_current: 'admin.website.*',
            icon: <MdOutlineDisplaySettings  className='text-lg' />,
            submenu: [
                {
                    can: userpermission.includes( 'Appearance' ),
                    title: t( 'Appearance' ),
                    route: 'admin.website.appearence',
                    route_current: 'admin.website.appearence',
                },
                {
                    can: userpermission.includes( 'Select Theme' ),
                    title: t( 'Select Theme' ),
                    route: 'admin.website.select_theme',
                    route_current: 'admin.website.select_theme',
                },
                {
                    can: userpermission.includes( 'Homepage Settings' ),
                    title: t( 'Homepage Settings' ),
                    route: 'admin.website.homepage_setting',
                    route_current: 'admin.website.homepage_setting',
                },
                {
                    can: userpermission.includes( 'Website Pages' ),
                    title: t( 'Pages' ),
                    route: 'admin.website.pages.index',
                    route_current: 'admin.website.pages.index',
                },
                {
                    can: userpermission.includes( 'Website Header' ),
                    title: t( 'Header' ),
                    route: 'admin.website.header_setting',
                    route_current: 'admin.website.header_setting',
                },
                {
                    can: userpermission.includes( 'Website Footer' ),
                    title: t( 'Footer' ),
                    route: 'admin.website.footer_setting',
                    route_current: 'admin.website.footer_setting',
                },
                {
                    can: userpermission.includes( 'Benefits' ),
                    title: t( 'Benefits' ),
                    route: 'admin.website.benefits',
                    route_current: 'admin.website.benefits',
                },
                {
                    can: userpermission.includes( 'Website Contact' ),
                    title: t( 'Contact Page' ),
                    route: 'admin.website.contact_page',
                    route_current: 'admin.website.contact_page',
                },
            ]
        },
        {
            can: userpermission.includes( 'Setup Configurations' ),
            title: t( 'Setup Configurations' ),
            route: null,
            route_current: 'admin.configuration.*',
            icon: <TbSettingsCog  className='text-lg' />,
            submenu: [
                {
                    can: userpermission.includes( 'Features Activation' ),
                    title: t( 'Features Activation' ),
                    route: 'admin.configuration.features_activation',
                    route_current: 'admin.configuration.features_activation',
                },
                {
                    can: userpermission.includes( 'Language' ),
                    title: t( 'Language' ),
                    route: 'admin.configuration.language.index',
                    route_current: 'admin.configuration.language.index',
                },
                {
                    can: userpermission.includes( 'Currency' ),
                    title: t( 'Currency' ),
                    route: 'admin.configuration.currency.index',
                    route_current: 'admin.configuration.currency.index',
                },
                {
                    can: userpermission.includes( 'SMTP Settings' ),
                    title: t( 'SMTP Settings' ),
                    route: 'admin.configuration.smtp_setting',
                    route_current: 'admin.configuration.smtp_setting',
                },
                {
                    can: userpermission.includes( 'Payment Methods' ),
                    title: t( 'Payment Methods' ),
                    route: 'admin.configuration.payment_method',
                    route_current: 'admin.configuration.payment_method',
                },
                {
                    can: userpermission.includes( 'Social Media Logins' ),
                    title: t( 'Social Media Logins' ),
                    route: 'admin.configuration.social_media_logins',
                    route_current: 'admin.configuration.social_media_logins',
                },
                {
                    can: userpermission.includes( 'Facebook' ),
                    title: t( 'Facebook' ),
                    route: 'admin.configuration.facebook',
                    route_current: 'admin.configuration.facebook',
                },
                {
                    can: userpermission.includes( 'Google' ),
                    title: t( 'Google' ),
                    route: 'admin.configuration.google',
                    route_current: 'admin.configuration.google',
                },
                {
                    can: userpermission.includes( 'Pusher' ),
                    title: t( 'Pusher' ),
                    route: 'admin.configuration.pusher',
                    route_current: 'admin.configuration.pusher',
                },
                {
                    can: userpermission.includes( 'Shipping' ),
                    title: t( 'Shipping' ),
                    route: null,
                    route_current: 'admin.configuration.shipping.*',
                    submenu: [
                        {
                            can: userpermission.includes( 'Shipping Configuration' ),
                            title: t( 'Shipping Configuration' ),
                            route: 'admin.configuration.shipping.shipping_configuration',
                            route_current: 'admin.configuration.shipping.shipping_configuration',
                        },
                        {
                            can: userpermission.includes( 'Shipping Countries' ),
                            title: t( 'Shipping Countries' ),
                            route: 'admin.configuration.shipping.country.index',
                            route_current: 'admin.configuration.shipping.country.index',
                        },
                        {
                            can: userpermission.includes( 'Shipping States' ),
                            title: t( 'Shipping States' ),
                            route: 'admin.configuration.shipping.state.index',
                            route_current: 'admin.configuration.shipping.state.index',
                        },
                        {
                            can: userpermission.includes( 'Shipping Cities' ),
                            title: t( 'Shipping Cities' ),
                            route: 'admin.configuration.shipping.city.index',
                            route_current: 'admin.configuration.shipping.city.index',
                        },
                    ]
                },
            ]
        },
        {
            can: userpermission.includes( 'Staffs' ),
            title: t( 'Staffs' ),
            route: null,
            route_current: 'admin.staff.*',
            icon: <TbUserSquare  className='text-lg' />,
            submenu: [
                {
                    can: userpermission.includes( 'All Staffs' ),
                    title: t( 'All Staffs' ),
                    route: 'admin.staff.staffs.index',
                    route_current: 'admin.staff.staffs.index',
                },
                {
                    can: userpermission.includes( 'Role' ),
                    title: t( 'Role' ),
                    route: 'admin.staff.role.index',
                    route_current: 'admin.staff.role.index',
                },
            ]
        },
        {
            can: userpermission.includes( 'System' ),
            title: t( 'System' ),
            route: null,
            route_current: 'admin.language.*',
            icon: <GrSystem  className='text-base' />,
            submenu: [
                {
                    can: userpermission.includes( 'Update' ),
                    title: t( 'Update' ),
                    route: 'admin.system.update_system',
                    route_current: 'admin.system.update_system',
                },
                {
                    can: userpermission.includes( 'Server Status' ),
                    title: t( 'Server Status' ),
                    route: 'admin.system.server_status',
                    route_current: 'admin.system.server_status',
                },

            ]
        },
        // {
        //     can: userpermission.includes( 'Addon Manager' ),
        //     title: t( 'Addon Manager' ),
        //     route: null,
        //     route_current: 'admin.addon*',
        //     icon: <FaPuzzlePiece  className='text-base' />,
        //     submenu: [
        //         {
        //             can: userpermission.includes( 'Installed Addons' ),
        //             title: t( 'Installed Addons' ),
        //             route: 'admin.addon.installed_addon',
        //             route_current: 'admin.addon.installed_addon',
        //         },
        //         {
        //             can: userpermission.includes( 'Available Addons' ),
        //             title: t( 'Available Addons' ),
        //             route: 'admin.addon.available_addon',
        //             route_current: 'admin.addon.available_addon',
        //         },
        //     ]
        // },
    ]
}
