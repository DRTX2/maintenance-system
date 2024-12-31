<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReplacedComponentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'des_rep_com'     => 'required|string',
            'id_com_bel'      => 'required|exists:components,id',
            'id_det_main_bel' => 'required|exists:maintenance_details,id',
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['des_rep_com'] = 'sometimes|string';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'des_rep_com.required'     => 'Debe proporcionar una descripción del componente reemplazado.',
            'des_rep_com.string'       => 'La descripción debe ser un texto válido.',
            'id_com_bel.required'      => 'Debe proporcionar el ID del componente asociado.',
            'id_com_bel.exists'        => 'El ID del componente no existe en la base de datos.',
            'id_det_main_bel.required' => 'Debe proporcionar el ID del detalle de mantenimiento asociado.',
            'id_det_main_bel.exists'   => 'El ID del detalle de mantenimiento no existe en la base de datos.',
        ];
    }
}
