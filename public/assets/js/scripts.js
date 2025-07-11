const technicalSkills = (skillsData || [])
  .filter(s => s.skill_type === 'technical')
  .map(s => s.skill_name);

const programmingSkills = (skillsData || [])
  .filter(s => s.skill_type === 'programming')
  .map(s => s.skill_name);

// GENERAL
function previewImage(event, previewId) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById(previewId).src = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}

function toggleModal(modalId, show = true) {
    document.getElementById(modalId).style.display = show ? 'flex' : 'none';
}

function resetForm(formId, imagePreviewId, defaultImage = BASE_URL + 'assets/img/profile.png') {
    document.getElementById(formId).reset();
    if (imagePreviewId) {
        document.getElementById(imagePreviewId).src = defaultImage;
    }
}

function matchSkillsCardHeight() {
    const edu = document.getElementById('education-card');
    const skills = document.getElementById('skills-card');
    if (edu && skills) {
        skills.style.height = 'auto';
        edu.style.height = 'auto';
        const maxHeight = Math.max(edu.offsetHeight, skills.offsetHeight);
        edu.style.height = maxHeight + 'px';
        skills.style.height = maxHeight + 'px';
    }
}

window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const educationModal = document.getElementById('educationModal');
    if (editModal && event.target === editModal) {
        closeModal();
    }
    if (educationModal && event.target === educationModal) {
        closeEducationModal();
    }
}

window.addEventListener('DOMContentLoaded', function() {
    renderSkills();
    matchSkillsCardHeight();
});
window.addEventListener('resize', matchSkillsCardHeight);

function toggleEducationDetails(event, el) {
    event.stopPropagation();
    el.closest('.item')?.classList.toggle('collapsed');
}

window.addEventListener('DOMContentLoaded', () => {
    const logoInput = document.getElementById('schoolLogoInput');
    logoInput?.addEventListener('change', event => previewImage(event, 'schoolLogoPreview'));

    document.getElementById('fileInput').addEventListener('change', event => {
    previewImage(event, 'profilePic');
    });

    renderSkills();
    matchSkillsCardHeight();
});

window.addEventListener('resize', matchSkillsCardHeight);

// PROFILE 
function openModal() {
    toggleModal('editModal', true);
    ['Name', 'Desc', 'Email', 'Phone'].forEach(field => {
        document.getElementById(`edit${field}`).value = document.getElementById(`profile${field}`).textContent;
    });
}

function closeModal() {
    toggleModal('editModal', false);
}

function saveProfile(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('id', document.getElementById('userId').value);
    fd.append('name', document.getElementById('editName').value);
    fd.append('description', document.getElementById('editDesc').value);
    fd.append('email', document.getElementById('editEmail').value);
    fd.append('phone', document.getElementById('editPhone').value);

    const file = document.getElementById('fileInput').files[0];
    if (file) fd.append('profile_pic', file);

    fetch(BASE_URL + '/profile/update', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: fd
    })
    .then(res => res.json())
    .then(result => {
        if (result.status === 'success') {
            document.getElementById('profileName').textContent = fd.get('name');
            document.getElementById('profileDesc').textContent = fd.get('description');
            document.getElementById('profileEmail').textContent = fd.get('email');
            document.getElementById('profilePhone').textContent = fd.get('phone');
        if (result.profile_pic) {
            document.getElementById('profilePic').src = result.profile_pic;
        }
        closeModal();
        } else {
        alert('Failed to update profile');
        }
    })
    .catch(err => {
        console.error(err);
        alert('An error occurred while updating profile');
    });
}

// EDUCATION 
let editingEducationIndex = null;

function openAddEducationModal() {
    editingEducationIndex = null;
    document.getElementById('educationModalTitle').textContent = 'Add Additional Education';
    resetForm('educationForm', 'schoolLogoPreview');
    toggleModal('educationModal', true);
}

function openEditEducationModal(index) {
  editingEducationIndex = index;
  const item = document.querySelectorAll('.item')[index];
  editingSchoolId = item.dataset.eduid; 

  document.getElementById('eduId').value = editingSchoolId;
  document.getElementById('schoolName').value = item.querySelector('.school-name').textContent;
  document.getElementById('degreeProgram').value = item.querySelector('.degree-program').textContent;

  const datesEl = item.querySelector('.education-dates');
  document.getElementById('startDate').value = item.querySelector('.education-dates').dataset.start;
  document.getElementById('endDate').value = item.querySelector('.education-dates').dataset.end;

  document.getElementById('schoolLogoPreview').src = item.querySelector('.school-logo').src || BASE_URL + 'assets/img/profile.png';
  toggleModal('educationModal', true);
}

function closeEducationModal() {
    toggleModal('educationModal', false);
}

function saveEducation(event) {
    event.preventDefault();
    const fd = new FormData();
    
    fd.append('user_id', document.getElementById('userId').value);

    if (editingEducationIndex !== null) {
        fd.append('id', editingSchoolId);
    }

    fd.append('school_name', document.getElementById('schoolName').value);
    fd.append('degree_program', document.getElementById('degreeProgram').value);
    fd.append('start_date', document.getElementById('startDate').value);
    fd.append('end_date', document.getElementById('endDate').value);

    const file = document.getElementById('schoolLogoInput').files[0];
    if (file) fd.append('school_logo', file);

    fetch(BASE_URL + '/education/save', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: fd
    })
    .then(res => res.json())
    .then(res => {
    if (res.status === 'success') {
        const edu = res.education;
        if (res.action === 'updated') {
            const item = document.querySelectorAll('.item')[editingEducationIndex];
            item.querySelector('.school-logo').src = edu.school_logo;
            item.querySelector('.school-name').textContent = edu.school_name;
            item.querySelector('.degree-program').textContent = edu.degree_program;
            item.querySelector('.education-dates').textContent = `${edu.start_date} - ${edu.end_date}`;
        } else {
            const list = document.querySelector('.education-list');
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.onclick = () => openEditEducationModal(list.children.length);
            newItem.innerHTML = `
                <img src="${edu.school_logo}" class="school-logo">
                <div class="education-details">
                <div class="school-name">${edu.school_name}</div>
                <div class="degree-program">${edu.degree_program}</div>
                <div class="education-dates">${edu.start_date} - ${edu.end_date}</div>
                </div>
            `;
            list.appendChild(newItem);
        }

        closeEducationModal();

        } else {
        alert('Failed to save education');
        }
    }).catch(console.error);
}

let editMode = null;

function toggleAddSkillInput(type) {
  const techInput = document.getElementById('add-technical-skill');
  const progInput = document.getElementById('add-programming-skill');
  const plus = '+', cross = '✕';

  if (type === 'technical') {
    const show = techInput.style.display === 'none';
    techInput.style.display = show ? 'flex' : 'none';
    document.getElementById('toggle-technical-btn').querySelector('span').textContent = show ? cross : plus;
    progInput.style.display = 'none';
    document.getElementById('toggle-programming-btn').querySelector('span').textContent = plus;
    editMode = show ? 'technical' : null;
  } else {
    const show = progInput.style.display === 'none';
    progInput.style.display = show ? 'flex' : 'none';
    document.getElementById('toggle-programming-btn').querySelector('span').textContent = show ? cross : plus;
    techInput.style.display = 'none';
    document.getElementById('toggle-technical-btn').querySelector('span').textContent = plus;
    editMode = show ? 'programming' : null;
  }

  renderSkills(); // will show delete buttons when in edit mode
}

function renderSkills() {
  fetch(`${BASE_URL}/skills/list`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
    .then(response => response.json())
    .then(skills => {
      const techList = document.getElementById('technical-skills-list');
      const progList = document.getElementById('programming-skills-list');
      techList.innerHTML = '';
      progList.innerHTML = '';

      skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.skill_name;

        if (editMode === skill.skill_type) {
          const delBtn = document.createElement('button');
          delBtn.textContent = '✕';
          delBtn.className = 'delete-skill-btn';
          delBtn.onclick = () => deleteSkill(skill.id);
          li.appendChild(delBtn);
        }

        if (skill.skill_type === 'technical') techList.appendChild(li);
        else if (skill.skill_type === 'programming') progList.appendChild(li);
      });

      matchSkillsCardHeight(); // optional layout adjustment
    })
    .catch(console.error);
}

function addSkill(type) {
  const inputEl = document.getElementById(type === 'technical' ? 'newTechnicalSkill' : 'newProgrammingSkill');
  const value = inputEl.value.trim();
  if (!value) return;

  fetch(`${BASE_URL}/skills/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new URLSearchParams({
      skill_type: type,
      skill_name: value
    })
  })
    .then(r => r.json())
    .then(res => {
      if (res.status !== 'success') return alert('Failed to add skill.');
      inputEl.value = '';
      renderSkills(); // Reload skills from the server
    })
    .catch(console.error);
}

function deleteSkill(id) {
  fetch(`${BASE_URL}/skills/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new URLSearchParams({ id })
  })
    .then(r => r.json())
    .then(res => {
      if (res.status !== 'success') return alert('Failed to delete skill.');
      renderSkills(); // Reload after delete
    })
    .catch(console.error);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
});


// EMPLOYMENT
function loadEmployment() {
  fetch(`${BASE_URL}/employment/list`, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(r => r.json())
    .then(data => renderEmployment(data))
    .catch(console.error);
}

function renderEmployment(employments) {
  const timeline = document.querySelector('.timeline');
  timeline.innerHTML = '';

  employments.forEach(emp => {
    const item = document.createElement('div');
    item.className = 'item';
    item.onclick = () => openEditEmploymentModal(emp);

    item.innerHTML = `
      <span class="timeline-dot color-1"></span>
      <div class="employment-details">
        <div class="employment-row">
          <span class="employment-company">${emp.company_name}</span>
          <span class="employment-dates">${emp.start_date} - ${emp.end_date}</span>
        </div>
        <div class="employment-title">${emp.job_title}</div>
        <ul class="employment-desc">
          <li>${emp.description}</li>
        </ul>
      </div>
    `;
    timeline.appendChild(item);
  });
}

// Example add
function saveEmployment(event) {
  event.preventDefault();

  const id = document.getElementById('employmentId').value;
  const url = id ? `${BASE_URL}/employment/update/${id}` : `${BASE_URL}/employment/add`;

  const formData = new URLSearchParams({
    company_name: document.getElementById('employmentCompany').value,
    job_title: document.getElementById('employmentTitle').value,
    start_date: document.getElementById('employmentStart').value,
    end_date: document.getElementById('employmentEnd').value,
    description: document.getElementById('employmentDesc').value,
  });

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
    body: formData
  })
    .then(r => r.json())
    .then(res => {
      if (res.status !== 'success') return alert('Failed to save employment.');
      closeEmploymentModal();
      loadEmployment();
    })
    .catch(console.error);
}

function openAddEmploymentModal() {
  document.getElementById('employmentForm').reset();
  document.getElementById('employmentId').value = '';
  document.getElementById('employmentModalTitle').textContent = 'Add Employment';
  document.getElementById('employmentModal').classList.add('is-active');
}

function openEditEmploymentModal(emp) {
  document.getElementById('employmentCompany').value = emp.company_name;
  document.getElementById('employmentTitle').value = emp.job_title;
  document.getElementById('employmentStart').value = emp.start_date;
  document.getElementById('employmentEnd').value = emp.end_date;
  document.getElementById('employmentDesc').value = emp.description;
  document.getElementById('employmentId').value = emp.id;
  document.getElementById('employmentModalTitle').textContent = 'Edit Employment';
  document.getElementById('employmentModal').classList.add('is-active');
}

function closeEmploymentModal() {
  document.getElementById('employmentModal').classList.remove('is-active');
}

function loadEmployment() {
    fetch(`${BASE_URL}/employment/list`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(r => r.json())
        .then(data => renderEmploymentTimeline(data))
        .catch(console.error);
}

function renderEmploymentTimeline(employments) {
    const timeline = document.getElementById('employment-timeline');
    timeline.innerHTML = ''; // Clear previous items

    employments.forEach((emp, index) => {
        const colorClass = `color-${(index % 3) + 1}`;

        const item = document.createElement('div');
        item.className = 'item';
        item.onclick = () => openEditEmploymentModal(emp); // Pass the whole object

        item.innerHTML = `
            <span class="timeline-dot ${colorClass}"></span>
            <div class="employment-details">
                <div class="employment-row">
                    <span class="employment-company">${emp.company_name}</span>
                    <span class="employment-dates">${emp.start_date} - ${emp.end_date}</span>
                </div>
                <div class="employment-title">${emp.job_title}</div>
                <ul class="employment-desc">
                    ${emp.description.split('\n').map(line => `<li>${line}</li>`).join('')}
                </ul>
            </div>
        `;

        timeline.appendChild(item);
    });
}

// Call this when your page loads
document.addEventListener('DOMContentLoaded', loadEmployment);

// PROJECT
function loadProjects() {
    fetch(`${BASE_URL}/projects/list`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(r => r.json())
        .then(data => renderProjects(data))
        .catch(console.error);
}

function renderProjects(projects) {
    const list = document.getElementById('project-list');
    list.innerHTML = '';

    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.onclick = () => openEditProjectModal(project);

        item.innerHTML = `
            <img class="project-img" src="${project.image || '/assets/img/profile.png'}" alt="Project Image">
            <p class="project-title mt-2 has-text-weight-bold">${project.title}</p>
            <p class="project-role is-size-10"><em>${project.role}</em></p>
            <p class="project-dates is-size-7">${project.dates}</p>
            <ul class="project-desc is-size-7 mt-2">
                ${project.description.split('\n').map(line => `<li>${line}</li>`).join('')}
            </ul>
        `;
        list.appendChild(item);
    });
}

function saveProject(event) {
    event.preventDefault();

    const id = document.getElementById('projectId').value;
    const url = id ? `${BASE_URL}/project/update/${id}` : `${BASE_URL}/project/add`;

    const form = document.getElementById('projectForm');
    const formData = new FormData(form);
    formData.set('title', document.getElementById('projectTitle').value);
    formData.set('dates', document.getElementById('projectDates').value);
    formData.set('role', document.getElementById('projectRole').value);
    formData.set('description', document.getElementById('projectDesc').value);

    const fileInput = document.getElementById('projectImgInput');
    if (fileInput.files[0]) {
        formData.set('image', fileInput.files[0]);
    }

    fetch(url, {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData
    })
        .then(r => r.json())
        .then(res => {
            if (res.status !== 'success') return alert('Failed to save project.');
            closeProjectsModal();
            loadProjects();
        })
        .catch(console.error);
}

function openEditProjectModal(project) {
    document.getElementById('projectsModalTitle').textContent = 'Edit Project';
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDates').value = project.dates;
    document.getElementById('projectRole').value = project.role;
    document.getElementById('projectDesc').value = project.description;
    document.getElementById('projectImgPreview').src = project.image || '/assets/img/profile.png';
    document.getElementById('projectId').value = project.id;
    toggleModal('projectsModal', true);
}

function closeProjectsModal() {
    toggleModal('projectsModal', false);
}

// On page load
document.addEventListener('DOMContentLoaded', loadProjects);

function loadProjects() {
    fetch(`${BASE_URL}/project/list`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(r => r.json())
        .then(projects => {
            const container = document.querySelector('.project-list-horizontal');
            container.innerHTML = '';

            if (!projects.length) {
                container.innerHTML = '<p>No projects found.</p>';
                return;
            }

            projects.forEach((proj, i) => {
                const item = document.createElement('div');
                item.className = 'project-item';
                item.onclick = () => openEditProjectModal(proj);

                item.innerHTML = `
                    <img class="project-img" src="${proj.image || '/assets/img/profile.png'}" alt="Project Image">
                    <p class="project-title mt-2 has-text-weight-bold">${proj.title}</p>
                    <p class="project-role"><em>${proj.role}</em></p>
                    <p class="project-dates is-size-7">${proj.dates}</p>
                    <ul class="project-desc is-size-7 mt-2">
                        ${proj.description.split('\n').map(d => `<li>${d}</li>`).join('')}
                    </ul>
                `;
                container.appendChild(item);
            });
        })
        .catch(err => console.error('Error loading projects:', err));
}

// Run this on page load
document.addEventListener('DOMContentLoaded', loadProjects);


// EXTRACURRICULAR 

function loadExtra() {
    fetch(BASE_URL + '/extracurricular/list', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(r => r.json())
        .then(data => {
            const container = document.querySelector('.content');
            container.innerHTML = '';

            data.forEach((extra, index) => {
                container.innerHTML += `
                    <div class="extra-item" onclick="openEditExtraModal(${index})">
                        <div class="extra-details">
                            <div class="extra-row">
                                <span class="extra-title">${extra.title}</span>
                                <span class="extra-dates">${extra.dates}</span>
                            </div>
                            <div class="extra-role">${extra.role}</div>
                            <ul class="extra-desc">
                                ${extra.description.split('\n').map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            });
        })
        .catch(console.error);
}

document.addEventListener('DOMContentLoaded', loadExtra);

function saveExtracurricular(event) {
  event.preventDefault();

  const id = document.getElementById('extraId').value;
  const url = id ? `${BASE_URL}/extracurricular/update/${id}` : `${BASE_URL}/extracurricular/add`;

  const formData = new URLSearchParams({
    title: document.getElementById('extraTitle').value,
    dates: document.getElementById('extraDates').value,
    role: document.getElementById('extraRole').value,
    description: document.getElementById('extraDesc').value,
  });

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
    body: formData
  })
    .then(r => r.json())
    .then(res => {
      if (res.status !== 'success') return alert('Failed to save extracurricular.');
      closeExtraModal();
      loadExtra();
    })
    .catch(console.error);
}