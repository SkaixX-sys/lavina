import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserStore from './store/UserStore.jsx'

export const Context = createContext(null)
const root1 = ReactDOM.createRoot(document.getElementById('root'))
root1.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>

)
