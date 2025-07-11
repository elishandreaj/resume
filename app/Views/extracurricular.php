<div class="card" id="extra-card" style="max-width: 95%;">
    <header class="card-header">
            <p class="card-header-title is-size-5">EXTRACURRICULAR ACTIVITY</p>
                <button class="button is-medium" onclick="openAddExtraModal()" style="border: none;">
                    <span class="icon is-small"><img src="/assets/img/add.png" alt="Add" style="height: 1.2em;"></span>
                </button>
        </header>
        <div class="card-content" style="padding-top: 1.5rem;">
            <div class="content">
            </div>
        </div>
    </div>
</div>


<div id="extraModal" class="modal">
    <div class="modal-background" onclick="closeExtraModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" id="extraModalTitle">Edit Extracurricular Activity</p>
        <button class="delete" aria-label="close" onclick="closeExtraModal()"></button>
      </header>
      <div class="modal-card-body">
        <form id="extraForm" onsubmit="saveExtra(event)">
            <input type="hidden" id="extratId">
            <div class="field">
            <label class="label">Title:</label>
                <div class="control">
                <input class="input" type="text" id="extraTitle" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Dates:</label>
                <div class="control">
                <input class="input" type="text" id="extraDates" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Role:</label>
                <div class="control">
                <input class="input" type="text" id="extraRole" required>
                </div>
            </div>
            <div class="field">
            <label class="label">Description:</label>
                <div class="control">
                <input class="input" type="text" id="extraDesc" required>
                </div>
            </div>
            <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
        </form>
        </div>
    </div>
</div>