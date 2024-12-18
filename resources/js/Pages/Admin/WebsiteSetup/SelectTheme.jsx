import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { TbHomeShare } from "react-icons/tb";

export default function SelectTheme ()
{

    const { t } = useLaravelReactI18n();
    const [ selectedIndex, setSelectedIndex ] = useState( 0 );

    const themeData = [
        {
            name: 'Theme 1 - Classic',
            image: '/assets/theme.png'
        },
        {
            name: 'Theme 2 - Upcoming',
            image: '/assets/coming-soon.jpg'
        },
        {
            name: 'Theme 3 - Upcoming',
            image: '/assets/coming-soon.jpg'
        },
        {
            name: 'Theme 4 - Upcoming',
            image: '/assets/coming-soon.jpg'
        }
    ]

    return (
        <AdminLayout>
            <Head title="Select Theme" />
            <div  className="bg-[#FEFEFE] px-5 py-6">
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
                                <TbHomeShare  className="text-base text-slate-900" />
                                <span>{ t( 'Select Theme' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div  className='card z-10 rounded-lg shadow bg-white border-[1px] border-slate-200 mt-3'>
                    <div  className="border-b mb-6">
                        <h2  className="p-5 text-lg font-medium">{ t( 'Select Theme' ) }</h2>
                    </div>
                    <div  className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 p-5 gap-5">
                        { themeData.map( ( theme, index ) => (
                            <div key={ index } onClick={ ( e ) => setSelectedIndex( index ) }  className="cursor-pointer">
                                <div  className="relative">
                                    <div  className={ `${ selectedIndex === index ? "border-4 border-pink-600" : "overlay" }` }>
                                        <img  className="w-full h-[275px] object-cover" src={asset_url( theme.image )} alt="" />
                                    </div>
                                </div>
                                <div  className="flex justify-between items-center py-6">
                                    <h2  className="text-base font-semibold">{ theme.name }</h2>
                                    <button  className="px-3 py-[6px] text-[13px] bg-pink-600 hover:bg-[#C82333] duration-200 text-white">View</button>
                                </div>
                            </div>
                        ) ) }
                    </div>
                    <div  className="flex justify-between items-center bg-[#F2F3F8] m-4 p-4">
                        <div  className="flex items-center gap-5">
                            <FaSliders  className="text-4xl text-[#A1A5B3]" />
                            <div>
                                <h2  className="text-lg font-medium text-[#737680]">Customize Your Page Layout</h2>
                                <p  className="text-sm text-[#737680]">Each theme offers a unique layout. Select one to incorporate it into your overall design.</p>
                            </div>
                        </div>
                        <button  className="btn btn-primary w-40 text-base rounded">Apply</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
