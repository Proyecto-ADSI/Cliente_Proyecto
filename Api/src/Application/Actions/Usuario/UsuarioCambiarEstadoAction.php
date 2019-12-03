<?php 
declare(strict_types=1);

namespace App\Application\Actions\Producto;

use Psr\Http\Message\ResponseInterface as Response;

class ProductoCambiarEstadoAction extends ProductoAction {

    protected function action(): Response 
    {
        $id = $this->resolveArg("id"); 
        $estado = $this->resolveArg("estado"); 

        $datos = $this->productoRepository->cambiar_estado($id, $estado);
        
        return $this->respondWithData(["ok"=>$datos]);
    }
}
