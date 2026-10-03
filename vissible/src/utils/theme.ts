import { useEffect, useState } from 'react';

export type ThemeChoice = 'auto' | 'light' | 'dark';

export const THEME_CHOICES: { value: ThemeChoice; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
];

// Same key as the inline script in index.html, which applies the theme before the first paint.
const STORAGE_KEY = 'seriously-theme';
const systemLight = () => window.matchMedia('(prefers-color-scheme: light)');

const readChoice = (): ThemeChoice => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : 'auto';
  } catch {
    return 'auto';
  }
};

const apply = (choice: ThemeChoice) => {
  const root = document.documentElement;
  // "auto" leaves the attribute unset: the CSS then follows prefers-color-scheme.
  if (choice === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', choice);
  const light = choice === 'light' || (choice === 'auto' && systemLight().matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f0fb' : '#1a0f2e');
};

const listeners = new Set<(c: ThemeChoice) => void>();
let current: ThemeChoice = readChoice();

export const setTheme = (choice: ThemeChoice) => {
  current = choice;
  try {
    if (choice === 'auto') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private browsing: the choice lasts for this visit only.
  }
  apply(choice);
  listeners.forEach((l) => l(choice));
};

// Keeps the browser bar colour right when the system switches while on "auto".
systemLight().addEventListener('change', () => {
  if (current === 'auto') apply('auto');
});

export const useTheme = (): [ThemeChoice, (c: ThemeChoice) => void] => {
  const [choice, setChoice] = useState(current);
  useEffect(() => {
    listeners.add(setChoice);
    return () => {
      listeners.delete(setChoice);
    };
  }, []);
  return [choice, setTheme];
};
