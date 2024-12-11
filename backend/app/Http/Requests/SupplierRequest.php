<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules()
    {
        // Obtener el ID del proveedor desde la ruta
        $id = $this->route('id');

        return [
            'id_num_sup' => 'required|unique:suppliers,id_num_sup,' . $id,
            'nam_sup' => 'required|string|max:255',
            'ema_sup' => 'required|email|max:255|unique:suppliers,ema_sup,' . $id,
            'pho_sup' => 'required|string|max:20|unique:suppliers,pho_sup,' . $id,
        ];
    }

}