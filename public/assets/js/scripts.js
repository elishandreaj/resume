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

// --- Skills Section Dynamic List ---
let editMode = null;
let showAllTechnical = false;
let showAllProgramming = false;

function renderSkills() {
    // Technical
    const techList = document.getElementById('technical-skills-list');
    techList.innerHTML = '';
    const techLimit = 3;
    const techSkillsToShow = showAllTechnical ? technicalSkills.length : techLimit;
    technicalSkills.slice(0, techSkillsToShow).forEach((skill, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${skill}</span>`;
        if (editMode === 'technical') {
            const delBtn = document.createElement('button');
            delBtn.textContent = '✕';
            delBtn.className = 'delete-skill-btn';
            delBtn.onclick = () => { deleteSkill('technical', idx); };
            li.appendChild(delBtn);
        }
        techList.appendChild(li);
    });
    if (technicalSkills.length > techLimit) {
        const showBtn = document.createElement('button');
        showBtn.textContent = showAllTechnical ? 'Show less' : 'Show more';
        showBtn.className = 'show-more-btn';
        showBtn.onclick = () => {
            showAllTechnical = !showAllTechnical;
            renderSkills();
        };
        const li = document.createElement('li');
        li.style.listStyle = 'none';
        li.appendChild(showBtn);
        techList.appendChild(li);
    }

    // Programming
    const progList = document.getElementById('programming-skills-list');
    progList.innerHTML = '';
    const progLimit = 3;
    const progSkillsToShow = showAllProgramming ? programmingSkills.length : progLimit;
    programmingSkills.slice(0, progSkillsToShow).forEach((skill, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${skill}</span>`;
        if (editMode === 'programming') {
            const delBtn = document.createElement('button');
            delBtn.textContent = '✕';
            delBtn.className = 'delete-skill-btn';
            delBtn.onclick = () => { deleteSkill('programming', idx); };
            li.appendChild(delBtn);
        }
        progList.appendChild(li);
    });
    if (programmingSkills.length > progLimit) {
        const showBtn = document.createElement('button');
        showBtn.textContent = showAllProgramming ? 'Show less' : 'Show more';
        showBtn.className = 'show-more-btn';
        showBtn.onclick = () => {
            showAllProgramming = !showAllProgramming;
            renderSkills();
        };
        const li = document.createElement('li');
        li.style.listStyle = 'none';
        li.appendChild(showBtn);
        progList.appendChild(li);
    }

    matchSkillsCardHeight(); 
}

function toggleAddSkillInput(type) {
    const techInput = document.getElementById('add-technical-skill');
    const progInput = document.getElementById('add-programming-skill');
    const techIcon = document.getElementById('icon-technical');
    const progIcon = document.getElementById('icon-programming');

    if(type === 'technical') {
        if (editMode === 'technical') {
            techInput.style.display = 'none';
            techIcon.textContent = '+';
            editMode = null;
        } else {
            techInput.style.display = 'flex'; 
            progInput.style.display = 'none';
            techIcon.textContent = '✕';
            progIcon.textContent = '+';
            editMode = 'technical';
            document.getElementById('newTechnicalSkill').focus();
        }
    } else {
        if (editMode === 'programming') {
            progInput.style.display = 'none';
            progIcon.textContent = '+';
            editMode = null;
        } else {
            progInput.style.display = 'flex'; 
            techInput.style.display = 'none';
            progIcon.textContent = '✕';
            techIcon.textContent = '+';
            editMode = 'programming';
            document.getElementById('newProgrammingSkill').focus();
        }
    }
    renderSkills();
}

function addSkill(type) {
    const inputId = type === 'technical' ? 'newTechnicalSkill' : 'newProgrammingSkill';
    const val = document.getElementById(inputId).value.trim();
    if (!val) return;

    if (type === 'technical') {
        technicalSkills.push(val);
        document.getElementById(inputId).value = '';
    } else {
        programmingSkills.push(val);
        document.getElementById(inputId).value = '';
    }
    renderSkills();

    saveSkill();
}

function saveSkill() {
    const payload = {
        technical: technicalSkills,
        programming: programmingSkills
    };

    fetch(`${BASE_URL}/skills/save`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        if (res.status !== 'success') {
        alert('Failed to save skills.');
        }
    })
    .catch(console.error);
}


function deleteSkill(type, idx) {
    if(type === 'technical') {
        technicalSkills.splice(idx, 1);
    } else {
        programmingSkills.splice(idx, 1);
    }
    renderSkills();
}

// Dynamic height sync
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

// EMPLOYMENT
let editingEmploymentIndex = null;

function openAddEmploymentModal() {
    editingEmploymentIndex = null;
    document.getElementById('employmentModalTitle').textContent = 'Add Employment';
    resetForm('employmentForm');
    toggleModal('employmentModal', true);
}

function openEditEmploymentModal(index) {
    editingEmploymentIndex = index;
    const item = document.querySelectorAll('#employment-card .timeline .item')[index];
    if (!item) return;

    document.getElementById('employmentModalTitle').textContent = 'Edit Employment';
    document.getElementById('employmentCompany').value = item.querySelector('.employment-company')?.textContent || '';
    document.getElementById('employmentTitle').value = item.querySelector('.employment-title')?.textContent || '';

    const [start, end] = item.querySelector('.employment-dates')?.textContent.split('-') || [];
    document.getElementById('employmentStart').value = start?.trim() || '';
    document.getElementById('employmentEnd').value = end?.trim() || '';

    document.getElementById('employmentDesc').value = Array.from(item.querySelectorAll('.employment-desc li')).map(li => li.textContent).join('\n');
    toggleModal('employmentModal', true);
}

function closeEmploymentModal() {
    toggleModal('employmentModal', false);
}

// PROJECT
let editingProjectIndex = null;

function openAddProjectModal() {
    editingProjectIndex = null;
    document.getElementById('projectsModalTitle').textContent = 'Add Project';
    resetForm('projectForm', 'projectImgPreview');
    toggleModal('projectsModal', true);
}

function openEditProjectModal(index) {
    editingProjectIndex = index;
    const item = document.querySelectorAll('.project-item')[index];
    if (!item) return;

    document.getElementById('projectsModalTitle').textContent = 'Edit Project';
    document.getElementById('projectTitle').value = item.querySelector('.project-title')?.textContent || '';
    document.getElementById('projectDates').value = item.querySelector('.project-dates')?.textContent || '';
    document.getElementById('projectRole').value = item.querySelector('.project-role')?.textContent || '';
    document.getElementById('projectDesc').value = Array.from(item.querySelectorAll('.project-desc li')).map(li => li.textContent).join('\n');

    const img = item.querySelector('.project-img');
    document.getElementById('projectImgPreview').src = img?.src || BASE_URL + 'assets/img/profile.png';
    toggleModal('projectsModal', true);
}

function closeProjectsModal() {
    toggleModal('projectsModal', false);
}


// EXTRACURRICULAR 
let editingExtraIndex = null;

function openAddExtraModal() {
    editingExtraIndex = null;
    document.getElementById('extraModalTitle').textContent = 'Add Extracurricular Activity';
    resetForm('extraForm');
    toggleModal('extraModal', true);
}

function openEditExtraModal(index) {
    editingExtraIndex = index;
    const item = document.querySelectorAll('.extra-item')[index];
    if (!item) return;

    document.getElementById('extraModalTitle').textContent = 'Edit Extracurricular Activity';
    document.getElementById('extraTitle').value = item.querySelector('.extra-title')?.textContent || '';
    document.getElementById('extraDates').value = item.querySelector('.extra-dates')?.textContent || '';
    document.getElementById('extraRole').value = item.querySelector('.extra-role')?.textContent || '';
    document.getElementById('extraDesc').value = Array.from(item.querySelectorAll('.extra-desc li')).map(li => li.textContent).join('\n');

    toggleModal('extraModal', true);
}

function closeExtraModal() {
    toggleModal('extraModal', false);
}