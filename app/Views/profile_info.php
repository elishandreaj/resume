<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <div class="section box has-background-white-ter">
        <div class="profile-banner">
            <button class="button is-light is-rounded fab-edit-btn" onclick="openModal()">
                <span class="icon">
                    <img src="/assets/img/edit.png" alt="Edit" class="edit-icon-img">
                </span>
            </button>
        </div>
        <div class="profile-container has-text-centered">
            <figure class="image is-128x128 is-inline-block">
                <img src="/assets/img/profile.png" alt="Profile Picture" class="profile-pic" id="profilePic">
                <label class="add-icon" for="fileInput">
                    <img src="/assets/img/cam.png" alt="Add Icon">
                </label>
                <input type="file" id="fileInput" class="file-input" accept="image/*" onchange="previewImage(event)">
            </figure>
        </div>
        <div class="profile-header-outer is-flex is-justify-content-center is-align-items-center mt-3">
            <h2 id="profileName" class="title is-3 mb-0">ELISHA ANDREA G. JIMENEA</h2>
        </div>
        <div class="profile-info has-text-centered mt-2">
            <div id="profileDesc" class="subtitle is-12 profile-desc mb-2">Student at the University of the Philippines Visayas</div>
            <div class="profile-contact-inline is-flex is-justify-content-center is-align-items-center mb-2">
                <span id="profileEmail" class="contact-detail mr-2">elisha@gmail.com</span>
                <span class="contact-separator mx-2">|</span>
                <span id="profilePhone" class="contact-detail ml-2">09272765999</span>
            </div>
        </div>
    </div>

    <div id="editModal" class="modal">
        <div class="modal-background" onclick="closeModal()"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit Profile</p>
                <button class="delete" aria-label="close" onclick="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <form id="editForm" onsubmit="saveProfile(event)">
                    <div class="field">
                        <label class="label">Name:</label>
                        <div class="control">
                            <input class="input" type="text" id="editName" required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description:</label>
                        <div class="control">
                            <input class="input" type="text" id="editDesc" required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email:</label>
                        <div class="control">
                            <input class="input" type="email" id="editEmail" required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Contact Number:</label>
                        <div class="control">
                            <input class="input" type="text" id="editPhone" required>
                        </div>
                    </div>
                    <button type="submit" class="button is-link is-fullwidth mt-4">Save</button>
                </form>
            </section>
        </div>
    </div>
</body>