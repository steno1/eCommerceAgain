import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Headers from './components/Headers'
import { Outlet } from 'react-router-dom'
import React from 'react'

const App = () => {
  return (
    <>
    <Headers/>
    <main className='py-3'>
    <Container>
      <Outlet/>
    </Container>
    </main>
    
    <Footer/>
    <ToastContainer/>
    </>
  )
}

export default App
