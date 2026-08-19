import { NextResponse } from 'next/server';
import { getCvData } from '@/lib/cv';

export async function GET() {
  try {
    const cvData = await getCvData();
    return NextResponse.json(cvData);
  } catch (error) {
    console.error('Error fetching CV data:', error);
    return NextResponse.json({ error: 'Failed to fetch CV data' }, { status: 500 });
  }
}
