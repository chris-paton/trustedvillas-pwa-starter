import { NextResponse } from 'next/server';

// Disable SSL verification for localhost in development
const originalEnv = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ACCOMMODATION_API_BASE ?? 'https://localhost:7214';
    const apiUrl = `${baseUrl}/api/AccommodationList/random`;

    console.log('Fetching random accommodations from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch random accommodations: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched random accommodations, count:', Array.isArray(data) ? data.length : 'not an array');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching random accommodations:', error);
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
