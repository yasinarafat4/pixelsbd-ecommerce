import { useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { SpringSystem } from 'rebound';

export default function ScrollToTopButton({ scrollbars, showScrollTopButton }) {
    const springSystem = useRef(new SpringSystem()).current;
    const spring = useRef(springSystem.createSpring(0, 6)).current;

    spring.addListener({
        onSpringUpdate: handleSpringUpdate
    });

    function handleSpringUpdate(spring) {
        const val = spring.getCurrentValue();
        scrollbars.current.scrollTop(val);
    }

    function scrollTop() {
        const scrollTop = scrollbars.current.getScrollTop();
        spring.setCurrentValue(scrollTop).setAtRest();
        spring.setEndValue(0);
    }

    return (
        <>
            {showScrollTopButton && (
                <div  className="z-[1] fixed bottom-16 lg:bottom-5 right-3 lg:right-5">
                    <button
                        aria-label="Go to Top"
                        onClick={scrollTop}
                         className="flex justify-center items-center bg_primary hover:bg-white border-2 border-[#FFFFFF] hover:border_primary duration-300 text-white hover:text_primary p-[6px] md:p-[6px] rounded-t-lg cursor-pointer tooltip tooltip-left"
                        data-tip="Go to Top"
                    >
                        <IoIosArrowUp  className='text-xl md:text-2xl' />
                    </button>
                </div>
            )}
        </>
    );
}
