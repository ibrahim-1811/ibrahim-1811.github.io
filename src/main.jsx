import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './features/theme/ThemeProvider';
import '@fontsource-variable/inter/latin.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/home.css';

createRoot(document.getElementById('root')).render(<StrictMode><ThemeProvider><App /></ThemeProvider></StrictMode>);
