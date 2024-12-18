import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";

import { Head } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BsHouseUpFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import Select from "react-select";

export default function InhouseProductsale ( { categories } )
{
    const { t } = useLaravelReactI18n();
    const [ data, setData ] = useState();
    const [ activeCategoriesOptions, setActiveCategoriesOptions ] = useState( [] );

    const length = 0;

    useEffect( () =>
    {
        var options = [];
        categories.forEach( parent =>
        {
            options.push( { value: parent.id, label: parent.name } );
            parent.children_categories.forEach( child =>
            {
                options.push( { value: child.id, label: '--' + child.name } );
                child.categories.forEach( children =>
                {
                    options.push( { value: children.id, label: '----' + children.name } );
                } )
            } )
        } );
        setActiveCategoriesOptions( options );
    }, [] );

    // Category handler
    function handleCategory ( e )
    {
        setData( e.value )
    }

    return (
        <AdminLayout>
            <Head title={ "Inhouse Productsale" } />
            <div  className='p-4'>
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
                                <BsHouseUpFill  className="text-lg text-slate-900" />
                                <span>{ t( 'Inhouse Productsale' ) }</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-300 max-w-7xl mx-auto mt-4'>
                    <div  className="flex items-center justify-between border-b border-slate-300 py-2 px-6">
                        <div  className="basis-2/4">
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Inhouse Product Sale Report' ) }</h2>
                        </div>
                        {/* Sort*/ }
                       {length > 0 && <div  className="basis-2/4 flex items-center">
                            <p  className="basis-1/4">{ t( 'Sort by Category' ) }:</p>
                            <Select
                                id="category"
                                name="category"
                                placeholder={ t( 'Choose Category' ) }
                                 className="basis-3/4 w-full rounded-lg z-10"
                                classNamePrefix="react-select"
                                defaultValue={ data }
                                onChange={ () => handleCategory }
                                options={ activeCategoriesOptions }
                            />
                        </div>}
                    </div>
                    {length > 0 ? <div  className="p-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th  className="border border-slate-300 font-bold text-sm text-black">#</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Product Name' ) }</th>
                                    <th align="left"  className="border border-slate-300 font-bold text-sm text-black">{ t( 'Num of Sale' ) }</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                <tr>
                                    {/* <th  className="border border-slate-300">{(i + 1 )+ ((countries.current_page - 1) * (countries.per_page))}</th> */ }
                                    <td  className="border border-slate-300" align="left">1</td>
                                    <td  className="border border-slate-300" align="left">Disney Men&apos;s Mickey and Friends Button Down Shirt</td>
                                    <td  className="border border-slate-300" align="left"> 14</td>
                                </tr>

                            </tbody>
                        </table>
                        {/* <div  className="flex justify-between items-center m-4">
                            <p  className='text-slate-600 text-sm'>Showing {countries.from || 0} to {countries.to || 0} of {countries.total}</p>
                            <Pagination links={countries.links} />
                        </div> */}
                    </div>: <NothingFound title={'Nothing Found!'}/>}
                </div>


            </div>
        </AdminLayout>
    )

}
