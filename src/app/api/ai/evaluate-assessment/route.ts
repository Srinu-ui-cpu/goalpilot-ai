import { NextRequest, NextResponse } from 'next/server';
import { generateSyntheticAssessmentEvaluation } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, coachType } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Answers array required' }, { status: 400 });
    }

    const evaluation = generateSyntheticAssessmentEvaluation(answers, coachType || 'david_goggins');
    return NextResponse.json({ evaluation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
