<?php
declare(strict_types=1);

use App\Domain\User\UserRepository;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;

//usuario

use App\Domain\Usuario\UsuarioRepository;
use App\Infrastructure\Persistence\Usuario\UsuarioPercistece;

//empleado
use App\Domain\Empleado\EmpleadoRepository;
use App\Infrastructure\Persistence\Empleado\EmpleadoPercistece;

use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    // Here we map our UserRepository interface to its in memory implementation
    $containerBuilder->addDefinitions([
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),
        UsuarioRepository::class => \DI\autowire(UsuarioPercistece::class),
        EmpleadoRepository::class => \DI\autowire(EmpleadoPercistece::class),
    ]);
    
};
