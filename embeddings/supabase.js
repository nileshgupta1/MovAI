import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hwhrjasgnrywyaxbfbub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHJqYXNnbnJ5d3lheGJmYnViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTA5NTUwOSwiZXhwIjoyMDM0NjcxNTA5fQ.Af1qPn2MrgtQwsjqXG-k4y8HTw2RwrbWyHb1gr0WUOI';

export const supabase = createClient(supabaseUrl, supabaseKey);