import { NextRequest, NextResponse } from 'next/server';
import { askAI } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, coachType, context, byokConfig } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = await askAI({
      userPrompt: message,
      coachType: coachType || 'david_goggins',
      context: context || '',
      byokConfig
    });

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal AI Error' }, { status: 500 });
  }
}
