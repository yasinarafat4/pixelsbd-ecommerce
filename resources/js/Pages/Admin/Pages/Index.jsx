import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";

export default function Index ()
{
    const { t } = useLaravelReactI18n();
    const { pages, active_locale } = usePage().props

    return (
        <AdminLayout>
            <Head title={ "Website Pages" } />
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
                                    <RiPagesLine  className="text-base text-slate-900" />
                                    <span>{ t( 'Website Pages' ) }</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3 max-w-7xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'All Pages' ) }</h2>
                        </div>
                        {/* Search*/ }
                        { pages.length > 0 && <div>
                            <label  className="input input-bordered flex text-sm items-center focus:outline-none gap-2 bg-white text-slate-600">
                                <IoIosSearch  className="text-xl text-slate-600" />
                                <input autoFocus={ true } name='search' type="text"  className="grow" placeholder={ t( 'Search' ) } />
                            </label>
                        </div> }
                    </div>
                    <div  className='card-body'>

                        { pages.length > 0 ? <div>
                            <table  className="table">
                                {/* head */ }
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{ t( 'Name' ) }</th>
                                        <th align="right">{ t( 'Actions' ) }</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */ }
                                    {
                                        pages.map( ( page, i ) => (
                                            <tr key={i} className='text-slate-600'>
                                                <td align="left">{ i + 1 }</td>
                                                <td align="left">{ page?.title[ active_locale ] }</td>
                                                <td align="center"  className="space-x-2">
                                                    <Link href={ route( 'admin.website.page_edit', [ 'en', page.id ] ) }> <div data-tip={ t( 'Edit' ) }  className="tooltip cursor-pointer p-[10px] text-blue-600 hover:text-slate-200 bg-blue-100 hover:bg-blue-600 duration-500 rounded-full">
                                                        <BiSolidEdit  className='text-sm' />
                                                    </div></Link>
                                                </td>
                                            </tr>
                                        ) )
                                    }
                                </tbody>
                            </table>
                        </div> : <NothingFound title={ "Nothing Found!" } /> }
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
