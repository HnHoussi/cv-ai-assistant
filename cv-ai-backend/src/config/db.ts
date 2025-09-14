// import the off supabase js client library
import {createClient} from "@supabase/supabase-js";

// read the .env variables (! because they are non-null vars)
const supabaseUrl = process.env.SUPPABASE_URL!;
const supabaseKey = process.env.SUPPABASE_KEY!;

// create the supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);