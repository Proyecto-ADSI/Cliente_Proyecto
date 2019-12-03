<?php 
declare(strict_types=1);

namespace App\Application\Actions\Usuario;

use Psr\Http\Message\ResponseInterface as Response;

class UsuarioListarAction extends UsuarioAction {

    protected function action(): Response 
    {
        $datos = $this->UsuarioRepository->listar();

        $this->logger->info("Producto of id ".json_encode($datos)." was viewed.");

        return $this->respondWithData($datos);
    }
}

