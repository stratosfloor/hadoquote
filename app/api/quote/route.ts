// app/api/quote/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Language } from '@/app/page';

function isLanguage(value: string | null): value is Language {
  return value === 'SE' || value === 'EN';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const languageParam = searchParams.get('language');

  const language: Language = isLanguage(languageParam) ? languageParam : 'SE';

  const fileName = language === 'EN' ? 'quotes_en.txt' : 'quotes_se.txt';

  const filePath = path.join(process.cwd(), 'data', fileName);
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
