import { supabase } from '@/supabase';
import { useState } from 'react';
import { Json, Tables } from '@/supabase/typings.ts';
import { useToast } from '@/hooks/use-toast.ts';
import axios from 'axios';

export const useMessages = () => {
  const { toast } = useToast();
  const [chat, setChat] = useState<Tables<'chat'> | null>(null);

  const getMessages = async (id: number) => {
    const { data, error } = await supabase
      .from('chat')
      .select()
      .eq('correspondent_id', id)
      .single();

    if (error) {
      toast({
        title: 'An error occurred',
        description: error.message,
      });

      return;
    }

    setChat(data);
  };

  const getRandomMessage = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes/random');

      return response.data.quote;
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: "Character couldn't send you a message",
      });
    }
  };

  const sendRandomMessage = async (id: number, messages: Json[]) => {
    if (!chat) return;

    setTimeout(async () => {
      const { data, error } = await supabase
        .from('chat')
        .update({
          messages: [
            ...messages,
            { message: await getRandomMessage(), author: id },
          ],
        })
        .eq('correspondent_id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: 'An error occurred',
          description: error.message,
        });

        return;
      }
      console.log('pupa', data.messages);
      setChat(data);
    }, 2000);
  };

  const sendMessage = async (message: string, id: number) => {
    if (!chat) return;

    const { data, error } = await supabase
      .from('chat')
      .update({ messages: [...chat.messages, { message, author: 'you' }] })
      .eq('correspondent_id', id)
      .select()
      .single();

    if (error) {
      toast({
        title: 'An error occurred',
        description: error.message,
      });

      return;
    }

    setChat(data);

    await sendRandomMessage(id, data.messages);
  };

  return {
    chat,
    getMessages,
    sendMessage,
  };
};
