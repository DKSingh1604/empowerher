import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  Bot,
  User,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

// Polished, highly professional system prompt
const SYSTEM_PROMPT = `You are the official Executive AI Assistant for "EmpowerHer", a premier digital platform dedicated to empowering women entrepreneurs and connecting them with NGOs and funding.

Your mission is to provide world-class, empathetic, and highly professional support.

STRICT GUIDELINES:
1. DOMAIN EXPERTISE: Only answer questions related to EmpowerHer (e.g., how to sign in, sign up, set up a store, buy products, or NGO funding). Politely deflect any topics outside this scope.
2. TONE & STRUCTURE: Always respond with a warm, professional, and encouraging tone. Use clear, step-by-step instructions for processes. Use short paragraphs. Use standard bullet points (-) instead of asterisks. Keep answers concise but comprehensive.
3. LANGUAGE MATCHING: You MUST ALWAYS respond in the EXACT same language that the user asks you in.
4. NO MARKDOWN: Do not use markdown like **bolding** or # headers. Rely on standard text spacing and simple dashes (-) for lists.`;

export const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg',
      sender: 'ai',
      text: 'Welcome to EmpowerHer. I am your dedicated AI Assistant. How may I assist you with your entrepreneurial journey today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleVoiceRecording = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Your browser doesn't support voice input. Please type your message.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Microphone active. Please speak clearly.");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      toast.success("Voice transcribed successfully.");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API configuration missing.");
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${userMessage.text}` }]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 600,
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Connection failed.");
      }

      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't process your request.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I am temporarily disconnected from the server. Please ensure your configuration is correct and try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button with Glow */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {!isOpen && (
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping shadow-xl" style={{ animationDuration: '3s' }}></div>
        )}
        <button
          onClick={toggleChat}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-secondary text-secondary-foreground rotate-90 scale-0' 
              : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:scale-110 hover:shadow-primary/30'
          }`}
        >
          <Sparkles size={26} className="animate-pulse" />
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[360px] sm:w-[420px] h-[550px] shadow-2xl flex flex-col z-50 transition-all duration-500 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Professional Outer Container */}
        <div className="flex-1 flex flex-col bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          
          {/* Glassmorphic Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-transparent border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-sm">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-tight">EmpowerHer Support</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">AI Assistant Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="p-2 rounded-full hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-5">
            <div className="flex flex-col gap-6 pb-2">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-secondary/80 text-secondary-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  <div className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-foreground text-background rounded-2xl rounded-tr-sm font-medium' 
                      : 'bg-background border border-border/50 text-foreground rounded-2xl rounded-tl-sm whitespace-pre-wrap'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto items-end">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="px-5 py-4 text-sm bg-background border border-border/50 text-foreground rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-background border-t border-border/50">
            <form 
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 bg-secondary/30 p-1.5 rounded-full border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-inner"
            >
              <button
                type="button"
                onClick={handleVoiceRecording}
                className={`p-2.5 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500/10 text-red-500 animate-pulse' 
                    : 'text-muted-foreground hover:bg-background hover:text-foreground hover:shadow-sm'
                }`}
                title="Speak to type"
              >
                <Mic size={18} />
              </button>
              
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 shadow-none text-[15px]"
              />
              
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !inputText.trim()}
                className="shrink-0 h-10 w-10 rounded-full shadow-sm transition-transform active:scale-95"
              >
                <Send size={16} className={`${inputText.trim() ? 'translate-x-0.5' : ''}`} />
              </Button>
            </form>
            <div className="text-[10px] text-center text-muted-foreground/70 mt-3 font-medium tracking-wide">
              EmpowerHer AI is powered by Google Gemini
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
