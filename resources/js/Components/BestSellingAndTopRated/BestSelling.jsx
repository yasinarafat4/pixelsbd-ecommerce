import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React, { Suspense } from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import { GoArrowRight } from "react-icons/go";
import HorizontalProductCardSkeletons from "../Skeletons/HorizontalProductCardSkeletons";
const LazyBestSellingCard = React.lazy(() => import('@/Components/Cards/HorizontalProductCard'));

const BestSelling = ({ best_selling }) => {
    const { t } = useLaravelReactI18n();
    return (
        <div className="best_selling border px-2 xl:px-3 py-3 rounded-sm">
            <div className="flex justify-between items-center pb-1">
                <div className="flex items-center gap-2">
                    <GiLaurelsTrophy className="trophy" />
                    <h2 className="text-center text-xl font-semibold text-slate-600">{t('Best Sellings')}</h2>
                </div>
                <Link href={route('product_list', [{ 'type': 'best-selling' }])} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-2 xl:gap-3'}>
                {best_selling.map((product, i) => (
                    <div key={i}>
                        {/* <NewArrivalsCardSkeletons /> */}
                        <Suspense fallback={<HorizontalProductCardSkeletons />}>
                            <LazyBestSellingCard product={product} />
                        </Suspense>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default React.memo(BestSelling)
