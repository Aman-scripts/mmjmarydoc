import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = `# MaryDoc

> MaryDoc connects patients with state-licensed physicians for HIPAA-compliant online medical marijuana card evaluations.

## Home

- [Home](https://marydoc.com/): Get a medical marijuana card online through a HIPAA-compliant evaluation with a state-licensed physician.
- [XML Sitemap](https://marydoc.com/sitemap.xml)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
