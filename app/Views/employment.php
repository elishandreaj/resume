    <div class="card" id="employment-card" style="border-radius: 14px; max-width: 1175px; margin-top: 20px;">
        <header class="card-header">
            <p class="card-header-title is-size-5">EMPLOYMENT HISTORY</p>
                <button class="button is-medium" onclick="openAddEmploymentModal()" style="border: none;">
                    <span class="icon is-small"><img src="/assets/img/add.png" alt="Add" style="height: 1.2em;"></span>
                </button>
        </header>
        <div class="card-content" style="padding-top: 1.5rem;">
            <div class="timeline">
                <div class="item" onclick="openEditEmploymentModal(0)">
                    <span class="timeline-dot color-1"></span>
                    <div class="employment-details">
                        <div class="employment-row">
                            <span class="employment-company">Borcelle Studio</span>
                            <span class="employment-dates">2030 - PRESENT</span>
                        </div>
                        <div class="employment-title">Marketing Manager & Specialist</div>
                        <ul class="employment-desc">
                            <li>Develop and execute comprehensive marketing strategies and campaigns that align with the company's goals and objectives.</li>
                            <li>Lead, mentor, and manage a high-performing marketing team, fostering a collaborative and results-driven work environment.</li>
                            <li>Monitor brand consistency across marketing channels and materials.</li>
                        </ul>
                    </div>
                </div>
                <div class="item" onclick="openEditEmploymentModal(1)">
                    <span class="timeline-dot color-2"></span>
                    <div class="employment-details">
                        <div class="employment-row">
                            <span class="employment-company">Fauget Studio</span>
                            <span class="employment-dates">2025 - 2029</span>
                        </div>
                        <div class="employment-title">Marketing Manager & Specialist</div>
                        <ul class="employment-desc">
                            <li>Create and manage the marketing budget, ensuring efficient allocation of resources and optimizing ROI.</li>
                            <li>Oversee market research to identify emerging trends, customer needs, and competitor strategies.</li>
                            <li>Monitor brand consistency across marketing channels and materials.</li>
                        </ul>
                    </div>
                </div>
                <div class="item" onclick="openEditEmploymentModal(2)">
                    <span class="timeline-dot color-3"></span>
                    <div class="employment-details">
                        <div class="employment-row">
                            <span class="employment-company">Studio Shodwe</span>
                            <span class="employment-dates">2024 - 2025</span>
                        </div>
                        <div class="employment-title">Marketing Manager & Specialist</div>
                        <ul class="employment-desc">
                            <li>Develop and maintain strong relationships with partners, agencies, and vendors to support marketing initiatives.</li>
                            <li>Monitor and maintain brand consistency across all marketing channels and materials.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div id="employmentModal" class="modal">
    <div class="modal-background" onclick="closeEmploymentModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" id="employmentModalTitle">Edit Employment</p>
        <button class="delete" aria-label="close" onclick="closeEmploymentModal()"></button>
      </header>
    <div class="modal-card-body">
      <form id="employmentForm" onsubmit="saveEmployment(event)">
        <div class="field">
          <label class="label">Company:</label>
            <div class="control">
              <input class="input" type="text" id="employmentCompany" required>
            </div>
        </div>
        <div class="field">
          <label class="label">Title:</label>
            <div class="control">
              <input class="input" type="text" id="employmentTitle" required>
            </div>
        </div>
        <div class="field">
          <label class="label">Start Date:</label>
            <div class="control">
              <input class="input" type="text" id="employmentStart" required>
            </div>
        </div>
        <div class="field">
          <label class="label">End Date/Expected End Date:</label>
            <div class="control">
              <input class="input" type="text" id="employmentEnd" required>
            </div>
        </div>
        <div class="field">
          <label class="label">Description:</label>
            <div class="control">
              <input class="input" type="text" id="employmentDesc" required>
            </div>
        </div>
       <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
      </form>
    </div>
  </div>
</div>