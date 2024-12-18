/* eslint-disable */

// resources/js/Pages/ServerError.jsx
import { asset_url } from '@/Helpers';
import { Head, Link } from '@inertiajs/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ServerError = () => {
    return (
        <div  className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-slate-200 via-white to-[#F991A3] p-8 text-center">
            <Head title="Internal Server Error" />
            <div  className="w-96 mx-auto mb-6">
                <LazyLoadImage
                    src={asset_url('/assets/error-images/server-error.png' || placeholder1_1())}
                    alt='Server Error'
                    effect='blur'
                />
            </div>
            <p  className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Internal Server Error!</p>
            <p  className="text-slate-600 mb-6">Oops! Something went wrong on our end.</p>
            <Link
                onClick={e => window.history.back()}
                 className="inline-block px-5 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
                Go back
            </Link>
        </div>
    );
};

export default ServerError;
