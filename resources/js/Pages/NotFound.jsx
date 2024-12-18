/* eslint-disable */

// resources/js/Pages/NotFound.jsx
// import React from '../../../public/assets/error-and-notfound/not_found.png';
import { asset_url, placeholder1_1 } from '@/Helpers';
import { Head, Link } from '@inertiajs/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const NotFound = () => {
    return (
        <div  className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-slate-200 via-white to-[#4BB5F1] p-8 text-center">
            <Head title="Not Found" />
            <div  className="w-96 mx-auto mb-6">
                <LazyLoadImage
                     src={asset_url('/assets/error-images/not_found.png' || placeholder1_1())}
                    alt='404 Error'
                    effect='blur'
                />
            </div>
            <p  className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Page Not Found!</p>
            <p  className="text-base text-slate-600 mb-6">The page you&apos;re looking for doesn&apos;t seem to exist.</p>
            <Link
                href="/"
                 className="inline-block px-5 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
