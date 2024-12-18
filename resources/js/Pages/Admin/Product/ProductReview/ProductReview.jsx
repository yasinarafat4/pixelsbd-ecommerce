import NothingFound from "@/Components/NothingFound";
import Pagination from "@/Components/Pagination";
import { asset_url } from "@/Helpers";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FaCartShopping } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

export default function ProductReview() {
    const { t } = useLaravelReactI18n();
    const { reviews } = usePage().props;

    function onReviewStatusChange(e, id) {
        router.put(route('admin.product.product_review_status', id), {
            status: e.target.checked,
        })
    }

    return (
        <AdminLayout>
            {/* Page Title */}
            <Head title="Product Review" />
            <div  className="p-4">
                {/* Breadcrumbs */}
                <div  className="text-sm breadcrumbs text-slate-600">
                    <ul>
                        <li>
                            <a href={route('admin.dashboard')}  className="inline-flex gap-1 items-center">
                                <MdSpaceDashboard  className="text-base" />
                                <span>{t('Dashboard')}</span>
                            </a>
                        </li>
                        <li>
                            <span  className="inline-flex gap-1 items-center">
                                <FaCartShopping  className="text-base text-slate-900" />
                                <span>{t('Product Reviews')}</span>
                            </span>
                        </li>
                    </ul>
                </div>
                {/* Table */}
                <div  className='card rounded-lg shadow bg-white border-[1px] border-slate-200 py-3'>
                    <div  className="flex items-center justify-between border-b pb-3 px-6">
                        <div>
                            <h2  className="text-lg font-medium text-slate-600">{t('Product Reviews')}</h2>
                        </div>

                    </div>
                    <div  className='card-body'>
                        {reviews.data.length > 0 ? <div >
                            <table  className="table">
                                {/* head */}
                                <thead>
                                    <tr  className='text-slate-600'>
                                        <th align="left">{t('#')}</th>
                                        <th align="center">{t('Product')}</th>
                                        <th align="center">{t('Product Owner')}</th>
                                        <th align="center">{t('Customer')}</th>
                                        <th align="center">{t('Rating')}</th>
                                        <th align="center">{t('Comment')}</th>
                                        <th align="center">{t('Published')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {reviews.data.map((review, i) => (
                                        <tr key={i}  className='text-slate-600'>
                                            <td data-label="#" align="left">{i + 1}</td>
                                            <td width={'25%'} data-label="Product" align="left">
                                                <a href={route('admin.product.product_edit', { lang: 'en', id: window.btoa(review.product.id) })}>{review.product?.name}</a>
                                            </td>
                                            <td width={'10%'} data-label="Product Owner" align="left">
                                                {
                                                    review.product.user.user_type == "admin" ? <>{review.product.user.name}</> : <a href={route('admin.seller.show', window.btoa(review.product.user.id))}>{review.product.user.name}</a>
                                                }
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

                                            <td data-label="Published" align="left">
                                                <input checked={review.status} onChange={e => onReviewStatusChange(e, review.id)} type="checkbox"  className=" toggle toggle-sm toggle-success" />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div  className="flex justify-between items-center mt-2">
                                <p  className='text-slate-600 text-sm'>Showing {reviews.meta.from || 0} to {reviews.meta.to || 0} of {reviews.meta.total}</p>
                                <Pagination links={reviews.meta.links} />
                            </div>
                        </div> : <NothingFound title={'Nothing Found!'} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
