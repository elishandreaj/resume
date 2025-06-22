<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\EducationModel;
use CodeIgniter\Controller;

class Education extends BaseController
{
    public function education()
    {
        $userModel      = new UserModel();
        $educationModel = new EducationModel();

        $user      = $userModel->find(session()->get('user_id'));
        $education = $educationModel
                        ->where('user_id', $user['id'])
                        ->orderBy('start_date', 'DESC')
                        ->findAll();

        return view('education', [
            'user'      => $user,
            'education' => $education
        ]);
    }

    public function saveEducation()
    {
    helper(['form', 'url']);
    $educationModel = new EducationModel();

    $id = $this->request->getPost('id'); 
    $data = [
        'user_id'       => $this->request->getPost('user_id'),
        'school_name'   => $this->request->getPost('school_name'),
        'degree_program'=> $this->request->getPost('degree_program'),
        'start_date'    => $this->request->getPost('start_date'),
        'end_date'      => $this->request->getPost('end_date'),
    ];

    $file = $this->request->getFile('school_logo');
    if ($file && $file->isValid() && !$file->hasMoved()) {
      $name = $file->getRandomName();
      $file->move('uploads/school_logos', $name);
      $data['school_logo'] = 'uploads/school_logos/' . $name;
    }

    if ($id) {
      $educationModel->update($id, $data);
      $action = 'updated';
    } else {
      $id = $educationModel->insert($data);
      $action = 'added';
    }

    return $this->response
      ->setHeader('Content-Type', 'application/json')
      ->setJSON([
        'status' => 'success',
        'action' => $action,
        'education' => array_merge(['id' => $id], $data),
      ]);
    }
}