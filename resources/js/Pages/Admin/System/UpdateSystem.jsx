import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

import { GiUpgrade } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";



export default function UpdateSystem ()
{
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props;


    return (
        <AdminLayout>
            <Head title={ "Update System" } />
            <div  className='p-10 bg-[#FAFBFB]'>
                {/* Breadcrumbs */ }
                <div  className="text-sm breadcrumbs text-slate-600 mb-5">
                    <ul>
                        <li>
                            <Link href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span >{ t( 'Dashboard' ) }</span>
                            </Link>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <GiUpgrade  className="text-xl text-slate-900" />
                                <span>{ t( 'Update System' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div  className='card shadow-lg rounded-md bg-white border-[1px] border-slate-200 w-7/12 mx-auto space-y-5'>
                    <div  className="border-b py-3 px-5 flex items-center justify-between">
                        <div  className="flex items-center gap-2">
                            <h2  className="text-[18px] font-medium">Update your system</h2>
                        </div>
                        <div>
                            <p  className="text-sm"> Current verion: { business_settings.current_version }</p>
                        </div>
                    </div>
                    <div  className="p-5 m-6 rounded bg-[#D1ECF1] text-sm">
                        <ul  className="list-disc ms-10">
                            <li>Make sure your server has matched with all requirements. Check Here
                            </li>
                            <li>Download latest version from codecanyon.
                            </li>
                            <li>Extract downloaded zip. You will find updates.zip file in those extraced files.</li>
                            <li>Upload that zip file here and click update now.</li>
                            <li>If you are using any addon make sure to update those addons after updating.</li>
                            <li>Please turn off maintenance mode before updating.</li>
                        </ul>
                    </div>
                    <div  className="p-6 text-xs grid grid-cols-12 gap-4">
                        <div  className="col-span-9">
                            <input
                                type="file"
                                 className="file-input cursor-pointer file-input-bordered bg-white border-slate-100 w-full rounded-md"
                            />
                        </div>
                        <div  className="col-span-3">
                            <button type="submit"  className="bg-[#008FE1] duration-300 py-[11px] px-5 rounded text-white text-sm w-full">{ t( 'Update Now' ) }</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
