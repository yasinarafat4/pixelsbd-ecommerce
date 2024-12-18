import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";

const LazyWishlistCard = React.lazy(() => import('@/Components/Cards/WishlistCard'));

export default function Wishlist() {

    const { wishlists } = usePage().props;

    // const [wishlistData, setWishlistData] = useState(wishlists.data)

    function onWishlistClick() {
        router.visit(route('wishlist'))
    }

    const { t } = useLaravelReactI18n();
    return (
        <UserDashboardLayout>
            {/* Page Title */}
            <Head title="Wishlist" />
            <div>
                <h1 className="text-lg md:text-xl lg:text-[22px] font-bold py-2">{t('Wishlist')}</h1>
                <hr />
                <div className="mt-4">
                    {wishlists.meta.total > 0 ?
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-2">
                                {
                                    wishlists.data.map((wishlist, i) => (
                                        <div key={i} className="z-[1]">
                                            <Suspense fallback={<ProductCardSkeletons />}>
                                                <LazyWishlistCard onWishlistClick={onWishlistClick} product={wishlist.product} />
                                            </Suspense>
                                        </div>
                                    ))
                                }
                            </div>
                            <hr />
                            <div className="flex justify-between items-center">
                                <p className='text-slate-600 text-sm'>Showing {wishlists.meta.from || 0} to {wishlists.meta.to || 0} of {wishlists.meta.total}</p>
                                <Pagination links={wishlists.meta.links} />
                            </div>
                        </div> :
                        <><NothingFound title={t('No Wiishlist Product Found!')} /></>
                    }
                </div> </div>
        </UserDashboardLayout>
    )

}
