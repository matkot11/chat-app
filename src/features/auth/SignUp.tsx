import styles from './SignUp.module.scss';
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

type SignUpFormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const navigate = useNavigate();

  const signUp = async ({
    email,
    name,
    password,
    confirmPassword,
  }: SignUpFormData) => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords doesn't match",
        description: 'Please provide the same password in both fields',
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
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
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Please create an account to chat with Rick and Morty characters.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          action={async (formData) =>
            await signUp(Object.fromEntries(formData) as SignUpFormData)
          }
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            className={styles.input}
          />
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" className={styles.input} />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className={styles.input}
          />
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={styles.input}
          />
          <Button type="submit" disabled={pending} className={styles.button}>
            Sign up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
