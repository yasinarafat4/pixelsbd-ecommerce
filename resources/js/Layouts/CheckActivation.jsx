
const CheckActivation = () => {
    return (
        <div  className="h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div  className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                <h1  className="text-2xl font-semibold text-red-600 mb-4">Invalid Purchase Code</h1>
                <p  className="text-gray-700 mb-6">The purchase code you entered is not valid. Please enter a valid code to continue.</p>

                <form  className="space-y-4">
                    <label  className="block text-left text-gray-600 font-medium" htmlFor="purchaseCode">
                        Enter a valid purchase code
                    </label>
                    <input
                        type="text"
                        id="purchaseCode"
                        name="purchaseCode"
                        placeholder="Purchase code"
                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="submit"
                        value="Update"
                         className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
                    />
                </form>

                <div  className="my-4 text-gray-600">or</div>

                <div  className="text-sm text-gray-600">
                    <p>If you don&apos;t have a purchase code, you can get one from <a href="https://store.com"  className="text-blue-600 underline hover:text-blue-700">here</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default CheckActivation;

