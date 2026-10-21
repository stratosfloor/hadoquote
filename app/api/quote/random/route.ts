// app/api/quote/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const fileName = 'quotes_se.txt';

  const filePath = path.join(process.cwd(), 'data', fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const quotes = fileContents
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const random = new Date().getMilliseconds();
  const randomQuote = quotes[Math.floor(random % quotes.length)];

  return NextResponse.json({ message: randomQuote }, { status: 200 });
}
