import { NextResponse } from 'next/server';
import { getCvData, getAllCvData } from '@/lib/cv';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    if (lang === 'en' || lang === 'id') {
      const cvData = await getCvData(lang);
      return NextResponse.json(cvData, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    const allData = await getAllCvData();
    // Return backward-compatible object: includes all fields of `id`, plus `id` and `en` properties
    const responsePayload = {
      ...allData.id,
      id: allData.id,
      en: allData.en,
    };

    return NextResponse.json(responsePayload, {
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
