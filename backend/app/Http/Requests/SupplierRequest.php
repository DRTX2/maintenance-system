<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:25',
            'email' => 'required|email|max:25|unique:suppliers,ema_sup,' . $this->route('id'),
            'phone' => 'required|string|max:10',
        ];
    }
}