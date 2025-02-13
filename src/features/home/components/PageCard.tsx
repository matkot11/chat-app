import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Link, useNavigate } from 'react-router';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { MoveRight } from 'lucide-react';
import styles from './PageCard.module.scss';
import { supabase } from '@/supabase';
import { useToast } from '@/hooks/use-toast.ts';

export default function PageCard({
  title,
  description,
  path,
  authenticated,
}: {
  title: string;
  description: string;
  path?: string;
  authenticated?: boolean;
}) {
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
  return (
    <Card className={styles.wrapper}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={styles.description}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        {authenticated || !path ? (
          <Button onClick={signOut} className={styles.link}>
            Sign out <MoveRight />
          </Button>
        ) : (
          <Link
            className={buttonVariants({ className: styles.link })}
            to={path}
          >
            Go <MoveRight />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
