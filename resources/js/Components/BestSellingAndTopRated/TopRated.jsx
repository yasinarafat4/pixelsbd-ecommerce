import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";
import { FcRating } from "react-icons/fc";
import { GoArrowRight } from "react-icons/go";
import HorizontalProductCardSkeletons from "../Skeletons/HorizontalProductCardSkeletons";
const LazyTopRatedCard = React.lazy(() => import('@/Components/Cards/HorizontalProductCard'));

const TopRated = ({ top_rated }) => {
    const { t } = useLaravelReactI18n();
    return (
        <div className="top_rated border px-2 xl:px-3 py-3 rounded-sm">
            <div className="flex justify-between items-center pb-1">
                <div className="flex items-center gap-2">
                    <FcRating className="text-xl" />
                    <h2 className="text-center text-xl font-semibold text-slate-600">{t('Top Rated')}</h2>
                </div>
                <Link href={route('product_list', [{ 'type': 'top-rated' }])} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2 xl:gap-3'}>
                {top_rated.map((product, i) => (
                    <div key={i}>
                        {/* <NewArrivalsCardSkeletons /> */}
                        <Suspense fallback={<HorizontalProductCardSkeletons />}>
                            <LazyTopRatedCard product={product} />
                        </Suspense>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default React.memo(TopRated)
