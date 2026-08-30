import { Language } from '../page';

type LanguageSwitcherProps = {
  language: Language;
  toggle: () => void;
};

export function LanguageSwitcher({ language, toggle }: LanguageSwitcherProps) {
  return (
    <button
      className='
        flex h-9 w-9 items-center justify-center
        rounded-full
        border border-gray-300
        transition-colors
        hover:bg-gray-100
      '
      aria-label='Change language'
    >
      <div className='' onClick={toggle}>
        {language}
      </div>
    </button>
  );
}
