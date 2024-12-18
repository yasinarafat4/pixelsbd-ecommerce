import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import React from "react";
import { GoArrowRight } from "react-icons/go";
import HomeSectionTitle from "../HomeSectionTitle";
import FlashDealSlider from "./FlashDealSlider";
import FlashDealTimer from "./FlashDealTimer";


const FeaturedFlashDeal = ({ featured_flash_deal }) => {
    const { t } = useLaravelReactI18n();

    return (
        featured_flash_deal.map((flash_deal, i) => (
            <div key={i} className="flash_deal md:grid grid-cols-12 items-start gap-2">
                <div className="md:col-span-5 lg:col-span-4">
                    <FlashDealTimer flashDeal={flash_deal} />
                </div>
                <div className="md:col-span-7 lg:col-span-8">
                    <div className="flex justify-between items-center border-b mb-3 lg:mb-2 xl:mb-4 py-2 md:py-0 md:pb-2">
                        <div>
                            <HomeSectionTitle title={t('Flash Deal')} />
                            <p className="text-[13px]">{t('Exclusive Deals on')} {flash_deal.title}!</p>
                        </div>
                        <div>
                            <Link href={route('flashSale')} className="flex items-center gap-1 font-medium text_primary hover:text_primary duration-300 text-sm"><span>{t('Browse All')}</span><GoArrowRight className="text-lg font-medium text-slate-600" /></Link>
                        </div>
                    </div>
                    {
                        <FlashDealSlider flashDeal={flash_deal} />
                    }
                </div>
            </div>
        ))
    )

}

export default React.memo(FeaturedFlashDeal);
