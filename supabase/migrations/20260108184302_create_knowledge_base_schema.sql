/*
  # Knowledge Base Schema for Subscription State Logic
  
  1. New Tables
    - `scenarios`
      - `id` (uuid, primary key)
      - `name` (text) - Scenario name
      - `payment_method` (text) - ACH or Card
      - `billing_frequency` (text) - Monthly or Annual
      - `category` (text) - Product Only, Trial Only, etc.
      - `description` (text) - Brief description
      - `created_at` (timestamptz)
      
    - `scenario_steps`
      - `id` (uuid, primary key)
      - `scenario_id` (uuid, FK to scenarios)
      - `step_number` (integer) - For ordering
      - `date` (text) - Display date (e.g., "Jan 1", "Feb 7")
      - `event_type` (text) - Event description
      - `hl_subscription_status` (text, nullable)
      - `hl_transaction_status` (text, nullable)
      - `nmrk_subscription_status` (text, nullable)
      - `nmrk_transaction_status` (text, nullable)
      - `notes` (text, nullable) - Additional context
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on both tables
    - Public read access (knowledge base is read-only for all users)
*/

CREATE TABLE IF NOT EXISTS scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  payment_method text NOT NULL,
  billing_frequency text NOT NULL,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scenario_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id uuid NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  date text NOT NULL,
  event_type text NOT NULL,
  hl_subscription_status text,
  hl_transaction_status text,
  nmrk_subscription_status text,
  nmrk_transaction_status text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scenario_steps_scenario_id ON scenario_steps(scenario_id);
CREATE INDEX IF NOT EXISTS idx_scenario_steps_step_number ON scenario_steps(scenario_id, step_number);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to scenarios"
  ON scenarios FOR SELECT
  USING (true);

CREATE POLICY "Public read access to scenario steps"
  ON scenario_steps FOR SELECT
  USING (true);