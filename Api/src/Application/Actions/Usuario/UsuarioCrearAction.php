<?php

declare(strict_types=1);

namespace App\Application\Actions\Usuario;

use App\Domain\Usuario\Usuario;
use Psr\Http\Message\ResponseInterface as Response;

class UsuarioCrearAction extends UsuarioAction
{

    protected function action(): Response
    {
        $campos = $this->getFormData();

        $datos = new Usuario(
            0,
            $campos->Id_Rol,
            $campos->Usuario,
            $campos->Contrasena
        );

        $datos = $this->UsuarioRepository->guardar($datos);

        return $this->respondWithData(["ok" => $datos]);
    }
}
