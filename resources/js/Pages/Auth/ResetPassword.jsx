import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { asset_url, placeholder1_1 } from '@/Helpers';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ResetPassword ()
{
    const { token, email, business_settings } = usePage().props
    const [ showPassword, setShowPassword ] = useState( false );
    const [ showConfirmPassword, setShowConfirmPassword ] = useState( false );

    const { data, setData, post, processing, errors, reset } = useForm( {
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    } );

    useEffect( () =>
    {
        return () =>
        {
            reset( 'password', 'password_confirmation' );
        };
    }, [] );

    const submit = ( e ) =>
    {
        e.preventDefault();

        post( route( 'password.store' ) );
    };

    return (
        <div  className="min-h-screen flex flex-col lg:grid grid-cols-12 justify-center items-center pt-6 sm:pt-0 bg-gray-100 px-4">
            <Head title="Reset Password" />
            <div  className='hidden lg:block lg:col-span-8'>
                <div>
                    <LazyLoadImage
                         className="object-cover h-screen w-full text-gray-500"
                        src={asset_url(business_settings.reset_password_image  || placeholder1_1())}
                        effect='blur'
                    />
                </div>
            </div>
            <div  className="lg:col-span-4 w-full flex flex-col gap-4 justify-start sm:max-w-md px-6 py-6 lg:ms-3 xl:ms-10 bg-white shadow-md overflow-hidden rounded-lg">
                <span>
                    <form onSubmit={ submit }>
                        <h2  className='text-2xl text-center font-semibold text-slate-600'>Reset Your Password</h2>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={ data.email }
                                 className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 border"
                                autoComplete="username"
                                onChange={ ( e ) => setData( 'email', e.target.value ) }
                            />

                            <InputError message={ errors.email }  className="mt-2" />
                        </div>

                        <div  className="relative mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type={ showPassword ? "text" : "password" }
                                name="password"
                                value={ data.password }
                                 className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 border"
                                autoComplete="new-password"
                                isFocused={ true }
                                onChange={ ( e ) => setData( 'password', e.target.value ) }
                            />
                            <div
                                 className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                onClick={ () =>
                                {
                                    setShowPassword( ( visible ) => !visible )
                                }
                                }
                            >
                                { showPassword ? (
                                    <FaEyeSlash  className="text-base md:text-lg font-medium" />
                                ) : (
                                    <FaEye  className="text-base md:text-lg font-medium" />
                                ) }
                            </div>
                            <InputError message={ errors.password }  className="mt-2" />

                        </div>

                        <div  className="relative mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                type={ showConfirmPassword ? "text" : "password" }
                                name="password_confirmation"
                                value={ data.password_confirmation }
                                 className="p-3 block w-full pl-4 drop-shadow-lg rounded-lg outline-none bg-white text-slate-600 border"
                                autoComplete="new-password"
                                onChange={ ( e ) => setData( 'password_confirmation', e.target.value ) }
                            />
                            <div
                                 className="absolute top-[25px] right-[20px] inset-y-0  flex items-center cursor-pointer"
                                onClick={ () =>
                                {
                                    setShowConfirmPassword( ( visible ) => !visible )
                                }
                                }
                            >
                                { showConfirmPassword ? (
                                    <FaEyeSlash  className="text-base md:text-lg font-medium" />
                                ) : (
                                    <FaEye  className="text-base md:text-lg font-medium" />
                                ) }
                            </div>
                            <InputError message={ errors.password_confirmation }  className="mt-2" />
                        </div>

                        <div  className="flex items-center justify-end mt-4">
                            <PrimaryButton  className="ms-4" disabled={ processing }>
                                Reset Password
                            </PrimaryButton>
                        </div>
                    </form>
                </span>
            </div>
        </div>
    );
}
