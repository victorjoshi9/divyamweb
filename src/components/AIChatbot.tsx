import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './ui/GlassCard';
import { NeumorphicButton } from './ui/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { HOSPITAL_NAME, DOCTORS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTIONS = {
  visitor: `You are a helpful assistant for ${HOSPITAL_NAME} in Bikaner. 
  Services: Pediatrics, Dentistry, General Medicine, 24/7 ICU, Emergency, Pharmacy, Diagnostic Lab.
  Doctor Dashboard contains doctor names, timings, and consultation fees.
  Appointment booking: 
  1. Navigate to the 'Login' page. 
  2. Enter your mobile number.
  3. Proceed to the Dashboard to select a doctor and a preferred time slot.
  Always be professional, empathetic, and professional. Keep responses concise.`,
  admin: `You are the central hospital management assistant for ${HOSPITAL_NAME}.
  Your capabilities include:
  - Reporting: Generate summary reports on patient statistics, daily hospital revenue, and inventory status (low stock items).
  - Management: Provide insights on appointment queues, bed occupancy status, and staff performance metrics.
  Provide data-driven, structured, and managerial assistance.`,
  patient: `You are a patient care assistant for ${HOSPITAL_NAME}.
  Your role includes:
  - Records: Help patients navigate the portal to view Lab Reports, download Prescriptions (PDFs), and check billing history.
  - Prescriptions: Explain medication names, dosages, and common side effects if a prescription note is shared.
  - Guidance: Assist with hospital processes, appointment status, and health FAQ.
  Empathetic, clear, and reassuring tone.`
};

export default function AIChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! How can I assist you with your health today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const mode = user ? (user.role === 'admin' ? 'admin' : 'patient') : 'visitor';
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS[mode as keyof typeof SYSTEM_INSTRUCTIONS]
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to hospital server. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96"
          >
            <GlassCard className="h-[500px] flex flex-col bg-white/95 backdrop-blur-xl border-blue-200">
              <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <span className="font-semibold">{HOSPITAL_NAME} AI</span>
                </div>
                <button onClick={() => setIsOpen(false)}><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <Loader2 size={16} className="animate-spin text-blue-600" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <NeumorphicButton 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center p-0"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </NeumorphicButton>
    </div>
  );
}
