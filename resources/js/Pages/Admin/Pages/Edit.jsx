import Wysiwyg from "@/Components/Wysiwyg";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";

export default function Edit ()
{
    const { t } = useLaravelReactI18n();
    const { lang, active_languages, page } = usePage().props

    // form functionality
    const { data, setData, post, put, processing, errors, reset } = useForm( {
        lang: lang,
        title: page.title[ lang ],
        content: page.content[ lang ]
    } )


    function handleSubmit ( e )
    {
        e.preventDefault()
        put( route( 'admin.website.pages.update', page.id ) );
    }

    // Description handler
    const handleContentChange = ( html ) =>
    {
        setData( 'content', html );
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
                                <a href={ route( 'admin.website.pages.index' ) }  className="inline-flex gap-1 items-center">
                                    <RiPagesLine  className="text-base text-slate-900" />
                                    <span>{ t( 'Website Pages' ) }</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{ t( 'Edit Page' ) }</span>
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

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-7xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-4">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Page Content' ) }</h2>
                        </div>
                    </div>
                    {/* Language Tabs */ }
                    <div  className={ active_languages.length < 7 ? `grid grid-cols-${ active_languages.length }` : "grid grid-cols-7" }>
                        {
                            active_languages.map( ( language, i ) => (

                                <a key={ i } href={ route( 'admin.website.page_edit', { lang: language.code, id: page.id } ) }  className={ lang == language.code ? 'flex items-center justify-center gap-1 text-center border py-3 bg-[#3390F3] text-white duration-500' : 'flex items-center justify-center gap-1 text-center border py-3 hover:bg-[#3390F3] hover:text-white duration-500' }><span  className="text-sm"> { language.name }</span></a>
                            ) )
                        }
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div  className='grid grid-cols-1 items-center gap-2 px-6 py-6'>
                            {/* Title */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="title">{ t( 'Title *' ) }</label>
                                <input onChange={ e => setData( 'title', e.target.value ) } value={ data.title } name='title' id='title' type="text" placeholder={ t( 'Enter Title' ) }  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                { errors.title && <div  className="text-red-500 text-sm mt-1">{ errors.title }</div> }
                            </div>
                            {/* Add Content */ }
                            <div>
                                <label  className='label-text text-slate-600 text-sm font-medium' htmlFor="content">{ t( 'Add Content *' ) }</label>
                                <div  className='h-60'>
                                    <Wysiwyg defaultValue={ data.content } placeholder="Content..." onWysiwygChange={ ( e ) => handleContentChange( e ) } />
                                </div>
                                { errors.content && <div  className="text-red-600 font-medium mt-1">{ errors.content }</div> }
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
