import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button.tsx';
import { MoveRight } from 'lucide-react';
import styles from './UnauthenticatedUserInfo.module.scss';

export default function UnauthenticatedUserInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hey anonymous user</CardTitle>
        <CardDescription>Please authenticate to use chat.</CardDescription>
      </CardHeader>

      <CardContent>
        <Link className={buttonVariants({ className: styles.link })} to="/auth">
          Authenticate <MoveRight />
        </Link>
      </CardContent>
    </Card>
  );
}
