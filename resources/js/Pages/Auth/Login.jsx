/* eslint-disable */

import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SocialLogin from '@/Components/SocialLogin';
import TextInput from '@/Components/TextInput';
import { asset_url, placeholder_login } from '@/Helpers';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Login() {
    const { demo_mode, status, canResetPassword, business_settings } = usePage().props
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };


    function autoFillAdmin() {
        setData(data => ({ ...data, ['email']: 'customer@gmail.com' }))
        setData(data => ({ ...data, ['password']: 'password' }))
    }

    function onClick(e) {
        e.preventDefault();
        grecaptcha.enterprise.ready(async () => {
            const token = await grecaptcha.enterprise.execute('6LdswCUqAAAAAAJj8XrEONAPcM1VBijI2Rw4qTpc', { action: 'LOGIN' });
        });
    }

    return (
        <div>
            <Head title="Customer Log in" />
            <div  className="min-h-screen flex flex-col lg:grid grid-cols-12 justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4">
                <div  className='hidden lg:block lg:col-span-8'>
                    <div>
                        <LazyLoadImage
                             className="object-cover h-screen w-full text-gray-500"
                            src={asset_url(business_settings.customer_login_image || placeholder_login())}
                            effect='blur'
                        />
                    </div>
                </div>
                <div  className="lg:col-span-4 w-full flex flex-col gap-4 justify-start sm:max-w-md px-6 py-6 lg:ms-3 xl:ms-10 bg-white shadow-md overflow-hidden rounded-lg">
                    <span>
                        {status && <div  className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <h2  className='text-2xl text-center font-semibold text-slate-600'>Customer Login</h2>
                        <form onSubmit={submit}>
                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email}  className="mt-2" />
                            </div>
                            {/* Password */}
                            <div>
                                <div  className="mt-4 relative">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                         className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div
                                         className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                        onClick={() => {
                                            setShowPassword((visible) => !visible)
                                        }
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash  className="text-base md:text-lg font-medium" />
                                        ) : (
                                            <FaEye  className="text-base md:text-lg font-medium" />
                                        )}
                                    </div>
                                </div>
                                <InputError message={errors.password}  className="mt-2" />
                            </div>
                            {/* Remember */}
                            <div  className="md:flex items-center justify-between mt-4">
                                <label  className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span  className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                         className="underline text-sm text_primary hover:text_secondary duration-200 rounded-md"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <div  className="divider"></div>
                            <div  className="flex flex-col items-start justify-between gap-2">
                                <PrimaryButton disabled={processing}>
                                    Log in
                                </PrimaryButton>
                                <div
                                     className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span  className='text-[13px]'>Don&apos;t have account?</span> <Link  className='font-medium text-base text-[#FF901A]' href={route('register')}>Register</Link>
                                </div>
                            </div>
                            {/* Social Login */}
                            <SocialLogin />
                            {/* Back */}
                            <div  className='my-5'>
                                <Link href="/"  className='text-[14px] text_secondary hover:text_secondary duration-300 flex items-center gap-1'>
                                    <GoArrowLeft  className='text-xl' />
                                    <span>Back to Home Page</span>
                                </Link>
                            </div>
                        </form>
                        {demo_mode && <div  className='my-5'>
                            <table>
                                <tr  className='border border_primary bg-white text-slate-600'>
                                    <td>customer@gmail.com</td>
                                    <td>password</td>
                                    <td align='center'>
                                        <button className="btn btn-primary text-white btn-xs" onClick={e => autoFillAdmin()}>Copy</button>
                                    </td>
                                </tr>
                            </table>
                        </div>}
                    </span>
                </div>
            </div>


        </div>
    );
}
