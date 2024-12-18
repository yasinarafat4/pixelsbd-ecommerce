import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import GoogleAnalyticsSetting from "./Partials/GoogleAnalyticsSetting";
import GoogleReCaptchaSetting from "./Partials/GoogleReCaptchaSetting";

export default function Index ()
{
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={ "Google" } />
            <div  className='px-6 pt-6 pb-16'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <AiFillGoogleCircle  className="text-xl text-slate-900" />
                                    <span>{ t( 'Google' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-1 gap-5">
                    {/* Google Analytics Setting */ }
                    <GoogleAnalyticsSetting />
                    {/* Google reCaptcha Setting */ }
                    <GoogleReCaptchaSetting />
                    {/* Google Map Setting*/ }
                    {/* <GoogleMapSetting /> */}
                    {/* Google Firebase Setting*/ }
                    {/* <GoogleFirebaseSetting /> */}
                </div>
            </div>
        </AdminLayout>
    )

}
