<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssetRequest extends FormRequest
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
    public function rules(): array
    {
        $id = $this->route("id");

        return [
            'asset.id_inc_ass' => 'required|exists:incomes,id',
            'asset.id_cat_ass' => 'required|exists:categories,id',
            'asset.id_loc_ass' => 'required|exists:locations,id',
            'asset.cod_ass' => 'required|unique:assets,cod_ass,' . $id,
            'asset.ser_num_ass' => 'required|unique:assets,ser_num_ass,' . $id,
            // Si tienes reglas para 'components', también debes ajustarlas
            'asset.components.*.id' => 'required|exists:components,id',
            'asset.components.*.pivot.description' => 'required|string',
        ];
    }




    public function messages()
    {
        return [
            'asset.id_inc_ass.required' => 'El activo debe estar relacionado a un ingreso.',
            'asset.id_inc_ass.exists' => 'El ingreso seleccionado no existe.',
            'asset.id_cat_ass.required' => 'El activo debe estar relacionado a una categoría de dispositivo.',
            'asset.id_cat_ass.exists' => 'La categoría del dispositivo seleccionado no existe.',
            'asset.id_loc_ass.required' => 'El activo debe estar relacionado a una localización.',
            'asset.id_loc_ass.exists' => 'La ubicación seleccionada no existe.',
            'asset.cod_ass.required' => 'El código del activo es obligatorio.',
            'asset.cod_ass.unique' => 'El código ingresado ya existe.',
            'asset.ser_num_ass.required' => 'El número de serie del activo es obligatorio.',
            'asset.ser_num_ass.unique' => 'El número de serie ingresado ya existe.',
            // Mensajes para 'components'
            'asset.components.*.id.required' => 'Cada componente debe tener un ID.',
            'asset.components.*.id.exists' => 'El componente seleccionado no existe.',
            'asset.components.*.pivot.description.required' => 'La descripción del componente es obligatoria.',
            'asset.components.*.pivot.description.string' => 'La descripción del componente debe ser una cadena de texto.',
        ];
    }



}