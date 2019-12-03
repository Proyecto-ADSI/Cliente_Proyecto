<?php 
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Empleado;

use App\Infrastructure\DataBase;
use App\Domain\Empleado\Empleado;
use App\Domain\Empleado\EmpleadoNotFoundException;
use App\Domain\Empleado\EmpleadoRepository;
use PDO;

class EmpleadoPercistece implements EmpleadoRepository {

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

        $sql = "SELECT * FROM empleados";

        try{
            $stm = $this->db->prepare($sql);
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_ASSOC);
        }catch(Exception $e){
            return null;
        }
    }

   

    public function guardar(Empleado $Empleado) 
    {
        $sql = "INSERT INTO empleados
        (Id_Usuarios, Documento, Nombre, Apellidos, Email, Sexo,Turno)
         VALUE 
        (?, ?, ?, ?, ?, ?, ?)";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindValue(1, $Empleado->__GET("Id_Usuarios"));
            $stm->bindValue(2, $Empleado->__GET("Documento"));
            $stm->bindValue(3, $Empleado->__GET("Nombre"));
            $stm->bindValue(4, $Empleado->__GET("Apellidos"));
            $stm->bindValue(5, $Empleado->__GET("Email"));
            $stm->bindValue(6, $Empleado->__GET("Sexo"));
            $stm->bindValue(7, $Empleado->__GET("Turno"));
            

            return $stm->execute();
        }catch(Exception $e){
            return false;
        }
    }

    public function obtener($Id_Empleado) : array
    {
        // $sql = "SELECT p.id, p.nombre, p.precio, p.cantidad, 
        // p.categoria_id, p.estado, c.nombre as categoria
        // FROM producto p 
        // INNER JOIN categoria c ON (p.categoria_id = c.id)
        // WHERE p.id = ?";

        $sql = "SELECT * FROM empleados  WHERE Id_Empleado = $Id_Empleado";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindParam(1, $Id_Empleado);
            $stm->execute();
            return $stm->fetch();
        }catch(Exception $e){
            return null;
        }
    }

    public function Modificar(Empleado $Empleado)
    {
        $sql = "UPDATE empleados SET 
        Id_Usuarios = ?, Documento = ?, Nombre = ?, Apellidos = ?, Email = ?, Sexo = ?, Turno = ?
        WHERE Id_Empleado = ?";

        try{
            $stm = $this->db->prepare($sql);
            $stm->bindValue(1, $Empleado->__GET("Id_Usuarios"));
            $stm->bindValue(2, $Empleado->__GET("Documento"));
            $stm->bindValue(3, $Empleado->__GET("Nombre"));
            $stm->bindValue(4, $Empleado->__GET("Apellidos"));
            $stm->bindValue(5, $Empleado->__GET("Email"));
            $stm->bindValue(6, $Empleado->__GET("Sexo"));
            $stm->bindValue(7, $Empleado->__GET("Turno"));
            $stm->bindValue(8, $Empleado->__GET("Id_Empleado"));
            


            return $stm->execute();
        }catch(Exception $e){
            return false;
        }
    }

    
}
