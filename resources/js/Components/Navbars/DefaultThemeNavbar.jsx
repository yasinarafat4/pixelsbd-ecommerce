import BottomNavbar from './DefaultThemeNavbar/BottomNavbar';
import TopNavbar from './DefaultThemeNavbar/TopNavbar';

export default function DefaultThemeNavbar({ fixedNavbar }) {
    return (
        <div  className='relative'>
            <div  className={fixedNavbar}>
                <TopNavbar />
            </div>
            <>
                <BottomNavbar />
            </>
        </div>
    )


}
