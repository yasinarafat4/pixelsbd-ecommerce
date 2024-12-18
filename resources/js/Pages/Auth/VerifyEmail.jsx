import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function VerifyEmail() {
    const { status } = usePage().props;
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div  className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <Head title="Verify Your Email Address" />

            <div  className="max-w-xl w-full bg-white py-10 px-8 shadow-lg rounded-lg">
                <h2  className="text-2xl md:text-3xl font-semibold text-red-600 mb-4 text-center">
                    Email Verification Required!
                </h2>

                <p  className="text-gray-600 text-sm md:text-base mb-6 text-center">
                    Thank you for signing up! Please verify your email by clicking the link we sent to your email
                    address. If you haven&apos;t received the email, you can request another one.
                </p>

                {status === 'verification-link-sent' && (
                    <div  className="mb-6 text-sm md:text-base text-green-600 text-center font-medium">
                        A new verification link has been sent to your email.
                    </div>
                )}

                <form onSubmit={submit}  className="space-y-4">
                    <div  className="flex justify-center">
                        <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>
                    </div>

                    <div  className="flex justify-center mt-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                             className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
