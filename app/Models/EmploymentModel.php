<?php

namespace App\Models;

use CodeIgniter\Model;

class EmploymentModel extends Model
{
    protected $table = 'employment';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'company_name',
        'job_title',
        'start_date',
        'end_date',
        'description',
    ];
    
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
}
