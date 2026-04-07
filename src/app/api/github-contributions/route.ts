import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  try {
    const res = await fetch('https://github.com/users/guibertolo/contributions', {
      headers: { 'User-Agent': 'Portfolio' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ contributions: [], total: 0 });
    }

    const html = await res.text();

    // Parse data-date and data-level from <td> elements
    const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    const contributions: { date: string; level: number }[] = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      contributions.push({
        date: match[1],
        level: parseInt(match[2], 10),
      });
    }

    // Sort by date
    contributions.sort((a, b) => a.date.localeCompare(b.date));

    const total = contributions.filter((c) => c.level > 0).length;

    return NextResponse.json({ contributions, total });
  } catch {
    return NextResponse.json({ contributions: [], total: 0 });
  }
}
