<div class="card" id="extra-card">
    <header class="card-header">
            <p class="card-header-title is-size-5">EXTRACURRICULAR ACTIVITY</p>
                <button class="button is-medium" onclick="openAddExtraModal()" style="border: none;">
                    <span class="icon is-small"><img src="/assets/img/add.png" alt="Add" style="height: 1.2em;"></span>
                </button>
        </header>
        <div class="card-content" style="padding-top: 1.5rem;">
            <div class="content">

                <div class="extra-item" onclick="openEditExtraModal(0)">
                    <div class="extra-details">
                        <div class="extra-row">
                            <span class="extra-title">VITAL VANTAGE</span>
                            <span class="extra-dates">August 2024 - December 2024</span>
                        </div>
                        <div class="extra-role">Back-End Developer</div>
                        <ul class="extra-desc">
                            <li>Developed Vital Vantage, a healthcare assistant web application that allows users to manage appointments, medical records, certificates, and personalized care plans.</li>
                            <li>Built and managed using Firebase, incorporating Authentication and Firestore to handle data and real-time updates.</li>
                        </ul>
                    </div>
                </div>
                <div class="extra-item" onclick="openEditExtraModal(1)">
                    <div class="extra-details">
                        <div class="extra-row">
                            <span class="extra-title">VITAL VANTAGE</span>
                            <span class="extra-dates">August 2024 - December 2024</span>
                        </div>
                        <div class="extra-role">Back-End Developer</div>
                        <ul class="extra-desc">
                            <li>Developed Vital Vantage, a healthcare assistant web application that allows users to manage appointments, medical records, certificates, and personalized care plans.</li>
                            <li>Built and managed using Firebase, incorporating Authentication and Firestore to handle data and real-time updates.</li>
                        </ul>
                    </div>
                </div>
                <div class="extra-item" onclick="openEditExtraModal(2)">
                    <div class="extra-details">
                        <div class="extra-row">
                            <span class="extra-title">VITAL VANTAGE</span>
                            <span class="extra-dates">August 2024 - December 2024</span>
                        </div>
                        <div class="extra-role">Back-End Developer</div>
                        <ul class="extra-desc">
                            <li>Developed Vital Vantage, a healthcare assistant web application that allows users to manage appointments, medical records, certificates, and personalized care plans.</li>
                            <li>Built and managed using Firebase, incorporating Authentication and Firestore to handle data and real-time updates.</li>
                        </ul>
                    </div>
                </div>
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

<div id="extraModal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeExtraModal()">&times;</span>
        <h3 id="extraModalTitle">Edit Extracurricular Activity</h3>
        <form id="extraForm" onsubmit="saveExtra(event)">
            <label>Title:</label>
            <input type="text" id="extra-title" required><br>
            <label>Dates:</label>
            <input type="text" id="extra-dates" required><br>
            <label>Role:</label>
            <input type="text" id="extra-role" required><br>
            <label>Description:</label>
            <textarea id="extra-desc" rows="3" style="width:100%;margin-top:3px;margin-bottom:8px;border:1px solid #ccc;border-radius:5px;font-size:1em;padding:6px 8px;"></textarea><br>
            <button type="submit" style="margin-top:10px;background:#0073b1;color:#fff;border:none;border-radius:18px;padding:7px 22px;font-size:1em;cursor:pointer;transition:background 0.2s;">Save</button>
        </form>
    </div>
</div>