import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { useEffect, useState } from 'react';
import { useCharacter } from '@/features/characters/hooks/useCharacter.tsx';
import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import styles from './ChatDialog.module.scss';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { formatDate } from '@/features/chat/utils/formatDate.ts';
import { cn } from '@/lib/utils.ts';
import { useMessages } from '@/features/chat/hooks/useMessages.tsx';

export default function ChatDialog({
  id,
  clearCorrespondentId,
}: {
  id: number | null;
  clearCorrespondentId: () => void;
}) {
  const [isChatOpen, openChat] = useState(false);
  const { getCharacter, character } = useCharacter();
  const { chat, getMessages, sendMessage } = useMessages();

  useEffect(() => {
    if (!id) return;
    getCharacter(id.toString());

    openChat(true);
    getMessages(id);
    clearCorrespondentId();
  }, [id]);

  if (!chat) return;

  return (
    <Dialog open={isChatOpen} onOpenChange={openChat}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={styles.header}>
            <Avatar>
              <AvatarImage src={character?.image} />
            </Avatar>
            <span>{character?.name}</span>
          </DialogTitle>
          <DialogDescription>
            {!!chat.messages.length
              ? `Last message sent ${formatDate(chat.updated_at)}`
              : 'Send you first message!'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className={styles.messages}>
            {(
              chat.messages as unknown as {
                message: string;
                author: string | number;
              }[]
            ).map(({ message, author }, index) => (
              <div
                key={index}
                className={cn(
                  styles.message,
                  typeof author === 'number' && styles.messageAuthor
                )}
              >
                {message}
              </div>
            ))}
          </div>

          <form
            className={styles.inputWrapper}
            action={async (formData) =>
              await sendMessage(
                Object.fromEntries(formData).message as string,
                chat.correspondent_id
              )
            }
          >
            <Input placeholder="Type message" id="message" name="message" />
            <Button type="submit">Send message</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
