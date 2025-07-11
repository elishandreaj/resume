<?php

namespace App\Controllers;

use App\Models\ProjectModel;

class Project extends BaseController
{
    protected $projectModel;

    public function __construct()
    {
        $this->projectModel = new ProjectModel();
    }

    public function list()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $projects = $this->projectModel->orderBy('created_at', 'DESC')->findAll();
        return $this->response->setJSON($projects);
    }

    public function add()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $imageFile = $this->request->getFile('image');
        $imageName = null;

        if ($imageFile && $imageFile->isValid() && !$imageFile->hasMoved()) {
            $imageName = $imageFile->getRandomName();
            $imageFile->move('uploads/projects', $imageName);  // Save to /public/uploads/projects
        }

        $data = [
            'title'       => $this->request->getPost('title'),
            'role'        => $this->request->getPost('role'),
            'dates'       => $this->request->getPost('dates'),
            'description' => $this->request->getPost('description'),
            'image'       => $imageName ? '/uploads/projects/' . $imageName : null,
        ];

        $id = $this->projectModel->insert($data);
        return $this->response->setJSON(['status' => $id ? 'success' : 'error', 'id' => $id]);
    }

    public function update($id)
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $imageFile = $this->request->getFile('image');
        $imageName = null;

        if ($imageFile && $imageFile->isValid() && !$imageFile->hasMoved()) {
            $imageName = $imageFile->getRandomName();
            $imageFile->move('uploads/projects', $imageName);
        }

        $data = [
            'title'       => $this->request->getPost('title'),
            'role'        => $this->request->getPost('role'),
            'dates'       => $this->request->getPost('dates'),
            'description' => $this->request->getPost('description'),
        ];

        if ($imageName) {
            $data['image'] = '/uploads/projects/' . $imageName;
        }

        $ok = $this->projectModel->update($id, $data);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }

    public function delete()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $id = $this->request->getPost('id');
        $ok = $this->projectModel->delete($id);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }
}