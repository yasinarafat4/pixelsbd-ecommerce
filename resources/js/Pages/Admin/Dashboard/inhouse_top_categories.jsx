import { asset_url, currencyFormat, placeholder1_1 } from "@/Helpers";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";

export default function InhouseTopCategories ()
{
    const { t } = useLaravelReactI18n();
    const { active_locale, business_settings } = usePage().props
    const [ intervalType, setIntervalType ] = useState( 'all' )
    const [ loading, setLoading ] = useState( false )
    const [ inhouseTopCategories, setInhouseTopCategories ] = useState( [] )
    useEffect( () =>
    {
        fetchData( intervalType )
    }, [] )

    function OnTabClick ( type )
    {
        setIntervalType( type )
        setLoading( true )
        fetchData( type )
    }

    function fetchData ( type )
    {
        axios.post( route( 'admin.dashboard.inhouse_top_categories' ), { 'interval_type': type }, { responseType: "json" } )
            .then( response =>
            {
                setInhouseTopCategories( response.data )
                setLoading( false )
            } )
    }
    return (
        <div  className="self-start h-full p-5 bg-white drop-shadow-lg border border-slate-200 rounded-lg space-y-5">
            <div>
                <h2  className="text-base text-[#009EF7] font-medium">{ t( 'In-house Top Category' ) }</h2>
            </div>
            <div  className='h-full space-y-2'>
                <h3  className='text-[#AAACBD] text-sm font-medium'>{ t( 'By Sales' ) }</h3>
                {/* Tabs */ }
                <ul  className='flex items-center gap-2'>
                    <li onClick={ e => OnTabClick( 'all' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white rounded-md ${ intervalType == 'all' && 'bg-[#009EF7] text-white' }` }>{ t( 'All' ) }</li>
                    <li onClick={ e => OnTabClick( 'DAY' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'DAY' && 'bg-[#009EF7] text-white' }` }>{ t( 'Today' ) }</li>
                    <li onClick={ e => OnTabClick( 'WEEK' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'WEEK' && 'bg-[#009EF7] text-white' }` }>{ t( 'Week' ) }</li>
                    <li onClick={ e => OnTabClick( 'MONTH' ) }  className={ `cursor-pointer text-xs text-slate-500 px-2 py-1 hover:bg-[#009EF7] hover:text-white duration-500 rounded-md ${ intervalType == 'MONTH' && 'bg-[#009EF7] text-white' }` }>{ t( 'Month' ) }</li>
                </ul>
                {/* Table */ }
                { loading ?
                    <div  className="h-full flex items-center justify-center">
                        <span  className="loading loading-dots loading-lg text-slate-400"></span>
                    </div>
                    :
                    <table  className="table">
                        <tbody>
                            { inhouseTopCategories?.map( ( inhouseTopCategory, i ) => (

                                <tr key={ i }>
                                    <td>
                                        <div  className="avatar">
                                            <div  className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={ asset_url(inhouseTopCategory.icon || placeholder1_1()) }
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div  className="font-bold">{ JSON.parse( inhouseTopCategory.name )[ active_locale ] }
                                        </div>
                                    </td>
                                    <td  className='text-[#F0416C] font-bold'>{ currencyFormat( inhouseTopCategory.total ) }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table> }
            </div>

        </div>
    )
}
