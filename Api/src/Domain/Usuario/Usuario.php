<?php

declare(strict_types=1);

namespace App\Domain\Usuario;

use JsonSerializable;

class Usuario implements JsonSerializable
{
    private $Id_Usuarios;
    private $Id_Rol;
    private $Usuario;
    private $Contrasena;
  

    public function __GET($attr){
        return $this->$attr;
    }

    function __construct(?int $Id_Usuarios, int $Id_Rol, string $Usuario, string $Contrasena)
    {
        $this->Id_Usuarios = $Id_Usuarios;
        $this->Id_Rol = $Id_Rol;
        $this->Usuario = $Usuario;
        $this->Contrasena = $Contrasena;
       
    }

    public function jsonSerialize()
    {
        return [
            "Id_Usuarios" => $this->Id_Usuarios,
            "Id_Rol" => $this->Id_Rol,
            "Usuario" => $this->Usuario,
            "Contrasena" => $this->Contrasena
        ];
    }
}