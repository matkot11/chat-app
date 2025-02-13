import styles from './SignIn.module.scss';
import { supabase } from '@/supabase';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast.ts';
import { useNavigate } from 'react-router';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const navigate = useNavigate();

  const signIn = async ({ email, password }: SignInFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: error.name,
        description: error.message,
      });

      return;
    }

    navigate('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Please log in to chat with Rick and Morty characters.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) =>
            signIn(Object.fromEntries(formData) as SignInFormData)
          }
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            className={styles.input}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className={styles.input}
          />
          <Button type="submit" disabled={pending} className={styles.button}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
