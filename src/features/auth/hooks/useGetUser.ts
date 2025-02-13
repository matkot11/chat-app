import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserLoading(false);
    if (!user) return;
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, userLoading };
};
