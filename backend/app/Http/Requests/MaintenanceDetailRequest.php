<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MaintenanceDetailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'dni_res_main' => 'required|string|exists:responsibles,dni_res',
            'cod_main'     => 'required|string|max:10|unique:maintenances,cod_main',
            'id_typ_main'  => 'required|exists:type_maintenances,id',
            'vis_main'     => 'nullable|in:V,H',
            'ended_at'     => 'nullable|date|after:created_at',
            'created_at'   => 'required|date',
            'observations' => 'nullable|array',
            'observations.*.des_obs' => 'nullable|regex:/^[a-zA-Z0-9\s]+$/',
            'replaced_components' => 'nullable|array',
            'replaced_components.*.id_com_bel' => 'required|exists:components,id',
            'replaced_components.*.des_rep_com' => 'required|string',
            'activities' => 'nullable|array',
            'activities.*' => 'required|exists:activities,id',
            'id_ass_bel' => 'required|exists:assets,id',
        ];
        
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['cod_main'] = [
                'required',
                'string',
                'max:10',
                Rule::unique('maintenances', 'cod_main')->ignore($this->route('id'))
            ];
            $rules['id_ass_bel'] = "nullable";
            // Validar que cada observación tenga un id
            $rules['observations'] = 'nullable|array';        
            $rules['observations.*.id'] = 'required|exists:observations,id';
            $rules['observations.*.des_obs'] = 'nullable|string';
            $rules['replaced_components.*.id'] = 'required|exists:replaced_components,id';
            $rules['replaced_components.*.id_com_bel'] = 'required|exists:components,id';
            // Validar que cada componente reemplazado tenga un id
        }
    
        return $rules;
    }

    public function messages(): array
    {
        return [
            'dni_res_main.required' => 'La cédula del responsable es obligatoria.',
            'dni_res_main.exists'   => 'El responsable especificado no existe.',
            'cod_main.required'     => 'El código de mantenimiento es obligatorio.',
            'cod_main.unique'       => 'El código de mantenimiento ya está en uso.',
            'cod_main.max'          => 'El código de mantenimiento no puede superar los 10 caracteres.',
            'id_typ_main.required'  => 'El tipo de mantenimiento es obligatorio.',
            'id_typ_main.exists'    => 'El tipo de mantenimiento especificado no existe.',
            'vis_main.in'           => 'La visibilidad debe ser uno de los siguientes: V (visible) o H (hidden).',
            'ended_at.date'         => 'La fecha de finalización debe ser válida.',
            'ended_at.after'        => 'La fecha de finalización debe ser posterior a la fecha de creación.',
            'created_at.required'   => 'La fecha de creación es obligatoria.',
            'created_at.date'       => 'La fecha de creación debe ser válida.',
    
            // Mensajes para observaciones
            'observations.array'    => 'Las observaciones deben ser un arreglo.',
            'observations.*.id.required' => 'El ID de cada observación es obligatorio durante la actualización.',
            'observations.*.id.exists'   => 'La observación especificada no existe.',
            'observations.*.des_obs.string' => 'La descripción de cada observación debe ser una cadena de texto.',
    
            // Mensajes para componentes reemplazados
            'replaced_components.array' => 'Los componentes reemplazados deben ser un arreglo.',
            'replaced_components.*.id.required' => 'El ID de cada componente reemplazado es obligatorio durante la actualización.',
            'replaced_components.*.id.exists'   => 'El componente reemplazado especificado no existe.',
            'replaced_components.*.id_com_bel.required' => 'El componente reemplazado debe ser válido.',
            'replaced_components.*.id_com_bel.exists'   => 'El componente especificado no existe.',
            'replaced_components.*.des_rep_com.required' => 'La descripción del componente reemplazado es obligatoria.',
            'replaced_components.*.des_rep_com.string'   => 'La descripción del componente reemplazado debe ser una cadena de texto.',
    
            // Mensajes para actividades
            'activities.array' => 'Las actividades deben ser un arreglo.',
            'activities.*.required' => 'Cada actividad debe estar especificada.',
            'activities.*.exists' => 'La actividad especificada no existe.',
        ];
    }
}
