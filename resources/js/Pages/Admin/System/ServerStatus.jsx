import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";

export default function ServerStatus ()
{

    const { t } = useLaravelReactI18n();
    const { php_version, mysql_version, file_uploads, max_file_uploads, upload_max_filesize, post_max_size, allow_url_fopen,
        max_execution_time, max_input_time, max_input_vars, memory_limit, get_loaded_extensions, required_paths
    } = usePage().props

    const required_extensions = [ 'bcmath', 'sodium', 'ctype', 'json', 'mbstring', 'zip', 'zlib', 'openssl', 'tokenizer', 'xml', 'dom', 'curl', 'fileinfo', 'gd', 'pdo_mysql' ]

    return (
        <AdminLayout>
            <Head title={ "Server Status" } />
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
                                    <PiMapPinSimpleAreaBold  className="text-base text-slate-900" />
                                    <span>Server Status</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Server Information Table */ }
                <div  className='card rounded-lg bg-white border-[1px] border-slate-200 w-8/12 mx-auto'>
                    <div  className="flex items-center justify-between border-b border-slate-200 py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Server Information' ) }</h2>
                        </div>
                    </div>
                    <div  className="py-6 px-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th align="left"  className="font-bold text-sm text-black">Name</th>
                                    <th align="left"  className="font-bold text-sm text-black">Current Version</th>
                                    <th align="left"  className="font-bold text-sm text-black">Required Version</th>
                                    <th align="center"  className="font-bold text-sm text-black">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                <tr>
                                    <td  className="" align="left">Php versions</td>
                                    <td  className="" align="left">{ php_version } </td>
                                    <td  className="" align="left">8.1</td>
                                    <td  className="" align="center">
                                        { parseFloat( php_version ) >= 8.0 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">MySQL</td>
                                    <td  className="" align="left"> { mysql_version }</td>
                                    <td  className="" align="left">10.3+</td>
                                    <td  className="" align="center">
                                        { parseFloat( mysql_version ) >= 10.3 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* php.ini Config Table */ }
                <div  className='mt-6 card rounded-lg bg-white border-[1px] border-slate-200 w-8/12 mx-auto'>
                    <div  className="flex items-center justify-between border-b border-slate-200 py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'php.ini Config' ) }</h2>
                        </div>
                    </div>
                    <div  className="py-6 px-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th align="left"  className="font-bold text-sm text-black">Config Name</th>
                                    <th align="left"  className="font-bold text-sm text-black">Current</th>
                                    <th align="left"  className="font-bold text-sm text-black">Recommended</th>
                                    <th align="center"  className="font-bold text-sm text-black">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                <tr>
                                    <td  className="" align="left">file_uploads</td>
                                    <td  className="" align="left">{ file_uploads == 1 ? 'On' : 'Off' }</td>
                                    <td  className="" align="left">On</td>
                                    <td  className="" align="center">
                                        { file_uploads ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">max_file_uploads</td>
                                    <td  className="" align="left">{ max_file_uploads }</td>
                                    <td  className="" align="left">20+</td>
                                    <td  className="" align="center">
                                        { parseInt( max_file_uploads ) >= 20 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">upload_max_filesize</td>
                                    <td  className="" align="left">{ upload_max_filesize } MB</td>
                                    <td  className="" align="left">128 MB+</td>
                                    <td  className="" align="center">
                                        { parseInt( upload_max_filesize ) >= 128 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">post_max_size</td>
                                    <td  className="" align="left">{ post_max_size } MB</td>
                                    <td  className="" align="left">128 MB+</td>
                                    <td  className="" align="center">
                                        { parseInt( post_max_size ) >= 128 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">allow_url_fopen</td>
                                    <td  className="" align="left">{ allow_url_fopen == 1 ? 'On' : 'Off' }</td>
                                    <td  className="" align="left">On</td>
                                    <td  className="" align="center">
                                        { allow_url_fopen ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">max_execution_time</td>
                                    <td  className="" align="left">{ max_execution_time == -1 ? 'Unlimited' : max_execution_time }</td>
                                    <td  className="" align="left">600+</td>
                                    <td  className="" align="center">
                                        { max_execution_time == -1 || parseInt( max_execution_time ) >= 600 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">max_input_time</td>
                                    <td  className="" align="left">{ max_input_time }</td>
                                    <td  className="" align="left">120+</td>
                                    <td  className="" align="center">
                                        { parseInt( max_input_time ) >= 120 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">max_input_vars</td>
                                    <td  className="" align="left">{ max_input_vars }</td>
                                    <td  className="" align="left">1000+</td>
                                    <td  className="" align="center">
                                        { parseInt( max_input_vars ) >= 1000 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                                <tr>
                                    <td  className="" align="left">memory_limit</td>
                                    <td  className="" align="left">{ memory_limit == -1 ? 'Unlimited' : memory_limit } MB</td>
                                    <td  className="" align="left">256 MB+</td>
                                    <td  className="" align="center">
                                        { memory_limit == -1 || parseInt( memory_limit ) >= 256 ? <IoMdCheckmark  className="text-lg text-green-600" />
                                            :
                                            <IoMdClose  className="text-lg text-red-600" /> }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Extensions information Table */ }
                <div  className='mt-6 card rounded-lg bg-white border-[1px] border-slate-200 w-8/12 mx-auto'>
                    <div  className="flex items-center justify-between border-b border-slate-200 py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Extensions information' ) }</h2>
                        </div>
                    </div>
                    <div  className="py-6 px-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th align="left"  className="font-bold text-sm text-black">Extension Name</th>
                                    <th align="center"  className="font-bold text-sm text-black">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                { required_extensions.map( ( extension, i ) => (
                                    <tr key={ i }>
                                        <td  className="" align="left">{ extension }</td>
                                        <td  className="" align="center">
                                            { get_loaded_extensions.includes( extension ) ? <IoMdCheckmark  className="text-lg text-green-600" />
                                                :
                                                <IoMdClose  className="text-lg text-red-600" /> }
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Filesystem Permissions Table */ }
                <div  className='mt-6 card rounded-lg bg-white border-[1px] border-slate-200 w-8/12 mx-auto'>
                    <div  className="flex items-center justify-between border-b border-slate-200 py-4 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{ t( 'Filesystem Permissions' ) }</h2>
                        </div>
                    </div>
                    <div  className="py-6 px-6">
                        <table  className="table">
                            {/* head */ }
                            <thead>
                                <tr>
                                    <th align="left"  className="font-bold text-sm text-black">File or Folder</th>
                                    <th align="center"  className="font-bold text-sm text-black">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table row */ }
                                { required_paths.map( ( path, i ) => (
                                    <tr key={ i }>
                                        <td  className="" align="left">{ path.name }</td>
                                        <td  className="" align="center">
                                            { path.value ? <IoMdCheckmark  className="text-lg text-green-600" />
                                                :
                                                <IoMdClose  className="text-lg text-red-600" /> }
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
