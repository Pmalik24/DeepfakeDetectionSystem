import React from 'react';
import './App.css';
import ImageUploader from './ImageUploader';
import { CssBaseline} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',  // Customize primary color
        },
        secondary: {
            main: '#f50057',  // Customize secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Container style={{ paddingTop: '20px' , background: '#10172a' }}> */}
                {/* <Typography variant="h4" align="center" gutterBottom>
                    Deepfake Detection App
                </Typography> */}
                <ImageUploader />
            {/* </Container> */}
        </ThemeProvider>
    );
}

export default App;
