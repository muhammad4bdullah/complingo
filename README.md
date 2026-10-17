# Complingo — school practicals edition

Complingo is a browser-based coding coach for one learner preparing for the
school's HTML and JavaScript practicals. The course is built around the
programs in the consolidated CS final-exam study pack rather than a general
HTML/CSS/JavaScript curriculum.

## Course structure

The learning path has four units:

1. **HTML and decisions** — practical HTML structure, arithmetic, even/odd
   checks, and finding the largest of three values.
2. **Loops and strings** — positive-number squares, factorials, sums of
   squares, and string length.
3. **Arrays and nested loops** — array parity, array totals, averages, and
   multiplication tables.
4. **Forms, styling, and animation** — common HTML form controls, CSS styling
   for forms and tables, blinking text, and a moving square that rotates 360°.

Each lesson teaches the idea, asks a short understanding question, and then
opens a testable coding practical. The JavaScript examples and tasks follow the
school study pack's prompt, alert, document.write, if/else, and loop patterns.
Only the sum/product/average functions and the square() function are used,
because those functions appear in the source practicals. Completing every
lesson in a unit unlocks its checkpoint. Checkpoints cover output prediction,
debugging, and writing practical programs; passing every task unlocks the next
unit.

This curriculum update uses new lesson and checkpoint-task IDs, so completion
from the previous, function-based version does not count toward these revised
practicals.

Repeated versions of the parity, factorial, largest-number, square-sum, and
array exercises have been consolidated into one tested lesson or assessment
each. The array average has been made explicit as its own lesson because it
appears as a distinct extra exam practical in the study pack.

## Run locally

Open `index.html` in a modern browser. JavaScript practical tests use a
short-lived Web Worker so a learner's infinite loop can be stopped without
freezing the page. Serve the folder over HTTP for OAuth and browser worker
support; do not use a `file://` URL. Code drafts are saved separately for each
challenge in the browser and restored when that challenge is reopened; signed-in
learners' drafts are kept separate from guest drafts and other accounts.

## Google sign-in and per-user cloud progress

The app uses Supabase Auth for Google OAuth and Supabase Postgres to save each
signed-in learner's profile, lesson completions, checkpoint results, streak,
and recent activity. Run `supabase-schema.sql` once in a new Supabase project's
SQL Editor before testing cloud saves. Its row-level security policies
restrict each account to its own rows. Local cached progress is also separated
by signed-in user on a shared browser.

1. Create a Supabase project at [supabase.com](https://supabase.com/) if you do
   not already have one.
2. In the Supabase Dashboard, open **SQL Editor**, paste the contents of
   `supabase-schema.sql`, and run it.
3. Follow the [Supabase Google sign-in guide](https://supabase.com/docs/guides/auth/social-login/auth-google).
   In [Google Auth Platform](https://console.cloud.google.com/auth/clients),
   configure the consent screen and create an OAuth client of type **Web
   application**. While the app is in testing mode, add the learner's Google
   account as a test user.
4. Add the app's origin under Google **Authorized JavaScript origins**. For the
   local server below, use `http://127.0.0.1:8765`. Add the deployed site's
   origin too when you publish the app.
5. In Supabase **Authentication → Providers → Google**, enable Google and copy
   the callback URL shown there into Google's **Authorized redirect URIs**.
   Paste the Google OAuth client ID and client secret into the Supabase Google
   provider settings. Do not put the Google client secret in this website.
6. Follow Supabase's [redirect URL guide](https://supabase.com/docs/guides/auth/redirect-urls).
   In **Authentication → URL Configuration**, set **Site URL** to the
   deployed app URL. Add each exact app return URL under **Redirect URLs**, for
   example `http://127.0.0.1:8765/index.html` during local testing and
   `https://your-domain.example/index.html` when deployed. Add the localhost
   form too if you use `localhost` instead of `127.0.0.1`.
7. The project URL and publishable key you provided are configured in
   `script.js`. Publishable keys are designed for browser use and are safe to
   include with correctly configured row-level security. Never use a
   `service_role` key in the app.
8. Serve this folder on the same local origin configured above, then select
   **Continue with Google**. Test with two accounts to check that progress is
   kept separate.

For example, from this folder run
`python -m http.server 8765 --bind 127.0.0.1` and open
`http://127.0.0.1:8765/index.html`.

### Finding the Google OAuth client ID and secret

These are Google OAuth credentials, not Supabase keys:

1. Open [Google Auth Platform → Clients](https://console.cloud.google.com/auth/clients)
   in the Google account that owns the project.
2. Open **Create client → Web application**. Add your website's origin under
   **Authorized JavaScript origins**. Add the Supabase callback URL from
   **Supabase → Authentication → Providers → Google** under **Authorized
   redirect URIs**.
3. Select **Create**. Google shows the **Client ID** and **Client secret** in
   the confirmation dialog. If the dialog is closed, select the client in the
   Clients list to view its details and reset or retrieve its secret as
   offered by Google.
4. Copy both values into the Google provider settings in Supabase, then save.
   The Client ID ends in `.apps.googleusercontent.com`. Keep the Client secret
   private: enter it only in Supabase's provider settings. Never send it in
   chat or put it in `script.js`, HTML, or another browser file.
