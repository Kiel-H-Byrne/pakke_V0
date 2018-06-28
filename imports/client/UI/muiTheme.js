import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
    overrides: {
      
    },  

    palette: {
      primary: {
        light: '#ffffff',
        main: '#fafafa',
        dark: '#c7c7c7',
      },
      secondary: {
        // light: '#768fff',
        main: '#2964ff',
        dark: '#226199',
      },
    },
    typography: {
    // Tell Material-UI what's the font-size on the html element is.
    // fontSize: 16,
    // htmlFontSize: 16,
  },
  });

  export default muiTheme;