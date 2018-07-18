import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          backgroundColor: '#2964ff',
          color: '#fff',
          fontSize: '12px',
        },
        raised: {
          backgroundColor: '#2964ff',
          color: '#fff'
        },
        disabled: {
          backgroundColor: '#A3A7B2',
          color: '#fff'
        },
        fab: {
          backgroundColor: '#2964ff',
          color:' #ffc429'
        },
        focusVisible: {
          backgroundColor: '#266199'
        }
      },
      MuiFormControl: {
        root: {
          fontSize: 12,
          margin: '0 auto',
        }
      },
      MuiInput: {
        root: {
          fontSize: 12,
        },
        formControl: {
          margin: 0,
          fontSize: 12,
        }
      },
    },  
    palette: {
      primary: {
        light: '#ffffff',
        main: '#fafafa',
        dark: '#c7c7c7',
      },
      secondary: {
        light: '#768fff',
        main: '#2964ff',
        dark: '#226199',
      },
    },
    typography: {
    // Tell Material-UI what's the font-size on the html element is.
    // fontSize: 14,
    // htmlFontSize: 16,
  },
  });

  export default muiTheme;