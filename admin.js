"use strict";

const $ = selector => document.querySelector(selector);
const curriculum = schoolCurriculum;
const lessonList = curriculum.lessons;
const challengeMap = curriculum.challenges;
const checkpointList = curriculum.checkpoints;
const allCheckpointTaskIds = new Set(
    checkpointList.flatMap(checkpoint => checkpoint.taskIds)
);

const config = window.complingoSupabaseConfig;
const supabaseClient =
    config?.url &&
    config?.publishableKey &&
    window.supabase
        ? window.supabase.createClient(config.url, config.publishableKey)
        : null;

let adminData = null;

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function setMessage(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle("error", isError);
}

function showSignedOut(message = "") {
    $("#authPanel").hidden = false;
    $("#deniedPanel").hidden = true;
    $("#dashboard").hidden = true;
    $("#signOutButton").hidden = true;
    setMessage($("#authMessage"), message);
}

function showDenied() {
    $("#authPanel").hidden = true;
    $("#deniedPanel").hidden = false;
    $("#dashboard").hidden = true;
    $("#signOutButton").hidden = false;
}

function formatDate(value) {
    if (!value) return "No activity recorded";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "No activity recorded"
        : escapeHTML(date.toLocaleString());
}

async function fetchAllRows(table, columns, orderColumn) {
    const rows = [];
    const pageSize = 500;

    for (let offset = 0; ; offset += pageSize) {
        const { data, error } = await supabaseClient
            .from(table)
            .select(columns)
            .order(orderColumn, { ascending: false })
            .range(offset, offset + pageSize - 1);

        if (error) throw error;
        rows.push(...data);
        if (data.length < pageSize) return rows;
    }
}

async function handleSession(session) {
    if (!session?.user) {
        showSignedOut();
        return;
    }

    $("#authPanel").hidden = true;
    $("#deniedPanel").hidden = true;
    $("#dashboard").hidden = true;
    $("#signOutButton").hidden = false;
    setMessage($("#dashboardMessage"), "Checking teacher access…");

    const { data: adminRecord, error } = await supabaseClient
        .from("app_admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

    if (error) {
        console.error("Teacher access check failed.", error);
        showSignedOut("Could not verify admin access. Check the Supabase migration and try again.");
        return;
    }

    if (!adminRecord) {
        showDenied();
        return;
    }

    $("#dashboard").hidden = false;
    await loadDashboard();
}

async function loadDashboard() {
    setMessage($("#dashboardMessage"), "Loading learner records…");

    try {
        const [profiles, progress, results, learnerStates, submissions] =
            await Promise.all([
                fetchAllRows(
                    "profiles",
                    "id, display_name, email, created_at",
                    "created_at"
                ),
                fetchAllRows(
                    "student_progress",
                    "user_id, lesson_id, completed, updated_at",
                    "updated_at"
                ),
                fetchAllRows(
                    "assessment_results",
                    "user_id, assessment_id, score, max_score, created_at",
                    "created_at"
                ),
                fetchAllRows(
                    "learner_state",
                    "user_id, activities, last_active_date, streak, updated_at",
                    "updated_at"
                ),
                fetchAllRows(
                    "code_submissions",
                    "id, user_id, challenge_id, challenge_title, checkpoint_id, context, language, action, code, created_at",
                    "created_at"
                )
            ]);

        adminData = { profiles, progress, results, learnerStates, submissions };
        renderDashboard();
        setMessage($("#dashboardMessage"), "");
    } catch (error) {
        console.error("Could not load teacher panel records.", error);
        setMessage(
            $("#dashboardMessage"),
            "Could not load learner records. Check that the admin migration has run.",
            true
        );
        $("#learnerDetails").innerHTML =
            '<div class="panel empty">Learner information is unavailable until the database setup is complete.</div>';
    }
}

function renderDashboard() {
    if (!adminData) return;

    const { profiles, progress, results, submissions } = adminData;
    const passedTasks = new Set(results
        .filter(result =>
            allCheckpointTaskIds.has(result.assessment_id) &&
            result.score >= result.max_score
        )
        .map(result => result.assessment_id)).size;
    const completedLessons = progress.filter(record => record.completed).length;

    $("#summaryCards").innerHTML = `
        <article class="summary-card"><span>Learners</span><strong>${profiles.length}</strong></article>
        <article class="summary-card"><span>Lessons completed</span><strong>${completedLessons}</strong></article>
        <article class="summary-card"><span>Checkpoint tasks passed</span><strong>${passedTasks}</strong></article>
        <article class="summary-card"><span>Code snapshots</span><strong>${submissions.length}</strong></article>
    `;

    const select = $("#learnerSelect");
    const previousSelection = select.value;
    select.innerHTML = `
        <option value="">Select a learner</option>
        ${profiles.map(profile => `
            <option value="${escapeHTML(profile.id)}">
                ${escapeHTML(profile.display_name || "Learner")} · ${escapeHTML(profile.email || "No email")}
            </option>
        `).join("")}
    `;

    const selectedId = profiles.some(profile => profile.id === previousSelection)
        ? previousSelection
        : profiles[0]?.id || "";
    select.value = selectedId;

    if (selectedId) {
        renderLearnerDetails(selectedId);
    } else {
        $("#learnerDetails").innerHTML =
            '<div class="panel empty">No learner profiles have been saved yet.</div>';
    }
}

function renderLearnerDetails(userId) {
    if (!adminData) return;

    const profile = adminData.profiles.find(item => item.id === userId);
    if (!profile) return;

    const learnerProgress = adminData.progress.filter(item =>
        item.user_id === userId
    );
    const completedLessons = learnerProgress.filter(item => item.completed);
    const completedLessonIds = new Set(
        completedLessons.map(item => item.lesson_id)
    );
    const results = adminData.results
        .filter(item => item.user_id === userId)
        .sort((left, right) =>
            new Date(right.created_at) - new Date(left.created_at)
        );
    const submissions = adminData.submissions
        .filter(item => item.user_id === userId)
        .sort((left, right) =>
            new Date(right.created_at) - new Date(left.created_at)
        );
    const learnerState = adminData.learnerStates.find(item =>
        item.user_id === userId
    );
    const latestSubmission = submissions[0];
    const latestActivity = [
        latestSubmission?.created_at,
        learnerState?.updated_at
    ].filter(Boolean)
        .sort((left, right) => new Date(right) - new Date(left))[0];
    const currentLesson = lessonList.find(lesson =>
        !completedLessonIds.has(lesson.id)
    );

    const titleForResult = result => {
        const checkpoint = checkpointList.find(item =>
            item.taskIds.includes(result.assessment_id) ||
            item.id === result.assessment_id
        );
        return challengeMap[result.assessment_id]?.title ||
            checkpoint?.title ||
            result.assessment_id;
    };

    $("#learnerDetails").innerHTML = `
        <section class="panel">
            <div class="learner-heading">
                <div>
                    <div class="eyebrow">LEARNER</div>
                    <h2>${escapeHTML(profile.display_name || "Learner")}</h2>
                    <p class="muted">${escapeHTML(profile.email || "No email on profile")}</p>
                </div>
                <div class="last-active">
                    <span>Last recorded activity</span>
                    <strong>${formatDate(latestActivity)}</strong>
                </div>
            </div>
            <div class="learner-stats">
                <div><strong>${completedLessons.length}/${lessonList.length}</strong><span>lessons completed</span></div>
                <div><strong>${results.filter(item => item.score >= item.max_score).length}</strong><span>passed results</span></div>
                <div><strong>${submissions.length}</strong><span>code snapshots</span></div>
                <div><strong>${learnerState?.streak || 0}</strong><span>day streak</span></div>
            </div>
            <p class="current-work"><strong>Current lesson:</strong> ${
                currentLesson
                    ? escapeHTML(currentLesson.title)
                    : "All lessons completed"
            }</p>
            <p class="current-work"><strong>Most recent code:</strong> ${
                latestSubmission
                    ? `${escapeHTML(latestSubmission.challenge_title)} · ${formatDate(latestSubmission.created_at)}`
                    : "No code has been run or checked yet"
            }</p>
        </section>

        <section class="panel">
            <h2>Lesson progress</h2>
            <div class="record-list">
                ${lessonList.map((lesson, index) => {
                    const record = learnerProgress.find(item =>
                        item.lesson_id === lesson.id
                    );
                    const isComplete = completedLessonIds.has(lesson.id);
                    return `
                        <div class="record-row">
                            <span>${index + 1}. ${escapeHTML(lesson.title)}</span>
                            <strong class="${isComplete ? "success" : ""}">
                                ${isComplete
                                    ? `Completed · ${formatDate(record?.updated_at)}`
                                    : "Not completed"}
                            </strong>
                        </div>
                    `;
                }).join("")}
            </div>
        </section>

        <section class="panel">
            <h2>Recent activity</h2>
            ${Array.isArray(learnerState?.activities) &&
                learnerState.activities.length
                ? `<div class="record-list">${learnerState.activities
                    .slice()
                    .sort((left, right) =>
                        new Date(right.date) - new Date(left.date)
                    )
                    .map(activity => `
                        <div class="record-row">
                            <span>${escapeHTML(activity.type || "Activity")} · ${escapeHTML(activity.description || "")}</span>
                            <strong>${formatDate(activity.date)}</strong>
                        </div>
                    `).join("")}</div>`
                : '<p class="muted">No activity recorded yet.</p>'}
        </section>

        <section class="panel">
            <h2>Checkpoint results</h2>
            ${results.length
                ? `<div class="record-list">${results.map(result => `
                    <div class="record-row">
                        <span>${escapeHTML(titleForResult(result))}</span>
                        <strong>${result.score}/${result.max_score} · ${formatDate(result.created_at)}</strong>
                    </div>
                `).join("")}</div>`
                : '<p class="muted">No checkpoint results saved yet.</p>'}
        </section>

        <section class="panel">
            <h2>Submitted code</h2>
            <p class="muted">Snapshots are saved when a learner selects Run code or Check code. Unsubmitted drafts stay in the learner's browser.</p>
            ${submissions.length
                ? `<div class="submission-list">${submissions.map(submission => {
                    const checkpoint = checkpointList.find(item =>
                        item.id === submission.checkpoint_id
                    );
                    const context = checkpoint
                        ? `${checkpoint.title} checkpoint`
                        : submission.context || "practice";
                    return `
                        <article class="submission">
                            <div class="submission-heading">
                                <div>
                                    <strong>${escapeHTML(submission.challenge_title)}</strong>
                                    <span>${escapeHTML(context)} · ${escapeHTML(submission.action)} · ${escapeHTML(submission.language)}</span>
                                </div>
                                <time>${formatDate(submission.created_at)}</time>
                            </div>
                            <pre><code>${escapeHTML(submission.code)}</code></pre>
                        </article>
                    `;
                }).join("")}</div>`
                : '<p class="muted">No code submissions have been saved yet.</p>'}
        </section>
    `;
}

async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error("Could not sign out.", error);
        setMessage($("#deniedMessage"), "Sign out failed. Please try again.", true);
        return;
    }
    adminData = null;
    showSignedOut();
}

$("#signInButton").addEventListener("click", async () => {
    if (!supabaseClient) {
        setMessage($("#authMessage"), "Supabase is not configured.", true);
        return;
    }

    const button = $("#signInButton");
    button.disabled = true;
    setMessage($("#authMessage"), "Connecting to Google…");

    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.href
        }
    });

    if (error) {
        console.error("Google sign-in failed.", error);
        setMessage($("#authMessage"), error.message, true);
        button.disabled = false;
    }
});

$("#signOutButton").addEventListener("click", signOut);
$("#deniedSignOutButton").addEventListener("click", signOut);
$("#learnerSelect").addEventListener("change", event =>
    renderLearnerDetails(event.target.value)
);

async function initialiseAdminPage() {
    if (!supabaseClient) {
        showSignedOut("Supabase is not configured. Check supabase-config.js.");
        return;
    }

    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
        console.error("Could not restore the sign-in session.", error);
        showSignedOut("Could not check your sign-in session. Please try again.");
        return;
    }

    await handleSession(data.session);

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "INITIAL_SESSION") return;
        setTimeout(() => handleSession(session), 0);
    });
}

initialiseAdminPage();
