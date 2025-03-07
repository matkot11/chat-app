import Layout from '@/layout/Layout.tsx';
import { useGetUser } from '@/features/auth/hooks/useGetUser.ts';
import UnauthenticatedUserInfo from '@/features/chat/components/UnauthenticatedUserInfo.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx';
import SelectCorrespondent from '@/features/chat/components/SelectCorrespondent.tsx';
import styles from './ChatView.module.scss';
import { useEffect, useState } from 'react';
import ChatDialog from '@/features/chat/components/ChatDialog.tsx';
import { supabase } from '@/supabase';
import { useToast } from '@/hooks/use-toast.ts';
import { Tables } from '@/supabase/typings.ts';
import { Button } from '@/components/ui/button.tsx';
import { formatDate } from '@/features/chat/utils/formatDate.ts';

export default function ChatView() {
  const { user } = useGetUser();
  const { toast } = useToast();
  const [correspondentId, setCorrespondentId] = useState<number | null>(null);
  const [chat, setChat] = useState<Tables<'chat'>[] | null>(null);

  const fetchChat = async () => {
    const { data, error } = await supabase.from('chat').select();

    if (error) {
      toast({
        title: 'An error occurred',
        description: error.message,
      });
      return;
    }

    setChat(data);
  };

  useEffect(() => {
    fetchChat();
  }, [correspondentId]);

  const displayChat = async (id: number, name: string) => {
    if (chat && !chat.find(({ correspondent_id }) => correspondent_id === id)) {
      await supabase
        .from('chat')
        .insert([{ correspondent_id: id, correspondent_name: name }]);
    }

    setCorrespondentId(id);
  };

  if (!user && chat) {
    return (
      <Layout>
        <UnauthenticatedUserInfo />
      </Layout>
    );
  }

  return (
    <Layout>
      <ChatDialog
        id={correspondentId}
        clearCorrespondentId={() => setCorrespondentId(null)}
      />

      <div className={styles.wrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Correspondent</TableHead>
              <TableHead>Number of messages</TableHead>
              <TableHead>Last activity</TableHead>
              <TableHead>Messages</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {chat ? (
              chat.map(
                ({
                  correspondent_id,
                  correspondent_name,
                  messages,
                  updated_at,
                }) => (
                  <TableRow key={correspondent_id}>
                    <TableCell>{correspondent_name}</TableCell>
                    <TableCell>{messages.length}</TableCell>
                    <TableCell>
                      {messages.length ? formatDate(updated_at) : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={async () =>
                          await displayChat(
                            correspondent_id,
                            correspondent_name
                          )
                        }
                      >
                        Messages
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={4} className={styles.loading}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className={styles.newChat}>
          <span>Chat with</span>
          <SelectCorrespondent onSelect={displayChat} />
        </div>
      </div>
    </Layout>
  );
}
