import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Routes from './routes/routes';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
      <BrowserRouter>
        <SnackbarProvider>
        {user && <NavBar />} 
          <Header />
          <Routes/>
          <Footer />
        </SnackbarProvider>
      </BrowserRouter>
  );
}

export default App;

/*
          
*/