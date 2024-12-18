import { placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import React, { useMemo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Category = ({ categories }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [loading, setLoading] = useState(false)
    const [children, setChildren] = useState([])



    function onMouseOver(e, id) {
        setIsHovered(true)
        setLoading(true)

        axios.get(route('child.categories', { id: id })).then(function (response) {
            setChildren(response.data);
            setLoading(false)
        })

    }
    function onMouseLeave() {
        setIsHovered(false)
    }

    // Memoizing the children rendering to optimize performance
    const childcategoryItems = useMemo(() => {
        return children && children.map((child, i) => (
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
                        {child.children.map((subChild, i) => (
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
        <div className='col-span-3 lg:h-[375px] xl:h-[480px] shadow hidden lg:block' onMouseLeave={e => onMouseLeave(e)}>
            <Scrollbars className='bg-white shadow hidden lg:block overflow-y-scroll'>
                {categories.map((category, i) => (
                    <Link href={route('catgeory_wise_product', category.slug)} key={i}>
                        <div

                            onMouseOver={(e) => onMouseOver(e, category.id)}
                            className="border-1 border-b p-2 w-full border-slate-300 text-slate-600 hover:bg_soft_primary duration-500 text-[11px] md:text-[14px] flex justify-between items-center"
                        >
                            <div className="flex items-center gap-2 pointer-events-none">
                                <div className="w-6 h-6">
                                    <img
                                        className="w-full aspect-square object-cover pointer-events-none mix-blend-multiply"
                                        src={category?.icon || placeholder1_1()}
                                        alt=""
                                        role="presentation"
                                    />
                                </div>
                                <p className="w-full">{category.name}</p>
                            </div>
                            <div className="pointer-events-none">
                                <IoIosArrowForward className="text-slate-400 text-lg pointer-events-none" />
                            </div>
                        </div>
                    </Link>
                ))}
            </Scrollbars>

            <div className={`absolute top-0 right-0 bg-white h-[480px] w-[960px] z-30 ${isHovered ? "" : "hidden"}`}>
                {
                    loading ?
                        <div className='h-full w-full flex justify-center items-center'>
                            <span className='loading loading-dots loading-lg'> </span>
                        </div>
                        :
                        <Scrollbars className="h-full overflow-scroll">
                            <div className='grid grid-cols-3 gap-6'>
                                {childcategoryItems}
                            </div>
                        </Scrollbars>
                }
            </div>
        </div>
    );
}

export default React.memo(Category);
