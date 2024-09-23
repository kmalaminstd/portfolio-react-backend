import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { AuthProvider } from './context/Auth.context.jsx'
import { ItemProvider } from './context/Item.Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </AuthProvider>

  </StrictMode>,
)
