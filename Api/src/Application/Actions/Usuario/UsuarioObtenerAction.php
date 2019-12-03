<?php 
declare(strict_types=1);

namespace App\Application\Actions\Usuario;

use Psr\Http\Message\ResponseInterface as Response;

class UsuarioObtenerAction extends UsuarioAction {

    protected function action(): Response 
    {
        $Usuario = $this->resolveArg("Usuario");
        $datos = $this->UsuarioRepository->obtener($Usuario);
        return $this->respondWithData($datos);
    }
}

