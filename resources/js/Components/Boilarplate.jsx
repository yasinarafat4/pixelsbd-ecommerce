import { useLaravelReactI18n } from "laravel-react-i18n";

export default function name() {
    const { t} = useLaravelReactI18n();


    return (
        <>{t('Boilarplate')}</>
    )

}
