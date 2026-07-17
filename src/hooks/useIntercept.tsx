'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface InterceptState {
  isOpen: boolean;
  source: string;
}

interface InterceptContextType {
  state: InterceptState;
  triggerIntercept: (source: string) => void;
  closeIntercept: () => void;
}

const InterceptContext = createContext<InterceptContextType | null>(null);

export function InterceptProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<InterceptState>({
    isOpen: false,
    source: '',
  });

  const triggerIntercept = useCallback((source: string) => {
    setState({ isOpen: true, source });

    // Log to localStorage as telemetry fallback
    try {
      const events = JSON.parse(localStorage.getItem('varcheck_telemetry') || '[]');
      events.push({
        type: 'intercept_triggered',
        source,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent,
      });
      localStorage.setItem('varcheck_telemetry', JSON.stringify(events));
    } catch {
      // Silent fail for storage
    }

    // Attempt server-side telemetry
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'intercept_triggered',
        source,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      }),
    }).catch(() => {
      // Silent fail - localStorage is the fallback
    });
  }, []);

  const closeIntercept = useCallback(() => {
    setState({ isOpen: false, source: '' });
  }, []);

  return (
    <InterceptContext.Provider value={{ state, triggerIntercept, closeIntercept }}>
      {children}
    </InterceptContext.Provider>
  );
}

export function useIntercept() {
  const context = useContext(InterceptContext);
  if (!context) {
    throw new Error('useIntercept must be used within an InterceptProvider');
  }
  return context;
}
