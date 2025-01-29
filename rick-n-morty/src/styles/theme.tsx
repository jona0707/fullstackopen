import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#282b33', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3c3e43', 
      contrastText: '#ffffff',
    },
  },
});

export default theme;