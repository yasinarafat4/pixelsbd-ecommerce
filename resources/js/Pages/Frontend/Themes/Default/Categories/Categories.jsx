import NothingFound from "@/Components/NothingFound";
import PageTitle from "@/Components/PageTitle/PageTitle";
import { asset_url, placeholder1_1 } from "@/Helpers";
import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaHome } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Categories({ categories }) {


    // const { data, isLoading, isError} = useQuery( { queryKey: [ 'categoriesData' ], queryFn: fetchCategoriesData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false } );

    const { t } = useLaravelReactI18n();


    function categoriesFn(data) {
        return <div  className="ms-4 flex flex-col gap-2">
            {data.map((children, i) => {
                return <div key={i}  className="space-y-2">
                    <a href={route('catgeory_wise_product', children?.slug)}  className="flex justify-start items-center gap-1">
                        <div  className='w-6 h-6'>
                            <LazyLoadImage
                                 className='w-full h-full pointer-events-none mix-blend-multiply'
                                src={asset_url(children?.icon || placeholder1_1())}
                                alt={children.name}
                                effect='blur'
                            />
                        </div>
                        <div>
                            <p  className='text-sm font-medium text-slate-600 w-full'>{children.name}</p>
                        </div>
                    </a>
                    {
                        children.children.length > 0 && categoriesFn(children.children)
                    }
                </div>
            })}
        </div>;
    }

    return (
        <DefaultThemeLayout>
            <Head title={"All Categories"} />
            <div  className="lg:px-6 xl:px-0">
                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={route('home')}  className="inline-flex gap-1 items-center">
                                <FaHome  className="text-base" />
                                <span>{t('Home')}</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-lg text-slate-900" />
                                <span>{t('Categories')}</span>
                            </span>
                        </li>

                    </ul>
                </div>
                {/* Top section */}
                <div  className="border-b border-slate-300 py-4">
                    <PageTitle title={'All Categories'} />
                </div>
                {/* Categories */}
                <div  className="py-4 text-slate-600">
                    {categories.length > 0 ? <div  className="flex flex-col gap-4">
                        {
                            categories.map((category, i) => (
                                <div key={i}  className="border border-slate-300 w-full">
                                    <a href={route('catgeory_wise_product', category.slug)}  className="flex justify-start items-center gap-3 m-2 md:m-5">
                                        <div  className='w-16 h-16 md:w-20 md:h-20 border border-slate-300'>
                                            <LazyLoadImage
                                                 className='w-full h-full'
                                                src={asset_url(category?.banner_image || placeholder1_1())}
                                                alt={category.name}
                                                effect='blur'
                                            />
                                        </div>
                                        <div>
                                            <h2  className="text-base md:text-xl font-bold">{category.name}</h2>
                                        </div>
                                    </a>
                                    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2">
                                        {
                                            category.children.map((children, i) => (
                                                <div key={i}  className="mx-5 space-y-3">
                                                    <a href={route('catgeory_wise_product', children.slug)}  className="flex justify-start items-center gap-3">
                                                        <div  className='w-6 h-6'>
                                                            <LazyLoadImage
                                                                 className='w-full h-full pointer-events-none mix-blend-multiply'
                                                                src={asset_url(children?.icon || placeholder1_1())}
                                                                alt={children.name}
                                                                effect='blur'
                                                            />
                                                        </div>
                                                        <div>
                                                            <p  className='w-full'>{children.name}</p>
                                                        </div>
                                                    </a>
                                                    {categoriesFn(children.children)}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                    </div> : <NothingFound title={'No Category Found!'} />}
                </div>

            </div>
            <div  className="">

            </div>
        </DefaultThemeLayout>
    )
}
