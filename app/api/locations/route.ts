import { NextRequest, NextResponse } from 'next/server';

// Disable SSL verification for localhost in development
const originalEnv = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_ACCOMMODATION_API_BASE ?? 'https://localhost:7214';

    // Extract query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Build the API URL with query parameters
    const apiUrl = `${baseUrl}/api/Locations${queryString ? `?${queryString}` : ''}`;

    console.log('Fetching locations from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'force-cache', // Cache location data as it's relatively static
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      return NextResponse.json(
        { error: `Failed to fetch locations: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched locations, count:', Array.isArray(data) ? data.length : 'single object');

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
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
