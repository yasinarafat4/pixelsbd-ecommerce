import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { BiSolidEdit } from "react-icons/bi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Edit({ permission }) {
    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, put, processing, errors, reset } = useForm({
        name: permission.name,
    })

    function handleSubmit(e) {
        e.preventDefault()
        put(route('admin.staff.permission.update', permission), {
            onSuccess: () => toast.success('Permission updated!'),
        })
    }

    return (
        <AdminLayout>
            <Head title={"Edit"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.staff.permission.index')}  className="inline-flex gap-1 items-center">
                                    <RiShieldKeyholeFill  className="text-base" />
                                    <span>Permission</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <BiSolidEdit  className="text-sm text-slate-900" />
                                    <span>{t('Edit')}</span>
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
                            <h2  className="text-lg font-medium text-slate-600">Edit Permission</h2>
                        </div>
                    </div>
                    <form onSubmit={e=>handleSubmit(e)}>
                        {/* name */}
                        <div  className="p-4">
                            <label  className='label-text text-slate-600 text-sm' htmlFor="name">{t('Name')}</label>
                            <input onChange={e => setData('name', e.target.value)} value={data.name} name='name' id='name' type="text" placeholder={t("Type here")}  className="p-[12px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-lg text-sm" />
                            {errors.name && <div  className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div  className="flex justify-end mx-4">
                            <button type="submit"  className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Update')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )

}
