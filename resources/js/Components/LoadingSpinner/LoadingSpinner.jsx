import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LoadingSpinner() {

    const [onProgress, setOnProgress] = useState(false);

    useEffect(() => {
        router.on('start', () => setOnProgress(true))
        router.on('finish', () => setOnProgress(false))
    }, [])

    return (
        <>
            {onProgress && <div  className='absolute h-screen w-full flex justify-center items-center z-[1000] bg-white/20 backdrop-blur-sm'>
                <span  className="loading loading-bars md:loading-lg"></span>
            </div>}
        </>
    );
};
