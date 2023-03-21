import { createTheme, Shadows, ThemeOptions } from '@mui/material'

declare module '@mui/material/SvgIcon' {
  interface PropsColorOverrides {
    neutral: true
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    yellow: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    yellow?: PaletteOptions['primary']
  }
}

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Unbounded',
    fontSize: 10,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#E6007A',
    },
    secondary: {
      main: 'rgba(85,43,191,1)',
      light: 'rgba(109,58,238,1)',
      dark: 'rgba(68,34,153,1)',
    },
    background: {
      default: '#140523',
      paper: 'rgba(28,5,51,0.85)',
    },
    success: {
      main: 'rgba(81,229,145,1)',
      light: 'rgba(86,243,154,1)',
      dark: 'rgba(72,204,129,1)',
    },
    yellow: {
      main: 'rgba(211,255,51,1)',
    },
    divider: 'rgba(230,0,122,0.5)',
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Some CSS
          // height: '7vh',
          boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
          background: 'transparent',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          // Some CSS
          borderRadius: 8,
          boxShadow: '0 3px 5px 2px rgba(230,0,122,0.15)',
          border: '1px solid rgba(230,0,122,0.75)',
          background:
            'linear-gradient(90deg, rgba(230,0,122,0.35), rgba(109,58,238,0.35))',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background:
            'linear-gradient(45deg, rgba(230,0,122,0.35) 30%, rgba(230,0,122,0.00) 90%)',
          boxShadow: '0 3px 5px 1px rgba(230,0,122,0.25)',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        // Name of the slot
        primary: {
          // Some CSS
          marginTop: '10px',
          marginBottom: '20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(45deg, rgba(230,0,122,0) 30%, rgba(230,0,122,0.75) 100%)',
          boxShadow: '0 3px 5px 1px rgba(230,0,122,1)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color:
            'linear-gradient(90deg, rgba(230,0,122,0.35), rgba(109,58,238,0.35))',
        },
        tooltip: {
          p: 3,
          m: 3,
          backdropFilter: 'blur(20px)',
          fontSize: '12px',
          borderRadius: 4,
          boxShadow: '0 3px 5px 2px rgba(230,0,122,0.15)',
          border: '1px solid rgba(230,0,122,0.75)',
          background:
            'linear-gradient(90deg, rgba(230,0,122,0.35), rgba(109,58,238,0.35))',
        },
      },
    },
  },

  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 0px 0px 0px rgba(230,0,122,0)',
    '0px 2px 2px 0px rgba(230,0,122,0.25)',
    '0px 6px 8px 0px rgba(230,0,122,0.25))',
    '0px 15px 52px 15px rgba(230,0,122,0.15)',
    ...Array(20).fill('none'),
  ] as Shadows,
  spacing: 8,
  // overrides: {
  //     MuiButton: {
  //         root: {
  //             background: 'linear-gradient(45deg, rgba(230,0,122,0.35) 30%, rgba(230,0,122,0.00) 90%)',
  //             border: 0,
  //             borderRadius: 8,
  //             boxShadow: '0 3px 5px 2px rgba(230,0,122,0.25)',
  //             color: 'white',
  //             height: 48,
  //             padding: '0 30px',
  //         },
  //     },
  // },
}

export const theme = createTheme(themeOptions)
