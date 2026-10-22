import { NextRequest, NextResponse } from 'next/server';
import { CAPSTONE_PROJECTS, evaluateStudentProjectSubmission } from '@/lib/project-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, codeOrDiagramText } = body;

    if (action === 'review') {
      const review = evaluateStudentProjectSubmission(codeOrDiagramText || '');
      return NextResponse.json({ review });
    }

    const project = CAPSTONE_PROJECTS['industry_data_platform'];
    return NextResponse.json({ project });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
