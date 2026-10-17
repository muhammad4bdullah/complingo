alter table public.profiles
    add column if not exists email text;

update public.profiles as profile
set email = auth_user.email
from auth.users as auth_user
where profile.id = auth_user.id
    and profile.email is null;

create table if not exists public.app_admins (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);

create table if not exists public.code_submissions (
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

create index if not exists code_submissions_user_created_idx
    on public.code_submissions (user_id, created_at desc);

alter table public.app_admins enable row level security;
alter table public.code_submissions enable row level security;

revoke all on table public.app_admins from anon, authenticated;
revoke all on table public.code_submissions from anon, authenticated;
grant select on table public.app_admins to authenticated;
grant select, insert on table public.code_submissions to authenticated;

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
    on public.profiles for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

drop policy if exists "Admins can verify their own role" on public.app_admins;
create policy "Admins can verify their own role"
    on public.app_admins for select to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Admins can read all learner progress"
    on public.student_progress;
create policy "Admins can read all learner progress"
    on public.student_progress for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

drop policy if exists "Admins can read all assessment results"
    on public.assessment_results;
create policy "Admins can read all assessment results"
    on public.assessment_results for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

drop policy if exists "Admins can read all learner activity"
    on public.learner_state;
create policy "Admins can read all learner activity"
    on public.learner_state for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));

drop policy if exists "Learners can read their own code submissions"
    on public.code_submissions;
create policy "Learners can read their own code submissions"
    on public.code_submissions for select to authenticated
    using ((select auth.uid()) = user_id);

drop policy if exists "Learners can submit their own code"
    on public.code_submissions;
create policy "Learners can submit their own code"
    on public.code_submissions for insert to authenticated
    with check ((select auth.uid()) = user_id);

drop policy if exists "Admins can read all code submissions"
    on public.code_submissions;
create policy "Admins can read all code submissions"
    on public.code_submissions for select to authenticated
    using (exists (
        select 1 from public.app_admins
        where app_admins.user_id = (select auth.uid())
    ));
