
import { usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiMessageDetail, BiMoneyWithdraw } from 'react-icons/bi';
import { BsHouseGear } from 'react-icons/bs';
import { IoTicketOutline } from 'react-icons/io5';
import { LuArchive, LuFileClock } from 'react-icons/lu';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiPersonSimpleHikeFill } from 'react-icons/pi';
import { RiCoupon2Line, RiFileUploadLine } from 'react-icons/ri';
import { TbClockDollar } from 'react-icons/tb';

export default function sellerMenuList ()
{
    const { t } = useLaravelReactI18n();
    const { seller_conversation_count, seller_ticket_count, seller_cancel_requests_count, seller_order_view_count } = usePage().props

    return [ {

        title: t( 'Dashboard' ),
        route: 'seller.dashboard',
        route_current: 'seller.dashboard',
        icon: <MdOutlineDashboardCustomize  className='text-base' />,
        submenu: [

        ]
    },
    {

        title: t( 'Products' ),
        route: null,
        route_current: 'seller.product.*',
        icon: <LuArchive  className='text-base' />,
        submenu: [
            {
                title: t( 'Add New Products' ),
                route: 'seller.product.products.create',
                route_current: 'seller.product.products.create',
            },
            {
                title: t( 'All Products' ),
                route: 'seller.product.products.index',
                route_current: 'seller.product.products.index',
            },
            // {
            //     title: t('Category Based Discount'),
            //     route: 'seller.product.category_based_discount',
            //     route_current: 'seller.product.category_based_discount',
            // },
            // {
            //     title: t('Product Bulk Upload'),
            //     route: 'seller.product.bulk_import',
            //     route_current: 'seller.product.bulk_import',
            // },
            {
                title: t( 'Product Reviews' ),
                route: 'seller.product.product_reviews',
                route_current: 'seller.product.product_reviews',
            },
            {
                title: t( 'Product Queries' ),
                route: 'seller.product.query.index',
                route_current: 'seller.product.query.index',
            },
        ]
    },
    {
        title: t( 'Orders' ),
        route: 'seller.seller_orders',
        route_current: 'seller.seller_orders',
        icon: <AiOutlineShoppingCart  className='text-base' />,
        indicator: seller_order_view_count ? '!' : '',
        submenu: []
    },
    {
        title: t( 'Delivery Boy' ),
        route: null,
        route_current: 'seller.deliveryboy.*',
        icon: <PiPersonSimpleHikeFill  className='text-lg' />,
        indicator: seller_cancel_requests_count ? '!' : '',
        isPlugin: true,
        submenu: [
            {
                title: t( 'All Delivery Boys' ),
                route: 'seller.deliveryboy.all_delivery_boys',
                route_current: 'seller.deliveryboy.all_delivery_boys',
            },
            {
                title: t( 'Payment Histories' ),
                route: 'seller.deliveryboy.payment_histories',
                route_current: 'seller.deliveryboy.payment_histories',
            },
            {
                title: t( 'Collected Histories' ),
                route: 'seller.deliveryboy.collected_histories',
                route_current: 'seller.deliveryboy.collected_histories',
            },
            {
                title: t( 'Cancel Request' ),
                route: 'seller.deliveryboy.cancel_request',
                route_current: 'seller.deliveryboy.cancel_request',
                indicator: seller_cancel_requests_count || '',
            },
            {
                title: t( 'Configuration' ),
                route: 'seller.deliveryboy.configuration',
                route_current: 'seller.deliveryboy.configuration',
            },

        ]
    },
    {
        title: t( 'Uploaded Files' ),
        route: 'seller.upload.index',
        route_current: 'seller.upload.index',
        icon: <RiFileUploadLine  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Coupon' ),
        route: 'seller.coupon.index',
        route_current: 'seller.coupon.index',
        icon: <RiCoupon2Line  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Shop Setting' ),
        route: 'seller.shop_setting.index',
        route_current: 'seller.shop_setting.index',
        icon: <BsHouseGear  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Payment History' ),
        route: 'seller.payment_history',
        route_current: 'seller.payment_history',
        icon: <TbClockDollar  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Money Withdraw' ),
        route: 'seller.money_withdraw',
        route_current: 'seller.money_withdraw',
        icon: <BiMoneyWithdraw  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Commission History' ),
        route: 'seller.commission_history',
        route_current: 'seller.commission_history',
        icon: <LuFileClock  className='text-lg' />,
        submenu: []
    },
    {
        title: t( 'Conversations' ),
        route: 'seller.conversation',
        route_current: 'seller.conversation',
        icon: <BiMessageDetail  className='text-lg' />,
        indicator: seller_conversation_count ? seller_conversation_count : '',
        submenu: []
    },
    {
        title: t( 'Support Ticket' ),
        route: 'seller.support_ticket',
        route_current: 'seller.support_ticket',
        icon: <IoTicketOutline  className='text-sm' />,
        indicator: seller_ticket_count ? seller_ticket_count : '',
        submenu: []
    },

    ]
}
