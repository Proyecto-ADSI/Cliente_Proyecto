<?php 
declare(strict_types=1);

namespace App\Application\Actions\Empleado;

use Psr\Http\Message\ResponseInterface as Response;

class EmpleadoObtenerAction extends EmpleadoAction {

    protected function action(): Response 
    {
        $Id_Empleado = $this->resolveArg("Id_Empleado");
        $datos = $this->EmpleadoRepository->obtener($Id_Empleado);
        return $this->respondWithData($datos);
    }
}

