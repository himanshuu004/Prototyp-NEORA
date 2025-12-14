"use client";

import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[]; // Follow-up questions to show after this message
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you with questions about NEORA therapy services, bookings, and general therapy information. How can I assist you?",
      suggestions: [
        "What services do you offer?",
        "How do I book a session?",
        "Do you treat autism?",
        "What are your clinic hours?",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get follow-up questions based on the topic
  const getFollowUpQuestions = (userMessage: string): string[] => {
    const message = userMessage.toLowerCase().trim();

    if (message.includes("service") || message.includes("therapy")) {
      return [
        "How do I book a session?",
        "What are the session durations?",
        "What disorders do you treat?",
      ];
    }

    if (message.includes("book") || message.includes("appointment")) {
      return [
        "What services are available?",
        "What are your clinic hours?",
        "How much does it cost?",
      ];
    }

    if (message.includes("autism") || message.includes("adhd") || message.includes("disorder")) {
      return [
        "What services help with this?",
        "How do I book a session?",
        "What is the therapy process?",
      ];
    }

    if (message.includes("hour") || message.includes("time") || message.includes("open")) {
      return [
        "How do I book a session?",
        "Where are you located?",
        "What services do you offer?",
      ];
    }

    // Default follow-up questions
    return [
      "What services do you offer?",
      "How do I book a session?",
      "Tell me about your therapy approach",
    ];
  };

  // Simple inbuilt chatbot with structured responses
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();

    // Services questions
    if (message.includes("service") || message.includes("therapy") || message.includes("treatment")) {
      if (message.includes("speech")) {
        return "We offer Speech Therapy for both children and adults. Our sessions help with speech clarity, language development, voice disorders, and communication skills. Each session is 45 minutes long. To book a session, please login and visit our booking page.";
      }
      if (message.includes("occupational") || message.includes("ot")) {
        return "Our Occupational Therapy services focus on developing daily living skills, fine and gross motor skills, sensory processing, and helping individuals achieve independence. Sessions are 45 minutes. Book a session through your account after logging in.";
      }
      if (message.includes("special education") || message.includes("education")) {
        return "Our Special Education program provides personalized learning strategies and academic support for children with learning difficulties. We help with reading, writing, math, and other academic skills. Book through our booking page after logging in.";
      }
      if (message.includes("behavior") || message.includes("behaviour") || message.includes("life skill")) {
        return "Our Behaviour & Life Skills program helps develop positive behaviors, social skills, and essential life skills for both children and adults. Sessions are 45 minutes. Please login to book a session.";
      }
      return "We offer several services:\n\n• Speech Therapy (children & adults)\n• Occupational Therapy\n• Special Education\n• Behaviour & Life Skills\n• Adult Speech & Voice Therapy\n\nAll sessions are 45 minutes. To book, please login and visit our booking page.";
    }

    // Booking questions
    if (message.includes("book") || message.includes("appointment") || message.includes("schedule") || message.includes("session")) {
      return "To book a session:\n\n1. Please login or create an account\n2. Go to the 'Booking' page\n3. Select your preferred date and time slot\n4. Fill in the session details\n5. Confirm your booking\n\nYou'll be able to view all your booked sessions in your dashboard.";
    }

    // Disorders/conditions
    if (message.includes("autism") || message.includes("asd")) {
      return "Yes, we provide comprehensive therapy services for Autism Spectrum Disorder (ASD). Our approach includes speech therapy, occupational therapy, behavior management, and social skills development. Please login and book a session to get started.";
    }
    if (message.includes("adhd")) {
      return "We help children and adults with ADHD through behavior management, organization skills training, and attention improvement strategies. Our therapists create personalized plans. Book a session through your account.";
    }
    if (message.includes("speech delay") || message.includes("delay")) {
      return "Speech delay is one of our specialties! We provide early intervention and therapy to support children's speech and language development. Our sessions are designed to be engaging and effective. Login to book a session.";
    }
    if (message.includes("stutter") || message.includes("stuttering")) {
      return "We offer specialized speech therapy for stuttering using evidence-based techniques to improve speech fluency and communication confidence. Sessions are 45 minutes. Please login to book.";
    }
    if (message.includes("learning disabilit") || message.includes("dyslexia") || message.includes("dyscalculia")) {
      return "Our Special Education program addresses various learning disabilities through personalized strategies and accommodations. We help with reading, writing, math, and other academic challenges. Book a session after logging in.";
    }

    // General questions
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Welcome to NEORA therapy clinic. I'm here to help you with questions about our services, booking sessions, or general information. How can I assist you today?";
    }
    if (message.includes("contact") || message.includes("phone") || message.includes("email") || message.includes("address")) {
      return "You can contact us through:\n\n• Visit our Contact page on the website\n• Call us (phone number available on Contact page)\n• Email us (email available on Contact page)\n• Visit us during office hours: Monday-Friday 9AM-6PM, Saturday 9AM-1PM\n\nCheck the Contact page for detailed information.";
    }
    if (message.includes("hour") || message.includes("open") || message.includes("time")) {
      return "Our clinic hours are:\n\n• Monday - Friday: 9:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 1:00 PM\n• Sunday: Closed\n\nPlease login and book your session through our booking system.";
    }
    if (message.includes("price") || message.includes("cost") || message.includes("fee") || message.includes("payment")) {
      return "Session pricing and payment details are available in your dashboard after booking. You can also view your payment history there. For specific pricing information, please contact us through our Contact page or book a session to see details.";
    }
    if (message.includes("login") || message.includes("sign up") || message.includes("register") || message.includes("account")) {
      return "You can create an account or login by clicking the 'Login' or 'Sign Up' button in the top right corner of the website. After creating an account, you'll be able to book sessions and access your dashboard.";
    }

    // Default response
    return "I can help you with information about:\n\n• Our therapy services (Speech, OT, Special Education, etc.)\n• Booking sessions\n• Disorders we treat (Autism, ADHD, Speech delay, etc.)\n• Clinic hours and contact information\n• Account and login help\n\nPlease ask me a specific question, and I'll do my best to help!";
  };

  const handleSend = (question?: string) => {
    const messageToSend = question || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage = messageToSend.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      const followUpQuestions = getFollowUpQuestions(userMessage);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
          suggestions: followUpQuestions,
        },
      ]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 text-white rounded-full p-5 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50"
        style={{ backgroundColor: 'rgba(230, 82, 139)' }}
        aria-label="Open chat"
      >
        <FaComments size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 overflow-hidden" style={{ borderColor: 'rgba(29, 144, 202, 0.2)' }}>
          <div className="text-white p-5 rounded-t-2xl flex justify-between items-center shadow-md" style={{ backgroundColor: 'rgba(29, 144, 202)' }}>
            <h3 className="font-bold text-lg">NEORA Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
              aria-label="Close chat"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ backgroundColor: 'rgba(160, 197, 70, 0.05)' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                      msg.role === "user"
                        ? "text-white"
                        : "bg-white text-gray-800 border-2"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: 'rgba(230, 82, 139)' } : { borderColor: 'rgba(29, 144, 202, 0.2)' }}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</div>
                  </div>
                </div>
                
                {/* Show suggested questions after assistant messages */}
                {msg.role === "assistant" && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.suggestions.map((suggestion, sugIdx) => (
                      <button
                        key={sugIdx}
                        onClick={() => handleQuestionClick(suggestion)}
                        className="text-xs px-4 py-2 rounded-full border-2 hover:shadow-md transition-all duration-200 font-medium"
                        style={{ 
                          backgroundColor: 'rgba(160, 197, 70, 0.1)', 
                          color: 'rgba(29, 144, 202)',
                          borderColor: 'rgba(29, 144, 202, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(160, 197, 70, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(29, 144, 202, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(160, 197, 70, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(29, 144, 202, 0.3)';
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-4 shadow-md border-2" style={{ borderColor: 'rgba(29, 144, 202, 0.2)' }}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(29, 144, 202)', animationDelay: "0s" }}></div>
                    <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(230, 82, 139)', animationDelay: "0.2s" }}></div>
                    <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: 'rgba(160, 197, 70)', animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t-2 flex space-x-3 bg-white" style={{ borderColor: 'rgba(29, 144, 202, 0.2)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border-2 rounded-xl px-4 py-3 focus:outline-none transition-all text-sm"
              style={{ 
                borderColor: 'rgba(29, 144, 202, 0.3)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(29, 144, 202, 0.6)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29, 144, 202, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(29, 144, 202, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
              style={{ backgroundColor: 'rgba(230, 82, 139)' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

