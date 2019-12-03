<?php
declare(strict_types=1);

namespace App\Application\Actions\Usuario;

use App\Application\Actions\Action;
use App\Domain\Usuario\UsuarioRepository;
use Psr\Log\LoggerInterface;

abstract class UsuarioAction extends Action
{
    /**
     * @var UsuarioRepository
     */
    protected $productoRepository;

    /**
     * @param LoggerInterface $logger
     * @param ProductoRepository  $productoRepository
     */
    public function __construct(LoggerInterface $logger, UsuarioRepository $UsuarioRepository)
    {
        parent::__construct($logger);
        $this->UsuarioRepository = $UsuarioRepository;
    }
}
