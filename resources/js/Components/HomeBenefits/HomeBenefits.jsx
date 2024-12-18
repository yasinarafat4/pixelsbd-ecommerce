
// import required modules
import { asset_url, placeholder1_1 } from '@/Helpers';
import { usePage } from '@inertiajs/react';
import React, { useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomeBenefits = ( { benefits } ) =>
{
    const { active_locale } = usePage().props;

    // Memoize the benefits list rendering
    const benefitsItems = useMemo( () =>
    {
        return benefits.map( ( item, index ) => (
            <div
                key={ index }
                 className={ `flex gap-1 p-4 border ${ benefits.length === 1 ? 'w-full' : benefits.length === 2 ? 'w-full md:w-1/2' : benefits.length === 3 ? 'w-full md:w-1/2 lg:w-1/3' : 'w-full md:w-1/2 lg:w-1/4' }` }
            >
                <div className="w-1/3">
                    <div  className="w-10 h-10">
                        <LazyLoadImage
                             className="w-full aspect-square"
                            src={ asset_url( item.image || placeholder1_1() ) }
                            alt={ item.title[ active_locale ] }
                            effect="blur"
                        />
                    </div>
                </div>
                <div  className="w-2/3">
                    <h2  className="text-md font-medium truncate ...">{ item.title[ active_locale ] }</h2>
                    <p  className="text-sm truncate ...">{ item.sub_title[ active_locale ] }</p>
                </div>
            </div>
        ) );
    }, [ benefits ] );

    // Memoizing the outer container class logic
    const containerClass = useMemo( () =>
    {
        if ( benefits.length === 1 ) return 'w-full md:w-1/2 lg:w-1/4';
        if ( benefits.length === 2 ) return 'w-full lg:w-2/4';
        if ( benefits.length === 3 ) return 'w-full lg:w-3/4';
        return 'w-full';
    }, [ benefits.length ] );

    return (
        <div>
            { benefits.length > 0 && (
                <div  className={ `flex flex-wrap items-center p-2 border ${ containerClass }` }>
                    { benefitsItems }
                </div>
            ) }
        </div>
    );
}

export default React.memo( HomeBenefits );
