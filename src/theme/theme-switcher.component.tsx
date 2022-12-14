import React, { FC, ReactElement, useEffect } from 'react';

import { useLocalStorageState } from '~/hooks/useLocalStorage';

import { MoonIcon } from './moon-icon.component';
import { SunIcon } from './sun-icon.component';

import {
  LIGHT_LABEL,
  DARK_LABEL,
  DARK,
  LIGHT,
  THEME_KEY,
} from './theme.constants';

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }): ReactElement => {
  const [theme, setTheme] = useLocalStorageState(THEME_KEY, DARK);

  const label = theme === DARK ? LIGHT_LABEL : DARK_LABEL;

  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    root.classList.remove(theme === DARK ? LIGHT : DARK);
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      aria-label={label}
      className={`btn btn-primary btn-circle transition-transform ease-in-out hover:bg-accent hover:text-accent focus:outline-none focus-visible:outline-accent ${className}`}
      title={label}
      onClick={() => setTheme(theme === DARK ? LIGHT : DARK)}
    >
      {theme === DARK ? (
        <MoonIcon className="h-7 w-7" />
      ) : (
        <SunIcon className="h-7 w-7" />
      )}
    </button>
  );
};
