import { supabase } from '@/supabase';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router';

export const useSignOut = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: error.name,
        description: error.message,
      });

      return;
    }

    navigate(0);
  };

  return { signOut };
};
