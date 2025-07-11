<div class="card" id="employment-card" style="border-radius: 14px; max-width: 95%; margin-top: 20px;">
    <header class="card-header">
        <p class="card-header-title is-size-5">EMPLOYMENT HISTORY</p>
        <button class="button is-medium" onclick="openAddEmploymentModal()" style="border: none;">
            <span class="icon is-small">
                <img src="/assets/img/add.png" alt="Add" style="height: 1.2em;">
            </span>
        </button>
    </header>
    <div class="card-content" style="padding-top: 1.5rem; padding-right: 3rem;">
        <div class="timeline" id="employment-timeline">
        </div>
    </div>
</div>

<div id="employmentModal" class="modal">
    <div class="modal-background" onclick="closeEmploymentModal()"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title" id="employmentModalTitle">Add Employment</p>
            <button class="delete" aria-label="close" onclick="closeEmploymentModal()"></button>
        </header>
        <div class="modal-card-body">
            <form id="employmentForm" onsubmit="saveEmployment(event)">
                <input type="hidden" id="employmentId">

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
                        <textarea class="textarea" id="employmentDesc" required></textarea>
                    </div>
                </div>

                <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
            </form>
        </div>
    </div>
</div>