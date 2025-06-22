<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;

class Profile extends BaseController
{
    public function index()
    {
        $userModel = new UserModel();

        $user = $userModel->find(1);

        return view('profile_info', ['user' => $user]);
        }

    public function update()
    {
        helper(['form', 'url']);
        $userModel = new UserModel();

        $id = $this->request->getPost('id');
        $data = [
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'email'       => $this->request->getPost('email'),
            'phone'       => $this->request->getPost('phone'),
        ];

        $file = $this->request->getFile('profile_pic');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move('uploads/profile_pics', $newName);
            $data['profile_pic'] = 'uploads/profile_pics/' . $newName;
        }

        $userModel->update($id, $data);

        if ($this->request->isAJAX()) {
        return $this->response
            ->setHeader('Content-Type', 'application/json')
            ->setJSON([
                'status' => 'success',
                'profile_pic' => isset($data['profile_pic']) ? base_url($data['profile_pic']) : null,
            ]);
        }

        return redirect()->to('/profile')->with('success', 'Profile updated!');
    }
}