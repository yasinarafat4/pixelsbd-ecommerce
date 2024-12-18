import { ProductContext } from '@/ProductContext';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import moment from 'moment';
import { useContext } from 'react';
import { FaQuestion } from 'react-icons/fa';

const ProductQueries = () => {
    const { auth } = usePage().props;
    const product = useContext(ProductContext);

    const { t } = useLaravelReactI18n();
    const maxLength = 300;

    // form functionality
    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: auth?.customer?.id,
        seller_id: product.user.id,
        seller_type: product.user.user_type,
        product_id: product.id,
        question: "",
    })


    // Form submit functionality
    function handleSubmit(e) {
        e.preventDefault();
        post(route('query_store'), {
            onSuccess: () => reset(),
        })
    }

    return (
        <div  className='container mx-auto px-4'>
            <div  className='mb-6 space-y-3'>
                <h2  className="md:text-xl font-semibold">{t('Product Queries')} <span>({product.product_query.length})</span></h2>
                {auth?.customer ?
                    <form onSubmit={e => handleSubmit(e)}>
                        <div  className="w-full border border-slate-700 p-[10px] rounded-sm">
                            <textarea
                                 className="w-full px-[2px] md:px-2 text-[12px] text-slate-600 bg-white md:text-[15px] focus:outline-none rounded resize-none"
                                placeholder="Enter your question(s) here"
                                rows="3"
                                maxLength={maxLength}
                                value={data.question}
                                onChange={e => setData('question', e.target.value)}
                            />
                            <p  className="text-[12px] md:text-sm text-black text-end">
                                {`${data.question.length}/${maxLength}`}
                            </p>
                            <hr />
                            <div  className="flex flex-col justify-end items-end gap-1 pt-[10px]">
                                <button type='submit'  className="bg_primary text-white px-[10px] md:px-[13px] py-[7px] md:py-2 rounded-sm text-[11px] md:text-[13px]">
                                    {t('ASK QUESTIONS')}
                                </button>
                            </div>
                        </div>
                    </form>
                    : <p  className='text-sm'><Link href={route('login')}  className='text_secondary hover:text_secondary duration-300 font-medium'>{t('Login')}</Link> {t('Or')} <Link href={route('register')}  className='text_secondary hover:text_secondary duration-300 font-medium'>{t('Register')}</Link> {t('to submit your questions to seller')}.</p>}
            </div>

            <div  className="mb-6 space-y-3">
                <h3  className="text-xl font-semibold">{t('Other Questions')}</h3>
                {/* Queries */}
                {product.product_query.length > 0 ? <div>
                    {product.product_query.map((query, i) => (
                        <div key={i}  className="text-sm text-slate-600 border-t border-slate-200 pt-3 space-y-6">
                            {/* Question */}
                            <div>
                                <p  className="font-semibold flex items-start gap-1">
                                    <span  className='bg-blue-600 text-white font-bold px-1 pb-[1px]'>Q:</span>
                                    <p  className='text-sm'>{query.question}</p>
                                </p>
                                <div  className='flex items-center ms-7 gap-3'>
                                    <p  className='text-[14px] font-medium text-[#919199]'>{query.customer.name}</p>
                                    <small>{moment(query.created_at).format('lll')}</small>
                                </div>
                            </div>
                            {/* Answer */}
                            {query.answer && <div>
                                <p  className="font-semibold flex items-start gap-1">
                                    <span  className='bg-green-600 text-white font-bold px-1 py-[1px]'>A:</span>
                                    <p  className='text-sm'>{query.answer}</p>
                                </p>
                                <div  className='flex items-center ms-7 gap-3'>
                                    <p  className='text-[14px] font-medium text-[#919199]'>{query.seller.name}</p>
                                    <small>{moment(query.updated_at).format('lll')}</small>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div> :
                    <div  className='flex flex-col justify-center items-center mt-2 space-y-4'>
                        <FaQuestion  className='text-[#D6D9DD] text-[70px]' />
                        <p  className='text-sm'>{t('No Queries Found')}!</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductQueries;
