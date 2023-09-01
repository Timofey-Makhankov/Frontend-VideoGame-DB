import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import "./styles/main.css"
import { ThemeProvider } from '@mui/material'
import { lightTheme } from './assets/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
)
