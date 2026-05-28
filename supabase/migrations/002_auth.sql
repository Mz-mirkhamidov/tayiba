-- =============================================================================
-- TAYIBA — Auth migratsiyasi
-- =============================================================================
-- Supabase Auth bilan integratsiya:
--   1. profiles jadvali — foydalanuvchi profili (Telegram ID bilan)
--   2. Auth trigger — yangi foydalanuvchi yaratilganda profil avtomatik yaratiladi
--   3. RLS — foydalanuvchi faqat o'z profilini ko'radi/tahrirlaydi
--   4. Orders jadvaliga user_id FK qo'shiladi (agar yo'q bo'lsa)
-- =============================================================================

-- 1. Profiles ----------------------------------------------------------------

create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text,
  full_name       text,
  phone           text,
  telegram_id     text unique,
  telegram_username text,
  avatar_url      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Updated-at trigger
drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- 2. Yangi foydalanuvchi → profil avtomatik yaratish -------------------------

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. RLS ---------------------------------------------------------------------

alter table public.profiles enable row level security;

do $$ begin
  create policy "Users can view their own profile"
    on public.profiles for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Users can update their own profile"
    on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

-- 4. Orders jadvaliga user_id qo'shish (agar yo'q bo'lsa) -------------------

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'orders' and column_name = 'user_id'
  ) then
    alter table public.orders add column user_id uuid references auth.users(id);
    create index if not exists orders_user_id_idx on public.orders(user_id);
  end if;
end;
$$;

-- Users can view their own orders
do $$ begin
  create policy "Users see their own orders"
    on public.orders for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
