
import { currencyFormat, placeholder1_1 } from "@/Helpers";
import { usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCart } from "react-use-cart";

export default function CartTable() {
    const { active_currency_symbol } = usePage().props
    const { t } = useLaravelReactI18n();

    const {
        items,
        setItems,
    } = useCart();


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
        <>
            <table  className="table">
                {/* head */}
                <thead>
                    <tr  className="bg-[#F3F5F9] text-slate-600">
                        <th>{t('Product')}</th>
                        <th>{t('Unit Price')}</th>
                        <th>{t('Quantity')}</th>
                        <th>{t('Total')}</th>
                        <th>{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <div  className="flex items-center gap-3">
                                    <div  className="avatar">
                                        <div  className="w-[80px] h-[80px] border border-slate-200 rounded-md">
                                            <LazyLoadImage
                                                src={item.product?.thumbnail_image || placeholder1_1()}
                                                alt={item.product?.name}
                                                effect='blur'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2  className="font-bold text-xs md:text-sm">
                                            {item.product?.name}</h2>
                                        <div  className="flex flex-col md:flex-row justify-start md:items-center md:gap-3">
                                            {item.variation && <p><span  className="text-xs opacity-90" >{item.variation}</span></p>}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p  className="text-xs md:text-sm font-semibold">{currencyFormat(item.price)}</p>
                                <p  className="text-[8px] md:text-[10px]">(Tax : {currencyFormat(item.tax)} )</p>
                            </td>

                            <td>
                                {/* Quantity */}
                                <div  className='border-[1px] border-[#3F00E7] rounded flex items-center justify-center'>
                                    <button onClick={e => OnDecreaseQuantity(item.id, (item.quantity - 1))}  className="px-4 py-1 bg-[#FAFAFC] text-[#3F00E7] rounded">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={e => OnIncreaseQuantity(item.id, (item.quantity + 1))}  className="px-4 py-1 bg-[#FAFAFC] text-[#3F00E7] rounded">+</button>
                                </div>
                            </td>
                            <td>{currencyFormat(item.itemTotal + item.tax)}</td>
                            <td>
                                <button onClick={e => OnRemoveFromCart(item.id)}><MdDelete  className="cursor-pointer text-xl text-[#F34770]" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}
