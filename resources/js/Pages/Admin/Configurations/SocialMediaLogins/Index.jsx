
import EmptyData from "@/Components/EmptyData";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";

import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdSpaceDashboard } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import AppleLogin from "./Partials/AppleLogin";
import FacebookLogin from "./Partials/FacebookLogin";
import GoogleLogin from "./Partials/GoogleLogin";
import TwitterLogin from "./Partials/TwitterLogin";

export default function Index({ env_data }) {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    return (
        <AdminLayout>
            <Head title={"Social Media Logins"} />
            <div className='p-10 bg-[#FAFBFB]'>
                {/* Breadcrumbs */}
                <div className="text-sm breadcrumbs text-slate-600 mb-5">
                    <ul>
                        <li>
                            <Link href={route('admin.dashboard')} className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </Link>
                        </li>
                        <li>
                            <span className="inline-flex gap-1 items-center">
                                <TbSocial className="text-xl text-slate-900" />
                                <span>{t('Social Media Logins')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {business_settings.google_login || business_settings.facebook_login || business_settings.twitter_login || business_settings.apple_login ?
                    <div className="grid grid-cols-2 gap-4">
                        {/* Google */}
                        {business_settings.google_login && <GoogleLogin env_data={env_data} />}
                        {/* Facebook */}
                        {business_settings.facebook_login && <FacebookLogin env_data={env_data} />}
                        {/* Twitter */}
                        {business_settings.twitter_login && <TwitterLogin env_data={env_data} />}
                        {/* Apple */}
                        {business_settings.apple_login && <AppleLogin env_data={env_data} />}
                    </div>
                    :
                    <div>
                        <EmptyData
                            title={
                                <>
                                    Nothing found! To activate Social Media Logins, go to{' '}
                                    <Link
                                        href={route('admin.configuration.features_activation')}
                                        className="font-medium text-blue-500"
                                    >
                                        Features Activation
                                    </Link>{' '}
                                    page.
                                </>
                            }
                        />
                    </div>}
            </div>
        </AdminLayout>
    )

}
