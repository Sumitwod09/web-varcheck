import { NextResponse } from 'next/server';
import { logTelemetryEvent, TelemetryEvent } from '@/lib/telemetry';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const event: TelemetryEvent = {
      type: body.type || 'click',
      source: body.source || 'unknown',
      email: body.email || undefined,
      timestamp: body.timestamp || new Date().toISOString(),
      viewport: body.viewport || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      metadata: body.metadata || undefined,
    };

    const result = await logTelemetryEvent(event);

    return NextResponse.json({
      status: 'ok',
      eventId: result.id,
    });
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Failed to process telemetry event' },
      { status: 500 }
    );
  }
}
