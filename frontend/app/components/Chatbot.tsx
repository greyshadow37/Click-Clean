"use client";

import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm your civic assistant. Ask me about your reports!", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Simple rule-based responses
    let response = "I'm sorry, I don't understand. Try asking about 'status of my report' or 'how to report an issue'.";
    
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('status') && lowerInput.includes('report')) {
      response = "To check your report status, go to the Tracking page and filter by your issues.";
    } else if (lowerInput.includes('report') && lowerInput.includes('issue')) {
      response = "To report a new issue, click the 'Report Issue' button in the header and fill out the form.";
    } else if (lowerInput.includes('help')) {
      response = "I can help with: checking report status, how to report issues, or general civic information.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* Chatbot Button */}
      <button 
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px', // Moved up to avoid bottom nav
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Open Civic Assistant"
      >
        <i className="fas fa-comments"></i>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div 
          className="chatbot-modal"
          style={{
            position: 'fixed',
            bottom: '170px', // Adjusted for new button position
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div 
            className="chatbot-header"
            style={{
              padding: '10px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Civic Assistant</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
          
          <div 
            className="chatbot-messages"
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              backgroundColor: '#f9f9f9'
            }}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: '8px',
                  textAlign: msg.isUser ? 'right' : 'left'
                }}
              >
                <span 
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '18px',
                    backgroundColor: msg.isUser ? 'var(--color-primary)' : '#e0e0e0',
                    color: msg.isUser ? 'white' : 'black',
                    maxWidth: '80%'
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          
          <div 
            className="chatbot-input"
            style={{
              padding: '10px',
              borderTop: '1px solid #ddd',
              display: 'flex'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me something..."
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginRight: '8px'
              }}
            />
            <button 
              onClick={handleSend}
              style={{
                padding: '8px 12px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;