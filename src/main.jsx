import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import rootReducer from './Reducers/index.js'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import App from './App.jsx'

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
