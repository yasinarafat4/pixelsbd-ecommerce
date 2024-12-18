<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
        $rules = [];

        $rules['name']          = 'required|max:255';
        $rules['category_id']   = ['required'];
        $rules['unit']         = 'sometimes|required';
        $rules['min_qty']      = 'sometimes|required|numeric';
        $rules['unit_price']    = 'sometimes|required|numeric|gt:0';
        return $rules;
    }

    /**
     * Get the validation messages of rules that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required'             => trans('Product name is required'),
            'category_id.required'      => trans('Category is required'),
            'unit.required'             => trans('Product unit is required'),
            'min_qty.required'          => trans('Minimum purchase quantity is required'),
            'min_qty.numeric'           => trans('Minimum purchase must be numeric'),
            'unit_price.gt'             => trans('The unit price must be greater than 0'),
            'unit_price.required'       => trans('Unit price is required'),
            'unit_price.numeric'        => trans('Unit price must be numeric'),
        ];
    }

    /**
     * Get the error messages for the defined validation rules.*
     * @return array
     */
    public function failedValidation(Validator $validator)
    {
        // dd($this->expectsJson());
        if ($this->expectsJson()) {
            throw new HttpResponseException(response()->json([
                'message' => $validator->errors()->all(),
                'result' => false
            ], 422));
        } else {
            throw (new ValidationException($validator))
                ->errorBag($this->errorBag)
                ->redirectTo($this->getRedirectUrl());
        }
    }
}
