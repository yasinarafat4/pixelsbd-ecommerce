/* eslint-disable */

import { useLaravelReactI18n } from "laravel-react-i18n";

const Show = ({ data, routes }) =>
    {
    const { t } = useLaravelReactI18n();
    return (
        <></>
    );
};

 
Show.layout = page => <Layout children={ page } title="Detail {{moduleTitle}}" />;
export default Show;
