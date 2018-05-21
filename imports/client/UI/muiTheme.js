import { createMuiTheme } from 'material-ui/styles';

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
        light: '#768fff',
        main: '#2962ff',
        dark: '#0039cb',
      },
    },
    typography: {
    // Tell Material-UI what's the font-size on the html element is.
    // fontSize: 16,
    // htmlFontSize: 16,
  },
  });

  export default muiTheme;