<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MaintenanceRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules= [
            'dni_res_main' => 'required|string|exists:responsibles,dni_res',
            'cod_main'     => 'required|string|max:10|unique:maintenances,cod_main',
            'typ_main'     => 'required|in:Preventivo,Correctivo,Predictivo,Adaptativo,Perfectivo',
            'vis_main'     => 'nullable|in:V,H',
            'ended_at'     => 'nullable|date|after:created_at',
            'created_at'   => 'required|date',
        ];
        
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['cod_main'] = [
                'required',
                'string',
                'max:10',
                Rule::unique('maintenances', 'cod_main')->ignore($this->route('id'))
            ];
        }
        return $rules;
    }

    public function messages(): array
    {
        return [
            'dni_res_main.required' => 'La cédula del responsable es obligatorio.',
            'dni_res_main.exists'   => 'El responsable especificado no existe.',
            'cod_main.required'     => 'El código de mantenimiento es obligatorio.',
            'cod_main.unique'       => 'El código de mantenimiento ya está en uso.',
            'cod_main.max'          => 'El código de mantenimiento no puede superar los 10 caracteres.',
            'typ_main.required'     => 'El tipo de mantenimiento es obligatorio.',
            'typ_main.in'           => 'El tipo de mantenimiento debe ser uno de los siguientes: Preventivo, Correctivo, Predictivo, Adaptativo, Perfectivo.',
            'vis_main.in'           => 'La visibilidad debe ser uno de los siguientes: V(visible) o H(hidden)',
            'ended_at.date'         => 'La fecha de finalización debe ser válida.',
            'ended_at.after'        => 'La fecha de finalización debe ser posterior a la fecha de creación.',
            'created_at.required'   => 'La fecha de creación es obligatoria.',
            'created_at.date'       => 'La fecha de creación debe ser válida.',
        ];
    }
}
