import type { NextRequest } from "next/server";

const defaultUpstream = "https://localhost:7214";

// Disable SSL verification for localhost in development
const originalEnv = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
): Promise<Response> {
  const resolvedParams = await params;
  const code = resolvedParams.code;
  const base = process.env.ACCOMMODATION_API_BASE ?? defaultUpstream;
  const upstreamBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const targetUrl = `${upstreamBase}/api/AccommodationDetails/${encodeURIComponent(code)}`;

  console.log('Fetching accommodation details from:', targetUrl);

  try {
    const upstreamResponse = await fetch(targetUrl, {
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch accommodation", status: upstreamResponse.status }),
        { status: upstreamResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await upstreamResponse.json();
    return Response.json(data);
  } catch (error) {
    console.error("Accommodation proxy failed", error);
    return new Response(
      JSON.stringify({ error: "Upstream fetch failed", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Restore original setting
if (originalEnv !== undefined) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalEnv;
}
