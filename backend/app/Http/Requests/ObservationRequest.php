<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ObservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'id_det_main_obs' => 'nullable|exists:maintenance_details,id',
            'des_obs'         => 'nullable|string|regex:/^[a-zA-Z\s]+$/',
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['id_det_main_obs'] = [
                'nullable',
                Rule::exists('maintenance_details', 'id')->whereNull('deleted_at') // Si necesitas validación adicional para registros no eliminados.
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'id_det_main_obs.required' => 'Debe especificar un mantenimiento obligatoriamente.',
            'id_det_main_obs.exists'   => 'El id del mantenimiento no está registrado.',
            'des_obs.required'         => 'Debe proporcionar una descripción.',
            'des_obs.string'           => 'La descripción únicamente puede ser texto.',
            'des_obs.regex'            => 'La descripción únicamente puede contener letras y espacios.',
        ];
    }
}