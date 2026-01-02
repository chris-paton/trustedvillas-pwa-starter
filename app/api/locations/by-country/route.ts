import { NextResponse } from 'next/server';

// Disable SSL verification for localhost in development
const originalEnv = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ACCOMMODATION_API_BASE ?? 'https://localhost:7214';
    const apiUrl = `${baseUrl}/api/Locations/by-country`;

    console.log('Fetching locations by country from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch locations by country: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching locations by country:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// Restore original setting
if (originalEnv !== undefined) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalEnv;
}
