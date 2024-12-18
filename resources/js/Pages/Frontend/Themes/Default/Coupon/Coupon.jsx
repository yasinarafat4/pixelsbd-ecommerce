/* eslint-disable */

import { fetchCouponsData } from "@/Api";
import NothingFound from "@/Components/NothingFound";
import PageTitle from "@/Components/PageTitle/PageTitle";
import CouponSkeletons from "@/Components/Skeletons/CouponSkeletons";
import { asset_url, placeholder1_1 } from "@/Helpers";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head, usePage } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { RxCopy } from "react-icons/rx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";

export default function Coupon() {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const { data, isLoading, isError } = useQuery({
        queryKey: ['couponsData'], queryFn: fetchCouponsData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000,
        refetchOnMount: false, refetchOnWindowFocus: false
    });
    console.log('couponsData', data);

    function onCopyCode(code) {
        try {
            navigator.clipboard.writeText(code);
            toast.success('Coupon Code Copied!')
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }

    return (
        <DefaultThemeLayout>
            <Head title="Coupon" />
            {/* Top section */}
            <div className="border-b py-2">
                <PageTitle title={'Coupons'} />
            </div>
            {isLoading ? <CouponSkeletons /> : <>{data.data.length > 0 ?
                <div className="py-2 md:py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                    {data.data.map((coupon, index) => {
                        return <div key={index} className={`relative border rounded-lg p-4 h-[200px] w-full ${coupon.type == "product_base" ? "bg-gradient-to-r from-teal-600 to-blue-400" : coupon.type == "cart_base" ? "bg-gradient-to-r from-[#E1563E] to-[#C72734]" : "bg-gradient-to-r from-[#413ee1] to-[#6c74ee]"}`}>
                            <div className="flex justify-between">
                                <h3 className="font-bold">
                                    {coupon.user_type == "seller" ? coupon.user.shop.name : business_settings.website_name}</h3>
                                <a href={coupon.user_type == "seller" ? route('shop_page', coupon.user.shop.slug) : route('product_list', { 'type': 'inhouse-product' })} className="text-[12px] font-medium underline">{t('Visit Store')}</a>
                            </div>
                            <p className="text-xl font-bold my-2">{coupon.discount} OFF</p>
                            <div className="border-dashed border-t py-2"></div>
                            {coupon.type == "product_base" &&
                                <div className="flex items-end space-x-2 justify-start pb-6">
                                    {coupon.products.slice(0, 3).map((product, i) => (
                                        <div key={i} className="p-1 border border-slate-400 hover:border-white cursor-pointer duration-300">
                                            <div className="w-8 h-8 md:h-12 md:w-12 object-cover">
                                                <LazyLoadImage
                                                    className='w-full h-full pointer-events-none mix-blend-multiply'
                                                    src={asset_url(product?.thumbnail_image || placeholder1_1())}
                                                    alt={product?.name}
                                                    effect='blur'
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {
                                        coupon.products.length > 3 && <span className="text-sm"> and {coupon.products.length - 3} more product.</span>}
                                </div>
                            }
                            {
                                coupon.type == "cart_base" &&
                                <div className="pb-6">
                                    <p className="text-xs">Min Spend {coupon.
                                        minimum_buy} from shop name to get {coupon.discount} OFF on total orders</p>
                                </div>
                            }
                            <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                <p className="font-mono text-sm">Code: {coupon.code}</p>
                                <span onClick={e => onCopyCode(coupon.code)} data-tip="Copy the code" className="cursor-pointer tooltip"><RxCopy className="text-sm" /></span>
                            </div>
                        </div>
                    })}
                </div> : <NothingFound title={"No Coupon Found!"} />}</>}
        </DefaultThemeLayout>
    );
}
