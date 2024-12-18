import NothingFound from '@/Components/NothingFound';
import { ProductContext } from '@/ProductContext';
import { useContext, useState } from 'react';
import ReactPlayer from 'react-player';

export default function ProductDescription() {

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const product = useContext(ProductContext);

    const onViewMoreClick = () => {
        setShowAdditionalInfo(true);
    };


    const onViewLessClick = () => {
        setShowAdditionalInfo(false);
    };


    function onTabChange(tab) {
        setActiveTab(tab)
    }

    return (

        <div  className='container mx-auto px-2'>

            {/* Tab Buttons */}
            <div  className="flex items-center justify-center md:justify-start gap-5 mb-10">
                <button onClick={() => onTabChange("description")}
                     className={`text-lg font-semibold ${activeTab === "description" && "border-b-2 border_secondary"}`}>Description</button>
                <button onClick={() => onTabChange("video")}
                     className={`text-lg font-semibold ${activeTab === "video" && "border-b-2 border_secondary"}`}>Video</button>
            </div>

            {/* Product Details Tab */}
            {activeTab === "description" && (<div  className="relative px-2 md:px-0">
                {
                    product.description ?
                        <>
                            <h2  className="text-base font-semibold mb-4">About this Item</h2>
                            <div  className={` ${showAdditionalInfo ? 'h-full text-sm' : 'h-[300px] overflow-hidden height-limit text-sm'}`} dangerouslySetInnerHTML={{ __html: product.description }} />
                        </>
                        : <NothingFound title={'No Description Found!'} />

                }

                {/* Toggle Button */}
                {product.description.length >= 2000 && <div  className="my-1 flex justify-center items-center">
                    {!showAdditionalInfo ? (
                        <button
                            onClick={e => onViewMoreClick()}
                             className="text-sm md:text-base px-4 py-2 bg_primary hover:bg_primary duration-300 rounded text-white"
                        >
                            View More
                        </button>
                    ) : (
                        <button
                            onClick={e => onViewLessClick()}
                             className="text-sm md:text-base px-4 py-2 bg_primary hover:bg_primary duration-300 rounded text-white"
                        >
                            View Less
                        </button>
                    )}
                </div>}
            </div>)}

            {/* Video Tab */}
            {activeTab === "video" && (
                <div  className='px-2 md:px-0'>
                    {
                        product.video_link ? <ReactPlayer
                            url={product.video_link}
                            config={{
                                vimeo: {
                                    playerOptions: {
                                        fullscreen: false,
                                    }
                                }
                            }}
                            width={'100%'}
                            height={'400px'}
                            controls={true}
                        /> : <NothingFound title={'No Video Found!'} />
                    }
                </div>
            )}

        </div>


    );
}
