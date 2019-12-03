<?php

declare(strict_types=1);

namespace App\Application\Actions\Empleado;

use App\Domain\Empleado\Empleado;
use Psr\Http\Message\ResponseInterface as Response;

class EmpleadoModificarAction extends EmpleadoAction
{

    protected function action(): Response
    {
        $campos = $this->getFormData();

        $datos = new Empleado(
            $campos->Id_Empleado,
            $campos->Id_Usuarios,
            $campos->Documento,
            $campos->Nombre,
            $campos->Apellidos,
            $campos->Email,
            $campos->Sexo,
            $campos->Turno
        );

        $datos = $this->EmpleadoRepository->modificar($datos);

        return $this->respondWithData(["ok" => $datos]);
    }
}
