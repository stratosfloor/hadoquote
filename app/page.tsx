'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export type Language = 'SE' | 'EN';

export default function Home() {
  const [quote, setQuote] = useState<string | null>('');
  const [language, setLanguage] = useState<Language>('SE');

  const fetchQuote = async () => {
    const response = await fetch(`/api/quote?language=${language}`, {
      method: 'GET',
    });
    const data = await response.json();
    setQuote(data.message);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'SE' ? 'EN' : 'SE');
  };

  useEffect(() => {
    fetchQuote();
  }, [language]);

  const today = new Date().getDay();
  return (
    <div className='min-h-screen p-6 sm:p-10 md:p-12 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold mb-6'>
        Dagens Hadoquote
      </h1>
      <main
        className={clsx(
          'flex flex-col md:gap-12 items-center justify-center',
          'md:flex-row',
          today % 2 !== 0 && 'md:flex-row-reverse',
        )}
      >
        <div className='flex flex-col justify-center min-h-20'>
          {quote ? (
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium italic text-center max-w-2xl px-2'>
              &quot;{quote}&quot;
            </h2>
          ) : null}
        </div>
        <Image
          className={clsx(
            'w-full max-w-[320px] sm:max-w-100 md:max-w-120 lg:max-w-135] h-auto',
            today % 2 !== 0 && 'md:-scale-x-100',
          )}
          src='/imgs/captain-haddock_v2.jpg'
          alt='Captain Haddock'
          width={540}
          height={540}
          priority
        />
      </main>
      <div className='flex justify-end items-center lg:justify-center xl:justify-end'>
        <LanguageSwitcher language={language} toggle={toggleLanguage} />
      </div>
    </div>
  );
}
