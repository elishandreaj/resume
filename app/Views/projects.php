<div class="card" id="projects-card" style="max-width: 95%;">
    <header class="card-header">
        <p class="card-header-title is-size-5">UNIVERSITY PROJECTS</p>
        <button class="button is-medium" onclick="openAddProjectModal()" style="border: none;">
            <span class="icon is-small">
                <img src="/assets/img/add.png" alt="Add" style="height: 1.2em;">
            </span>
        </button>
    </header>
    <div class="card-content">
        <div class="project-list-horizontal" id="project-list">
        </div>
    </div>
</div>

<div id="projectsModal" class="modal">
    <div class="modal-background" onclick="closeProjectsModal()"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title" id="projectsModalTitle">Add Project</p>
            <button class="delete" aria-label="close" onclick="closeProjectsModal()"></button>
        </header>
        <div class="modal-card-body">
            <form id="projectForm" onsubmit="saveProject(event)" enctype="multipart/form-data">
                <input type="hidden" id="projectId">

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