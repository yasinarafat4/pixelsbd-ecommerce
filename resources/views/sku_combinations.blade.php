@if (count($combinations) > 0)
    <table class="table">
        <thead>
            <tr class="border">
                <td align="center" class="border text-slate-900">
                    {{ trans('Variant') }}
                </td>
                <td align="center" class="border text-slate-900">
                    {{ trans('Variant Price') }}
                </td>
                <td align="center" class="border text-slate-900" data-breakpoints="lg">
                    {{ trans('SKU') }}
                </td>
                <td align="center" class="border text-slate-900" data-breakpoints="lg">
                    {{ trans('Quantity') }}
                </td>
                <td align="center" class="border text-slate-900" data-breakpoints="lg">
                    {{ trans('Photo') }}
                </td>
            </tr>
        </thead>
        <tbody>
            @foreach ($combinations as $key => $combination)
                @php
                    $sku = '';
                    foreach (explode(' ', $product_name) as $key => $value) {
                        $sku .= substr($value, 0, 1);
                    }

                    $str = '';
                    foreach ($combination as $key => $item) {
                        if ($key > 0) {
                            $str .= '-' . str_replace(' ', '', $item);
                            $sku .= '-' . str_replace(' ', '', $item);
                        } else {
                            if ($colors_active == 1) {
                                $color_name = \App\Models\Color::where('color_code', $item)->first()->name;
                                $str .= $color_name;
                                $sku .= '-' . $color_name;
                            } else {
                                $str .= str_replace(' ', '', $item);
                                $sku .= '-' . str_replace(' ', '', $item);
                            }
                        }
                    }
                @endphp
                @if (strlen($str) > 0)
                    <tr class="border">
                        <td class='border'>
                            <label for="" class="label label-text">{{ $str }}</label>
                        </td>
                        <td class='border'>
                            <input onchange={e=> setData('price_{{ $str }}', e.target.value)} type="number"
                            lang="en" name="price_{{ $str }}"
                            value="{{ $unit_price }}" min="0" step="0.01"
                            class="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                            required>
                        </td>
                        <td class='border'>
                            <input type="text" name="sku_{{ $str }}" value=""
                                class="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm">
                        </td>
                        <td class='border'>
                            <input type="number" lang="en" name="qty_{{ $str }}" value="10"
                                min="0" step="1"
                                class="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                                required>
                        </td>
                        <td class='border'>

                        </td>
                    </tr>
                @endif
            @endforeach
        </tbody>
    </table>
@endif

{{--
<table  className="table">
    head
    <thead>
        <tr  className="border">
            <th align="center"  className="border text-slate-900">Variant</th>
            <th align="center"  className="border text-slate-900">Variant Price</th>
            <th align="center"  className="border text-slate-900">SKU</th>
            <th align="center"  className="border text-slate-900">Quantity</th>
            <th align="center"  className="border text-slate-900">Photo</th>
        </tr>
    </thead>
    <tbody>
        row 1

        {selectedColors.map((dyInput, index) => (
            <tr key={index}  className="border">
                <th>1</th>
                <td align="center"  className="border">
                    <input
                        name='name'
                        id='name'
                        type="number"
                        min="0"
                        placeholder={t('Enter')}
                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                    />
                </td>
                <td align="center"  className="border">
                    <input
                        name='name'
                        id='name'
                        type="number"
                        min="0"
                        placeholder={t('Enter')}
                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                    />
                </td>
                <td align="center"  className="border">
                    <input
                        name='name'
                        id='name'
                        type="number"
                        min="0"
                        placeholder={t('Enter')}
                         className="p-[13px] focus:outline-none border-[1px] border-slate-300 block text-slate-600 bg-white w-full rounded-lg text-sm"
                    />
                </td>
                <td align="center"  className="border">
                    <input type="file" name="" id="" />
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
                </div>
                </td>
            </tr>
        ))}
    </tbody>
</table> --}}
