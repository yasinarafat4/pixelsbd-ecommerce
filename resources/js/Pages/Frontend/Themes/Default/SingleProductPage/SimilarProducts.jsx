
import NothingFound from "@/Components/NothingFound";
import ProductCardSkeletons from "@/Components/Skeletons/ProductCardSkeletons";
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";
import { GoArrowRight } from "react-icons/go";

const LazyProductCard = React.lazy(() => import('@/Components/Cards/ProductCard'));

export default function SimilarProducts({ similar_products, product }) {

    const { t } = useLaravelReactI18n();

    return (
        <div  className="border rounded-sm p-4 my-4">
            <div  className="flex items-center justify-between border-b pb-1">
                <h2  className="text-xl font-bold text-start">{t('Similar Products')}</h2>
                {similar_products.length > 0 && <Link href={route('catgeory_wise_product', { 'slug': product.category.slug })}  className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight  className="text-lg font-medium text-slate-600" /></Link>
                }
            </div>

            {similar_products.length > 0 ?
                <div  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 xl:gap-4 pt-4">
                    {
                        similar_products.map((similar_product, i) => (
                            <div key={i}  className="z-[1]">
                                <Suspense fallback={<ProductCardSkeletons />}>
                                    <LazyProductCard product={similar_product} />
                                </Suspense>
                            </div>
                        ))
                    }
                </div> : <NothingFound title={'Nothing Found!'} />}
        </div>
    )

}
