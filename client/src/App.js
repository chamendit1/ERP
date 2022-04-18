import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


import Routes from './routes/routes';


import Inventory from './views/Inventory/Inventory';
import Details from './views/Inventory/Details';
import List from './views/Inventory/List';

import Order from './views/CRM/Order/OrderForm/Order';
import OrderPage from './views/CRM/Order/OrderPage/OrderPage';
import OrderList from './views/CRM/Order/OrderList/OrderList';


import ClientListPage from './views/CRM/Clients/ClientList/ClientListPage';
import ClientPage from './views/CRM/Clients/ClientPage/ClientPage';
import Subheader from './components/Subheader/Subheader';

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
