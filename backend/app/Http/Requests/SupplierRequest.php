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
            'nam_sup' => 'required|string|max:25',
            'ema_sup' => 'required|email|max:25|unique:suppliers,ema_sup,' . $this->route('id'),
            'pho_sup' => 'required|string|max:10',
        ];
    }
}