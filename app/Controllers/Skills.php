<?php
namespace App\Controllers;

use App\Models\UserModel;
use App\Models\SkillModel;

class Skills extends BaseController
{
    protected $skillModel;

    public function __construct() {
        $this->skillModel = new SkillModel();
    }

    public function index()
    {
        $userId = session()->get('user_id');

        $user   = (new UserModel())->find($userId);
        $skills = $this->skillModel->where('user_id', $userId)->findAll();

        return view('skill', [
            'user'   => $user,
            'skills' => $skills,
        ]);
    }

    public function add()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        try {
            $data = [
                'user_id'    => 1,
                'skill_type' => $this->request->getPost('skill_type'),
                'skill_name' => $this->request->getPost('skill_name'),
            ];

            $id = $this->skillModel->insert($data);

            return $this->response->setJSON([
                'status' => $id ? 'success' : 'error',
                'id'     => $id,
            ]);
        } catch (\Throwable $e) {
            return $this->response->setJSON(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function delete()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $id = $this->request->getPost('id');
        $ok = $this->skillModel->delete($id);
        return $this->response
            ->setJSON(['status' => $ok ? 'success' : 'error']);
    }

    public function list()
    {
        if (!$this->request->isAJAX()) return redirect()->back();

        $skills = $this->skillModel->findAll();
        return $this->response->setJSON($skills);
    }
}