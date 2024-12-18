import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdSpaceDashboard } from "react-icons/md";
import { TbPuzzle2 } from "react-icons/tb";

export default function AvailableAddons() {
    const { t } = useLaravelReactI18n();

    return (
        <AdminLayout>
            <Head title={"Available Addons"} />
            <div  className='p-5 bg-[#F5F6FA] h-[100vh]'>
                <div  className='flex justify-between items-center mb-4'>
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
                                    <TbPuzzle2  className="text-base text-slate-900" />
                                    <span>{t('Available Addons')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div  className="grid grid-cols-4 gap-5">
                    {/* Addon Card */}
                    <div  className="card bg-white shadow-xl rounded">
                        {/* Caed Image */}
                        <figure>
                            <img
                                 className="w-full h-[180px] object-cover"
                                src="/assets/placeholder/placeholder.jpg"
                                alt="Addon" />
                        </figure>
                        {/* Card Body */}
                        <div  className="card-body px-6 py-4 space-y-3">
                            <h2  className="text-[20px] font-bold text-[#526484]">Video Shopping & Live Sharing Addon for PixelsBD eCommerce CMS</h2>
                            <div  className="card-actions flex justify-between items-center">
                                <p  className="text-[22px] font-bold text-[#526484]">$49</p>
                                <div  className="flex items-center gap-2">
                                    <button  className="uppercase text-[13px] font-semibold text-white bg-[#0DA8EE] hover:bg-[#65cbfa] duration-200 py-2 px-3 rounded">Preview</button>
                                    <button  className="uppercase text-[13px] font-semibold text-white  bg-black hover:bg-[#1c0dee] duration-300  py-3 px-8 rounded">Purchase</button>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                        <div  className="border-t border-slate-200 px-6 py-3 flex justify-between items-center">
                            <p  className="text-[#9097a0]">Released: 2022-06-17</p>
                            <p  className="text-[#9097a0]">Version: 1.0.0</p>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
