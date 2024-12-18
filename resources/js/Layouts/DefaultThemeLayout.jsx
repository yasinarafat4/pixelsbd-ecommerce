import DefaultThemeFooter from "@/Components/Footers/DefaultThemeFooter";
import DefaultThemeNavbar from "@/Components/Navbars/DefaultThemeNavbar";
import MobileNavigation from "@/Components/Navbars/DefaultThemeNavbar/MobileNavigation";
import DynamicPopup from "@/Components/Popups/DynamicPopup";
import ScrollToTopButton from "@/Components/ScrollToTopButton/ScrollToTopButton";
import { usePage } from "@inertiajs/react";
import { Scrollbars } from "@om-tlh/react-custom-scrollbars";
import { useEffect, useRef, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function DefaultThemeLayout({ children }) {
    const { flash, business_settings } = usePage().props;

    useEffect(() => {
        if (flash.success != null) {
            toast.success(flash.success, {
                position: "top-right",
                theme: "colored",
            });
        }
        if (flash.error != null) {
            toast.error(flash.error, {
                position: "top-right",
                theme: "colored",
            });
        }
    }, [flash]);

    const [fixedNavbar, setFixedNavbar] = useState("");
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollbars = useRef();

    function handleScrollFrame(e) {
        if (business_settings.sticky_header) {
            if (e.scrollTop > 176) {
                setFixedNavbar("fixed w-full top-0 left-0 right-0 z-10 animationFadeIn");
            } else {
                setFixedNavbar("");
            }
        }

    }

    // Scroll to top button handler
    function handleShowScrollTop(e) {
        if (e.scrollTop > 176) {
            setShowScrollTopButton(true);
        } else {
            setShowScrollTopButton(false);
        }
    }

    // Single handler to combine both function
    function handleScroll(e) {
        handleScrollFrame(e);
        handleShowScrollTop(e);
    }


    return (
        <div className="bg-[#FAFAFC] text-slate-600 relative">
            {/* <LoadingSpinner /> */}
            <ToastContainer />
            {/* Map Modal Data */}
            <>
                <DynamicPopup />
            </>
            <Scrollbars ref={scrollbars} onScrollFrame={handleScroll} className="min-h-screen z-50 scrollable-container">
                <div className="px-[10px] md:px-[15px] lg:px-[10px] xl:px-0 bg-[#FAFAFC] ">
                    <DefaultThemeNavbar fixedNavbar={fixedNavbar} />
                    <div className="xl:max-w-7xl mx-auto">
                        {children}
                    </div>
                    <MobileNavigation />
                    <DefaultThemeFooter />
                </div>
                <ScrollToTopButton scrollbars={scrollbars} showScrollTopButton={showScrollTopButton} />
            </Scrollbars>

            {business_settings.show_cookies_agreement && <CookieConsent>
                <div dangerouslySetInnerHTML={{ __html: business_settings.cookies_agreement_text }}></div>
            </CookieConsent>}
        </div>
    );
}
