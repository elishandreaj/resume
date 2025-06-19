// GENERAL
function previewImage(event, previewId) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById(previewId).src = reader.result;
    reader.readAsDataURL(event.target.files[0]);
}

function toggleModal(modalId, show = true) {
    document.getElementById(modalId).style.display = show ? 'flex' : 'none';
}

function resetForm(formId, imagePreviewId, defaultImage = '/assets/img/profile.png') {
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

function toggleEducationDetails(event, el) {
    event.stopPropagation();
    el.closest('.item')?.classList.toggle('collapsed');
}

window.addEventListener('DOMContentLoaded', () => {
    const logoInput = document.getElementById('schoolLogoInput');
    logoInput?.addEventListener('change', event => previewImage(event, 'schoolLogoPreview'));
    
    renderSkills();
    matchSkillsCardHeight();
});

window.addEventListener('resize', matchSkillsCardHeight);

window.onclick = function(event) {
    ['editModal', 'educationModal'].forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && event.target === modal) toggleModal(modalId, false);
    });
};

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
    ['Name', 'Desc', 'Email', 'Phone'].forEach(field => {
        document.getElementById(`profile${field}`).textContent = document.getElementById(`edit${field}`).value;
    });
    closeModal();
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
    if (!item) return;

    document.getElementById('educationModalTitle').textContent = 'Edit Education';
    document.getElementById('schoolName').value = item.querySelector('.school-name')?.textContent || '';
    document.getElementById('degreeProgram').value = item.querySelector('.degree-program')?.textContent || '';

    const [start, end] = item.querySelector('.education-dates')?.textContent.split('-') || [];
    document.getElementById('startDate').value = start?.trim() || '';
    document.getElementById('endDate').value = end?.trim() || '';

    document.getElementById('schoolLogoPreview').src = item.querySelector('.school-logo')?.src || '/assets/img/profile.png';
    toggleModal('educationModal', true);
}

function closeEducationModal() {
    toggleModal('educationModal', false);
}

function saveEducation(event) {
    event.preventDefault();
    const school = document.getElementById('schoolName').value;
    const degree = document.getElementById('degreeProgram').value;
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;
    const logoSrc = document.getElementById('schoolLogoPreview').src;

    const list = document.querySelector('.education-list');

    if (editingEducationIndex !== null) {
        const item = document.querySelectorAll('.education-item')[editingEducationIndex];
        item.querySelector('.school-name').textContent = school;
        item.querySelector('.degree-program').textContent = degree;
        item.querySelector('.education-dates').textContent = `${start} - ${end}`;
        item.querySelector('.school-logo').src = logoSrc;
    } else {
        const newItem = document.createElement('div');
        newItem.className = 'education-item';
        newItem.onclick = () => openEditEducationModal(list.querySelectorAll('.education-item').length);
        newItem.innerHTML = `
            <img src="${logoSrc}" class="school-logo">
            <div class="education-details">
                <div class="school-name">${school}</div>
                <div class="degree-program">${degree}</div>
                <div class="education-dates">${start} - ${end}</div>
            </div>
        `;
        list.appendChild(newItem);
    }

    closeEducationModal();
}

// --- Skills Section Dynamic List ---
let technicalSkills = ["Web Development", "Database Management", "UI/UX Design", "Version Control (Git)"];
let programmingSkills = ["Python", "JavaScript", "PHP", "Java"];

let editMode = null; // 'technical', 'programming', or null
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

    matchSkillsCardHeight(); // Sync heights after rendering
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
    if(type === 'technical') {
        const val = document.getElementById('newTechnicalSkill').value.trim();
        if(val) {
            technicalSkills.push(val);
            document.getElementById('newTechnicalSkill').value = '';
            renderSkills();
        }
    } else {
        const val = document.getElementById('newProgrammingSkill').value.trim();
        if(val) {
            programmingSkills.push(val);
            document.getElementById('newProgrammingSkill').value = '';
            renderSkills();
        }
    }
}

function deleteSkill(type, idx) {
    if(type === 'technical') {
        technicalSkills.splice(idx, 1);
    } else {
        programmingSkills.splice(idx, 1);
    }
    renderSkills();
}

// --- Dynamic height sync ---
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

// Run on load and resize
window.addEventListener('DOMContentLoaded', function() {
    renderSkills();
    matchSkillsCardHeight();
});
window.addEventListener('resize', matchSkillsCardHeight);

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
    document.getElementById('projectImgPreview').src = img?.src || '/assets/img/profile.png';
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