import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { asset_url, placeholder_login } from '@/Helpers';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import useGeoLocation from 'react-ipgeolocation';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { business_settings } = usePage().props

    const location = useGeoLocation();

    const { data, setData, post, processing, errors, reset } = useForm({
        f_name: '',
        l_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        shop_name: '',
        address: '',
        country_code: '',
    });


    useEffect(() => {
        setData('country_code', location.country)
    }, [location.country])


    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('seller.register'));
    };

    return (

        <div  className="min-h-screen flex flex-col lg:grid grid-cols-12 justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4">
            <Head title="Register" />
            <div  className='hidden lg:block lg:col-span-8'>
                <div>
                    <img src={asset_url(business_settings.seller_register_image || placeholder_login())}  className="object-cover h-screen w-full text-gray-500" />
                </div>
            </div>
            <div  className="lg:col-span-4 w-full flex flex-col gap-4 justify-start sm:max-w-md px-6 py-6 lg:ms-3 xl:ms-10 bg-white shadow-md overflow-hidden rounded-lg">
                <span>
                    <h2  className='text-2xl text-center font-semibold text-slate-600'>Register As Seller</h2>
                    <form onSubmit={submit}>
                        <div  className='mt-4 pt-4 border-t'>
                            <h2  className='text-lg font-semibold'>Personal Info</h2>
                            {/* First Name */}
                            <div  className='mt-4'>
                                <InputLabel htmlFor="f_name" value="First Name" />
                                <TextInput
                                    id="f_name"
                                    name="f_name"
                                    value={data.f_name}
                                    placeholder="Your First Name"
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
                                    autoComplete="f_name"
                                    isFocused={true}
                                    onChange={(e) => setData('f_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.f_name}  className="mt-2" />
                            </div>
                            {/* Last Name */}
                            <div  className='mt-4'>
                                <InputLabel htmlFor="l_name" value="Last Name" />
                                <TextInput
                                    id="l_name"
                                    name="l_name"
                                    value={data.l_name}
                                    placeholder="Your Last Name"
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
                                    autoComplete="l_name"
                                    isFocused={true}
                                    onChange={(e) => setData('l_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.l_name}  className="mt-2" />
                            </div>
                            {/* Email */}
                            <div  className='mt-4'>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={data.email}
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
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
                                        placeholder="Password"
                                         className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
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
                                        placeholder="Confirm Password"
                                         className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
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

                        </div>
                        <div  className='mt-4 pt-4 border-t'>
                            <h2  className='text-lg font-semibold'>Basic Info</h2>
                            {/* Shop Name */}
                            <div  className='mt-4'>
                                <InputLabel htmlFor="shop_name" value="Shop Name" />
                                <TextInput
                                    id="shop_name"
                                    name="shop_name"
                                    value={data.shop_name}
                                    placeholder="Shop Name"
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
                                    isFocused={true}
                                    onChange={(e) => setData('shop_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.shop_name}  className="mt-2" />
                            </div>
                            {/* Address */}
                            <div  className='mt-4'>
                                <InputLabel htmlFor="address" value="Address" />

                                <TextInput
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    placeholder="Address"
                                     className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 text-sm text-slate-600"
                                    isFocused={true}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address}  className="mt-2" />
                            </div>
                        </div>

                        <div  className="flex flex-col items-start justify-between gap-2 mt-4">
                            <PrimaryButton disabled={processing}>
                                Register
                            </PrimaryButton>
                            <div
                                 className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span  className='text-[13px]'>Already have an account?</span> <Link  className='font-medium text-base text-[#FF901A]' href={route('seller.login')}>Login</Link>
                            </div>

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
