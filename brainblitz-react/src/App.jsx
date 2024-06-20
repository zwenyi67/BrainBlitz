import { useState } from 'react'
import Router from './Router'
import { ContextProvider } from './contexts/ContextProvider'


function App() {

  return (
    <>
    <ContextProvider>
    <Router/>
    </ContextProvider>
    </>
  )
}

export default App
