<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'description', 'email', 'phone', 'profile_pic'];
    protected $useTimestamps = true;
}
