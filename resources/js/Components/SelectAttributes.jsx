import { useLaravelReactI18n } from 'laravel-react-i18n';
import Select from "react-select";

export default function SelectAttributes ( { handelSelectAttributesChange, label, data } )
{
    const { t } = useLaravelReactI18n();

    const names = Object.keys( data )
        .filter( ( key ) => key.includes( label ) )
        .reduce( ( obj, key ) =>
        {
            return data[ key ]
        }, {} );
    return (
        <>
            <div  className="w-full p-5 bg-slate-200 shadow-lg rounded-md">
                <label  className='label-text text-slate-600 text-sm font-medium'>{ t( label ) } *</label>
                <Select
                    isMulti
                    placeholder={ t( 'Select ' + label ) }
                     className="w-full rounded-lg"
                    classNamePrefix="react-select"
                    onChange={ e => handelSelectAttributesChange( e ) }
                    options={ names }
                />
            </div>
        </>
    )

}
