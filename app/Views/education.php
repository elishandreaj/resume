<div class="card" id="education-card" style="border-radius: 14px;">
  <header class="card-header">
    <p class="card-header-title is-size-5">EDUCATION</p>
    <button class="button is-medium" onclick="openAddEducationModal()" style="border: none;">
      <span class="icon is-small"><img src="/assets/img/add.png" alt="Add" style="height: 1.2em;"></span>
    </button>
  </header>
  <div class="card-content" style="padding-top: 1.5rem;">
    <div class="timeline">
      <div class="item" onclick="openEditEducationModal(0)">
        <span class="timeline-dot color-1"></span>
        <div class="school-logo-badge">
          <img src="/assets/img/upv.png" alt="UPV" class="school-logo">
        </div>
        <div class="education-details">
          <div class="education-row">
            <span class="school-name">University of the Philippines</span>
            <span class="education-dates">2022 - 2026</span>
            <button class="button is-small is-white expand-btn" onclick="toggleEducationDetails(event, this)">▼</button>
          </div>
          <div class="education-details-content">
            <div class="degree-program">BS in Computer Science</div>
          </div>
        </div>
      </div>
      <div class="item" onclick="openEditEducationModal(1)">
        <span class="timeline-dot color-2"></span>
        <div class="school-logo-badge">
          <img src="/assets/img/nohs.png" alt="NOHS" class="school-logo">
        </div>
        <div class="education-details">
          <div class="education-row">
            <span class="school-name">Negros Occidental High School</span>
            <span class="education-dates">2020 - 2022</span>
            <button class="button is-small is-white expand-btn" onclick="toggleEducationDetails(event, this)">▼</button>
          </div>
          <div class="education-details-content">
            <div class="degree-program">Senior High School: Science, Technology, Engineering, and Mathematics (STEM)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="educationModal" class="modal">
  <div class="modal-background" onclick="closeEducationModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" id="educationModalTitle">Edit Education</p>
        <button class="delete" aria-label="close" onclick="closeEducationModal()"></button>
      </header>
    <div class="modal-card-body">
      <form id="educationForm" onsubmit="saveEducation(event)">
        <div class="school-logo-upload">
          <img id="schoolLogoPreview" src="/assets/img/profile.png" alt="School Logo" class="profile-pic">
          <label class="educ-add-icon" for="schoolLogoInput">
            <img src="/assets/img/cam.png" alt="Add Icon">
          </label>
          <input type="file" id="schoolLogoInput" class="file-input" accept="image/*">
        </div>
        <div class="field">
          <label class="label">School Name:</label>
            <div class="control">
              <input class="input" type="text" id="schoolName" required>
            </div>
        </div>
        <div class="field">
          <label class="label">Degree/Program:</label>
            <div class="control">
              <input class="input" type="text" id="degreeProgram" required>
            </div>
        </div>
        <div class="field">
          <label class="label">Start Date:</label>
            <div class="control">
              <input class="input" type="text" id="startDate" required>
            </div>
        </div>
        <div class="field">
          <label class="label">End Date/Expected End Date:</label>
            <div class="control">
              <input class="input" type="text" id="endDate" required>
            </div>
        </div>
       <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
      </form>
    </div>
  </div>
</div>