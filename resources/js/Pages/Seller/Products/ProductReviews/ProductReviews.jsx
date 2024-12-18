import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url } from "@/Helpers";
import SellerLayout from "@/Layouts/SellerLayout";

import { Head, useForm, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { MdSpaceDashboard } from "react-icons/md";
import { TbBasketStar } from "react-icons/tb";

export default function InstalledAddons() {
    const { reviews } = usePage().props


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
        <SellerLayout>
            <Head title={"Product Reviews"} />
            <div  className='p-4'>
                <div  className='flex justify-between items-center my-5'>
                    {/* Breadcrumbs */}
                    <div  className="text-sm breadcrumbs text-slate-600">
                        <ul>
                            <li>
                                <a href={route('seller.dashboard')}  className="inline-flex gap-1 items-center">
                                    <MdSpaceDashboard  className="text-base" />
                                    <span>{t('Dashboard')}</span>
                                </a>
                            </li>
                            <li>
                                <span  className="inline-flex gap-1 items-center">
                                    <TbBasketStar  className="text-base text-slate-900" />
                                    <span>{t('Product Reviews')}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div  className='card rounded-md bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Product Reviews')}</h2>
                        </div>
                    </div>
                    <div  className='card-body'>
                        {reviews.meta.total > 0 ? <div>
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">#</th>
                                        <th align="left">{t('Product')}</th>
                                        <th align="left">{t('Customer')}</th>
                                        <th align="left">{t('Rating')}</th>
                                        <th align="left">{t('Comment')}</th>
                                        <th align="left">{t('Published')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {reviews.data.map((review, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td align="left">{(i + 1) + ((reviews.meta.current_page - 1) * (reviews.meta.per_page))}</td>
                                            <td width={'25%'} data-label="Product" align="left">
                                                <a href={route('admin.product.product_edit', { lang: 'en', id: window.btoa(review.product.id) })}>{review.product?.name}</a>
                                            </td>
                                            <td width={'10%'} data-label="Customer" align="left">
                                                <a href={route('admin.customer.show', window.btoa(review.user.id))}>{review.user.name}</a>
                                            </td>
                                            <td data-label="Rating" align="left">{review.rating}</td>
                                            <td data-label="Comment" align="left">
                                                <span>{review.comment}</span>
                                                {review.photos && <div  className="flex items-center gap-4" >
                                                    {
                                                        review.photos.split(',').map((img, i) => (
                                                            <img key={i}  className="h-10 object-cover" src={asset_url(img)} alt="Image" />
                                                        ))
                                                    }
                                                </div>}

                                            </td>

                                            <td align="left">{review.status ? <span  className="text-green-600 p-1 border border-green-600 rounded">Published</span> : <span  className="text-red-600 p-1 border border-red-600 rounded">Not Published</span>}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {reviews.meta.from || 0} to {reviews.meta.to || 0} of {reviews.meta.total}</p>
                                <Pagination links={reviews.meta.links} />
                            </div>
                        </div> : <NothingFound title={"Nothing Found!"} />}
                    </div>
                </div>


            </div >
        </SellerLayout >
    )

}
