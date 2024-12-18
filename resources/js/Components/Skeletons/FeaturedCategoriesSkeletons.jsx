import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FeaturedCategoriesSkeletons ()
{
    return (
        <>
            <div  className='flex justify-between'>
                <Skeleton height={30} width={125} style={{ borderRadius: '4px' }} />
                <Skeleton height={30} width={105} style={{ borderRadius: '4px' }} />
            </div>
            <hr  className='my-3' />
            <div  className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2'>
                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton height={80} width={80} style={{ borderRadius: '100%' }} />
                    </div>
                    <Skeleton height={30} />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>

                <div  className='border w-[145px]'>
                    <div  className='py-1 flex justify-center'>
                        <Skeleton circle={ true } height={ 80 } width={ 80 } />
                    </div>
                    <Skeleton height={ 30 } />
                </div>
            </div>
        </>
    );
}
