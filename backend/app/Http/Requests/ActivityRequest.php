<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'typ_main_id' => 'required|exists:type_maintenances,id',
            'act_main'    => 'required|string|max:255',
        ];

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['act_main'] = [
                'required',
                'string',
                'max:255',
                'unique:activities,act_main,' . $this->route('id'),
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'typ_main_id.required' => 'Debe especificar el tipo de mantenimiento.',
            'typ_main_id.exists'   => 'El tipo de mantenimiento no existe en la base de datos.',
            'act_main.required'    => 'Debe proporcionar el nombre de la actividad.',
            'act_main.string'      => 'El nombre de la actividad debe ser texto.',
            'act_main.max'         => 'El nombre de la actividad no puede superar los 255 caracteres.',
            'act_main.unique'      => 'El nombre de la actividad ya está registrado.',
        ];
    }
}
