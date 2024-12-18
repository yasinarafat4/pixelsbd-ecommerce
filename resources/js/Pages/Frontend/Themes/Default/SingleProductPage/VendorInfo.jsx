
import ChatWithSellerModel from "@/Components/Popups/ChatWithSellerModel";
import { asset_url, placeholder1_1 } from "@/Helpers";
import { ProductContext } from "@/ProductContext";
import { Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useContext, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function VendorInfo() {
    const { t } = useLaravelReactI18n();
    const [showModal, setShowModal] = useState(false);
    const { auth, business_settings } = usePage().props;
    const product = useContext(ProductContext);

    // Modal Handlers
    function handelShowModal() {
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };

    return (
        <div  className="md:flex lg:flex-col gap-4 items-center justify-evenly space-y-3 md:space-y-0 my-4">
            {/* Chat With Seller Modal */}
            {showModal && <ChatWithSellerModel product={product} closeModal={closeModal} showModal={showModal} />}

            {/* Vendor Container */}
            <div  className="bg-white shadow-lg rounded-md border space-y-6 px-6 py-4 w-full">
                {product.added_by == 'admin' ?
                    <Link href={route('product_list', { 'type': 'inhouse-product' })}>
                        <div  className="flex items-center gap-6 cursor-pointer group">
                            <div  className="avatar">
                                <div  className="border w-16 rounded-full">
                                    <LazyLoadImage
                                        effect='blur'
                                        src={asset_url(business_settings.mobile_logo || placeholder1_1())}
                                        alt={business_settings.website_name}
                                    />
                                </div>
                            </div>
                            <div>
                                <h2  className="text-xl font-semibold">{t('Inhouse Product')}</h2>
                                <p  className="text-xs group-hover:text_secondary duration-300">{t('Visit Store')}</p>
                            </div>
                        </div>

                    </Link> :
                    <>
                        <Link href={route('shop_page', product.user.shop?.slug)}>
                            <div  className="flex items-center gap-6 cursor-pointer group">
                                <div  className="avatar">
                                    <div  className="border w-16 rounded-full">
                                        <LazyLoadImage
                                            effect='blur'
                                            src={asset_url(product.user.shop?.logo || placeholder1_1())}
                                            alt={product.user.shop?.name}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2  className="text-xl font-semibold">{product.user.shop?.name}</h2>
                                    <p  className="text-xs group-hover:text_secondary duration-300">{t('Visit Store')}</p>
                                </div>
                            </div>
                        </Link>
                        <div  className="flex items-center justify-between">
                            <div  className="space-y-1">
                                <img  className="w-6 mx-auto" src="/assets/vendor-info/reviews.png" alt="" />
                                <p  className="space-x-1 text-[13px] text_primary"><span  className="font-bold">{product.reviews.length}</span><span>{t('Reviews')}</span></p>
                            </div>
                            <div  className="divider divider-horizontal"></div>
                            <div  className="space-y-1">
                                <img  className="w-6 mx-auto" src="/assets/vendor-info/products.png" alt="" />
                                <p  className="space-x-1 text-[13px] text_primary"><span  className="font-bold">{product.user.product_count}</span><span>{t('Products')}</span></p>
                            </div>
                        </div>
                    </>
                }

                {(business_settings.conversation_system && auth?.customer) && <button type="button" onClick={e => handelShowModal()}  className="flex items-center justify-center gap-2 bg_primary text-white px-4 py-2 rounded w-full"><BiMessageRoundedDetail  className="text-white text-xl" /><span  className="text-sm xl:text-base">{t('Chat With Seller')}</span></button>}
            </div>
        </div>
    )
}
