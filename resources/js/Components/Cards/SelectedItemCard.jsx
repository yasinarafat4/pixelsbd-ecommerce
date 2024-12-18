import { currencyFormat, placeholder1_1 } from "@/Helpers";
import { Link } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { GoPlus, GoTrash } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useCart } from "react-use-cart";

export default function SelectedItemCard({ item }) {
    const { t } = useLaravelReactI18n();
    const { setItems } = useCart();

    function OnDecreaseQuantity(id, quantity) {
        axios({
            method: 'post',
            url: route('update_quantity'),
            data: { id: id, quantity: quantity },
            responseType: 'json'
        }).then(function (response) {
            setItems(response.data)
        });
    }

    function OnIncreaseQuantity(id, quantity) {
        axios({
            method: 'post',
            url: route('update_quantity'),
            data: { id: id, quantity: quantity },
            responseType: 'json'
        }).then(function (response) {
            setItems(response.data)
        });
    }

    function OnRemoveFromCart(id) {
        axios({
            method: 'post',
            url: route('remove_from_cart'),
            data: { id: id },
            responseType: 'json'
        }).then(function (response) {
            setItems(response.data)
        });
    }
    return (
        <div className="flex justify-between items-center w-full gap-3 my-3 border-b pb-2">
            <div className="flex items-center gap-2">
                <div className="w-14 h-14 border border-slate-600 p-[2px] rounded">
                    <LazyLoadImage
                        className="w-full h-full"
                        alt={item.product?.name}
                        src={item.product?.thumbnail_image || placeholder1_1()}
                        effect='blur'
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-sm font-medium md:text-base hover:text_secondary duration-300 w-60 truncate ...">
                        <Link href={route("product", item.product.slug)}>
                            {item.product?.name}
                        </Link>
                    </h2>
                    {item.variation && <p className="text-xs">Variant: <span>{item.variation}</span></p>}
                    <div className="flex gap-2">
                        <p className="text-sm md:text-base">X<span>{item.quantity}</span></p>
                        <p className="text-sm md:text-base font-semibold text_primary"><span>{currencyFormat(item.price)}</span></p>
                    </div>
                </div>
            </div>
            <div className="w-5 flex flex-col items-center border border-slate-700 px-1 rounded-full" >
                <p className="tooltip tooltip-left" data-tip={t('Remove')}>
                    <button aria-label="Minus" onClick={e => OnDecreaseQuantity(item.id, (item.quantity - 1))}><LuMinus className="text-base" /></button>
                </p>
                <p className="tooltip tooltip-left" data-tip={t('Delete')}>
                    <button aria-label="Trash" onClick={e => OnRemoveFromCart(item.id)}><GoTrash className="cursor-pointer text-red-500 text-base" /></button>
                </p>
                <p className="tooltip tooltip-left" data-tip={t('Add More')}>
                    <button aria-label="Plus" onClick={e => OnIncreaseQuantity(item.id, (item.quantity + 1))}><GoPlus className="text-base" /></button>
                </p>
            </div>
        </div>
    )

}
