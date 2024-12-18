import DefaultThemeLayout from "@/Layouts/DefaultThemeLayout";
import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect } from "react";
import { BsBagPlusFill } from "react-icons/bs";
import { useCart } from "react-use-cart";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";


export default function ShoppingCart({ carts }) {
    const { t } = useLaravelReactI18n();

    const {
        isEmpty,
        setItems,
    } = useCart();

    useEffect(() => {
        setItems(carts);
    }, [])


    return (
        <DefaultThemeLayout>
            <Head title="Shopping Cart" />
            <div  className="my-4 md:px-2 xl:px-0">
                <h2  className="text-xl font-bold text-start">{t('Shopping Cart')}</h2>
                <div  className="my-2">
                    <div  className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Table */}
                        <div  className="lg:col-span-8 overflow-x-auto bg-white">
                            {isEmpty ?
                                <div>
                                    <div  className="py-10">
                                        <div  className='flex justify-center items-center mx-auto'>
                                            <BsBagPlusFill  className='text-7xl text-[#D1D1D1]' />
                                        </div>
                                        <p  className='text-base text-center mt-3'>{t('Your Cart is Empty')}</p>
                                    </div>
                                </div>
                                :
                                <CartTable />
                            }
                        </div>
                        {/* Cart total*/}
                        <div  className="sticky top-20 lg:col-span-4 bg-white w-full h-full lg:h-[300px] mx-auto shadow-lg p-4 border border-slate-300 rounded-md">
                            <CartTotal />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultThemeLayout>
    )

}
