import { getSupabaseClient } from './supabase';

export interface TelemetryEvent {
  type: 'intercept_triggered' | 'email_captured' | 'page_view' | 'click';
  source?: string;
  email?: string;
  timestamp: string;
  viewport?: string;
  userAgent?: string;
  metadata?: Record<string, string>;
}

export async function logTelemetryEvent(event: TelemetryEvent): Promise<{ success: boolean; id?: string }> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('telemetry_events')
        .insert([event])
        .select('id')
        .single();

      if (error) throw error;
      return { success: true, id: data?.id };
    } catch {
      // Fall through to localStorage
    }
  }

  // localStorage fallback
  const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
  return { success: true, id };
}

export function getLocalTelemetry(): TelemetryEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('varcheck_telemetry') || '[]');
  } catch {
    return [];
  }
}
