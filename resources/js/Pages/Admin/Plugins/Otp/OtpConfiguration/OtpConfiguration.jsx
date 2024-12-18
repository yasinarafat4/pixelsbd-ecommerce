import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { MdOutlineScreenLockRotation, MdSpaceDashboard } from "react-icons/md";
import Fast2sms from "./Partials/Fast2sms";
import Mimo from "./Partials/Mimo";
import MIMSMS from "./Partials/MIMSMS";
import Msegat from "./Partials/Msegat";
import Nexmo from "./Partials/Nexmo";
import Sparrow from "./Partials/Sparrow";
import SslWireless from "./Partials/SslWireless";
import Twillo from "./Partials/Twillo";
import Zender from "./Partials/Zender";

export default function OtpConfiguration() {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={"Otp Configuration"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <MdOutlineScreenLockRotation  className="text-base text-slate-900" />
                                    <span>{t('Otp Configuration')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Nexmo />
                    <Twillo />
                    <SslWireless />
                    <Fast2sms />
                    <Mimo />
                    <MIMSMS />
                    <Msegat />
                    <Sparrow />
                    <Zender />
                </div>
            </div>
        </AdminLayout>
    )

}
