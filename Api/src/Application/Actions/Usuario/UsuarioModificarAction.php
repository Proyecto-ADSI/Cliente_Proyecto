<?php

declare(strict_types=1);

namespace App\Application\Actions\Usuario;

use App\Domain\Usuario\Usuario;
use Psr\Http\Message\ResponseInterface as Response;

class UsuarioModificarAction extends UsuarioAction
{

    protected function action(): Response
    {
        $campos = $this->getFormData();

        $datos = new Usuario(
            $campos->Id_Usuarios,
            $campos->Id_Rol,
            $campos->Usuario,
            $campos->Contrasena
        );

        $datos = $this->UsuarioRepository->modificar($datos);

        return $this->respondWithData(["ok" => $datos]);
    }
}
