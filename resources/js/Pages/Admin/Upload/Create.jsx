/* eslint-disable */

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiGalleryUploadFill } from "react-icons/ri";


import { canvasPreview } from "@/Components/canvasPreview";
import { useDebounceEffect } from "@/Components/useDebounceEffect";
import usePrevious from "@/Components/usePrevious";
import imageCompression from "browser-image-compression";
import { useDropzone } from 'react-dropzone';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from "react-toastify";


function centerAspectCrop (
    mediaWidth,
    mediaHeight,
    aspect,
)
{
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

export default function Create ()
{
    const { t } = useLaravelReactI18n();
    const { errors } = usePage().props;

    const imgRef = useRef( null );
    const previewCanvasRef = useRef( null );

    const [ images, setImages ] = useState( [] );
    const [ progress, setProgress ] = useState();
    const [ complete, setComplete ] = useState( false );

    //Upload & Crop State Start
    const [ image, setImage ] = useState( null );
    const [ crop, setCrop ] = useState();
    const [ completedCrop, setCompletedCrop ] = useState( null );
    const [ imageName, setImageName ] = useState( '' )
    const [ scale, setScale ] = useState( 1 )
    const [ rotate, setRotate ] = useState( 0 )
    const [ aspect, setAspect ] = useState( 16 / 9 )
    const prevAspect = usePrevious( aspect )


    // Handles the image file after dropping it into the dropzone
    const onDrop = useCallback( ( acceptedFiles ) =>
    {
        setCrop( undefined )
        const file = acceptedFiles[ 0 ];
        const reader = new FileReader();
        reader.onload = () => setImage( reader.result ); // Converts the file to a base64 data URL
        reader.readAsDataURL( file );
    }, [] );

    const { getRootProps, getInputProps } = useDropzone( {
        onDrop,
        multiple: false,
        accept: 'image/*',
    } );

    // Handles image load and initializes crop based on image size
    const onImageLoaded = ( img ) =>
    {
        if ( aspect )
        {
            const { width, height } = img.currentTarget
            setCrop( centerAspectCrop( width, height, aspect ) )
        }
    };

    useDebounceEffect(
        async () =>
        {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            )
            {
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
        [ completedCrop, scale, rotate ],
    )

    // Updates crop when the aspect ratio changes
    useEffect( () =>
    {

        if ( imgRef.current )
        {
            const { width, height } = imgRef.current
            let newCrop;
            if ( aspect == undefined )
            {
                newCrop = centerAspectCrop( width, height, prevAspect )
            } else
            {
                newCrop = centerAspectCrop( width, height, aspect )
            }
            setCrop( newCrop )
            // Updates the preview
            setCompletedCrop( convertToPixelCrop( newCrop, width, height ) )
        }
    }, [ aspect ] );

    // Submits the cropped image to the backend using InertiaJS
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();

        if ( previewCanvasRef.current )
        {
            previewCanvasRef.current.toBlob( async ( blob ) =>
            {
                const file = new File( [ blob ], "image.jpg", { type: blob.type } );
                // Set compression options
                const options = {
                    maxSizeMB: 1, // Maximum file size in MB
                    maxWidthOrHeight: 800, // Resize to max dimensions
                    useWebWorker: true, // Enable multi-threading
                };
                const compressedFile = await imageCompression( file, options );
                const formData = new FormData();
                formData.append( 'type', null );
                formData.append( 'name', imageName );
                formData.append( 'image', compressedFile );

                router.post( route( 'admin.image_upload' ), formData, {
                    onStart: () =>
                    {
                        setProgress( true )
                    },
                    onFinish: () =>
                    {
                        setProgress( false )
                    },
                    onSuccess: ( page ) =>
                    {
                        setImageName( '' );
                        setImage( null )
                        setCrop( undefined )
                    },
                    onError: ( err ) =>
                    {
                        toast.error( err.name )
                    }
                } );
            } );

        }
    };



    return (
        <AdminLayout>
            <Head title={ "Create" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.upload.index' ) }  className="inline-flex gap-1 items-center">
                                    <RiGalleryUploadFill  className="text-lg text-slate-900" />
                                    <span>{ t( 'Uploaded Files' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{ t( 'Create' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link onClick={ e => window.history.back() }>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl h-full mx-auto'>
                    <div>
                        <div { ...getRootProps() }  className="dropzone h-20 w-[800px] my-5 mx-auto">
                            <input { ...getInputProps() } />
                            <p>Drag &apos;n&apos; drop an image here, or click to select</p>
                        </div>
                        { image && (
                            <div  className="px-10 py-3">
                                <div  className='grid grid-cols-12 gap-10'>
                                    <div  className="crop-container w-full col-span-6">
                                        <h3  className="font-semibold py-1">Original Image</h3>
                                        <ReactCrop
                                            crop={ crop }
                                            onChange={ ( _, percentCrop ) => setCrop( percentCrop ) }
                                            onComplete={ ( c ) => setCompletedCrop( c ) }
                                            aspect={ aspect }
                                        >
                                            <img
                                                ref={ imgRef }
                                                src={ image }
                                                alt="Upload Preview"
                                                style={ { height: '100%', transform: `scale(${ scale }) rotate(${ rotate }deg)` } }
                                                onLoad={ onImageLoaded }
                                            />
                                        </ReactCrop>
                                        <div  className="flex flex-wrap gap-3 my-2">
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 1.7777777777777777 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 16 / 9 ) }>16/9</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 6 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 6 / 1 ) }>6/1</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 3 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 6 / 2 ) }>6/2</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 1 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 1 / 1 ) }>1/1</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 1.3333333333333333 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 4 / 3 ) }>4/3</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 2 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 4 / 2 ) }>4/2</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 1.5 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 3 / 2 ) }>3/2</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == 0.6666666666666666 ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( 2 / 3 ) }>2/3</button>
                                            <button  className={ `btn btn-outline text-sm rounded hover:bg-slate-900 text-slate-600 hover:text-white duration-300 ${ aspect == undefined ? 'bg-slate-900 text-white' : '' } ` } onClick={ e => setAspect( undefined ) }>Free</button>
                                        </div>
                                        <div  className="formgrid grid">
                                            <div  className="field col">
                                                <label htmlFor="firstname2">Scale({ scale }x)</label>
                                                <input type="range" min={ 0.1 } max={ 5 } step={ 0.1 } value={ scale } onChange={ ( e ) => setScale( Number( e.target.value ) ) }  className="range range-xs range-info" />
                                            </div>
                                        </div>
                                        <div  className="formgrid grid">
                                            <div  className="field col">
                                                <label htmlFor="firstname2">Rotate ({ rotate }&deg;)</label>
                                                <input type="range" min={ -180 } max={ 180 } step={ 1 } value={ rotate } onChange={ ( e ) => setRotate( Math.min( 180, Math.max( -180, Number( e.target.value ) ) ) ) }  className="range range-xs range-accent" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Canvas for cropped image */ }
                                    { completedCrop && (
                                        <div  className="preview-container col-span-6">
                                            <h3  className="font-semibold py-1">Cropped Image Preview</h3>
                                            <canvas
                                                ref={ previewCanvasRef }
                                                style={ {
                                                    width: completedCrop.width,
                                                    height: completedCrop.height,
                                                    border: '1px solid #838A98',
                                                    borderRadius: '3px'
                                                } }
                                            />
                                            <div  className="w-full py-4">
                                                <input value={ imageName } onChange={ e => setImageName( e.target.value ) } placeholder="Image name"  className="w-full p-2  focus:outline-none border focus:border-[#008CDD] text-sm rounded bg-white" />
                                                { errors && (
                                                    <small  className="text-error">{ errors.name }</small>
                                                ) }
                                            </div>
                                        </div>
                                    ) }
                                </div>
                                <div  className="flex justify-end flex-wrap mt-4 gap-2">
                                    <button onClick={ e => handleSubmit( e ) }  className="bg-[#008CDD] text-sm text-slate-100 py-2 px-4 rounded">{
                                        progress ? <div  className="flex items-center gap-2">
                                            <span  className="loading loading-spinner loading-sm">
                                            </span>
                                            <span>Upload File</span></div> :
                                            <span>Upload File</span>
                                    }</button>

                                </div>
                            </div>
                        ) }


                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
