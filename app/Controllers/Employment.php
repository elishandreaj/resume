<?php

namespace App\Controllers;

use App\Models\EmploymentModel;

class Employment extends BaseController
{
    protected $employmentModel;

    public function __construct()
    {
        $this->employmentModel = new EmploymentModel();
    }

    public function list()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $employments = $this->employmentModel->orderBy('start_date', 'DESC')->findAll();
        return $this->response->setJSON($employments);
    }

    public function add()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $data = [
            'user_id'      => 1,
            'company_name' => $this->request->getPost('company_name'),
            'job_title'    => $this->request->getPost('job_title'),
            'start_date'   => $this->request->getPost('start_date'),
            'end_date'     => $this->request->getPost('end_date'),
            'description'  => $this->request->getPost('description'),
        ];

        $id = $this->employmentModel->insert($data);
        return $this->response->setJSON(['status' => $id ? 'success' : 'error', 'id' => $id]);
    }

    public function update($id)
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $data = [
            'company_name' => $this->request->getPost('company_name'),
            'job_title'    => $this->request->getPost('job_title'),
            'start_date'   => $this->request->getPost('start_date'),
            'end_date'     => $this->request->getPost('end_date'),
            'description'  => $this->request->getPost('description'),
        ];

        $ok = $this->employmentModel->update($id, $data);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }

    public function delete()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $id = $this->request->getPost('id');
        $ok = $this->employmentModel->delete($id);
        return $this->response->setJSON(['status' => $ok ? 'success' : 'error']);
    }
}