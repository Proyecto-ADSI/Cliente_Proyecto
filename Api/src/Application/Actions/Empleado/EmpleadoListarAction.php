<?php 
declare(strict_types=1);

namespace App\Application\Actions\Empleado;

use Psr\Http\Message\ResponseInterface as Response;

class EmpleadoListarAction extends EmpleadoAction {

    protected function action(): Response 
    {
        $datos = $this->EmpleadoRepository->listar();

        $this->logger->info("Producto of id ".json_encode($datos)." was viewed.");

        return $this->respondWithData($datos);
    }
}

