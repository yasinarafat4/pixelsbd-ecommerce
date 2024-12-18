

import { router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function TopBrands ( { brands } )
{
    const { t } = useLaravelReactI18n();
    const { business_settings } = usePage().props;
    const [ selectedBrand, setSelectedBrand ] = useState();
    const [ selectedBrandId, setSelectedBrandId ] = useState( [] );

    useEffect( () =>
    {
        const brandData = []
        business_settings?.top_brands?.forEach( ele =>
        {
            const findBrand = brands.find( item => item.id == ele );
            brandData.push( { value: findBrand.id, label: findBrand.name } )
        } )
        setSelectedBrand( brandData );
    }, [] )


    // Select Brand handler
    function onSelectBrand ( e )
    {
        setSelectedBrand( e );
        const brandId = [];
        e.forEach( element =>
        {
            brandId.push( element.value )
        } );
        setSelectedBrandId( brandId )
    }

    function updateTopBrand ( params )
    {
        router.post( route( 'admin.configuration.update' ), {
            types: [ 'top_brands' ],
            top_brands: selectedBrandId,
        }, { preserveScroll: true } )
    }


    return (
        <div>
            <div  className="container mt-4">
                <h2  className="text-sm font-medium mb-1">Top Brands (Max 12)</h2>
                <div  className="w-full">
                    <Select
                        isMulti
                        id="top_brands"
                        name="top_brands"
                        placeholder={ t( 'Select Brands' ) }
                         className="w-full rounded-lg z-10"
                        classNamePrefix="react-select"
                        value={ selectedBrand }
                        isOptionDisabled={ () => selectedBrand.length >= 12 }
                        onChange={ ( e ) => onSelectBrand( e ) }
                        options={ brands.map( brand => ( { value: brand.id, label: brand.name } ) ) }
                    />
                </div>

            </div>

            {/* Button */ }
            <div  className="flex justify-end my-4">
                <button onClick={ e => updateTopBrand() }  className="bg-[#008FE1] duration-300 py-2 px-20 rounded-md text-white text-md">{ t( 'Save' ) }</button>
            </div>
        </div>
    )

}
