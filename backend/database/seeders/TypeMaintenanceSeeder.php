<?php

namespace Database\Seeders;

use App\Models\MaintenanceActivity;
use App\Models\MaintenanceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeMaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        // Datos de los tipos de mantenimiento y sus actividades
        $tiposConActividades = [
            'Preventivo' => [
                'Inspección periódica de sistemas o componentes.',
                'Limpieza de hardware y sistemas.',
                'Actualización de software con parches regulares.',
                'Revisión de conexiones eléctricas o físicas.',
                'Sustitución programada de piezas desgastadas.'
            ],
            'Correctivo' => [
                'Reparación de fallas detectadas en hardware o software.',
                'Reemplazo de componentes dañados.',
                'Restauración de sistemas a su estado funcional después de un fallo.',
                'Solución de errores de programación o bugs en el software.'
            ],
            'Predictivo' => [
                'Monitoreo constante de desempeño (logs, sensores, diagnósticos).',
                'Análisis de tendencias y patrones para anticipar fallos.',
                'Implementación de herramientas de alerta temprana.',
                'Evaluación de vibraciones, temperatura o consumo de energía en sistemas.'
            ],
            'Adaptativo' => [
                'Modificación de software para adaptarlo a nuevos entornos o tecnologías.',
                'Ajustes en configuraciones debido a cambios en infraestructura o hardware.',
                'Migración de sistemas a plataformas actualizadas.',
                'Adaptación a nuevas regulaciones o estándares.'
            ],
            'Perfectivo' => [
                'Mejoras en el rendimiento del software o hardware.',
                'Implementación de nuevas funcionalidades según requerimientos del usuario.',
                'Optimización de algoritmos o procesos.',
                'Rediseño de interfaces para mejorar la experiencia del usuario.'
            ],
        ];

        // Crear tipos de mantenimiento y sus actividades
        foreach ($tiposConActividades as $tipo => $actividades) {
            $tipoMantenimiento = MaintenanceType::create([
                'typ_main' => $tipo
            ]);

            foreach ($actividades as $actividad) {
                MaintenanceActivity::create([
                    'typ_main_id' => $tipoMantenimiento->id,
                    'act_main' => $actividad
                ]);
            }
        }
    }
}
