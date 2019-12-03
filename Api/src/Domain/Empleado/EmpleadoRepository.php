<?php
declare(strict_types=1);

namespace App\Domain\Empleado;

interface EmpleadoRepository {
    
    public function listar() : array;

    public function guardar(Empleado $Empleado);

    public function obtener($Id_Empleado) : array;

    public function modificar(Empleado $Empleado);

}