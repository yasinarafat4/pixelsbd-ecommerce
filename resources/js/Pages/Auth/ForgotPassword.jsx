import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { asset_url, placeholder1_1 } from '@/Helpers';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { GoArrowLeft } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ForgotPassword() {
    const { status, business_settings } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div  className="min-h-screen flex flex-col lg:grid grid-cols-12 justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4">
            <Head title="Forgot Password" />
            <div  className='hidden lg:block lg:col-span-8'>
                <div>
                    <LazyLoadImage
                         className="object-cover h-screen w-full text-gray-500"
                        src={asset_url(business_settings.forgot_password_image || placeholder1_1())}
                        effect='blur'
                    />
                </div>
            </div>
            <div  className="lg:col-span-4 w-full flex flex-col gap-4 justify-start sm:max-w-md px-6 py-6 lg:ms-3 xl:ms-10 bg-white shadow-md overflow-hidden rounded-lg">
                <span>
                    {status && <div  className="mb-4 font-medium text-sm text_primary">{status}</div>}
                    <h2  className='text-2xl text-center font-semibold text-slate-600'>Forgot your password?</h2>
                    <div  className="my-4 text-base text-gray-600">
                        No problem. Just let us know your email address and we will email you a password
                        reset link that will allow you to choose a new one.
                    </div>
                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                             className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 border"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email}  className="mt-2" />

                        <div  className="flex items-center justify-end mt-4">
                            <PrimaryButton  className="ms-4" disabled={processing}>
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                        {/* Back */}
                        <div  className='my-5'>
                            <Link href="/"  className='text-[14px] text_secondary hover:text_secondary duration-300 flex items-center gap-1'>
                                <GoArrowLeft  className='text-xl' />
                                <span>Back to Home Page</span>
                            </Link>
                        </div>
                    </form>
                </span>
            </div>
        </div>
    );
}
