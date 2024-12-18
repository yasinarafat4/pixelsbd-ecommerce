import React from 'react';
import HomeBenefitsSkeletons from './HomeBenefitsSkeletons';
const ComponentToRender = React.lazy( () => import( '@/Components/HomeBenefits/HomeBenefits' ) );
const HomeBenefitsLazyLoadedComponentWithSkeleton = ( { benefits } ) =>
{
    return (
        <>
            {/* <HomeBenefitsSkeletons /> */ }
            <React.Suspense fallback={ <HomeBenefitsSkeletons /> }>
                <ComponentToRender benefits={ benefits } />
            </React.Suspense>
        </>
    );
};

export default HomeBenefitsLazyLoadedComponentWithSkeleton;
