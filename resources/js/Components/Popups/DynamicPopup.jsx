
import { asset_url, placeholder2_3 } from "@/Helpers";
import { usePage } from "@inertiajs/react";
import 'animate.css';
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";


export default function DynamicPopup() {
    const { t } = useLaravelReactI18n();
    const { dynamic_popups } = usePage().props;

    const [popups, setPopups] = useState(dynamic_popups)
    const [showPopups, setShowPopups] = useState(false)

    const [refresh, setRefresh] = useState()

    useEffect(() => {
        setPopups(dynamic_popups)
        const timer = setTimeout(() => {
            setShowPopups(true)
        }, 1000);
        return () => clearTimeout(timer);
    }, [refresh])

    const closeModal = (id) => {
        sessionStorage.setItem('popup_' + id, 'true');
        setRefresh(id)
    };

    return (
        <div  className="fixed left-3 md:left-4 bottom-16 w-72 md:w-80 z-[1000]">
            {/* Modal */}
            <div  className="absolute bottom-0">
                { showPopups && <div  className="flex flex-col-reverse justify-end gap-4">
                    {popups.map((popup, i) => {
                        if (!sessionStorage.getItem('popup_' + popup.id)) {

                            return <div key={i} style={{ background: popup.background_color }}  className={`relative animate__animated animate__fadeInLeft animate__delay-${i}s bg-white shadow-lg`}>
                                <span style={{ color: popup.text_color }}  className="absolute !hover:text_secondary duration-300 top-1 right-1 cursor-pointer z-30 p-[1px] border" onClick={e => closeModal(popup.id)}><MdClose  className="text-sm" /></span>
                                <a href={popup.link}>
                                    <div  className="grid grid-cols-9 items-center">
                                        <div  className="col-span-3 h-full">
                                            <img  className="h-full aspect-[2/3] object-cover" src={asset_url(popup.image || placeholder2_3())} alt={popup.title} />
                                        </div>
                                        <div  className="col-span-6 space-y-3 px-3">

                                            <h2 style={{ color: popup.text_color }}  className="text-base font-medium truncate">{popup.title}</h2>
                                            <div><span style={{ color: popup.text_color }}  className="text-xs tracking-tight">{popup.summary}</span></div>

                                        </div>
                                    </div>
                                </a>
                            </ div>
                        }
                    })}
                </div>}
            </div>
        </div>
    )

}
