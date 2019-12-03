<?php
declare(strict_types=1);

namespace App\Domain\Empleado;

use App\Domain\DomainException\DomainRecordNotFoundException;

class EmpleadoNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The Empleado you requested does not exist.';
}
