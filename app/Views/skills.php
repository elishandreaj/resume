<div class="card" id="skills-card" style="border-radius: 8px;">
  <header class="card-header">
    <p class="card-header-title is-size-5">SKILLS</p>
  </header>
  <div class="card-content">
    <div class="columns">
      <!-- Technical Skills -->
      <div class="column">
        <div class="is-flex is-align-items-center mb-2">
          <span class="has-text-weight-semibold mr-2">Technical Skills</span>
          <button class="button is-small is-link is-rounded" id="toggle-technical-btn" onclick="toggleAddSkillInput('technical')">
            <span style="font-size: 1.5em; line-height: 1;">+</span>
          </button>
        </div>
        <div id="add-technical-skill" class="add-skill-input mb-2" style="display: none;">
          <input class="input is-small mr-2" type="text" id="newTechnicalSkill" placeholder="Add skill...">
          <button class="button is-link is-small" onclick="addSkill('technical')" style="border-radius: 10px;">Add</button>
        </div>
        <ul id="technical-skills-list" class="mb-6"></ul>
      </div>

      <!-- Programming Languages Column -->
      <div class="column">
        <div class="is-flex is-align-items-center mb-2">
          <span class="has-text-weight-semibold mr-2">Programming Languages</span>
          <button class="button is-small is-link is-rounded" id="toggle-programming-btn" onclick="toggleAddSkillInput('programming')">
            <span style="font-size: 1.5em; line-height: 1;">+</span>
          </button>
        </div>
        <div id="add-programming-skill" class="add-skill-input mb-2" style="display: none;">
          <input class="input is-small mr-2" type="text" id="newProgrammingSkill" placeholder="Add language...">
          <button class="button is-link is-small" onclick="addSkill('programming')" style="border-radius: 10px;">Add</button>
        </div>
        <ul id="programming-skills-list" class="mb-6"></ul>
      </div>
    </div>
  </div>
</div>