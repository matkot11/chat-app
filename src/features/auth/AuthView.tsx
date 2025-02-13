import Layout from '@/layout/Layout.tsx';
import styles from './AuthView.module.scss';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import SignUp from '@/features/auth/SignUp.tsx';
import SignIn from '@/features/auth/SignIn.tsx';

export default function AuthView() {
  return (
    <Layout className={styles.wrapper}>
      <Tabs defaultValue="signUp" className={styles.tabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
        </TabsList>

        <TabsContent value="signUp">
          <SignUp />
        </TabsContent>
        <TabsContent value="signIn">
          <SignIn />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
