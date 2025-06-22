<div class="card" id="education-card" style="border-radius: 14px;">
  <header class="card-header">
    <p class="card-header-title is-size-5">EDUCATION</p>
    <button class="button is-medium" onclick="openAddEducationModal()" style="border: none;">
      <span class="icon is-small"><img src="<?= base_url('assets/img/add.png') ?>" style="height:1.2em;"></span>
    </button>
  </header>
  <div class="card-content">
    <div class="timeline">
      <?php if (!empty($education)): ?>
        <?php foreach ($education as $index => $edu): ?>
          <div class="item" onclick="openEditEducationModal(<?= $index ?>)" data-eduid="<?= $edu['id'] ?>">
            <span class="timeline-dot color-<?= ($index % 5) + 1 ?>"></span>
            <div class="school-logo-badge">
              <img
                src="<?= $edu['school_logo']
                          ? base_url($edu['school_logo'])
                          : base_url('assets/img/profile.png') ?>"
                alt="School Logo"
                class="school-logo"
              >
            </div>
            <div class="education-details">
              <div class="education-row">
                <span class="school-name"><?= esc($edu['school_name']) ?></span>
                  <span class="education-dates"
                      data-start="<?= esc($edu['start_date']) ?>"
                      data-end="<?= esc($edu['end_date']) ?>">
                  <?= esc($edu['start_date']) ?> – <?= esc($edu['end_date']) ?>
                </span>
                <button class="button is-small is-white expand-btn" onclick="toggleEducationDetails(event, this)">▼</button>
              </div>
              <div class="education-details-content">
                <div class="degree-program"><?= esc($edu['degree_program']) ?></div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      <?php else: ?>
        <p>No education records found.</p>
      <?php endif; ?>
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
      <form
        id="educationForm"
        method="post"
        action="<?= base_url('education/save') ?>"
        enctype="multipart/form-data"
        onsubmit="saveEducation(event)"
      >
        <input type="hidden" name="id" id="eduId">
        <input type="hidden" name="user_id" id="userId" value="<?= esc($user['id']) ?>">

        <div class="school-logo-upload">
          <img
            id="schoolLogoPreview"
            src="<?= base_url('assets/img/profile.png') ?>"
            class="profile-pic"
          />
          <label class="educ-add-icon" for="schoolLogoInput">
            <img src="<?= base_url('assets/img/cam.png') ?>" alt="Add Icon">
          </label>
          <input
            type="file"
            id="schoolLogoInput"
            name="school_logo"
            accept="image/*"
            onchange="previewImage(event, 'schoolLogoPreview')"
            style="display:none"
          >
        </div>

        <div class="field">
          <label class="label">School Name:</label>
          <div class="control">
            <input class="input" type="text" id="schoolName" name="school_name" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Degree/Program:</label>
          <div class="control">
            <input class="input" type="text" id="degreeProgram" name="degree_program" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Dates:</label>
          <div class="control">
            <input class="input" type="text" id="startDate" name="start_date" required>
          </div>
        </div>
        <div class="field">
          <label class="label">End Date/Expected End Date:</label>
          <div class="control">
            <input class="input" type="text" id="endDate" name="end_date" required>
          </div>
        </div>

        <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
      </form>
    </div>
  </div>
</div>