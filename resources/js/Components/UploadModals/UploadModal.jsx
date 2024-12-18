import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../Modal";

import { asset_url, filesize, placeholder1_1 } from "@/Helpers";
import { useDropzone } from 'react-dropzone';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { canvasPreview } from "../canvasPreview";
import { useDebounceEffect } from "../useDebounceEffect";
import usePrevious from "../usePrevious";

function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function UploadModal({ limit = 1, onAddFile, closeModal, showModal, selected }) {
    const { errors, auth } = usePage().props;
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const [activeTab, setActiveTab] = useState("selectFile");
    const [selectedImage, setSelectedImage] = useState(selected ?? []);
    const [imageList, setImageList] = useState([]);

    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imageName, setImageName] = useState('')
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(16 / 9)
    const prevAspect = usePrevious(aspect)

    const [next, setNext] = useState();
    const [nextLoading, setNextLoading] = useState(false);

    const [prev, setPrev] = useState();
    const [prevLoading, setPrevLoading] = useState(false);

    const [progress, setProgress] = useState();

    // Handles the image file after dropping it into the dropzone
    const onDrop = useCallback((acceptedFiles) => {
        setCrop(undefined)
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result); // Converts the file to a base64 data URL
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*',
    });

    // Handles image load and initializes crop based on image size
    const onImageLoaded = (img) => {
        if (aspect) {
            const { width, height } = img.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    };

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    // Updates crop when the aspect ratio changes
    useEffect(() => {

        if (imgRef.current) {
            const { width, height } = imgRef.current
            let newCrop;
            if (aspect == undefined) {
                newCrop = centerAspectCrop(width, height, prevAspect)
            } else {
                newCrop = centerAspectCrop(width, height, aspect)
            }
            setCrop(newCrop)
            // Updates the preview
            setCompletedCrop(convertToPixelCrop(newCrop, width, height))
        }
    }, [aspect]);



    // Submits the cropped image to the backend using InertiaJS
    const handleSubmit = (e) => {
        e.preventDefault();

        if (previewCanvasRef.current) {
            previewCanvasRef.current.toBlob(async (blob) => {
                const file = new File([blob], "image.jpg", { type: blob.type });
                // Set compression options
                const options = {
                    maxSizeMB: 1, // Maximum file size in MB
                    maxWidthOrHeight: 800, // Resize to max dimensions
                    useWebWorker: true, // Enable multi-threading
                };
                const compressedFile = await imageCompression(file, options);
                const formData = new FormData();
                formData.append('type', null);
                formData.append('name', imageName);
                formData.append('image', compressedFile);

                router.post(route('admin.image_upload_modal'), formData, {
                    onStart: () => {
                        setProgress(true)
                    },
                    onFinish: () => {
                        setProgress(false)
                    },
                    onSuccess: (page) => {
                        setImageName('');
                        setImage(null)
                        setCrop(undefined)
                        setActiveTab('selectFile')
                    },
                    onError: (err) => {
                        toast.error(err.name)
                    }
                });
            });

        }
    };



    useEffect(() => {
        axios({
            method: 'get',
            url: route('admin.image_list'),
            responseType: 'json'
        })
            .then(function (response) {
                setNext(response.data.next_page_url)
                setPrev(response.data.prev_page_url)
                setImageList(response.data)
            });
    }, [activeTab])

    function onPrevClick(params) {
        setPrevLoading(true);
        axios({
            method: 'get',
            url: prev,
            responseType: 'json'
        })
            .then(function (response) {
                setNext(response.data.next_page_url)
                setPrev(response.data.prev_page_url)
                setImageList(response.data)
                setPrevLoading(false)
            });
    }

    function onNextClick(params) {
        setNextLoading(true)
        axios({
            method: 'get',
            url: next,
            responseType: 'json'
        })
            .then(function (response) {
                setNext(response.data.next_page_url)
                setPrev(response.data.prev_page_url)
                setImageList(response.data)
                setNextLoading(false)
            });
    }


    function onImageSelect(media) {

        const isSelected = selectedImage.find((img) => img === media.url);
        if (isSelected) {
            // Remove the image if it's already selected
            setSelectedImage(selectedImage.filter((img) => img !== media.url));
        }
        else {
            // Check if the selection limit is reached
            if (selectedImage.length < limit) {
                setSelectedImage([...selectedImage, media.url]);
            } else {
                toast.error(`You can only select up to ${limit} ${limit == 1 ? 'image.' : 'images'}`)
            }
        }
    }

    function onAddFileClick(params) {
        onAddFile(selectedImage)
    }

    function onTabChange(tab) {
        setImageName('');
        setImage(null)
        setCrop(undefined)
        setActiveTab(tab)
    }

    return (
        <>
            {/* Modal */}
            <Modal maxWidth="7xl" show={showModal} onClose={closeModal} closeable={false}>
                <div className="text-slate-600">
                    {/* Modal Top */}
                    <div className="flex justify-between items-center py-3 px-6 bg-[#F2F3F8]">
                        {/* Tab Buttons */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => onTabChange("selectFile")}
                                className={`${activeTab === "selectFile" ? "text-blue-600 bg-white  py-2 px-4" : "hover:text-blue-600 hover:bg-white py-2 px-4 duration-300"}`}>Select File</button>
                            <button onClick={() => onTabChange("uploadFile")}
                                className={`${activeTab === "uploadFile" ? "text-blue-600 bg-white  py-2 px-4" : "hover:text-blue-600 hover:bg-white py-2 px-4 duration-300"}`}>Upload FIle</button>
                        </div>
                        <button onClick={closeModal} className="text-slate-500 hover:text-slate-600 duration-300"><MdOutlineClose className="text-2xl" /></button>
                    </div>
                    {/* Modal Body */}
                    <div className={`${activeTab === "uploadFile" ? "max-h-[900px] min-h-[700px] flex justify-center items-center" : "max-h-[700px] min-h-[700px]"}`}>
                        {/* Tab Body */}
                        {/* Select File Tab */}
                        {
                            activeTab === "selectFile" && (
                                <div className="px-6 py-3 grid grid-cols-5 gap-2 w-full overflow-y-scroll">
                                    {/* card */}
                                    {imageList.data && imageList.data.map((media, i) => (
                                        <div key={i} className={`overflow-hidden rounded-lg shadow-lg cursor-pointer ${selectedImage.some((img) => img === media.url) ? 'ring-[3px] ring-blue-500' : ''}`} onClick={() => onImageSelect(media)}>
                                            <div className="flex justify-center">
                                                <LazyLoadImage
                                                    effect='blur'
                                                    src={asset_url(media?.url || placeholder1_1())}
                                                    alt={media?.file_name}
                                                    className="w-full h-32 mx-auto object-cover transform hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                                                />
                                            </div>
                                            <div className="px-4 py-2 bg-gray-100">
                                                <p className="font-semibold truncate ...">{media.file_name}</p>
                                                <p className="text-sm text-gray-600">Size: {filesize(media.size)}</p>
                                                <p className="text-sm text-gray-600">Dimensions: {media.height + 'x' + media.width}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        {/* Upload File Tab */}
                        {
                            activeTab === "uploadFile" && (

                                <div className="max-h-[80vh] overflow-y-scroll text-slate-600">
                                    <div {...getRootProps()} className="dropzone h-20 w-[800px] my-5 mx-auto">
                                        <input {...getInputProps()} />
                                        <p>Drag &apos;n&apos; drop an image here, or click to select</p>
                                    </div>
                                    {image && (
                                        <div className="px-10 py-3 text-slate-600">
                                            <div className='grid grid-cols-12 gap-10'>
                                                <div className="crop-container w-full col-span-6">
                                                    <h3 className="font-semibold py-1">Original Image</h3>
                                                    <ReactCrop
                                                        crop={crop}
                                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                                        onComplete={(c) => setCompletedCrop(c)}
                                                        aspect={aspect}
                                                    >
                                                        <img
                                                            ref={imgRef}
                                                            src={image}
                                                            alt="Upload Preview"
                                                            style={{ height: '100%', transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                                            onLoad={onImageLoaded}
                                                        />
                                                    </ReactCrop>
                                                    <div className="flex flex-wrap gap-3 my-2">
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 1.7777777777777777 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(16 / 9)}>16/9</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 6 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(6 / 1)}>6/1</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 3 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(6 / 2)}>6/2</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 1 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(1 / 1)}>1/1</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 1.3333333333333333 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(4 / 3)}>4/3</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 2 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(4 / 2)}>4/2</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 1.5 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(3 / 2)}>3/2</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == 0.6666666666666666 ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(2 / 3)}>2/3</button>
                                                        <button className={`btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${aspect == undefined ? 'bg-slate-900 text-white' : ''} `} onClick={e => setAspect(undefined)}>Free</button>
                                                    </div>
                                                    <div className="formgrid grid">
                                                        <div className="field col">
                                                            <label htmlFor="firstname2">Scale({scale}x)</label>
                                                            <input type="range" min={0.1} max={5} step={0.1} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="range range-xs range-info" />
                                                        </div>
                                                    </div>
                                                    <div className="formgrid grid">
                                                        <div className="field col">
                                                            <label htmlFor="firstname2">Rotate ({rotate}&deg;)</label>
                                                            <input type="range" min={-180} max={180} step={1} value={rotate} onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))} className="range range-xs range-accent" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Canvas for cropped image */}
                                                {completedCrop && (
                                                    <div className="preview-container col-span-6">
                                                        <h3 className="font-semibold py-1">Cropped Image Preview</h3>
                                                        <canvas
                                                            ref={previewCanvasRef}
                                                            style={{
                                                                width: completedCrop.width,
                                                                height: completedCrop.height,
                                                                border: '1px solid #838A98',
                                                                borderRadius: '3px'
                                                            }}
                                                        />
                                                        <div className="w-full py-4">
                                                            <input value={imageName} onChange={e => setImageName(e.target.value)} placeholder="Image name" className="w-full p-2  focus:outline-none border focus:border-[#008CDD] text-sm rounded bg-white" />
                                                            {errors && (
                                                                <small className="text-error">{errors.name}</small>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex justify-end flex-wrap mt-4 gap-2">
                                                <button onClick={e => handleSubmit(e)} className="bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded">{
                                                    progress ? <div className="flex items-center gap-2">
                                                        <span className="loading loading-spinner loading-sm">
                                                        </span>
                                                        <span>Upload File</span></div> :
                                                        <span>Upload File</span>
                                                }</button>

                                            </div>
                                        </div>
                                    )}


                                </div>
                            )
                        }

                    </div>
                    {/* Modal Bottom */}
                    {activeTab === "selectFile" && <div className="flex justify-between items-center py-3 px-6 bg-[#F2F3F8]">
                        {/* <div  className="flex items-center gap-2">
                            <button disabled={prev == null} onClick={onPrevClick}  className={prev == null ? "bg-slate-300 text-sm text-slate-600 py-2 px-4 rounded cursor-not-allowed" : "bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded"}>Prev</button>
                            <button disabled={next == null} onClick={onNextClick}  className={next == null ? "bg-slate-300 text-sm text-slate-600 py-2 px-4 rounded cursor-not-allowed" : "bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded"}>Next</button>
                            <div  className="flex flex-col items-start ms-3">
                                <p  className="text-sm">{selectedImage.length} File Selected</p>
                                {
                                    selectedImage.length > 0 && <button onClick={() => setSelectedImage([])}  className="text-sm text-[#008CDD]">Clear</button>
                                }
                            </div>
                        </div> */}


                        <div className="flex flex-col gap-2">
                            <>
                                <p className='text-slate-600 text-sm'>Showing {imageList.from || 0} to {imageList.to || 0} from {imageList.total}</p>
                            </>
                            <div className="flex items-center gap-2">
                                <button disabled={prev == null} onClick={onPrevClick} className={`flex items-center gap-2 ${prev == null ? "bg-slate-300 text-sm text-slate-600 py-2 px-4 rounded cursor-not-allowed" : "bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded"}`}>
                                    {prevLoading && <span className="loading loading-xs loading-spinner"></span>}
                                    <span>Prev</span>
                                </button>

                                <button disabled={next == null} onClick={onNextClick} className={`flex items-center gap-2 ${next == null ? "bg-slate-300 text-sm text-slate-600 py-2 px-4 rounded cursor-not-allowed" : "bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded"}`}>
                                    <span>Next</span>
                                    {nextLoading && <span className="loading loading-xs loading-spinner"></span>}
                                </button>
                                <div className="flex flex-col items-start ms-3">
                                    <p className="text-sm">{selectedImage.length} File Selected</p>
                                    {
                                        selectedImage.length > 0 && <button onClick={() => setSelectedImage([])} className="text-sm text-[#008CDD]">Clear</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <>
                            <button onClick={onAddFileClick} className="bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded">Add Files</button>
                        </>
                    </div>}
                </div>
            </Modal>
        </>
    );
};
