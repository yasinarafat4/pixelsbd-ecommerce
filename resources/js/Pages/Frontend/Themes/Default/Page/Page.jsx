import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head, usePage } from "@inertiajs/react";


export default function Page ()
{

    const { page_data, active_locale } = usePage().props


    return (
        <DefaultThemeLayout>
            <Head title={ page_data?.title[ active_locale ] } />
            <div  className="text-base my-4 bg-white border border-[#b3d5fa] shadow p-4 md:p-4 rounded-lg mx-auto">
                <h2 style={ { borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%', backgroundColor: 'blue', color: 'white', padding: '60px 20px 60px 20px', fontSize: '22px', textAlign: 'center', fontWeight: 'bold' } }  className="mb-4 mx-4">{ page_data?.title[ active_locale ] }</h2>
                <div dangerouslySetInnerHTML={ { __html: page_data?.content[ active_locale ] } }></div>
            </div>
        </DefaultThemeLayout>
    )

}
