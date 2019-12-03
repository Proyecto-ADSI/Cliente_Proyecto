<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;

//Usuario

use App\Application\Actions\Usuario\UsuarioCrearAction;
use App\Application\Actions\Usuario\UsuarioListarAction;
use App\Application\Actions\Usuario\UsuarioModificarAction;
use App\Application\Actions\Usuario\UsuarioObtenerAction;

//Empleado

use App\Application\Actions\Empleado\EmpleadoCrearAction;
use App\Application\Actions\Empleado\EmpleadoListarAction;
use App\Application\Actions\Empleado\EmpleadoModificarAction;
use App\Application\Actions\Empleado\EmpleadoObtenerAction;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hola Mundo!');
        return $response;
    });

    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });

    $app->group('/usuario', function (Group $group) {
        $group->get('', UsuarioListarAction::class);
        $group->get('/{Usuario}', UsuarioObtenerAction::class);
        $group->post('', UsuarioCrearAction::class);
        $group->put('', UsuarioModificarAction::class);
    });

    $app->group('/empleado', function (Group $group) {
        $group->get('', EmpleadoListarAction::class);
        $group->get('/{Id_Empleado}', EmpleadoObtenerAction::class);
        $group->post('', EmpleadoCrearAction::class);
        $group->put('', EmpleadoModificarAction::class);
    });

    // $app->options('/{routes:.+}', function ($request, $response, $args) {
    //     return $response;
    // });
    
    // $app->add(function ($req, $res, $next) {
    //     $response = $next($req, $res);
    //     return $response
    //             ->withHeader('Access-Control-Allow-Origin', '*')
    //             ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    //             ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // });


};
