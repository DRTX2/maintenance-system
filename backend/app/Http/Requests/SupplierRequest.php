<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
<<<<<<< HEAD
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;// q cualquiera pueda usarlo
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
=======
    public function authorize(): bool
    {
        return true;
    }
>>>>>>> fc8be86625276101af048c257ebd6aafed09090f
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:25',
            'email' => 'required|email|max:25|unique:suppliers,ema_sup,' . $this->route('id'),
            'phone' => 'required|string|max:10',
        ];
    }
}
