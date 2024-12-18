import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";

import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";


export default function SellerVerificationForm ()
{

    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props

    const [ makeInput, setMakeInput ] = useState( business_settings.verification_form ?? [] );


    function textInputClick ( type )
    {
        setMakeInput( [ ...makeInput, { id: Date.now(), type: type, label: 'Text Input' } ] )
    }

    function selectClick ( type )
    {

        setMakeInput( [ ...makeInput, { id: Date.now(), type: type, label: 'Select Label', options: [] } ] )
    }

    function radioInputClick ( type )
    {
        setMakeInput( [ ...makeInput, { id: Date.now(), type: type, label: 'Radio Input', options: [] } ] )
    }

    function fileInputClick ( type )
    {
        setMakeInput( [ ...makeInput, { id: Date.now(), type: type, label: 'File Input' } ] )
    }

    function addOptionClick ( id )
    {
        let OpState = [ ...makeInput ];
        const findOp = OpState.find( item => item.id == id )
        findOp.options.push( { id: Date.now(), value: '' } );
        setMakeInput( [ ...OpState ] )
    }

    // On Change
    function inputLabelChange ( e, id )
    {
        // const inputData = [...makeInput]
        let find = makeInput.find( inp => inp.id == id );
        find.label = e.target.value;
        setMakeInput( [ ...makeInput ] )
    }

    function optionValueChange ( e, inputId, optionId )
    {
        // const inputData = [...makeInput]
        let findInput = makeInput.find( input => input.id == inputId );

        let findOption = findInput.options.find( option => option.id == optionId );

        findOption.value = e.target.value;
        setMakeInput( [ ...makeInput ] )
    }

    // Remove
    function removeInput ( id )
    {
        setMakeInput( makeInput.filter( inputField => inputField.id !== id ) );
    }

    function removeOption ( inputId, optionId )
    {
        let findInput = makeInput.find( input => input.id == inputId );
        let newOption = findInput.options.filter( option => option.id !== optionId )
        findInput.options = newOption;
        setMakeInput( [ ...makeInput ] )
    }

    // Save
    function saveInputs ()
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'verification_form' ],
            verification_form: makeInput
        }, { preserveScroll: true } )
    }

    return (
        <AdminLayout>
            <Head title={ "Seller Verification Form" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.dashboard' ) }  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{ t( 'Dashboard' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <FaHouseUser  className="text-base text-slate-900" />
                                    <span>{ t( 'Seller Verification Form' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200'>
                    <div  className="flex items-center justify-between border-b py-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Seller Verification Form' ) }</h2>
                        </div>
                    </div>
                    <div  className="card-body grid grid-cols-12 gap-10">
                        <div  className="col-span-8 flex flex-col gap-4">
                            {
                                makeInput.map( ( input, i ) => (
                                    <div key={ i }  className="flex justify-between items-start gap-4 bg-[#E5E5E5] px-8 py-4 rounded">
                                        <div  className="mt-3"> <p>{ input.type }</p></div>
                                        <div  className="w-8/12 space-y-2">
                                            <input onChange={ e => inputLabelChange( e, input.id ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm" type="text" value={ input.label } />
                                            {
                                                input.options &&
                                                <>
                                                    { input.options.map( ( option, i ) => (
                                                        <div key={ i }  className="flex items-center gap-4">
                                                            <input onChange={ e => optionValueChange( e, input.id, option.id ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 w-6/12 rounded-lg text-sm" type="text" value={ option.value } />
                                                            <button onClick={ e => removeOption( input.id, option.id ) }  className="text-xl"><IoMdClose /></button>
                                                        </div>
                                                    ) ) }
                                                    <button onClick={ e => addOptionClick( input.id ) }  className="px-4 py-2 bg_primary text-white rounded-md">Add Option</button>
                                                </>
                                            }
                                        </div>
                                        <button onClick={ e => removeInput( input.id ) }  className="text-xl mt-3"><IoMdClose /></button>
                                    </div>
                                ) )
                            }
                            <div  className="flex justify-end">
                                <button onClick={ e => saveInputs() }  className="px-4 py-2 bg_primary text-white rounded-md">Save</button>
                            </div>
                        </div>
                        <div  className="col-span-4">
                            <ul  className="space-y-1">
                                <li onClick={ e => textInputClick( 'Text' ) }  className="py-2 px-4 border border-slate-300 hover:border_primary duration-200 text-base rounded cursor-pointer font-medium">Text Input</li>
                                <li onClick={ e => selectClick( 'Select' ) }  className="py-2 px-4 border border-slate-300 hover:border_primary duration-200 text-base rounded cursor-pointer font-medium">Select</li>
                                <li onClick={ e => radioInputClick( 'Radio' ) }  className="py-2 px-4 border border-slate-300 hover:border_primary duration-200 text-base rounded cursor-pointer font-medium">Radio</li>
                                <li onClick={ e => fileInputClick( 'File' ) }  className="py-2 px-4 border border-slate-300 hover:border_primary duration-200 text-base rounded cursor-pointer font-medium">File</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    )

}
