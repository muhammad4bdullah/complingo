"use strict";

/* =========================================================
   COMPLINGO CONFIGURATION
   Add your Supabase project credentials here.
========================================================= */

const SUPABASE_URL = window.complingoSupabaseConfig?.url || "";
const SUPABASE_ANON_KEY =
    window.complingoSupabaseConfig?.publishableKey || "";

const supabaseConfigured =
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_SUPABASE") &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE");

const supabaseClient =
    supabaseConfigured && window.supabase
        ? window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        )
        : null;


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => [...document.querySelectorAll(selector)];

const escapeHTML = value =>
    String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);


/* =========================================================
   SCHOOL-SPECIFIC CURRICULUM
========================================================= */

const units = schoolCurriculum.units;
const lessons = schoolCurriculum.lessons;
const challenges = schoolCurriculum.challenges;
const checkpoints = schoolCurriculum.checkpoints;
const lessonById = new Map(lessons.map(lesson => [lesson.id, lesson]));
const assessmentIds = new Set([
    ...checkpoints.map(checkpoint => checkpoint.id),
    ...checkpoints.flatMap(checkpoint => checkpoint.taskIds)
]);
const assessments = Object.fromEntries(
    checkpoints.map(checkpoint => [checkpoint.id, checkpoint])
);
lessons.forEach(lesson => {
    challenges[lesson.challengeId].lessonId = lesson.id;
});


/* =========================================================
   APP STATE
========================================================= */

const state = {
    user: null,
    profile: null,
    isAdmin: false,

    editor: null,
    currentChallenge: "factorial",
    currentAssessment: null,
    currentAssessmentTask: null,
    currentLesson: null,
    challengeContext: null,
    lessonAnswerCorrect: false,

    currentView: "dashboard",

    progress: {
        completedLessons: [],
        assessmentResults: [],
        activities: [],
        lastActiveDate: null,
        streak: 0
    },

    challengeResults: {},

    hintVisible: false,
    saving: false
};


/* =========================================================
   SAFE LOCAL CACHE
   Used for guest progress and temporary offline resilience.
========================================================= */

const CACHE_KEY = "complingo_guest_progress_v1";

function createEmptyProgress() {
    return {
        completedLessons: [],
        assessmentResults: [],
        activities: [],
        lastActiveDate: null,
        streak: 0
    };
}

function progressCacheKey() {
    return state.user
        ? `complingo_user_progress_${state.user.id}`
        : CACHE_KEY;
}

function codeDraftCacheKey(challengeId) {
    const owner = state.user ? `user_${state.user.id}` : "guest";
    return `complingo_code_draft_${owner}_${challengeId}`;
}

function loadCodeDraft(challengeId, starterCode) {
    try {
        const draft = localStorage.getItem(codeDraftCacheKey(challengeId));
        return draft === null ? starterCode : draft;
    } catch (error) {
        console.warn("Could not load the saved code draft.", error);
        return starterCode;
    }
}

function saveCodeDraft() {
    if (!state.editor) return;

    try {
        localStorage.setItem(
            codeDraftCacheKey(state.currentChallenge),
            state.editor.getValue()
        );
    } catch (error) {
        console.warn("Could not save the code draft.", error);
    }
}

function loadGuestProgress() {
    try {
        const raw = localStorage.getItem(progressCacheKey());

        if (!raw) return;

        const data = JSON.parse(raw);

        if (Array.isArray(data.completedLessons)) {
            const lessonIds = new Set(lessons.map(lesson => lesson.id));
            state.progress.completedLessons = [
                ...new Set(data.completedLessons.filter(id => lessonIds.has(id)))
            ];
        }

        if (Array.isArray(data.assessmentResults)) {
            const validAssessmentIds = new Set([
                ...checkpoints.map(checkpoint => checkpoint.id),
                ...checkpoints.flatMap(checkpoint => checkpoint.taskIds)
            ]);
            state.progress.assessmentResults = data.assessmentResults
                .filter(result => validAssessmentIds.has(result.id));
        }

        if (Array.isArray(data.activities)) {
            state.progress.activities = data.activities;
        }

        if (data.lastActiveDate) {
            state.progress.lastActiveDate = data.lastActiveDate;
        }

        if (Number.isFinite(data.streak)) {
            state.progress.streak = data.streak;
        }

    } catch (error) {
        console.warn("Could not load cached progress.", error);
    }
}

function saveGuestProgress() {
    try {
        localStorage.setItem(
            progressCacheKey(),
            JSON.stringify(state.progress)
        );
    } catch (error) {
        console.warn("Could not save guest progress.", error);
    }
}


/* =========================================================
   NAVIGATION
========================================================= */

const viewNames = {
    dashboard: "Dashboard",
    learn: "Learning path",
    practice: "Practice lab",
    assessments: "Assessments",
    progress: "My progress"
};

function navigate(view) {
    if (!viewNames[view]) return;

    state.currentView = view;

    $$(".page").forEach(page => page.classList.remove("active"));

    const page = $(`#${view}Page`);

    if (page) {
        page.classList.add("active");
    }

    $$(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.view === view
        );
    });

    $("#pageBreadcrumb").textContent = viewNames[view];

    $("#sidebar").classList.remove("open");

    if (view === "practice") {
        setTimeout(() => {
            if (state.editor) state.editor.refresh();
        }, 40);
    }

    if (view === "progress") {
        renderProgress();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

$$("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
        navigate(button.dataset.view);
    });
});

$("#mobileMenuButton").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
});

document.addEventListener("click", event => {
    if (
        window.innerWidth <= 900 &&
        $("#sidebar").classList.contains("open") &&
        !$("#sidebar").contains(event.target) &&
        !$("#mobileMenuButton").contains(event.target)
    ) {
        $("#sidebar").classList.remove("open");
    }
});


/* =========================================================
   TOAST NOTIFICATIONS
========================================================= */

let toastTimer;

function toast(message) {
    const element = $("#toast");

    element.textContent = message;
    element.classList.add("visible");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        element.classList.remove("visible");
    }, 3000);
}


/* =========================================================
   AUTHENTICATION UI
========================================================= */

function openAuthModal() {
    $("#authError").hidden = true;
    $("#authModal").hidden = false;
}

function closeAuthModal() {
    $("#authModal").hidden = true;
}

$("#closeAuthButton").addEventListener("click", closeAuthModal);

$("#authModal").addEventListener("click", event => {
    if (event.target === $("#authModal")) {
        closeAuthModal();
    }
});

$("#topAvatar").addEventListener("click", () => {
    if (state.user) {
        navigate("progress");
    } else {
        openAuthModal();
    }
});

$("#googleSignInButton").addEventListener("click", async () => {
    if (!supabaseClient) {
        $("#authError").textContent =
            "Supabase is not configured yet. Add your project URL and publishable key in supabase-config.js.";

        $("#authError").hidden = false;
        return;
    }

    const button = $("#googleSignInButton");

    button.disabled = true;
    button.textContent = "Connecting to Google…";

    try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",

            options: {
                redirectTo: window.location.origin +
                    window.location.pathname
            }
        });

        if (error) throw error;

    } catch (error) {
        $("#authError").textContent = error.message;
        $("#authError").hidden = false;

        button.disabled = false;
        button.innerHTML =
            '<span class="google-logo">G</span> Continue with Google';
    }
});


async function signOut() {
    if (!supabaseClient) return;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        toast("Could not sign out. Please try again.");
        return;
    }

    resetSignedInState();
    toast("You have signed out.");
}

function resetSignedInState() {
    state.user = null;
    state.profile = null;
    state.isAdmin = false;
    state.progress = createEmptyProgress();
    loadGuestProgress();
    renderUser();
    $("#adminNavItem").hidden = true;
    renderDashboard();
}

$("#signOutButton").addEventListener("click", signOut);


function renderUser() {
    const user = state.user;

    const name = user?.user_metadata?.full_name ||
                 user?.user_metadata?.name ||
                 user?.email?.split("@")[0] ||
                 "Guest learner";

    const email = user?.email || "Sign in to sync progress";

    $("#sidebarName").textContent = name;
    $("#sidebarEmail").textContent = email;

    $("#sidebarAvatar").textContent = name.charAt(0).toUpperCase();
    $("#topAvatar").textContent = name.charAt(0).toUpperCase();

    $("#welcomeName").textContent =
        user ? `, ${name.split(" ")[0]}` : ", coder";

    $("#signOutButton").hidden = !user;
}


/* =========================================================
   SUPABASE AUTH SESSION
========================================================= */

async function initialiseAuth() {
    if (!supabaseClient) {
        renderUser();
        return;
    }

    try {
        const {
            data: { session },
            error
        } = await supabaseClient.auth.getSession();

        if (error) throw error;

        if (session?.user) {
            await onAuthenticated(session.user);
        }

        supabaseClient.auth.onAuthStateChange((event, session) => {
            setTimeout(async () => {
                if (session?.user) {
                    await onAuthenticated(session.user);
                } else if (event === "SIGNED_OUT") {
                    resetSignedInState();
                }
            }, 0);
        });

    } catch (error) {
        console.error("Authentication initialisation failed.", error);
        toast("Unable to initialise authentication.");
    }
}


async function onAuthenticated(user) {
    if (state.user?.id !== user.id) {
        state.progress = createEmptyProgress();
    }

    state.user = user;
    loadGuestProgress();

    renderUser();

    closeAuthModal();

    await loadCloudProgress();
    await refreshAdminAccess();

    renderDashboard();

    toast("Welcome back to Complingo!");
}


/* =========================================================
   DATABASE: PROFILE + PROGRESS
========================================================= */

async function loadCloudProgress() {
    if (!supabaseClient || !state.user) return;

    try {
        const { data: profile, error: profileError } =
            await supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", state.user.id)
                .maybeSingle();

        if (profileError) throw profileError;

        state.profile = profile;

        if (!profile) {
            const name =
                state.user.user_metadata?.full_name ||
                state.user.user_metadata?.name ||
                state.user.email?.split("@")[0] ||
                "Learner";

            const { data: insertedProfile, error: insertError } =
                await supabaseClient
                    .from("profiles")
                    .insert({
                        id: state.user.id,
                        display_name: name,
                        email: state.user.email || null
                    })
                    .select()
                    .single();

            if (insertError) {
                console.error(
                    "Profile creation failed.",
                    insertError
                );
            } else {
                state.profile = insertedProfile;
            }
        }

        const { data: records, error: progressError } =
            await supabaseClient
                .from("student_progress")
                .select("lesson_id, completed, updated_at")
                .eq("user_id", state.user.id);

        if (progressError) throw progressError;

        if (Array.isArray(records)) {
            const cloudCompleted = records
                .filter(record => record.completed)
                .map(record => record.lesson_id);
            const lessonIds = new Set(lessons.map(lesson => lesson.id));

            state.progress.completedLessons = [
                ...new Set([
                    ...state.progress.completedLessons,
                    ...cloudCompleted
                ])
            ].filter(id => lessonIds.has(id));
        }

        const { data: results, error: resultsError } =
            await supabaseClient
                .from("assessment_results")
                .select("assessment_id, score, max_score, created_at")
                .eq("user_id", state.user.id)
                .order("created_at", { ascending: false })
                .limit(100);

        if (resultsError) throw resultsError;

        if (Array.isArray(results)) {
            const cloudResults = results
                .map(result => ({
                    id: result.assessment_id,
                    score: result.score,
                    maxScore: result.max_score,
                    date: result.created_at
                }))
                .filter(result => assessmentIds.has(result.id));

            const latestResults = new Map();
            [...cloudResults, ...state.progress.assessmentResults]
                .sort((left, right) =>
                    new Date(right.date) - new Date(left.date)
                )
                .forEach(result => {
                    if (!latestResults.has(result.id)) {
                        latestResults.set(result.id, result);
                    }
                });

            state.progress.assessmentResults = [...latestResults.values()];
        }

        const { data: learnerState, error: learnerStateError } =
            await supabaseClient
                .from("learner_state")
                .select("activities, last_active_date, streak")
                .eq("user_id", state.user.id)
                .maybeSingle();

        if (learnerStateError) throw learnerStateError;

        if (learnerState) {
            const cloudActivities = Array.isArray(learnerState.activities)
                ? learnerState.activities
                : [];
            const localActivities = state.progress.activities;
            const activityKey = activity =>
                `${activity.date}|${activity.type}|${activity.description}`;
            const cloudActivityKeys = new Set(cloudActivities.map(activityKey));
            const hasLocalOnlyActivities = localActivities.some(activity =>
                !cloudActivityKeys.has(activityKey(activity))
            );
            const mergedActivities = new Map();
            [...cloudActivities, ...localActivities]
                .sort((left, right) =>
                    new Date(right.date) - new Date(left.date)
                )
                .forEach(activity => {
                    mergedActivities.set(activityKey(activity), activity);
                });
            state.progress.activities = [...mergedActivities.values()].slice(0, 50);

            const localStateIsNewer =
                state.progress.lastActiveDate &&
                (!learnerState.last_active_date ||
                    state.progress.lastActiveDate > learnerState.last_active_date);
            if (!localStateIsNewer) {
                state.progress.lastActiveDate =
                    learnerState.last_active_date;
                state.progress.streak = learnerState.streak;
            } else {
                await syncLearnerState();
            }

            if (hasLocalOnlyActivities && !localStateIsNewer) {
                await syncLearnerState();
            }
        } else if (
            state.progress.activities.length ||
            state.progress.lastActiveDate
        ) {
            await syncLearnerState();
        }

        saveGuestProgress();
        renderDashboard();

    } catch (error) {
        console.error("Could not load cloud progress.", error);

        toast("Cloud sync failed. Local progress is still available.");
    }
}

async function syncLearnerState() {
    if (!supabaseClient || !state.user) return;

    const { error } = await supabaseClient
        .from("learner_state")
        .upsert({
            user_id: state.user.id,
            activities: state.progress.activities,
            last_active_date: state.progress.lastActiveDate,
            streak: state.progress.streak,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "user_id"
        });

    if (error) {
        console.error("Learner activity sync failed.", error);
        toast("Activity is saved locally; cloud sync failed.");
    }
}


async function saveLessonCompletion(lessonId) {
    if (!lessonById.has(lessonId)) return;

    if (state.progress.completedLessons.includes(lessonId)) return;

    state.progress.completedLessons.push(lessonId);

    addActivity(
        "Completed lesson",
        lessons.find(lesson => lesson.id === lessonId)?.title ||
            lessonId
    );

    saveGuestProgress();
    renderDashboard();

    if (!supabaseClient || !state.user) return;

    const { error } = await supabaseClient
        .from("student_progress")
        .upsert({
            user_id: state.user.id,
            lesson_id: lessonId,
            completed: true,
            updated_at: new Date().toISOString()
        }, {
            onConflict: "user_id,lesson_id"
        });

    if (error) {
        console.error("Progress sync failed.", error);
        toast("Progress saved locally; cloud sync failed.");
    }

    await syncLearnerState();
}


async function saveAssessmentResult(assessmentId, score, maxScore) {
    if (!assessmentIds.has(assessmentId)) return;

    const result = {
        id: assessmentId,
        score,
        maxScore,
        date: new Date().toISOString()
    };

    state.progress.assessmentResults = [
        result,
        ...state.progress.assessmentResults.filter(
            item => item.id !== assessmentId
        )
    ];

    addActivity(
        "Completed assessment",
        `${assessmentId}: ${score}/${maxScore}`
    );

    saveGuestProgress();
    renderDashboard();

    if (!supabaseClient || !state.user) return;

    const { error } = await supabaseClient
        .from("assessment_results")
        .insert({
            user_id: state.user.id,
            assessment_id: assessmentId,
            score,
            max_score: maxScore
        });

    if (error) {
        console.error("Assessment result sync failed.", error);
        toast("Result saved locally; cloud sync failed.");
    }

    await syncLearnerState();
}

async function refreshAdminAccess() {
    state.isAdmin = false;
    $("#adminNavItem").hidden = true;

    if (!supabaseClient || !state.user) return;

    const { data, error } = await supabaseClient
        .from("app_admins")
        .select("user_id")
        .eq("user_id", state.user.id)
        .maybeSingle();

    if (error) {
        console.error("Teacher access check failed.", error);
        toast("Could not verify teacher access.");
        return;
    }

    state.isAdmin = Boolean(data);
    $("#adminNavItem").hidden = !state.isAdmin;
}


/* =========================================================
   ACTIVITY + STREAK
========================================================= */

function addActivity(type, description) {
    state.progress.activities.unshift({
        type,
        description,
        date: new Date().toISOString()
    });

    state.progress.activities =
        state.progress.activities.slice(0, 50);

    updateStreak();
}

function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const last = state.progress.lastActiveDate;

    if (last === today) return;

    if (!last) {
        state.progress.streak = 1;
    } else {
        const lastDate = new Date(`${last}T00:00:00Z`);
        const todayDate = new Date(`${today}T00:00:00Z`);

        const difference = Math.round(
            (todayDate - lastDate) / 86400000
        );

        if (difference === 1) {
            state.progress.streak += 1;
        } else if (difference > 1) {
            state.progress.streak = 1;
        }
    }

    state.progress.lastActiveDate = today;
}


/* =========================================================
   DASHBOARD + PROGRESS
========================================================= */

function calculateProgress() {
    const total = lessons.length;

    const completed = lessons.filter(lesson =>
        state.progress.completedLessons.includes(lesson.id)
    ).length;

    return total
        ? Math.round((completed / total) * 100)
        : 0;
}

function calculateCheckpointProgress() {
    const taskIds = checkpoints.flatMap(checkpoint => checkpoint.taskIds);
    const passed = taskIds.filter(hasPassedAssessmentTask).length;

    return taskIds.length
        ? Math.round((passed / taskIds.length) * 100)
        : null;
}


function renderDashboard() {
    const completed = lessons.filter(lesson =>
        state.progress.completedLessons.includes(lesson.id)
    ).length;

    const progress = calculateProgress();

    const checkpointProgress = calculateCheckpointProgress();

    $("#completedCount").textContent = completed;

    $("#checkpointProgressValue").textContent =
        checkpointProgress === null ? "—" : `${checkpointProgress}%`;

    $("#streakValue").textContent = state.progress.streak;

    $("#dashboardStreak").textContent = state.progress.streak;

    $("#dashboardProgress").textContent = `${progress}%`;

    $("#sidebarProgress").style.width = `${progress}%`;

    $("#sidebarProgressText").textContent =
        `${progress}% complete`;

    $("#progressPercentLarge").textContent = `${progress}%`;

    $("#largeProgressBar").style.width = `${progress}%`;

    $("#checkpointProgressLarge").textContent =
        checkpointProgress === null ? "—" : `${checkpointProgress}%`;

    $("#welcomeName").textContent = state.user
        ? `, ${(state.user.user_metadata?.full_name ||
            state.user.user_metadata?.name ||
            state.user.email?.split("@")[0] ||
            "coder").split(" ")[0]}`
        : ", coder";

    renderLessons();
    renderAssessments();
    renderActivities();
}


function renderProgress() {
    renderDashboard();
}


function renderActivities() {
    const container = $("#activityList");

    const activities = state.progress.activities;

    if (!activities.length) {
        container.innerHTML = `
            <div class="empty-state">
                <span>⌘</span>
                <h3>Your journey starts here</h3>
                <p>Complete your first exercise to see your activity.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = activities.map(activity => `
        <div class="activity-row">
            <div class="activity-check">✓</div>

            <div>
                <strong>${escapeHTML(activity.type)}</strong>
                <p>${escapeHTML(activity.description)}</p>
            </div>

            <span>
                ${escapeHTML(new Date(activity.date).toLocaleDateString())}
            </span>
        </div>
    `).join("");
}


/* =========================================================
   LEARNING PATH
========================================================= */

function renderLessons() {
    const container = $("#lessonList");

    container.innerHTML = units.map(unit => {
        const unitLessons = lessons.filter(
            lesson => lesson.unitId === unit.id
        );
        const completedCount = unitLessons.filter(lesson =>
            state.progress.completedLessons.includes(lesson.id)
        ).length;
        const unlocked = isUnitUnlocked(unit.id);

        return `
            <section class="lesson-unit" data-unit-id="${escapeHTML(unit.id)}">
                <div class="lesson-unit-heading">
                    <div>
                        <span class="course-tag">${escapeHTML(unit.id.replace("-", " ").toUpperCase())}</span>
                        <h2>${escapeHTML(unit.title)}</h2>
                        <p>${escapeHTML(unit.subtitle)}</p>
                    </div>
                    <span class="unit-progress">${completedCount}/${unitLessons.length} lessons</span>
                </div>
                ${unlocked ? "" : '<p class="unit-locked-note">Pass the previous checkpoint to unlock this unit.</p>'}
                <div class="unit-lesson-list">
                    ${unitLessons.map(lesson => {
                        const completed =
                            state.progress.completedLessons.includes(lesson.id);
                        const available = isLessonAvailable(lesson);
                        const position = lessons.indexOf(lesson) + 1;
                        const action = completed ? "Review" : available ? "Start" : "Locked";

                        return `
                            <article class="lesson-card${available ? "" : " locked"}">
                                <div class="lesson-number">
                                    ${completed ? "✓" : String(position).padStart(2, "0")}
                                </div>
                                <div class="lesson-details">
                                    <span class="course-tag">PRACTICAL ${position} · ${completed ? "COMPLETE" : available ? "READY" : "LOCKED"}</span>
                                    <h3>${escapeHTML(lesson.title)}</h3>
                                    <p>${escapeHTML(lesson.description)}</p>
                                </div>
                                <button class="secondary-button lesson-action"
                                        data-lesson="${escapeHTML(lesson.id)}"
                                        ${available ? "" : "disabled"}>
                                    ${action} →
                                </button>
                            </article>
                        `;
                    }).join("")}
                </div>
            </section>
        `;
    }).join("");
}

function isUnitUnlocked(unitId) {
    const unitIndex = units.findIndex(unit => unit.id === unitId);
    if (unitIndex <= 0) return unitIndex === 0;

    const previousUnit = units[unitIndex - 1];
    const checkpoint = checkpoints.find(
        item => item.unitId === previousUnit.id
    );

    return Boolean(checkpoint && isCheckpointComplete(checkpoint));
}

function areUnitLessonsComplete(unitId) {
    const unitLessons = lessons.filter(lesson => lesson.unitId === unitId);

    return unitLessons.length > 0 && unitLessons.every(lesson =>
        state.progress.completedLessons.includes(lesson.id)
    );
}

function isLessonAvailable(lesson) {
    if (!isUnitUnlocked(lesson.unitId)) return false;
    if (state.progress.completedLessons.includes(lesson.id)) return true;

    const unitLessons = lessons.filter(
        item => item.unitId === lesson.unitId
    );
    const firstIncomplete = unitLessons.find(item =>
        !state.progress.completedLessons.includes(item.id)
    );

    return firstIncomplete?.id === lesson.id;
}

function hasPassedAssessmentTask(taskId) {
    return state.progress.assessmentResults.some(result =>
        result.id === taskId &&
        Number(result.score) >= Number(result.maxScore) &&
        Number(result.maxScore) > 0
    );
}

function isCheckpointComplete(checkpoint) {
    return checkpoint.taskIds.every(hasPassedAssessmentTask);
}

function openLesson(lesson) {
    if (!isLessonAvailable(lesson)) {
        toast("Complete the previous practical first.");
        return;
    }

    state.currentLesson = lesson.id;
    state.challengeContext = null;
    state.lessonAnswerCorrect = false;

    $("#lessonStudyUnit").textContent =
        units.find(unit => unit.id === lesson.unitId).title;
    $("#lessonStudyTitle").textContent = lesson.title;
    $("#lessonStudyDescription").textContent = lesson.description;
    $("#lessonConcept").textContent = lesson.concept;
    $("#lessonExampleCode").textContent = lesson.exampleCode;
    $("#lessonQuestion").textContent = lesson.question;
    $("#lessonFeedback").textContent = "";
    $("#startLessonPracticeButton").hidden = true;

    $("#lessonAnswer").innerHTML = `
        <option value="">Choose an answer</option>
        ${lesson.options.map(option =>
            `<option value="${escapeHTML(option.value)}">${escapeHTML(option.label)}</option>`
        ).join("")}
    `;

    $("#lessonStudy").hidden = false;
    $("#lessonStudy").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

$("#lessonList").addEventListener("click", event => {
    const button = event.target.closest("[data-lesson]");

    if (!button) return;

    const lesson = lessons.find(
        item => item.id === button.dataset.lesson
    );

    if (!lesson) return;

    openLesson(lesson);
});

$("#closeLessonStudyButton").addEventListener("click", () => {
    $("#lessonStudy").hidden = true;
});

$("#checkLessonAnswerButton").addEventListener("click", () => {
    const lesson = lessonById.get(state.currentLesson);
    if (!lesson) return;

    if ($("#lessonAnswer").value !== lesson.answer) {
        state.lessonAnswerCorrect = false;
        $("#lessonFeedback").textContent =
            "Not quite. Re-read the example and try again.";
        $("#startLessonPracticeButton").hidden = true;
        return;
    }

    state.lessonAnswerCorrect = true;
    $("#lessonFeedback").textContent =
        "Correct. Now complete the practical to finish this lesson.";
    $("#startLessonPracticeButton").hidden = false;
});

$("#startLessonPracticeButton").addEventListener("click", () => {
    const lesson = lessonById.get(state.currentLesson);
    if (!lesson || !state.lessonAnswerCorrect) return;

    $("#lessonStudy").hidden = true;
    loadChallenge(lesson.challengeId);
});


/* =========================================================
   CODE EDITOR INITIALISATION
========================================================= */

function editorMode(language) {
    if (language === "html") return "htmlmixed";
    if (language === "css") return "css";

    return "javascript";
}


function initialiseEditor() {
    state.editor = CodeMirror.fromTextArea(
        $("#codeEditor"),
        {
            mode: "javascript",
            theme: "dracula",

            lineNumbers: true,
            lineWrapping: false,

            matchBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,

            autoCloseBrackets: true,

            gutters: [
                "CodeMirror-linenumbers",
                "CodeMirror-lint-markers"
            ],

            lint: {
                esversion: 11,
                asi: false,
                undef: false,
                browser: true,
                node: false
            }
        }
    );

    state.editor.setSize(null, 400);

    state.editor.setValue(challenges.factorial.starterCode);

    state.editor.on("change", () => {
        updateEditorStatus();
        saveCodeDraft();

        $("#unsavedDot").hidden = false;

        // Syntax diagnostics update automatically.
        // General logical errors require tests or explicit checks.
    });

    state.editor.on("cursorActivity", updateEditorStatus);

    updateEditorStatus();
}


function updateEditorStatus() {
    if (!state.editor) return;

    const lineCount = state.editor.lineCount();

    const cursor = state.editor.getCursor();

    $("#editorLineCount").textContent =
        `Lines: ${lineCount} · Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;

    const diagnostics = getDiagnostics();

    const errors = diagnostics.filter(
        item => item.severity === "error"
    );

    const warnings = diagnostics.filter(
        item => item.severity === "warning"
    );

    const counter = $("#editorErrorCount");

    if (errors.length) {
        counter.textContent =
            `${errors.length} error${errors.length === 1 ? "" : "s"}`;

        counter.className = "has-errors";

    } else if (warnings.length) {
        counter.textContent =
            `${warnings.length} warning${warnings.length === 1 ? "" : "s"}`;

        counter.className = "has-warnings";

    } else {
        counter.textContent = "No reported syntax errors";
        counter.className = "";
    }
}


function getDiagnostics() {
    if (!state.editor) return [];

    const code = state.editor.getValue();

    if ($("#languageSelect").value !== "javascript") {
        return [];
    }

    if (!window.JSHINT) return [];

    JSHINT(code, {
        esversion: 11,
        asi: false,
        undef: false,
        browser: true,
        node: false
    });

    return (JSHINT.errors || [])
        .filter(Boolean)
        .map(error => ({
            severity: error.code?.startsWith("W")
                ? "warning"
                : "error",

            line: error.line,
            column: error.character,
            message: error.reason
        }));
}


/* =========================================================
   LANGUAGE SELECTOR
========================================================= */

$("#languageSelect").addEventListener("change", () => {
    const language = $("#languageSelect").value;

    state.editor.setOption("mode", editorMode(language));

    $("#fileName").textContent = {
        javascript: "solution.js",
        html: "index.html",
        css: "style.css"
    }[language];

    if (language === "javascript") {
        state.editor.setOption("lint", {
            esversion: 11,
            asi: false,
            undef: false,
            browser: true
        });
    } else {
        state.editor.setOption("lint", false);
    }

    updateEditorStatus();
    state.editor.refresh();
});


/* =========================================================
   CHALLENGE LOADING
========================================================= */

function loadChallenge(key) {
    const challenge = challenges[key];

    if (!challenge) return;

    state.currentChallenge = key;
    state.challengeContext =
        challenge.assessmentTaskId &&
        state.currentAssessmentTask === key
            ? "assessment"
            : challenge.lessonId === state.currentLesson
                ? "lesson"
                : null;
    state.hintVisible = false;

    $("#challengeTitle").textContent = challenge.title;

    $("#challengeDescription").textContent =
        challenge.description;

    $("#challengeInstructions").innerHTML =
        challenge.instructions.map(item =>
            `<li>${escapeHTML(item)}</li>`
        ).join("");

    $(".example-box code").textContent = challenge.example;

    $("#hintText").textContent = challenge.hint;

    $("#showHintButton").textContent = "Show hint";

    $("#testCases").innerHTML =
        challenge.testCases.map((test, index) => `
            <div class="test-case" id="testCase${index}">
                <span>${escapeHTML(test.label)}</span>
                <span class="test-result">Not tested</span>
            </div>
        `).join("");

    $("#languageSelect").value = challenge.language;

    state.editor.setOption(
        "mode",
        editorMode(challenge.language)
    );
    state.editor.setOption(
        "lint",
        challenge.language === "javascript"
            ? {
                esversion: 11,
                asi: false,
                undef: false,
                browser: true,
                node: false
            }
            : false
    );

    $("#fileName").textContent = {
        javascript: "solution.js",
        html: "index.html",
        css: "style.css"
    }[challenge.language];

    state.editor.setValue(
        loadCodeDraft(key, challenge.starterCode)
    );

    $("#unsavedDot").hidden = true;

    $("#outputContent").innerHTML = `
        <p class="output-placeholder">
            Run your solution to see the results.
        </p>
    `;

    $("#outputStatus").textContent = "Waiting to run";

    navigate("practice");
}


/* =========================================================
   HINT BUTTON
========================================================= */

$("#showHintButton").addEventListener("click", () => {
    state.hintVisible = !state.hintVisible;

    $("#hintText").hidden = !state.hintVisible;

    $("#showHintButton").textContent =
        state.hintVisible ? "Hide hint" : "Show hint";
});


/* =========================================================
   OUTPUT RENDERING
========================================================= */

function clearOutput() {
    $("#outputContent").innerHTML = "";
}

function writeOutput(message, type = "normal") {
    const content = $("#outputContent");

    const line = document.createElement("div");

    line.className = `output-line ${type}`;

    line.textContent = message;

    content.appendChild(line);

    content.scrollTop = content.scrollHeight;
}


function formatOutput(value) {
    if (typeof value === "string") return value;

    if (typeof value === "undefined") return "undefined";

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}


$("#clearOutputButton").addEventListener("click", () => {
    clearOutput();

    $("#outputStatus").textContent = "Output cleared";
});


/* =========================================================
   ISOLATED WORKER RUNNER
========================================================= */

function runWorkerScript(source, payload, timeoutMessage) {
    return new Promise(resolve => {
        let worker;
        let url;
        let timeout;
        let finished = false;

        function finish(result) {
            if (finished) return;

            finished = true;
            clearTimeout(timeout);
            if (worker) worker.terminate();
            if (url) URL.revokeObjectURL(url);
            resolve(result);
        }

        if (typeof Worker === "undefined" || typeof Blob === "undefined") {
            finish({
                success: false,
                passedTests: 0,
                results: [],
                error: "This browser does not support the isolated code runner.",
                message: "This browser does not support the isolated code runner."
            });
            return;
        }

        try {
            url = URL.createObjectURL(
                new Blob([source], { type: "text/javascript" })
            );
            worker = new Worker(url);
            worker.onmessage = event => finish(event.data);
            worker.onerror = event => finish({
                success: false,
                passedTests: 0,
                results: [],
                error: `Code runner failed: ${event.message || "unknown error"}`,
                message: `Code runner failed: ${event.message || "unknown error"}`
            });
            timeout = setTimeout(() => finish({
                success: false,
                passedTests: 0,
                results: [],
                error: timeoutMessage,
                message: timeoutMessage
            }), 1800);
            worker.postMessage(payload);
        } catch (error) {
            finish({
                success: false,
                passedTests: 0,
                results: [],
                error: `Could not start the isolated code runner: ${error.message}`,
                message: `Could not start the isolated code runner: ${error.message}`
            });
        }
    });
}

function runJavaScript(code, inputs) {
    const source = `
        self.onmessage = function(event) {
            const { code, inputs } = event.data;
            const results = [];
            const format = value => {
                if (typeof value === "string") return value;
                try {
                    const json = JSON.stringify(value);
                    return typeof json === "undefined" ? String(value) : json;
                } catch {
                    return String(value);
                }
            };
            const report = (type, values) => results.push({
                type,
                message: values.map(format).join(" ")
            });

            console.log = (...values) => report("normal", values);
            console.warn = (...values) => report("warning", values);
            console.error = (...values) => report("error", values);
            globalThis.prompt = message => {
                const value = inputs.length ? inputs.shift() : null;
                report("info", [
                    String(message || "Input"),
                    value === null ? "[no input provided]" : value
                ]);
                return value;
            };
            globalThis.alert = value => report("normal", [value]);
            globalThis.document = {
                write: (...values) => report("normal", values)
            };

            try {
                new Function(code)();
                self.postMessage({ results });
            } catch (error) {
                self.postMessage({
                    results,
                    error: error.name + ": " + error.message
                });
            }
        };
    `;

    return runWorkerScript(
        source,
        { code, inputs },
        "Execution timed out. Check for a loop that never ends."
    );
}


/* =========================================================
   HTML / CSS PREVIEW
========================================================= */

function runMarkup(language, code) {
    return new Promise(resolve => {
        const frame = document.createElement("iframe");

        frame.setAttribute("sandbox", "allow-scripts");
        frame.className = "code-preview-frame";
        frame.title = "HTML and CSS practical preview";
        const previewLabel = document.createElement("div");
        previewLabel.className = "output-line info";
        previewLabel.textContent = "Live page preview";
        $("#outputContent").append(previewLabel, frame);

        let finished = false;

        const timer = setTimeout(() => {
            if (finished) return;

            finished = true;

            window.removeEventListener("message", listener);
            frame.remove();

            resolve({
                error: "Preview timed out."
            });

        }, 1800);

        const token =
            "preview_" + Math.random().toString(36).slice(2);

        function listener(event) {
            if (event.source !== frame.contentWindow) return;

            const data = event.data;

            if (!data || data.token !== token) return;

            if (data.type === "preview-output") {
                writeOutput(data.message, data.outputType);
            }

            if (data.type === "preview-done") {
                if (finished) return;

                finished = true;

                clearTimeout(timer);

                window.removeEventListener("message", listener);

                resolve({ success: true });
            }
        }

        window.addEventListener("message", listener);

        let documentContent;

        if (language === "html") {
            documentContent = code;
        } else {
            documentContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${code.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
<h1 class="blink-text">CSS practical preview</h1>
<p>Style this sample form and table.</p>
<form class="preview-form">
    <label for="preview-name">Name</label>
    <input id="preview-name" type="text" value="Learner">
    <button type="button">Example button</button>
</form>
<table>
    <tr><th>Practical</th><th>Marks</th></tr>
    <tr><td>HTML</td><td>10</td></tr>
</table>
<div class="preview-box moving-square" aria-label="Animation preview"></div>
<script>
document.querySelector(".preview-box").style.padding = "16px";
<\/script>
</body>
</html>`;
        }

        /*
         * Scripts in the preview are permitted, but the iframe has no
         * same-origin permission. Do not use this preview as a hardened
         * security boundary for untrusted public submissions.
         */

        const completionScript = `
<script>
parent.postMessage({
    token: ${JSON.stringify(token)},
    type: "preview-done"
}, "*");
<\/script>
`;
        frame.srcdoc = /<\/body>/i.test(documentContent)
            ? documentContent.replace(
                /<\/body>/i,
                `${completionScript}</body>`
            )
            : `${documentContent}${completionScript}`;
    });
}


/* =========================================================
   CODE CHECKER
========================================================= */

async function saveCodeSubmission(action, code) {
    if (!supabaseClient || !state.user) return null;

    const challenge = challenges[state.currentChallenge];
    if (!challenge) return null;

    const checkpoint = checkpoints.find(item =>
        item.taskIds.includes(state.currentChallenge)
    );

    try {
        const { error } = await supabaseClient
            .from("code_submissions")
            .insert({
                user_id: state.user.id,
                challenge_id: state.currentChallenge,
                challenge_title: challenge.title,
                checkpoint_id: checkpoint?.id || null,
                context: state.challengeContext || "practice",
                language: $("#languageSelect").value,
                action,
                code
            });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Code submission could not be saved.", error);
        return false;
    }
}

function showCodeSubmissionStatus(saved) {
    if (saved === true) {
        writeOutput(
            "Code snapshot saved for teacher review.",
            "info"
        );
    } else if (saved === false) {
        writeOutput(
            "This code was handled locally, but its teacher-review copy could not be saved to the cloud.",
            "warning"
        );
    } else if (saved === null) {
        writeOutput(
            "Sign in to save this code for teacher review.",
            "info"
        );
    }
}

async function checkCode() {
    clearOutput();

    const language = $("#languageSelect").value;

    const code = state.editor.getValue();

    if (!code.trim()) {
        writeOutput("Your editor is empty.", "warning");

        $("#outputStatus").textContent = "Nothing to check";

        return;
    }

    const saved = await saveCodeSubmission("check", code);
    showCodeSubmissionStatus(saved);

    if (language === "javascript") {
        const diagnostics = getDiagnostics();

        if (diagnostics.length) {
            diagnostics.forEach(item => {
                writeOutput(
                    `Line ${item.line}: ${item.message}`,
                    item.severity === "error" ? "error" : "warning"
                );
            });

            $("#outputStatus").textContent =
                `${diagnostics.length} diagnostic(s)`;

        } else {
            writeOutput(
                "No JSHint diagnostics were reported.",
                "success"
            );

            writeOutput(
                "Note: this does not prove the program's logic is correct.",
                "info"
            );

            $("#outputStatus").textContent = "Code checked";
        }

    } else {
        writeOutput(
            "The editor's JavaScript lint rules do not apply to this language.",
            "info"
        );

        writeOutput(
            "Use the preview to inspect the HTML or CSS result.",
            "success"
        );

        $("#outputStatus").textContent = "Ready to preview";
    }
}

$("#checkCodeButton").addEventListener("click", checkCode);


/* =========================================================
   PRACTICAL PROGRAM TESTS
========================================================= */

async function executeProgramTests(code, challenge) {
    const cases = challenge.programCases || [];

    for (let index = 0; index < cases.length; index++) {
        const test = cases[index];
        const result = await runJavaScript(code, [...test.input]);

        if (result.error) {
            return {
                success: false,
                passedTests: index,
                failedTest: index,
                message: result.error
            };
        }

        const actualOutput = result.results
            .filter(item => item.type === "normal")
            .map(item => item.message);

        if (JSON.stringify(actualOutput) !== JSON.stringify(test.expectedOutput)) {
            return {
                success: false,
                passedTests: index,
                failedTest: index,
                message: "The displayed output did not match this practical's expected result."
            };
        }
    }

    return {
        success: true,
        passedTests: cases.length,
        message: "All practical tests passed."
    };
}


/* =========================================================
   RUN BUTTON
========================================================= */

async function runCode() {
    if (state.saving) return;

    const button = $("#runCodeButton");

    button.disabled = true;
    button.textContent = "Running…";

    clearOutput();

    const language = $("#languageSelect").value;

    const code = state.editor.getValue();

    $("#outputStatus").textContent = "Executing";

    try {
        showCodeSubmissionStatus(
            await saveCodeSubmission("run", code)
        );

        if (language === "javascript") {
            const diagnostics = getDiagnostics();

            const fatalSyntax = diagnostics.find(
                item => item.severity === "error"
            );

            /*
             * Allow execution despite diagnostics so students can inspect
             * runtime behavior. The runtime itself catches syntax errors.
             */

            if (fatalSyntax) {
                writeOutput(
                    `Editor warning: line ${fatalSyntax.line}: ` +
                    fatalSyntax.message,
                    "warning"
                );
            }

            const rawInputs = $("#programInputs").value;
            const inputs = rawInputs.trim()
                ? rawInputs.split(",").map(value => value.trim())
                : [];
            const result = await runJavaScript(code, inputs);

            if (result.error) {
                writeOutput(result.error, "error");

                $("#outputStatus").textContent = "Execution failed";

            } else {
                if (!result.results.length) {
                    writeOutput(
                        "Program finished without console output.",
                        "info"
                    );
                } else {
                    result.results.forEach(item => {
                        writeOutput(
                            item.message,
                            item.type === "error"
                                ? "error"
                                : item.type === "warning"
                                    ? "warning"
                                    : "normal"
                        );
                    });
                }

                $("#outputStatus").textContent = "Execution finished";
            }

            if (!result.error) {
                await runChallengeTests();
            }

        } else {
            const result = await runMarkup(language, code);

            if (result.error) {
                writeOutput(result.error, "error");

                $("#outputStatus").textContent = "Preview failed";

            } else {
                writeOutput(
                    "Preview shown below in the sandbox.",
                    "success"
                );

                $("#outputStatus").textContent = "Preview finished";
                await runChallengeTests();
            }
        }

    } catch (error) {
        writeOutput(
            `${error.name}: ${error.message}`,
            "error"
        );

        $("#outputStatus").textContent = "Execution failed";

    } finally {
        button.disabled = false;
        button.textContent = "▶ Run code";
    }
}


$("#runCodeButton").addEventListener("click", runCode);


/* =========================================================
   CHALLENGE TEST RUNNER
========================================================= */

async function runChallengeTests() {
    const challenge = challenges[state.currentChallenge];

    if (!challenge || !state.challengeContext) {
        return;
    }

    if (challenge.language !== $("#languageSelect").value) {
        writeOutput(
            `Switch back to ${challenge.language} to run this practical's tests.`,
            "info"
        );
        return;
    }

    const code = state.editor.getValue();
    const result = typeof challenge.validate === "function"
        ? challenge.validate(code)
        : await executeProgramTests(code, challenge);

    (challenge.testCases || []).forEach((test, index) => {
        const resultElement = $(`#testCase${index} .test-result`);
        if (!resultElement) return;

        resultElement.textContent = index < result.passedTests
            ? "Passed"
            : index === result.failedTest
                ? "Needs work"
                : "Not tested";
        resultElement.className = index < result.passedTests
            ? "test-result passed"
            : index === result.failedTest
                ? "test-result failed"
                : "test-result";
    });

    if (result.success) {
        writeOutput(result.message, "success");

        state.challengeResults[state.currentChallenge] = true;

        if (
            challenge.lessonId === state.currentLesson &&
            !state.progress.completedLessons.includes(challenge.lessonId)
        ) {
            await saveLessonCompletion(challenge.lessonId);
            toast("Lesson complete. Great work!");
        } else if (challenge.assessmentTaskId) {
            await saveAssessmentTaskCompletion(challenge.assessmentTaskId);
            toast("Checkpoint task passed!");
        } else {
            toast("All practical tests passed!");
        }

    } else {
        writeOutput(
            `Test feedback: ${result.message}`,
            "warning"
        );

        state.challengeResults[state.currentChallenge] = false;
    }
}

async function saveAssessmentTaskCompletion(taskId) {
    if (hasPassedAssessmentTask(taskId)) return;

    await saveAssessmentResult(taskId, 1, 1);

    const checkpoint = checkpoints.find(item =>
        item.taskIds.includes(taskId)
    );
    if (checkpoint && state.currentAssessment === checkpoint.id) {
        renderAssessmentTasks(checkpoint);
        $("#assessmentCategory").textContent =
            `${challenges[state.currentAssessmentTask].questionType} · ${checkpoint.taskIds.filter(hasPassedAssessmentTask).length}/${checkpoint.taskIds.length} passed`;
    }

    if (
        checkpoint &&
        isCheckpointComplete(checkpoint) &&
        !state.progress.assessmentResults.some(result =>
            result.id === checkpoint.id &&
            Number(result.score) >= Number(result.maxScore)
        )
    ) {
        await saveAssessmentResult(
            checkpoint.id,
            checkpoint.taskIds.length,
            checkpoint.taskIds.length
        );
    }
}


/* =========================================================
   RESET STARTER CODE
========================================================= */

$("#resetCodeButton").addEventListener("click", () => {
    const challenge = challenges[state.currentChallenge];

    if (!challenge) return;

    const confirmed = window.confirm(
        "Reset your editor to the original starter code? Your current code will be lost."
    );

    if (!confirmed) return;

    state.editor.setValue(challenge.starterCode);

    $("#unsavedDot").hidden = true;

    clearOutput();

    $("#outputStatus").textContent = "Code reset";

    toast("Starter code restored.");
});


/* =========================================================
   ASSESSMENT WORKSPACE
========================================================= */

function openAssessment(key) {
    const checkpoint = assessments[key];

    if (!checkpoint) return;

    if (
        !isUnitUnlocked(checkpoint.unitId) ||
        !areUnitLessonsComplete(checkpoint.unitId)
    ) {
        toast("Finish this unit's lessons to unlock its checkpoint.");
        return;
    }

    state.currentLesson = null;
    state.challengeContext = null;
    state.currentAssessment = key;

    $("#assessmentCategory").textContent =
        `CHECKPOINT · ${checkpoint.taskIds.filter(hasPassedAssessmentTask).length}/${checkpoint.taskIds.length} TASKS`;
    $("#assessmentTitle").textContent = checkpoint.title;
    $("#assessmentPrompt").textContent = checkpoint.description;
    $("#assessmentWorkspace").hidden = false;

    const nextTask = checkpoint.taskIds.find(
        taskId => !hasPassedAssessmentTask(taskId)
    );

    renderAssessmentTasks(checkpoint);
    selectAssessmentTask(nextTask || checkpoint.taskIds[0]);

    $("#assessmentWorkspace").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function renderAssessments() {
    const container = $("#assessmentTypes");

    container.innerHTML = checkpoints.map(checkpoint => {
        const complete = isCheckpointComplete(checkpoint);
        const ready =
            isUnitUnlocked(checkpoint.unitId) &&
            areUnitLessonsComplete(checkpoint.unitId);
        const passedCount = checkpoint.taskIds.filter(
            hasPassedAssessmentTask
        ).length;
        const action = complete
            ? "Review checkpoint"
            : ready
                ? "Begin checkpoint"
                : isUnitUnlocked(checkpoint.unitId)
                    ? "Complete unit lessons first"
                    : "Locked until previous checkpoint";

        return `
            <article class="assessment-type-card${ready ? "" : " locked"}">
                <div class="assessment-type-icon">⌁</div>
                <span class="course-tag">${complete ? "PASSED" : `CHECKPOINT ${checkpoints.indexOf(checkpoint) + 1}`}</span>
                <h3>${escapeHTML(checkpoint.title)}</h3>
                <p>${escapeHTML(checkpoint.description)}</p>
                <span class="assessment-progress">${passedCount}/${checkpoint.taskIds.length} tasks passed</span>
                <button class="primary-button"
                        data-assessment="${escapeHTML(checkpoint.id)}"
                        ${ready || complete ? "" : "disabled"}>
                    ${action} →
                </button>
            </article>
        `;
    }).join("");
}

function renderAssessmentTasks(checkpoint) {
    $("#assessmentTaskList").innerHTML = checkpoint.taskIds.map(
        (taskId, index) => {
            const task = challenges[taskId];
            const passed = hasPassedAssessmentTask(task.assessmentTaskId);
            const selected = state.currentAssessmentTask === taskId;

            return `
                <button class="assessment-task${selected ? " selected" : ""}${passed ? " complete" : ""}"
                        data-assessment-task="${escapeHTML(taskId)}"
                        aria-pressed="${selected}">
                    <span>${index + 1}. ${escapeHTML(task.questionType)}</span>
                    <strong>${escapeHTML(task.title)}</strong>
                    <small>${passed ? "Passed" : "Open task"}</small>
                </button>
            `;
        }
    ).join("");
}

function selectAssessmentTask(taskId) {
    const task = challenges[taskId];
    if (!task || !task.assessmentTaskId) return;

    state.currentAssessmentTask = taskId;
    $("#assessmentCategory").textContent = task.questionType;
    $("#assessmentPrompt").textContent = task.description;
    $("#assessmentStarterCode").textContent = task.starterCode;
    $("#assessmentExtraInstructions").textContent =
        task.instructions.join(" ");
    $("#openAssessmentEditorButton").textContent =
        hasPassedAssessmentTask(task.assessmentTaskId)
            ? "Review this task in the practice lab →"
            : "Open this task in the practice lab →";

    const checkpoint = assessments[state.currentAssessment];
    if (checkpoint) {
        $("#assessmentCategory").textContent =
            `${task.questionType} · ${checkpoint.taskIds.filter(hasPassedAssessmentTask).length}/${checkpoint.taskIds.length} passed`;
        renderAssessmentTasks(checkpoint);
    }
}

$("#assessmentTypes").addEventListener("click", event => {
    const button = event.target.closest("[data-assessment]");
    if (button && !button.disabled) {
        openAssessment(button.dataset.assessment);
    }
});

$("#assessmentTaskList").addEventListener("click", event => {
    const button = event.target.closest("[data-assessment-task]");
    if (button) selectAssessmentTask(button.dataset.assessmentTask);
});


$("#closeAssessmentButton").addEventListener("click", () => {
    $("#assessmentWorkspace").hidden = true;
});


$("#openAssessmentEditorButton").addEventListener("click", () => {
    if (!state.currentAssessmentTask) return;

    loadChallenge(state.currentAssessmentTask);

    toast("Assessment loaded into the editor.");
});


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener("keydown", event => {
    if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter"
    ) {
        if (state.currentView === "practice") {
            event.preventDefault();
            runCode();
        }
    }

    if (event.key === "Escape") {
        closeAuthModal();
        $("#sidebar").classList.remove("open");
    }
});


/* =========================================================
   INITIALISE
========================================================= */

function initialiseApp() {
    loadGuestProgress();

    initialiseEditor();

    renderUser();

    renderDashboard();

    $("#hintText").hidden = true;

    initialiseAuth();
}

initialiseApp();