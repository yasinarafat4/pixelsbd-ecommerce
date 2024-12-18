import { usePage } from "@inertiajs/react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";

export default function SocialLogin() {
    const { business_settings } = usePage().props

    return (
        <>
            {(business_settings.facebook_login || business_settings.google_login || business_settings.twitter_login || business_settings.apple_login) && <div  className="text-sm text-slate-500 divider">OR Login With</div>}
            <div  className="flex justify-center items-center gap-3">
                {/* Facebook */}
                {business_settings.facebook_login && <a href={route('auth.socialite.redirect', 'facebook')}  className=" bg-[#3B5998] text-white hover:bg-white hover:text-[#3B5998] shadow-md hover:drop-shadow-md duration-500 p-2 rounded-full">
                    <FaFacebookF  className="h-5 w-5" />
                </a>}
                {/* Google */}
                {business_settings.google_login && <a href={route('auth.socialite.redirect', 'google')}  className="bg-white hover:bg-white shadow-md hover:drop-shadow-md duration-500 p-2 rounded-full">
                    <FcGoogle  className=" h-5 w-5" />
                </a>}
                {/* Twitter */}
                {business_settings.twitter_login && <a href={route('auth.socialite.redirect', 'twitter')}  className="bg-[#000000] text-white hover:bg-white hover:text-[#000000] shadow-md hover:drop-shadow-md duration-500  p-2 rounded-full">
                    <FaXTwitter  className="h-5 w-5" />
                </a>}
                {/* Apple */}
                {business_settings.apple_login && <a href={route('auth.socialite.redirect', 'apple')}  className="bg-white text-[#000000] hover:bg-white shadow-md hover:drop-shadow-md duration-500 p-2 rounded-full">
                    <GrApple  className="h-5 w-5" />
                </a>}
            </div>
        </>
    )

}
