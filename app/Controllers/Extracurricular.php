<?php

namespace App\Controllers;

use App\Models\ExtracurricularModel;

class Extracurricular extends BaseController
{
    protected $extraModel;

    public function __construct()
    {
        $this->extraModel = new ExtracurricularModel();
    }

    public function list()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $extracurriculars = $this->extraModel->orderBy('dates', 'DESC')->findAll();
        return $this->response->setJSON($extracurriculars);
    }

    public function add()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $data = [
            'user_id'      => 1,
            'title' => $this->request->getPost('title'),
            'role' => $this->request->getPost('role'),
            'dates' => $this->request->getPost('dates'),
            'description' => $this->request->getPost('description'),
        ];

        $id = $this->extraModel->insert($data);
        return $this->response->setJSON(['status' => $id ? 'success' : 'error', 'id' => $id]);
    }

    public function update($id)
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $data = [
            'user_id'      => 1,
            'title' => $this->request->getPost('title'),
            'role' => $this->request->getPost('role'),
            'dates' => $this->request->getPost('dates'),
            'description' => $this->request->getPost('description'),
        ];

        $ok = $this->extraModel->update($id, $data);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }

    public function delete()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $id = $this->request->getPost('id');
        $ok = $this->extraModel->delete($id);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }
}
