

import { useLaravelReactI18n } from "laravel-react-i18n";

const Show = ({ data, routes }) =>
    {
    const { t } = useLaravelReactI18n();
    return (
        <></>
    );
};

// eslint-disable-next-line react/jsx-no-undef
Show.layout = page => <Layout title="Detail {{moduleTitle}}" />;
export default Show;
