<?php
namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;
use App\Models\SkillModel;

class Skills extends BaseController
{
    public function education()
    {
        $userModel      = new UserModel();
        $skillModel     = new SkillModel();

        $user      = $userModel->find(session()->get('user_id'));
        $skills    = $skillModel
                        ->where('user_id', $user['id'])
                        ->findAll();

        return view('skill', [
            'user'      => $user,
            'skill'     => $skills
        ]);
    }

    public function save()
    {
        if (!$this->request->isAJAX()) return;

        $model = new SkillModel();
        $userId = session()->get('user_id');
        $skill_type = $this->request->getPost('skill_type');
        $skill_name = $this->request->getPost('skill_name');

        if (empty($skill_type) || !in_array($skill_type, ['technical','programming'])) {
            return $this->response->setJSON(['status' => 'error']);
        }

        $model->where('user_id', $userId)
              ->where('skill_type', $type)
              ->delete();

        foreach ($skill_name as $name) {
            if (trim($name)){
                $model->insert([
                    'user_id'    => $userId,
                    'skill_type' => $skill_type,
                    'skill_name' => trim($skill_name),
                ]);
            }
        }
        return $this->response->setJSON(['status' => 'success']);
    }
}
