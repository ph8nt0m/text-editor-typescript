import {
  createConfig,
  createStyles,
  createSystem,
  createTheme,
} from 'uinix-ui';

import { icons } from './icons';

export const config = createConfig({
  elementShorthandPropsMapping: {
    backgroundColor: ['bg'],
    border: ['border'],
    borderRadius: ['borderRadius'],
    color: ['color'],
    padding: ['p'],
    paddingBottom: ['pb', 'py', 'p'],
    paddingLeft: ['pl', 'px', 'p'],
    paddingRight: ['pr', 'px', 'p'],
    paddingTop: ['pt', 'py', 'p'],
  },
  elementStyles: [
    ({ onClick }) =>
      onClick
        ? {
            cursor: 'pointer',
            ':hover': {
              opacity: 0.7,
            },
          }
        : null,
  ],
});

export const system = createSystem({
  icons,
  styles: createStyles({
    global: {
      body: {
        fontFamily: 'helvetica',
      },
    },
  }),
  theme: createTheme({
    borders: {
      border: '1px solid #ccc',
    },
    colors: {
      background: 'white',
      'background:active': 'lightblue',
      active: 'blue',
      icon: '#666',
      'mention.user': '#ddd',
    },
    radii: {
      m: 4,
      pill: '100vh',
    },
    sizes: {
      icon: {
        s: 18,
      },
    },
    spacings: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
    },
  }),
});
