import NothingFound from "@/Components/NothingFound";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdSpaceDashboard } from "react-icons/md";
import { PiPuzzlePieceBold } from "react-icons/pi";

export default function InstalledAddons({ addons }) {

    const { t } = useLaravelReactI18n();
    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        purchase_code: "",
        addon_file: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        // post( route( '' ), {
        //     onFinish: () =>
        //     {
        //         reset();
        //     }
        // } )
    }

    return (
        <AdminLayout>
            <Head title={"Installed Addons"} />
            <div className='p-4'>
                <div className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('admin.dashboard')} className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex gap-1 items-center">
                                    <PiPuzzlePieceBold className="text-base text-slate-900" />
                                    <span>{t('Installed Addons')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className='col-span-8 card rounded-md bg-white border-[1px] border-slate-200 py-3'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                            <h2 className="text-lg font-medium text-slate-600">{t('Installed Addons')}</h2>
                        </div>
                        <div className='card-body'>
                            {addons.length > 0 ? <>
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className='text-slate-600'>
                                            <th align="left">#</th>
                                            <th align="left">{t('Name')}</th>
                                            <th align="left">{t('Image')}</th>
                                            <th align="left">{t('Version')}</th>
                                            <th align="left">{t('Status')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row */}
                                        {addons.map((addon, i) => (
                                            <tr key={i} className='text-slate-600'>
                                                <td align="left">{i + 1}</td>
                                                <td align="left">{addon.name}</td>
                                                <td align="left">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-14 w-14">
                                                            <img
                                                                src="/assets/placeholder/placeholder-1-1.webp"
                                                                alt="Addon Image" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td align="left">{addon.version}</td>
                                                <td align="left">
                                                    <input type="checkbox" checked={addon.activated} className="toggle toggle-sm toggle-success" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing { meta.from || 0 } to { meta.to || 0 } of { meta.total }</p>
                                <Pagination links={ meta.links } />
                            </div> */}
                            </> : <NothingFound title={"Nothing Found!"} />}
                        </div>
                    </div>

                    {/* Install/Update */}
                    <div className='col-span-4 card rounded-md bg-white border-[1px] border-slate-200 py-5 h-80 w-full'>
                        <div className="flex items-center justify-between border-b pb-3 px-6">
                            <h2 className="text-lg font-medium text-slate-600">{t('Install/Update')}</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 items-center gap-2 px-4 py-6'>
                                {/* Addon List */}
                                <>
                                    <label className='label-text text-slate-600 text-sm' htmlFor="purchase_code">{t('Addons')}*</label>
                                    <select className="select select-bordered w-full p-[12px] focus:outline-none">
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </>
                                {/* Purchase Code */}
                                <>
                                    <label className='label-text text-slate-600 text-sm' htmlFor="purchase_code">{t('Purchase Code')}*</label>
                                    <input onChange={e => setData('purchase_code', e.target.value)} value={data.purchase_code} name='purchase_code' id='purchase_code' type="text" placeholder={t('Enter your purchase code')} className="p-[12px] focus:outline-none border-[1px] border-slate-200 block text-slate-600 w-full rounded-md text-sm" />
                                    {errors.purchase_code && <div className="text-red-500 text-sm mt-1">{errors.purchase_code}</div>}
                                </>
                            </div>
                            <div className="flex justify-end mx-4">
                                <button className="bg-sky-500 hover:bg-sky-600 duration-300 py-2 px-4 rounded-md text-white">{t('Active')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </AdminLayout >
    )

}
