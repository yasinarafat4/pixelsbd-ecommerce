import UploadModal from "@/Components/UploadModals/UploadModal";
import { asset_url } from "@/Helpers";

import { router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { BsExclamationOctagon } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

export default function BannerTwoContents() {

    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    // const [sliders, setSliders] = useState(business_settings.home_sliders ?? []);
    const [bannerTwo, setBannerTwo] = useState(business_settings.home_banner_two ?? [
        { 'image': '', 'link': '' },
        { 'image': '', 'link': '' },
        { 'image': '', 'link': '' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
    const [limit, setLimit] = useState(1);
    const [selectedImg, setSelectedImg] = useState([]);


    const handleLinkChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...bannerTwo];
        onChangeValue[index][name] = value;
        setBannerTwo(onChangeValue);
    };

    function onAddFile(v) {
        const Array = [...bannerTwo];
        Array[currentIndex].image = v[0]
        setBannerTwo(Array)
        closeModal();
    }

    function removeBanner(index) {
        const Array = [...bannerTwo];
        Array[index].image = ''
        setBannerTwo(Array)
    }

    function handelShowModal(index) {
        if (bannerTwo[index].image == "") {
            setSelectedImg([])
        } else {
            setSelectedImg([bannerTwo[index].image])
        }
        setCurrentIndex(index)
        setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    };


    function updateHomeBannerTwo(params) {
        router.post(route('admin.configuration.update'), {
            types: ['home_banner_two'],
            home_banner_two: bannerTwo,
        }, { preserveScroll: true })
    }


    return (
        <div>
            <div  className="container mt-4">
                <div  className="p-4 rounded border bg-slate-100 shadow">
                    <h1  className="text-lg font-semibold">Banner Two Contents</h1>
                    <div  className="flex flex-col items-start gap-2">
                        <div  className="flex items-start gap-2">
                            <BsExclamationOctagon /> <span  className="text-sm w-6/12">Ensure that each image follows the specified aspect ratio guidelines when adding images to maintain visual consistency and alignment.</span>
                        </div>
                        <div  className="overflow-x-auto">
                            <table  className="table-auto w-full border border-slate-300">
                                <thead>
                                    <tr  className="bg-gray-100 text-sm">
                                        <th  className="px-4 py-2 border-b border-r border-slate-300">Number of Image</th>
                                        <th  className="px-4 py-2 border-b border-slate-300">Aspect Ratio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr  className="text-sm">
                                        <td  className="px-4 py-1 border-b border-r border-slate-300">1</td>
                                        <td  className="px-4 py-1 border-b border-slate-300">6:2</td>
                                    </tr>
                                    <tr  className="bg-gray-50 text-sm">
                                        <td  className="px-4 py-1 border-b border-r border-slate-300">2</td>
                                        <td  className="px-4 py-1 border-b border-slate-300">4:2</td>
                                    </tr>
                                    <tr  className="text-sm">
                                        <td  className="px-4 py-1 border-b border-r border-slate-300">3</td>
                                        <td  className="px-4 py-1">4:3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                {showModal && <UploadModal limit={limit} selected={selectedImg} onAddFile={onAddFile} closeModal={closeModal} showModal={showModal} />}

                {/* Image Two */}
                {
                    bannerTwo.map((banner, i) => (
                        <div key={i}>
                            <h2  className="text-sm font-medium mt-4">Image {i + 1}</h2>
                            <div  className="my-1 border border-dashed border-slate-300 rounded py-4 px-5">
                                <div  className="grid grid-cols-12 items-center gap-2 ">
                                    {/* Upload Image */}
                                    <div  className='col-span-6 flex justify-between'>
                                        <div onClick={e => handelShowModal(i)}
                                             className=" cursor-pointer grid grid-cols-12 items-center w-full"
                                        >
                                            <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                                <p  className="text-white text-xs uppercase">Choose File</p>
                                            </div>
                                            <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                                <p  className="ps-4 font-medium">{banner.image ? '1 file chosen' : '0 file chosen'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div  className="col-span-6">
                                        <input
                                            name="link"
                                            type="text"
                                            value={banner.link}
                                            placeholder="Link with http:// Or https://"
                                             className="w-full text-sm rounded-md border border-slate-300 focus:outline-none bg-white text-slate-600 px-4 py-3"
                                            onChange={(event) => handleLinkChange(event, i)}
                                        />
                                    </div>
                                </div>
                                {banner.image && (
                                    <div  className="relative">
                                        <IoMdClose onClick={e => { removeBanner(i) }}  className="text-xl text_primary absolute -top-1 -left-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                        <img  className='w-32 border rounded-xl p-3 mt-3' src={asset_url(banner.image)} alt={'Site Icon'} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Button */}
            <div  className="flex justify-end my-4">
                <button onClick={updateHomeBannerTwo}  className="bg-[#008FE1] duration-300 py-2 px-20 rounded-md text-white text-md">{t('Save')}</button>
            </div>
        </div>
    )

}
