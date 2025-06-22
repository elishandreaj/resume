<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\EducationModel;

class Home extends BaseController
{
    public function index(): string
    {
        $userModel = new UserModel();
        $educationModel = new EducationModel();
        $user = $userModel->find(1); 
        $education = $educationModel
                        ->where('user_id', $user['id'])
                        ->orderBy('start_date', 'DESC')
                        ->findAll();

        return view('dashboard', ['user' => $user, 'education' => $education]);
    }
}