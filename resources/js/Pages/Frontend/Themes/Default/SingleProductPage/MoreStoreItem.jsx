import NothingFound from "@/Components/NothingFound";
import MoreStoreItemCardSkeletons from "@/Components/Skeletons/MoreStoreItemCardSkeletons";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";

const LazyMoreStoreItemCard = React.lazy( () => import( '@/Components/Cards/HorizontalProductCard' ) );

export default function MoreStoreItem({ more_store_products }) {
    const { t } = useLaravelReactI18n();

    return (
        <div  className="bg-white shadow-lg rounded-md border p-3 mt-4">
            <h2  className="text-xl font-bold text-start">{t('More From the Store')}</h2>
            {more_store_products.length > 0 ? <div  className="grid grid-cols-1 gap-3">
                {
                    more_store_products.map((store_product, i) => (
                        <div key={i}>
                            {/* <MoreStoreItemCardSkeletons /> */}
                            <Suspense fallback={<MoreStoreItemCardSkeletons />}>
                                <LazyMoreStoreItemCard product={ store_product } />
                            </Suspense>
                        </div>
                    ))
                }
            </div> : <NothingFound title={'No store item found!'} />}
        </div >
    )

}
