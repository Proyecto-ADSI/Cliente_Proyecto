<?php

declare(strict_types=1);

namespace App\Domain\Empleado;

use JsonSerializable;

class Empleado implements JsonSerializable
{
    private $Id_Empleado;
    private $Id_Usuarios;
    private $Documento;
    private $Nombre;
    private $Apellidos;
    private $Email;
    private $Sexo;
    private $Turno;
  

    public function __GET($attr){
        return $this->$attr;
    }

    function __construct(?int $Id_Empleado, int $Id_Usuarios, string $Documento, string $Nombre, string $Apellidos,string $Email,string $Sexo,string $Turno)
    {
        $this->Id_Empleado = $Id_Empleado;
        $this->Id_Usuarios = $Id_Usuarios;
        $this->Documento = $Documento;
        $this->Nombre = $Nombre;
        $this->Apellidos = $Apellidos;
        $this->Email = $Email;
        $this->Sexo = $Sexo;
        $this->Turno = $Turno;
       
    }

    public function jsonSerialize()
    {
        return [
            "Id_Empleado" => $this->Id_Empleado,
            "Id_Usuarios" => $this->Id_Usuarios,
            "Documento" => $this->Documento,
            "Nombre" => $this->Nombre,
            "Apellidos" => $this->Apellidos,
            "Email" => $this->Email,
            "Sexo" => $this->Sexo,
            "Turno" => $this->Turno
        ];
    }
}