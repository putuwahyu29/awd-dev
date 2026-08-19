import { NextResponse } from 'next/server';
import { getCvData } from '@/lib/cv';

export async function GET() {
  try {
    const cvData = await getCvData();
    return NextResponse.json(cvData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching CV data:', error);
    return NextResponse.json({ error: 'Failed to fetch CV data' }, { status: 500 });
  }
}

