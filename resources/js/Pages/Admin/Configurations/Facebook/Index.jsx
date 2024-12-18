import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaFacebook } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import FacebookChatSetting from "./Partials/FacebookChatSetting";
import FacebookCommentSetting from "./Partials/FacebookCommentSetting";
import FacebookPixelSetting from "./Partials/FacebookPixelSetting";

export default function Index ()
{
    const { t } = useLaravelReactI18n();



    return (
        <AdminLayout>
            <Head title={ "Facebook" } />
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
                                    <FaFacebook  className="text-base text-slate-900" />
                                    <span>{ t( 'Facebook' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-1 gap-5">
                    {/* Facebook Chat Setting */ }
                    <FacebookChatSetting />
                    {/* Facebook Comment Setting */ }
                    <FacebookCommentSetting />
                    {/* Facebook Pixel Setting */ }
                    <FacebookPixelSetting />
                </div>
            </div>
        </AdminLayout>
    )

}
