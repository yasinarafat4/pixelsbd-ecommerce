
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BsBagPlusFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

export default function EmptyCartDropdown() {
    const { t } = useLaravelReactI18n();

    return (
        <>
            <div className='flex items-center bg-blue-100 px-4 py-3 gap-2 rounded-md'>
                <FaCartPlus className='text-xl text_primary' />
                <p className='font-semibold text-lg'>{t('Shopping Cart')}</p>
            </div>
            <div className='pt-3'>
                <div className='bg-[#F9F9F9] flex justify-center items-center p-5 rounded-full w-4/12 mx-auto'>
                    <BsBagPlusFill className='text-7xl text-[#D1D1D1]' />
                </div>
                <p className='text-base text-center mt-3'>{t('Your Cart is Empty')}</p>
            </div>
        </>
    )

}
