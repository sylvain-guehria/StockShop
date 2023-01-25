import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Database } from 'src/types/supabase';

const createServerSupabaseSSRClient = ({
  res,
  req,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => createServerSupabaseClient<Database>({ res, req });

export default createServerSupabaseSSRClient;
