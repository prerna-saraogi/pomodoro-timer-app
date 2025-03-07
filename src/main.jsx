import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TimerProvider } from './context/TimerContext';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SoundProvider } from './context/SoundContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SoundProvider>
      <ThemeProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </ThemeProvider>
    </SoundProvider>
  </StrictMode>,
)
