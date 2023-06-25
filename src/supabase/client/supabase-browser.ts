import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/types/supabase';

export const createClient = () => createClientComponentClient();

export default createClientComponentClient<Database>();
