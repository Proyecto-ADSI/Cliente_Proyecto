<?php 
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Usuario;

use App\Infrastructure\DataBase;
use App\Domain\Usuario\Usuario;
use App\Domain\Usuario\UsuarioNotFoundException;
use App\Domain\Usuario\UsuarioRepository;
use PDO;

class UsuarioPercistece implements UsuarioRepository {

    private $db = null;
    function __construct()
    {
        $database = new DataBase();
        $this->db = $database->getConection();
    }

    public function listar() : array
    {
        // $sql = "SELECT p.id, p.nombre, p.precio, p.cantidad, 
        // p.categoria_id, p.estado, c.nombre as categoria
        // FROM producto p 
        // INNER JOIN categoria c ON (p.categoria_id = c.id)";

        $sql = "SELECT * FROM usuarios";

        try{
            $stm = $this->db->prepare($sql);
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_ASSOC);
        }catch(Exception $e){
            return null;
        }
    }

    public function guardar(Usuario $Usuario) 
    {
        $sql = "INSERT INTO usuarios
        (Id_Rol, Usuario, Contrasena)
         VALUE 
        (?, ?, ?)";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindValue(1, $Usuario->__GET("Id_Rol"));
            $stm->bindValue(2, $Usuario->__GET("Usuario"));
            $stm->bindValue(3, $Usuario->__GET("Contrasena"));
            

            return $stm->execute();
        }catch(Exception $e){
            return false;
        }
    }

    public function obtener($Usuario) : array
    {
        // $sql = "SELECT p.id, p.nombre, p.precio, p.cantidad, 
        // p.categoria_id, p.estado, c.nombre as categoria
        // FROM producto p 
        // INNER JOIN categoria c ON (p.categoria_id = c.id)
        // WHERE p.id = ?";

        $sql = "SELECT * FROM usuarios  WHERE Usuario = '$Usuario'";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindParam(1, $Usuario);
            $stm->execute();
            return $stm->fetch();
        }catch(Exception $e){
            return null;
        }
    }

    public function modificar(Usuario $Usuario)
    {
        $sql = "UPDATE usuarios SET 
        Id_Rol = ?, Usuario = ?, Contrasena = ?
        WHERE Id_Usuarios = ?";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindValue(1, $Usuario->__GET("Id_Rol"));
            $stm->bindValue(2, $Usuario->__GET("Usuario"));
            $stm->bindValue(3, $Usuario->__GET("Contrasena"));
            $stm->bindValue(4, $Usuario->__GET("Id_Usuarios"));
            


            return $stm->execute();
        }catch(Exception $e){
            return false;
        }
    }

    public function cambiar_estado(int $id, int $estado)
    {
        $sql = "UPDATE producto SET 
        estado = ?
        WHERE id = ?";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindParam(1, $estado);
            $stm->bindParam(2, $id);

            return $stm->execute();
        }catch(Exception $e){
            return false;
        }
    }
}
