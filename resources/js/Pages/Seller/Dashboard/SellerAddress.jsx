/* eslint-disable */

import AddressModal from "@/Components/Popups/AddressModal";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import Swal from "sweetalert2";

export default function SellerAddress() {
    const { t } = useLaravelReactI18n();
    const [showModal, setShowModal] = useState(false);
    const [addressData, setAdressData] = useState()

    // Modal Handlers
    function handelShowModal ( address )
    {
        setShowModal( true )
        setAdressData( address );
    }

    function closeModal ()
    {
        setShowModal( false )
    };

    // Delete functionality
    const deleteData = ( id ) =>
    {

            // router.delete( route( 'address.destroy', id ) )
        }

        const handleDelete = ( id ) =>
        {
            Swal.fire( {
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            } ).then( ( result ) =>
            {

                // if ( result.isConfirmed )
                // {
                //     deleteData( id )
                // }
            } );
        }


    return (
        <div  className="border border-slate-300 my-4 py-4 px-3 md:px-6">
            <h2  className="text-base md:text-xl font-bold pb-2">{t('Address')}</h2>
            {/* Modal */}
            {showModal && <AddressModal countries={countries} closeModal={closeModal} showModal={showModal} addressData={addressData} />}

            <div  className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 p-2">

                <label key={i}  className={`text-sm font-normal cursor-pointer border p-2 flex justify-between`}>
                    <div>
                        <p><strong>Address</strong> : R:12, H:20</p>
                        <p><strong>Country</strong> : Bangladesh</p>
                        <p><strong>State</strong> : Dhaka District</p>
                        <p><strong>City</strong> : Azimpur</p>
                        <p><strong>Phone</strong> : +8801928382282</p>
                        <p><strong>Zip Code</strong> : 1216</p>
                    </div>
                    <div  className="dropdown dropdown-end">
                        <div tabIndex={0}  className="btn btn-xs !min-h-9 border border_primary hover:border_primary bg-white hover:bg-white"><BiDotsVertical  className="text-xl" /></div>
                        <ul tabIndex={0}  className="menu dropdown-content bg-white rounded z-[1] w-52 p-2 shadow">
                            <li onClick={e => handelShowModal(e)}  className="hover:bg-green-600 hover:text-white duration-300 rounded"><a>{t('Set As Default')}</a></li>
                            <li onClick={e => handelShowModal(e)}  className="hover:bg-blue-600 hover:text-white duration-300 rounded"><a>{t('Edit Address')}</a></li>
                            <li onClick={e => handleDelete(e)}  className="hover:bg-red-600 hover:text-white duration-300 rounded"><a>{t('Delete Address')}</a></li>
                        </ul>
                    </div>
                </label>

            </div>

            <button onClick={e => handelShowModal(null)}  className="py-3 w-full border rounded-sm bg-[#f3f1f1] hover:bg-[#D7D7D7] duration-300 flex flex-col justify-center items-center">
                <AiOutlinePlus  className="text-2xl" />
                <span  className="text-sm md:text-base font-semibold">{t('Add New Adress')}</span>
            </button>
        </div>
    )
}
