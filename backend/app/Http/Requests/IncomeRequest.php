<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class IncomeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        $id = $this->route('id');
        return [
            'cod_inc' => 'required|unique:incomes,cod_inc,' . $id,
            'date_inc' => 'required|date',
            'supplier_id' => 'required|exists:suppliers,id',
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages()
    {
        return [
            'cod_inc.required' => 'El código de ingreso es obligatorio.',
            'cod_inc.unique' => 'El código de ingreso ya está en uso.',
            'date_inc.required' => 'La fecha de ingreso es obligatoria.',
            'date_inc.date' => 'La fecha de ingreso debe ser válida.',
            'supplier_id.required' => 'El proveedor es obligatorio.',
            'supplier_id.exists' => 'El proveedor no existe.',
        ];
    }

    /**
     * Handle failed validation.
     */

}