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

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { business_settings } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (

        <div  className="min-h-screen flex flex-col lg:grid grid-cols-12 justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4">
            <Head title="Register" />
            <div  className='hidden lg:block lg:col-span-8'>
                <div>
                    <LazyLoadImage
                         className="object-cover h-screen w-full text-gray-500"
                        src={asset_url(business_settings.customer_register_image || placeholder_login())}
                        effect='blur'
                    />
                </div>
            </div>
            <div  className="lg:col-span-4 w-full flex flex-col gap-4 justify-start sm:max-w-md px-6 py-6 lg:ms-3 xl:ms-10 bg-white shadow-md overflow-hidden rounded-lg">
                <span>

                    <h2  className='text-2xl text-center font-semibold text-slate-600'>Register</h2>
                    <form onSubmit={submit}>
                        {/* Name */}
                        <div  className='mt-4'>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                 className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name}  className="mt-2" />
                        </div>
                        {/* Email */}
                        <div  className='mt-4'>
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

                        {/* Confirm Password */}
                        <div>
                            <div  className="mt-4 relative">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <div
                                     className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                    onClick={() => {
                                        setShowConfirmPassword((visible) => !visible)
                                    }
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash  className="text-base md:text-lg font-medium" />
                                    ) : (
                                        <FaEye  className="text-base md:text-lg font-medium" />
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.password}  className="mt-2" />
                        </div>

                        <div  className="flex flex-col items-start justify-between gap-2 mt-4">
                            <PrimaryButton disabled={processing}>
                                Register
                            </PrimaryButton>
                            <div
                                 className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span  className='text-[13px]'>Already have an account?</span> <Link  className='font-medium text-base text-[#FF901A]' href={route('login')}>Login</Link>
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
                </span>
            </div>
        </div>
    );
}
