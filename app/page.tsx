'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [quote, setQuote] = useState<string>('');

  const fetchQuote = async () => {
    const response = await fetch('/api/quote', {
      method: 'GET',
    });
    const data = await response.json();
    setQuote(data.message);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const today = new Date().getDay();
  return (
    <div className='min-h-screen p-6 sm:p-10 md:p-12 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold mb-10 sm:mb-14'>
        Dagens Hadoquote
      </h1>

      <main
        className={clsx(
          'flex flex-col gap-8 md:gap-12 items-center justify-center',
          'md:flex-row',
          today % 2 !== 0 && 'md:flex-row-reverse',
        )}
      >
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium italic text-center max-w-2xl px-2'>
          &quot;{quote}&quot;
        </h2>

        <Image
          className={clsx(
            'w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] h-auto',
            today % 2 !== 0 && 'md:-scale-x-100',
          )}
          src='/imgs/captain-haddock_v2.jpg'
          alt='Captain Haddock'
          width={540}
          height={540}
          priority
        />
      </main>
    </div>
  );
}
