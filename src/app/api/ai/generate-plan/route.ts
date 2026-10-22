import { NextRequest, NextResponse } from 'next/server';
import { generatePlanOptions } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dailyMinutes, careerGoal } = body;

    const plans = generatePlanOptions(dailyMinutes || 60, careerGoal || 'Senior Data Engineer');
    return NextResponse.json({ plans });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
