import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Benefits() {
    const { t } = useLaravelReactI18n();

    return (
        <div  className="bg-white shadow-lg rounded-md border space-y-6 px-6 py-4 w-full">
            <p  className="flex items-center gap-1"><img  className="w-5" src="/assets/vendor-info/delivery-truck.png" alt="" /> <span  className="text-sm">{t('Fast Delivery All Across the Country')}</span></p>
            <p  className="flex items-center gap-1"><img  className="w-5" src="/assets/vendor-info/credit-card.png" alt="" /> <span  className="text-sm">{t('Safe Payment')}</span></p>
            <p  className="flex items-center gap-1 text-sm"><img  className="w-5" src="/assets/vendor-info/return.png" alt="" />{t('7 Days Return Policy')}
            </p>
            <p  className="flex items-center gap-1"><img  className="w-5" src="/assets/vendor-info/shield.png" alt="" /> <span  className="text-sm">{t('100% Authentic Products')}</span></p>
        </div>
    );
};
