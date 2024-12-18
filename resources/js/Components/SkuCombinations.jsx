import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function SkuCombinations ( { data, onCombinationInputChange } )
{
    const { t } = useLaravelReactI18n();

    return (
        <>
            <table  className="tab- table">
                {/* head */ }
                <thead>
                    <tr  className="border">
                        <th align="center"  className="border text-slate-900">{ t( 'Variant' ) }</th>
                        <th align="center"  className="border text-slate-900">{ t( 'Variant Price' ) }</th>
                        <th align="center"  className="border text-slate-900">{ t( 'SKU' ) }</th>
                        <th align="center"  className="border text-slate-900">{ t( 'Quantity' ) }</th>
                        <th align="center"  className="border text-slate-900">{ t( 'Photo' ) }</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */ }
                    {
                        data?.combinations?.map( ( combination, i ) =>
                        {
                            let str = '';
                            combination.map( ( element, index ) =>
                            {
                                if ( index > 0 )
                                {

                                    str += '-' + element;
                                } else
                                {
                                    str += element;
                                }
                            } );

                            return <tr key={ i }  className="border">
                                <th>{ str }</th>
                                <td align="center"  className="border">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder={ t( 'Enter' ) }
                                        value={ data[ 'price_' + str ] }
                                        name={ 'price_' + str }
                                        onChange={ e => onCombinationInputChange( e ) }
                                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                    />
                                </td>
                                <td align="center"  className="border">
                                    <input
                                        type="text"
                                        name={ 'sku_' + str }
                                        placeholder={ t( 'Enter' ) }
                                        // value={ 0 }
                                        onChange={ e => onCombinationInputChange( e ) }
                                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                    />
                                </td>
                                <td align="center"  className="border">
                                    <input
                                        type="number"
                                        min="0"
                                        name={ 'qty_' + str }
                                        placeholder={ t( 'Enter' ) }
                                        // value={ 0 }
                                        onChange={ e => onCombinationInputChange( e ) }
                                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                    />
                                </td>
                                <td align="center"  className="border">
                                    {/* <input type="file" name="" id="" />
                            <div  className="w-full">
                            <div
                                onClick={e => handelShowModal('photo')}
                                 className="cursor-pointer grid grid-cols-12 items-center"
                            >
                                <div  className="bg-[#2B3440] h-11 col-span-3 rounded-s-md flex justify-center items-center">
                                    <p  className="text-white text-sm uppercase">Choose File</p>
                                </div>
                                <div  className="bg-[#FFFFFF] h-12 border col-span-9 border-slate-300 rounded-e-md flex justify-start items-center">
                                    <p  className="ps-4 font-medium">{photo?.file_name ?? 'No file chosen'}</p>
                                </div>
                            </div>
                            <div  className="flex items-center gap-3">
                                {photo?.url && <div  className="relative">
                                    <IoMdClose onClick={e => { removePhoto() }}  className="text-xl text_primary absolute top-2 -right-1 cursor-pointer p-1 bg-blue-200 rounded-full" />
                                    <img  className='w-32 h-32 border rounded-xl p-3 mt-3' src={photo?.url} alt={'photo'} />
                                </div>}
                            </div>
                        </div> */}
                                </td>
                            </tr>
                        } )
                    }
                </tbody>
            </table> </>
    )

}
