-- Schools
CREATE TABLE public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  zone text,
  location geography (Point,4326)
);

-- Users
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text CHECK (role IN ('teacher', 'admin', 'scholar', 'student')),
  school_id uuid REFERENCES public.schools(id)
);

-- Community Resources
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text, -- e.g., 'library', 'clinic', 'food_bank', etc.
  location geography(Point, 4326),
  description text,
  verified boolean DEFAULT false,
  added_by uuid REFERENCES public.users(id)
);

-- Community Narratives
CREATE TABLE public.narratives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES public.resources(id),
  user_id uuid REFERENCES public.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Gamification: School Leaderboard
CREATE TABLE public.school_leaderboard (
  school_id uuid REFERENCES public.schools(id),
  score integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  PRIMARY KEY (school_id)
);

-- Data Contribution Log
CREATE TABLE public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  school_id uuid REFERENCES public.schools(id),
  type text CHECK (type IN ('resource', 'narrative')),
  created_at timestamptz DEFAULT now()
);

-- Example: Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.narratives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- 1) Create schema for extensions and install PostGIS (provides geography/geometry types)
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- 2) Ensure search_path includes extensions so geography type is resolvable in this session (optional in clients)
SET search_path = public, extensions, pg_catalog;

-- 3) Tables (your provided schema). Adjusted to use uuid_generate_v4() if you prefer -- keeping gen_random_uuid() as-is.

-- Schools
CREATE TABLE IF NOT EXISTS public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  zone text,
  location geography(Point,4326)
);

-- Users
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text CHECK (role IN ('educator', 'admin', 'scholar', 'student')),
  school_id uuid REFERENCES public.schools(id)
);

-- Community Resources
CREATE TABLE IF NOT EXISTS public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text,
  location geography(Point,4326),
  description text,
  verified boolean DEFAULT false,
  added_by uuid REFERENCES public.users(id)
);

-- Community Narratives
CREATE TABLE IF NOT EXISTS public.narratives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES public.resources(id),
  user_id uuid REFERENCES public.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Gamification: School Leaderboard
CREATE TABLE IF NOT EXISTS public.school_leaderboard (
  school_id uuid REFERENCES public.schools(id),
  score integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  PRIMARY KEY (school_id)
);

-- Data Contribution Log
CREATE TABLE IF NOT EXISTS public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  school_id uuid REFERENCES public.schools(id),
  type text CHECK (type IN ('resource', 'narrative')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on tables you intend to protect
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.narratives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;