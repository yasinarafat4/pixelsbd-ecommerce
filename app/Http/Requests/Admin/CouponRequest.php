<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class CouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        $productsRule       = $this->type == 'product_base' ? 'required' : 'sometimes';
        $dateRule           = $this->type != 'welcome_base' ? 'required' : 'sometimes';
        $minBuyRule         = $this->type != 'product_base' ? 'required' : 'sometimes';
        $maxDiscountRule    = $this->type == 'cart_base' ? 'required|numeric|min:1' : 'sometimes';
        $validationDaysRule    = $this->type == 'welcome_base' ? 'sometimes|required|numeric' : 'sometimes';

        return [
            'type'     => 'required',
            'code'            => ['required', Rule::unique('coupons')->ignore($this->coupon), 'max:255'],
            'discount'        => 'required|numeric|min:1',
            'discount_type'   => 'required',
            'product_ids'     => $productsRule,
            'minimum_buy'         => $minBuyRule,
            'maximum_discount'    => $maxDiscountRule,
            'start_date'      => $dateRule,
            'end_date'        => $dateRule,
            'details'         => 'required',
            'validation_days' => $validationDaysRule
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'type.required'       => trans('Coupon type is required'),
            'code.required'       => trans('Coupon code is required'),
            'code.unique'         => trans('Coupon already exist for this coupon code'),
            'code.max'            => trans('Max 255 characters'),
            'product_ids.required'       => trans('Product is required'),
            'discount.required'          => trans('Discount is required'),
            'discount.numeric'           => trans('Discount should be numeric type'),
            'discount.min'               => trans('Discount should be l or greater'),
            'discount_type.required'     => trans('Discount type is required'),
            'minimum_buy.required'       => trans('Minimum shopping amount is required'),
            'minimum_buy.numeric'        => trans('Minimum shopping amount should be numeric type'),
            'minimum_buy.min'            => trans('Minimum shopping amount should be l or greater'),
            'maximum_discount.required'  => trans('Max discount amount is required'),
            'maximum_discount.numeric'   => trans('Max discount amount should be numeric type'),
            'maximum_discount.min'       => trans('Max discount amount should be l or greater'),
            'validation_days.required'   => trans('Validation days is required'),
            'validation_days.numeric'    => trans('Validation days should be numeric type'),
            'start_date.required'    => trans('Start date'),
            'end_date.required'    => trans('and end date is required!'),
        ];
    }

    protected function prepareForValidation()
    {
        $coupon_details = null;

        if ($this->type == "product_base") {
            $coupon_details = array();
            if ($this->product_ids) {
                foreach ($this->product_ids as $product_id) {
                    $data['product_id'] = $product_id;
                    array_push($coupon_details, $data);
                }
            }
            $coupon_details = json_encode($coupon_details);
        } elseif ($this->type == "cart_base") {
            $data                     = array();
            $data['minimum_buy']          = $this->minimum_buy;
            $data['maximum_discount']     = $this->maximum_discount;
            $coupon_details           = json_encode($data);
        } elseif ($this->type == "welcome_base") {
            $data                     = array();
            $data['minimum_buy']          = $this->minimum_buy;
            $data['validation_days']  = $this->validation_days;
            $coupon_details           = json_encode($data);
        }

        $this->merge([
            'details' => $coupon_details
        ]);
    }

    /**
     * Get the error messages for the defined validation rules.*
     * @return array
     */
    // public function failedValidation(Validator $validator)
    // {
    //     if ($this->expectsJson()) {
    //         throw new HttpResponseException(response()->json([
    //             'message' => $validator->errors()->all(),
    //             'result' => false
    //         ], 422));
    //     } else {
    //         throw (new ValidationException($validator))
    //             ->errorBag($this->errorBag)
    //             ->redirectTo($this->getRedirectUrl());
    //     }
    // }
}
