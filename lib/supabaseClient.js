import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxlibidynslgbphmzxim.supabase.co';
const supabaseKey = 'sb_publishable_J18vT8bkMYlfkrOG_HU5wQ_4P0Lz8w9';

export const supabase = createClient(supabaseUrl, supabaseKey);