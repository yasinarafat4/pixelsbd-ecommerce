import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { LuFilePlus } from "react-icons/lu";
import { MdKeyboardDoubleArrowLeft, MdOutlineFolderCopy } from "react-icons/md";

export default function Create() {
    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        // post('/banner', {
        //     onSuccess: () => window.location.href = "/banner",
        // })
    }

    return (
        <AdminLayout>
            <Head title={"Create"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.orders.index')}  className="inline-flex gap-1 items-center">
                                    <MdOutlineFolderCopy  className="text-base" />
                                    <span>Orders</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <LuFilePlus  className="text-base text-slate-900" />
                                    <span>{t('create')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Back button */}
                    <div>
                        <Link  onClick={e=> window.history.back()}>
                            <button  className='bg-[#3048AC] hover:bg-[#138496] duration-300 text-sm py-[8px] px-3 rounded-md text-white flex items-center gap-1'><MdKeyboardDoubleArrowLeft  className='text-xl' /> <span>{t('Back')}</span></button>
                        </Link>
                    </div>
                </div>

                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-5 max-w-2xl mx-auto'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">Lorem</h2>
                        </div>
                    </div>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div  className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                            {/* name */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                                 <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t('Enter Name')}  className="p-[13px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 bg-white w-full rounded-lg text-sm" />
                                {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>
                            {/*  */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">Direction</label>
                                <select  className="select select-bordered focus:outline-none w-full rounded-lg">
                                    <option disabled selected>Select Direction</option>
                                    <option>ltr</option>
                                    <option>rtl</option>
                                </select>
                            </div>
                            {/*  */}
                            <div>
                                <label  className='label-text text-slate-600 text-sm' htmlFor="name">Code</label>
                                <select  className="select select-bordered focus:outline-none w-full rounded-lg">
                                    <option disabled selected>Select Code</option>
                                    <option>en</option>
                                    <option>bn</option>
                                </select>
                            </div>
                        </div>
                            <div  className="flex justify-end mx-4">
                                <button  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('create')}</button>
                            </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
