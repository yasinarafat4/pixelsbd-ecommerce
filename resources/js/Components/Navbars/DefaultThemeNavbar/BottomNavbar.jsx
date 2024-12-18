import { fetchCategoriesData } from '@/Api';
import CategorySkeletons from '@/Components/Skeletons/CategorySkeletons';
import { placeholder1_1 } from '@/Helpers';
import { Link, usePage } from '@inertiajs/react';
import { Scrollbars } from '@om-tlh/react-custom-scrollbars';
import { useQuery } from '@tanstack/react-query';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useMemo, useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Navbar.css';


export default function BottomNavbar() {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props;

    const { data, isLoading, isError } = useQuery({ queryKey: ['categoriesData'], queryFn: fetchCategoriesData, staleTime: 5 * 60 * 1000, cacheTime: 10 * 60 * 1000, refetchOnMount: false, refetchOnWindowFocus: false });

    const [isHovered, setIsHovered] = useState(false)
    const [loading, setLoading] = useState(false)
    const [children, setChildren] = useState()

    function onMouseOver(e, id) {
        setIsHovered(true)
        setLoading(true)

        axios.get(route('child.categories', { id: id })).then(function (response) {
            setChildren(response.data)
            setLoading(false)
        })

    }
    function onMouseLeave() {
        setIsHovered(false)

    }

    // Memoizing the children rendering to optimize performance
    const childcategoryItems = useMemo(() => {
        return children && children?.map((child, i) => (
            <div className='p-5' key={i}>
                <a href={route('catgeory_wise_product', child.slug)} className="uppercase tracking-wider text-slate-600 hover:text-indigo-600 duration-300 font-bold text-[12px]">
                    <div className='flex items-center gap-2'>
                        <div className='w-6 h-6'>
                            <LazyLoadImage
                                className='w-full aspect-square pointer-events-none mix-blend-multiply'
                                src={child.icon || placeholder1_1()}
                                alt={child.name}
                                effect='blur'
                            />
                        </div>
                        <p className='w-full'>{child.name}</p>
                    </div>
                </a>

                {child.children.length > 0 && (
                    <ul className="mt-2 ms-3 text-[14px]">
                        {child?.children?.map((subChild, i) => (
                            <li key={i}>
                                <a href={route('catgeory_wise_product', subChild.slug)} className="block p-1 font-normal text-sm rounded hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 hover:via-blue-50 transition ease-in-out duration-300 text-gray-700 hover:text-indigo-600">
                                    <div className='flex items-center gap-2'>
                                        <div className='w-6 h-6'>
                                            <LazyLoadImage
                                                className='w-full aspect-square pointer-events-none mix-blend-multiply'
                                                src={subChild.icon || placeholder1_1()}
                                                alt={subChild.name}
                                                effect='blur'
                                            />
                                        </div>
                                        <p className='w-full'>{subChild.name}</p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ));
    }, [children]);

    return (
        <div className='bg_primary z-[1000] px-[10px] md:px-[15px] lg:px-[10px] xl:px-0'>
            <div className="hidden lg:flex navbar xl:px-0 xl:max-w-7xl mx-auto text-white" >
                <div className="navbar-start">
                    <div className='z-[3] relative group dropdown dropdown-end dropdown-hover'>
                        {/* Categories */}
                        <div onMouseLeave={e => onMouseLeave(e)}>
                            {
                                route().current('home') ? <div className='flex items-center gap-3 cursor-pointer'>
                                    <p className="cursor-pointer flex items-center gap-10 bg-white text-slate-600 px-[27px] xl:px-[62px] py-[8px] rounded-sm">
                                        <BiSolidCategory className="text-xl" />  <Link href={route('categories')} className='text-base'>{t('Categories')}</Link ><FaCaretDown className="text-xl" />
                                    </p>
                                </div> :
                                    <>
                                        <div tabIndex={0} className='flex items-center gap-3 cursor-pointer'>
                                            <p className="cursor-pointer flex items-center gap-10 bg-white text-slate-600 px-[27px] xl:px-[62px] py-[8px] rounded-sm">
                                                <BiSolidCategory className="text-xl" />  <Link href={route('categories')} className='text-base'>{t('Categories')}</Link ><FaCaretDown className="text-xl" />
                                            </p>
                                        </div>
                                        <div tabIndex={0} className='absolute top-[40px] left-0 dropdown-content dropdown-left z-[1] bg-white rounded shadow-lg'>
                                            <div className="h-[450px]">
                                                {isLoading ?
                                                    <CategorySkeletons />
                                                    :
                                                    <Scrollbars className='h-full hidden lg:block overflow-y-scroll'>
                                                        {data?.data?.map((category, i) => (
                                                            <Link href={route('catgeory_wise_product', category.slug)} key={i}>
                                                                <div onMouseOver={e => onMouseOver(e, category.id)} className="border-1 border-b px-2 py-[8px] mr-3 border-slate-300 text-slate-600 hover:bg_soft_primary duration-500 text-[11px] md:text-[14px] flex justify-between items-center">
                                                                    <div className='flex items-center gap-2 pointer-events-none'>
                                                                        <div className='w-6 h-6'>
                                                                            <LazyLoadImage
                                                                                className='w-full aspect-square pointer-events-none mix-blend-multiply'
                                                                                src={category?.icon || placeholder1_1()}
                                                                                alt=""
                                                                                role="presentation"
                                                                                effect='blur'
                                                                            />
                                                                        </div>
                                                                        <p className='w-full'>{category.name}</p>
                                                                    </div>
                                                                    <div className='pointer-events-none'>
                                                                        <IoIosArrowForward className='text-slate-400 text-lg pointer-events-none' />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </Scrollbars>
                                                }
                                            </div>
                                        </div>
                                    </>
                            }
                            <div className={`absolute top-[40px] left-[320px] bg-white h-[450px] w-[960px] rounded shadow-lg ${isHovered ? "" : "hidden"}`}>
                                {loading ? <div className='h-full w-full flex justify-center items-center'>
                                    <span className='loading loading-dots loading-lg text-primary'> </span>
                                </div> : <Scrollbars className=" h-full overflow-scroll">
                                    <div className='grid grid-cols-3 gap-6'>
                                        {childcategoryItems}
                                    </div>
                                </Scrollbars>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal px-1 space-x-5">
                        {business_settings.header_menu.map((header_menu, i) => (
                            <div key={i} className="relative">
                                <Link href={header_menu.link}> <span className={window.location.href == header_menu.link ? "text-[15px] border-b-2 border-white py-2 px-3" : "text-[15px] border-animation my-2 px-3"}>{header_menu.label}</span> </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="navbar-end"></div>
            </div>
        </div>
    )
}
