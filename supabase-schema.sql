create table public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    display_name text not null,
    email text,
    created_at timestamptz not null default now()
);

create table public.app_admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);

create table public.student_progress (
    user_id uuid not null references auth.users (id) on delete cascade,
    lesson_id text not null,
    completed boolean not null default false,
    updated_at timestamptz not null default now(),
    primary key (user_id, lesson_id)
);

create table public.assessment_results (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    assessment_id text not null,
    score integer not null check (score >= 0),
    max_score integer not null check (max_score > 0 and score <= max_score),
    created_at timestamptz not null default now()
);

create table public.learner_state (
    user_id uuid primary key references auth.users (id) on delete cascade,
    activities jsonb not null default '[]'::jsonb,
    last_active_date date,
    streak integer not null default 0 check (streak >= 0),
    updated_at timestamptz not null default now()
);

create table public.code_submissions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    challenge_id text not null,
    challenge_title text not null,
    checkpoint_id text,
    context text not null,
    language text not null,
    action text not null check (action in ('run', 'check')),
    code text not null,
    created_at timestamptz not null default now()
);

create index assessment_results_user_created_idx
    on public.assessment_results (user_id, created_at desc);
create index code_submissions_user_created_idx
    on public.code_submissions (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.app_admins enable row level security;
alter table public.student_progress enable row level security;
alter table public.assessment_results enable row level security;
alter table public.learner_state enable row level security;
alter table public.code_submissions enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.app_admins from anon, authenticated;
revoke all on table public.student_progress from anon, authenticated;
revoke all on table public.assessment_results from anon, authenticated;
revoke all on table public.learner_state from anon, authenticated;
revoke all on table public.code_submissions from anon, authenticated;

grant select, insert on table public.profiles to authenticated;
grant select on table public.app_admins to authenticated;
grant select, insert, update on table public.student_progress to authenticated;
grant select, insert on table public.assessment_results to authenticated;
grant select, insert, update on table public.learner_state to authenticated;
grant select, insert on table public.code_submissions to authenticated;

create policy "Learners can read their own profile"
    on public.profiles for select to authenticated
    using ((select auth.uid()) = id);

create policy "Learners can create their own profile"
    on public.profiles for insert to authenticated
    with check ((select auth.uid()) = id);

create policy "Admins can read all profiles"
    on public.profiles for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

create policy "Admins can verify their own role"
    on public.app_admins for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Learners can read their own progress"
    on public.student_progress for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Learners can create their own progress"
    on public.student_progress for insert to authenticated
    with check ((select auth.uid()) = user_id);

create policy "Learners can update their own progress"
    on public.student_progress for update to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

create policy "Admins can read all learner progress"
    on public.student_progress for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

create policy "Learners can read their own assessment results"
    on public.assessment_results for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Learners can create their own assessment results"
    on public.assessment_results for insert to authenticated
    with check ((select auth.uid()) = user_id);

create policy "Admins can read all assessment results"
    on public.assessment_results for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

create policy "Learners can read their own activity"
    on public.learner_state for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Learners can create their own activity"
    on public.learner_state for insert to authenticated
    with check ((select auth.uid()) = user_id);

create policy "Learners can update their own activity"
    on public.learner_state for update to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

create policy "Admins can read all learner activity"
    on public.learner_state for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

create policy "Learners can read their own code submissions"
    on public.code_submissions for select to authenticated
    using ((select auth.uid()) = user_id);

create policy "Learners can submit their own code"
    on public.code_submissions for insert to authenticated
    with check ((select auth.uid()) = user_id);

create policy "Admins can read all code submissions"
    on public.code_submissions for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));
