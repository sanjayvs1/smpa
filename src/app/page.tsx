"use client";
import { BackgroundLines } from '@/components/BgLines';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const ChatMessage = ({ message, isUser }: { message: string, isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${isUser ? 'bg-slate-700 text-foreground' : 'bg-slate-900 text-foreground-alt'
      }`}>
      <MarkdownRenderer content={message} />
    </div>
  </div>
);

export default function Home() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    try {
      const response = await fetch('/api/langflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add AI response to chat
      setMessages(prev => [...prev, { text: data.message, isUser: false }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message || 'Failed to get response',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundLines>
      <main className="max-w-3xl h-screen mx-auto px-4 py-10 flex flex-col gap-5 relative z-50">

        <div className='flex items-center gap-4'>
          <ModeToggle />
          <h1 className='font-bold'>Team Vimarsha's Level SuperMind Pre-Hackathon Submission</h1>
        </div>

        <div className="flex-1 pr-4 overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Send'
            )}
          </Button>
        </form>

      </main>
    </BackgroundLines>
  );
}