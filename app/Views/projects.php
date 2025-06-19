<div class="card" id="projects-card">
        <header class="card-header">
            <p class="card-header-title is-size-5">UNIVERSITY PROJECTS</p>
                <button class="button is-medium" onclick="openAddProjectModal()" style="border: none;">
                    <span class="icon is-small"><img src="/assets/img/add.png" alt="Add" style="height: 1.2em;"></span>
                </button>
        </header>
        <div class="project-list-horizontal">
            <div class="project-item" onclick="openEditProjectModal(0)">
                <img class="project-img" src="<?= $project['img'] ?? '/assets/img/profile.png' ?>" alt="Project Image">
                <p class="project-title mt-2 has-text-weight-bold">VITAL VANTAGE</p>
                <p class="project-role is-size-10"><em>Back-End Developer</em></p>
                    <p class="project-dates is-size-7">August 2024 - December 2024</p>
                    <ul class="project-desc is-size-7 mt-2">
                        <li>Developed Vital Vantage, a healthcare assistant web app ation that allows users manage appointments, medical records, 
certificates, and personalized care plans</li>
                        <li>Built and managed using Firebase...</li>
                    </ul>
                </div>
            <div class="project-item" onclick="openEditProjectModal(1)">
                <img class="project-img" src="<?= $project['img'] ?? '/assets/img/profile.png' ?>" alt="Project Image">
                <p class="project-title mt-2 has-text-weight-bold">VITAL VANTAGE</p>
                <p class="project-role"><em>Back-End Developer</em></p>
                    <p class="project-dates is-size-7">August 2024 - December 2024</p>
                    <ul class="project-desc is-size-7 mt-2">
                        <li>Developed Vital Vantage, a healthcare assistant web app ation that allows users manage appointments, medical records, 
certificates, and personalized care plans</li>
                        <li>Built and managed using Firebase...</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="projectsModal" class="modal">
    <div class="modal-background" onclick="closeProjectsModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" id="projectsModalTitle">Edit Project</p>
        <button class="delete" aria-label="close" onclick="closeProjectsModal()"></button>
      </header>
      <div class="modal-card-body">
        <form id="projectForm" onsubmit="saveProject(event)">
            <div class="school-logo-upload">
                <img id="projectImgPreview" src="/assets/img/profile.png" alt="Project Image" class="profile-pic">
                <label class="educ-add-icon" for="projectImgInput">
                    <img src="/assets/img/cam.png" alt="Add Icon">
                </label>
                <input type="file" id="projectImgInput" class="file-input" accept="image/*" onchange="previewProjectImg(event)">
            </div>
            <div class="field">
            <label class="label">Title:</label>
                <div class="control">
                <input class="input" type="text" id="projectTitle" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Dates:</label>
                <div class="control">
                <input class="input" type="text" id="projectDates" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Role:</label>
                <div class="control">
                <input class="input" type="text" id="projectRole" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Description:</label>
                <div class="control">
                <input class="input" type="text" id="projectDesc" required>
                </div>
            </div>
            <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
        </form>
        </div>
    </div>
</div>