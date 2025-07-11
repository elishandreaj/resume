<?php

namespace App\Models;

use CodeIgniter\Model;

class ExtracurricularModel extends Model
{
    protected $table = 'extracurriculars';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'title',
        'role',
        'dates',
        'description',
    ];
    
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
}