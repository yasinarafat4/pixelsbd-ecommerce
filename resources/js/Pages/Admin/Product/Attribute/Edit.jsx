import AdminLayout from "@/Layouts/AdminLayout";

import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdEditAttributes, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Select from "react-select";

export default function Edit ( { lang, attribute, categories } )
{
    const { t } = useLaravelReactI18n();
    const { active_languages } = usePage().props;

    const [ activeCategories, setActiveCategories ] = useState( [] );
    const [ selectedCategory, setSlectedCategory ] = useState();



    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm( {
        title: attribute.title,
        category_id: []
    } )
    useEffect( () =>
    {
        let categoryData = [];
        let selectedCategoryData = [];
        attribute.categories.forEach( element =>
        {
            categoryData.push( element.id )
            selectedCategoryData.push( { value: element.id, label: element.name } )
        } );
        setData( 'category_id', categoryData );
        setSlectedCategory( selectedCategoryData );
    }, [] )

     // Effect of category
     useEffect(() => {
        var options = [];
        function processArray(data) {
            data.forEach((element) => {
                options.push({ value: element.id, label: "-".repeat(element.depth) + element.name });
                if (Array.isArray(element.children)) {
                    processArray(element.children);
                }
            })
        }
        processArray(categories);

        setActiveCategories(options);
    }, []);

    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.product.attribute.update', attribute.id ) )
    }

    // Category Value handler
    function handleCategory ( e )
    {
        setSlectedCategory( e );
        let categoryId = [];
        e.forEach( element =>
        {
            categoryId.push( element.value )
        } );
        setData( 'category_id', categoryId )
    }

    return (
        <AdminLayout>
            <Head title={ "Edit" } />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */ }
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={ route( 'admin.product.attribute.index' ) }  className="inline-flex gap-1 items-center">
                                    <MdEditAttributes  className="text-2xl text-slate-900" />
                                    <span>{ t( 'Attribute' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className='text-sm' />
                                    <span>{ t( 'Edit' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */ }
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{ t( 'Back' ) }</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Edit Attribute' ) }</h2>
                        </div>
                    </div>
                    {/* Language Tabs */ }
                    <div  className={ active_languages.length < 7 ? `grid grid-cols-${ active_languages.length }` : "grid grid-cols-7" }>
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.product.attribute_edit', { lang: language.code, id: attribute.id } ) }  className={ lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500' }><span  className="text-sm"> { language.name }</span></a>
                            ) )
                        }
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* title */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title' ) } *</label>
                                <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( "Type here" ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                            </div>
                            {/* Category */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="category">{ t( 'Category' ) }</label>
                                <Select
                                    isMulti
                                    id="category"
                                    name="category"
                                    placeholder="Select category"
                                     className="w-full rounded-lg z-30"
                                    classNamePrefix="react-select"
                                    value={ selectedCategory }
                                    onChange={ e => handleCategory( e ) }
                                    options={ activeCategories }
                                />
                            </div>
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{ t( 'Update' ) }</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
