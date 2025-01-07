<?php

namespace Database\Seeders;

use App\Models\Component;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Componentes de Computadora de Escritorio y Laptop
        Component::create([
            'cod_com' => 'C01',
            'nam_com' => 'Tarjeta Madre',
            'des_com' => 'Componente esencial para el funcionamiento de la computadora, conecta todos los demás componentes.',
        ]);

        Component::create([
            'cod_com' => 'C02',
            'nam_com' => 'Procesador',
            'des_com' => 'Unidad central de procesamiento, ejecuta instrucciones.',
        ]);

        Component::create([
            'cod_com' => 'C03',
            'nam_com' => 'RAM1',
            'des_com' => 'Memoria volátil de 8 GB utilizada para almacenar datos y programas en ejecución.',
        ]);

        Component::create([
            'cod_com' => 'C04',
            'nam_com' => 'RAM2',
            'des_com' => 'Memoria volátil de 16 GB utilizada para almacenar datos y programas en ejecución.',
        ]);

        Component::create([
            'cod_com' => 'C05',
            'nam_com' => 'Disco Duro',
            'des_com' => 'Almacenamiento permanente de datos.',
        ]);

        Component::create([
            'cod_com' => 'C06',
            'nam_com' => 'Tarjeta Gráfica',
            'des_com' => 'Componente encargado de generar imágenes para mostrarlas en el monitor.',
        ]);

        Component::create([
            'cod_com' => 'C07',
            'nam_com' => 'Fuente de Poder',
            'des_com' => 'Componente que proporciona la energía eléctrica a los otros componentes.',
        ]);

        Component::create([
            'cod_com' => 'C08',
            'nam_com' => 'Placa de Red',
            'des_com' => 'Componente que permite la conexión a una red, como Wi-Fi o Ethernet.',
        ]);

        // Componentes para Impresora
        Component::create([
            'cod_com' => 'C09',
            'nam_com' => 'Cartucho de Tinta',
            'des_com' => 'Componente que almacena la tinta necesaria para la impresión.',
        ]);

        Component::create([
            'cod_com' => 'C10',
            'nam_com' => 'Cabezal de Impresión',
            'des_com' => 'Componente que realiza la impresión sobre el papel.',
        ]);

        Component::create([
            'cod_com' => 'C11',
            'nam_com' => 'Rodillo',
            'des_com' => 'Componente que alimenta el papel en la impresora.',
        ]);

        Component::create([
            'cod_com' => 'C12',
            'nam_com' => 'Placa Base',
            'des_com' => 'Placa madre que gestiona los componentes internos de la impresora.',
        ]);

        // Componentes para Switch
        Component::create([
            'cod_com' => 'C13',
            'nam_com' => 'Puerto Ethernet',
            'des_com' => 'Conectores físicos para cables de red.',
        ]);

        Component::create([
            'cod_com' => 'C14',
            'nam_com' => 'Chip de Conmutación',
            'des_com' => 'Componente encargado de gestionar las conexiones de red en el switch.',
        ]);

        Component::create([
            'cod_com' => 'C15',
            'nam_com' => 'Placa Base',
            'des_com' => 'Placa madre que gestiona las conexiones de red y la operación del switch.',
        ]);
        Component::create([
            'cod_com' => 'C16',
            'nam_com' => 'Batería',
            'des_com' => 'Fuente de energía interna que permite el funcionamiento de la laptop.',
        ]);
        Component::create([
            'cod_com' => 'C17',
            'nam_com' => 'Cargador',
            'des_com' => 'Dispositivo utilizado para suministrar energía eléctrica a la laptop.',
        ]);
    }
}