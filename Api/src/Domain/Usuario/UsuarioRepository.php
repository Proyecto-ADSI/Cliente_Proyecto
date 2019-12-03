<?php
declare(strict_types=1);

namespace App\Domain\Usuario;

interface UsuarioRepository {

    public function listar() : array;

    public function guardar(Usuario $Usuario);

    public function obtener($Usuario) : array;

    public function modificar(Usuario $Usuario);

    public function cambiar_estado(int $id, int $estado);
}