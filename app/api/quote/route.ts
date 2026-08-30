// app/api/quote/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'quotes_se.txt');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const quotes = fileContents
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const today = new Date();
  const i = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
  const randomQuote = quotes[Math.floor(i % quotes.length)];

  return NextResponse.json({ message: randomQuote }, { status: 200 });
}
