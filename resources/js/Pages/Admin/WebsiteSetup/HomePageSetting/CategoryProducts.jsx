

import { router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";

export default function CategoryProducts ( { categories } )
{
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props
    const [ homeCategories, setHomeCategories ] = useState( business_settings.home_categories ?? [ {} ] );
    const [ selectedCategory, setSlectedCategory ] = useState( [] );
    const [ activeCategories, setActiveCategories ] = useState( [] );

    // Categories
    useEffect( () =>
    {
        var options = [];

        function processArray ( data )
        {
            data.forEach( ( element ) =>
            {
                options.push( { value: element.id, label: "-".repeat( element.depth ) + element.name, name: element.name, image: element.cover_image, slug: element.slug } );
                if ( Array.isArray( element.children ) )
                {
                    processArray( element.children );
                }
            } )
        }
        processArray( categories );

        setActiveCategories( options );

        let selectedCategoryData = [];

        homeCategories.forEach( element =>
        {
            let selected = options.filter( option => option.value == element )

            selectedCategoryData.push( selected[ 0 ] );
        } )
        setSlectedCategory( selectedCategoryData );
    }, [] );

    // Dynamic add inputs
    const handleAddInput = () =>
    {
        setHomeCategories( [ ...homeCategories, {} ] );
    };

    // Category change handler
    const handleCategoryChange = ( event, index ) =>
    {
        let onChangeValue = [ ...homeCategories ];
        let selectedCategoryValue = [ ...selectedCategory ];

        onChangeValue[ index ] = event.value;
        selectedCategoryValue[ index ] = event;

        setHomeCategories( onChangeValue );
        setSlectedCategory( selectedCategoryValue );
    };

    function updateHomeCategories ( params )
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'home_categories' ],
            home_categories: homeCategories,
        }, { preserveScroll: true } )
    }

    const handleDeleteInput = ( index ) =>
    {
        const newArray = [ ...homeCategories ];
        newArray.splice( index, 1 );
        setHomeCategories( newArray );
    };

    return (
        <div>
            <div  className="container mt-4">
                <h2  className="text-sm font-medium">Categories</h2>
                { homeCategories.map( ( e, index ) => (
                    <div key={ index }  className="flex items-center my-2 border border-dashed border-slate-300 rounded py-4 px-5 gap-3">
                        <div  className="w-full">
                            <Select
                                id="category_id"
                                name="category_id"
                                placeholder={ t( 'Select Category' ) }
                                 className="w-full rounded-lg"
                                classNamePrefix="react-select"
                                onChange={ e => handleCategoryChange( e, index ) }
                                value={ selectedCategory[ index ] }
                                options={ activeCategories }
                            />
                        </div>
                        <div  className="col-span-1">
                            <button  className="border p-3 rounded-full bg-red-100 hover:bg-red-600 text-red-600 hover:text-white duration-300" onClick={ () => handleDeleteInput( index ) }><RxCross2  className="text-base" /></button>
                        </div>
                    </div>
                ) ) }
                <button  className="w-full border flex justify-center items-center gap-2 mt-2 py-3 px-4 text-sm font-medium rounded hover:bg-slate-100 duration-500" onClick={ e => handleAddInput( e ) }><FiPlusCircle  className="text-lg text-[#008FE1]" /> <span>{ t( 'Add New' ) }</span> </button>
            </div>

            {/* Button */ }
            <div  className="flex justify-end my-4">
                <button onClick={ e => updateHomeCategories( e ) }  className="bg-[#008FE1] duration-300 py-2 px-20 rounded-md text-white text-md">{ t( 'Save' ) }</button>
            </div>
        </div>
    )

}
