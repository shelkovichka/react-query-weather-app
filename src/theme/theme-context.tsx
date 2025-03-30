import {createContext} from 'react';

import {ThemeContextType} from './types';

const initialState: ThemeContextType = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);
