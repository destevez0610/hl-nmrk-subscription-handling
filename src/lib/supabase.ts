import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Scenario = {
  id: string;
  name: string;
  payment_method: string;
  billing_frequency: string;
  category: string;
  description: string | null;
  created_at: string;
};

export type ScenarioStep = {
  id: string;
  scenario_id: string;
  step_number: number;
  date: string;
  event_type: string;
  hl_subscription_status: string | null;
  hl_transaction_status: string | null;
  nmrk_subscription_status: string | null;
  nmrk_transaction_status: string | null;
  notes: string | null;
  created_at: string;
};
