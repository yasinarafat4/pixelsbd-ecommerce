import UploadModal from "@/Components/UploadModals/UploadModal";
import { asset_url } from "@/Helpers";

import { router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { BsExclamationOctagon } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function HomeSlider() {
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [sliders, setSliders] = useState(business_settings.home_sliders ?? []);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);


    const handleLinkChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...sliders];
        onChangeValue[index][name] = value;
        setSliders(onChangeValue);
    };

    function onAddFile(v) {
        const Array = [...sliders];
        Array[currentIndex].image = v[0]
        setSliders(Array)
        closeModal();
    }

    function handelShowModal(index) {
        if (sliders[index].image == "") {
            setSelectedImg([])
        } else {
            setSelectedImg([sliders[index].image])
        }
        setCurrentIndex(index)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };

    // Dynamic add inputs
    const handleAddInput = () => {
        setSliders([...sliders, { image: "", link: "" }]);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...sliders];
        newArray.splice(index, 1);
        setSliders(newArray);
    };

    function updateHomeSlider(params) {
        router.post(route('admin.configuration.update'), {
            types: ['home_sliders'],
            home_sliders: sliders,
        }, { preserveScroll: true })
    }

    return (
        <div>
            <div  className="p-4 rounded bg-slate-100 shadow">
                <div  className="flex items-center gap-2">
                    <BsExclamationOctagon /> <span  className="text-sm">Image aspect ratio should be 4:2</span>
                </div>
                <p  className="text-sm ms-6">To maintain the UI, we&apos;ve limited the banner height and will crop from both the left and right sides to ensure responsiveness across devices. Please keep these points in mind when designing the banner.</p>
            </div>
            <div  className="container mt-4">
                {/* Modal */}
                {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}
                {sliders.map((slider, index) => (
                    <div  className="my-2 border border-dashed border-slate-300 rounded py-4 px-5" key={index}>
                        <div  className="grid grid-cols-12 items-center gap-2 ">
                            {/* Upload Image */}
                            <div  className='col-span-5 flex justify-between'>
                                <div onClick={e => handelShowModal(index)}
                                     className=" cursor-pointer grid grid-cols-12 items-center w-full"
                                >
                                    <div  className="bg-[#2B3440] h-11 col-span-4 rounded-s-md flex justify-center items-center">
                                        <p  className="text-white text-sm uppercase">Choose File</p>
                                    </div>
                                    <div  className="bg-[#FFFFFF] h-12 border col-span-8 border-slate-300 rounded-e-md flex justify-start items-center">
                                        <p  className="ps-4 font-medium">{slider.image ? '1 file chosen' : 'No file chosen'}</p>
                                    </div>
                                </div>
                            </div>

                            <div  className="col-span-6">
                                <input
                                    name="link"
                                    type="text"
                                    placeholder="Link with http:// Or https://"
                                     className="w-full text-sm rounded-md border border-slate-300 focus:outline-none bg-white text-slate-600 px-4 py-3"
                                    value={slider.link}
                                    onChange={(event) => handleLinkChange(event, index)}
                                />
                            </div>
                            <div  className="col-span-1">
                                <button  className="border p-3 rounded-full bg-red-100 hover:bg-red-600 text-red-600 hover:text-white duration-300" onClick={() => handleDeleteInput(index)}><RxCross2  className="text-base" /></button>
                            </div>
                        </div>
                        {slider.image && (
                            <div  className="relative">
                                <img  className='w-32 border rounded-xl p-3 mt-3' src={asset_url(slider.image)} alt={'Site Icon'} />
                            </div>
                        )}
                    </div>

                ))}
                <button  className="w-full border flex justify-center items-center gap-2 mt-2 py-3 px-4 text-sm font-medium rounded hover:bg-slate-100 duration-500" onClick={() => handleAddInput()}><FiPlusCircle  className="text-lg text-[#008FE1]" /> <span>Add New</span> </button>
            </div>

            {/* Button */}
            <div  className="flex justify-end my-4">
                <button onClick={e => updateHomeSlider()}  className="bg-[#008FE1] duration-300 py-2 px-20 rounded-md text-white text-md">{t('Save')}</button>
            </div>
        </div>
    )

}
