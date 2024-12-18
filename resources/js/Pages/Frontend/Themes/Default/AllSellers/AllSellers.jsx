import { fetchAllSellersData } from "@/Api";
import SellerCard from "@/Components/Cards/SellerCard";
import PageTitle from "@/Components/PageTitle/PageTitle";
import AllSellerSkeletons from "@/Components/Skeletons/AllSellerSkeletons";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function AllSellers() {
    const { t } = useLaravelReactI18n();
    // const { sellers } = usePage().props;

    const { data, isLoading, isError } = useQuery({ queryKey: ['allSellersData'], queryFn: fetchAllSellersData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });
    console.log('data', data);

    return (
        <DefaultThemeLayout>
            <Head title="All Stores" />
            {isLoading ? <AllSellerSkeletons /> : <div className="my-4 mx-0 lg:mx-4 xl:mx-0">
                {/* Top section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b gap-2 py-2">
                    <PageTitle title={'Stores'} />
                    <div className="join flex justify-end w-full md:w-6/12">
                        <input type="text" placeholder={t('Search Store')} className="input input-bordered input-sm text-sm bg-white text-slate-600 rounded-lg join-item py-4 focus:outline-none w-full lg:w-6/12" />
                        <button className="px-4 py-1 border bg-[#F5F9FF] hover:bg-[#CFD0D4] duration-300 rounded-lg join-item text-sm">{t('Search')}</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                    {data.data.map((shop, i) => (
                        <SellerCard key={i} shop={shop} />
                    ))}
                </div>
            </div>}
        </DefaultThemeLayout>
    )

}
