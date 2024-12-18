

export default function ThemeOneLayout({ children }) {

    return (

            <div  className="">
                <p>NavbarThemeOne</p>
                <div  className="min-h-[calc(100vh-330px)]">
                    {children}
                </div>
            <p>FooterThemeOne</p>
            </div>

    )

}
