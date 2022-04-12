import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import Home from './components/Home/Home';
import Invoice from './components/Invoice/Invoice';
import Invoices from './components/Invoices/Invoices';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails'



import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'
import Sales from './components/Sales/Sales'


import Inventory from './views/Inventory/Inventory';
import Details from './views/Inventory/Details';
import List from './views/Inventory/List';

import Order from './views/CRM/Order/OrderForm/Order';
import OrderPage from './views/CRM/Order/OrderPage/OrderPage';
import OrderList from './views/CRM/Order/OrderList/OrderList';


import ClientList from './views/CRM/Clients/ClientList/ClientList';
import Client from './views/CRM/Clients/ClientPage/Client';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <div className='grid-container'>
      <BrowserRouter>
      <SnackbarProvider>
     {user && <NavBar />} 
      <Header />
      <div className='item3'>

      <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/invoice" exact component={Invoice} />
          <Route path="/edit/invoice/:id" exact component={Invoice} />
          <Route path="/invoice/:id" exact component={InvoiceDetails} />
          <Route path="/invoices" exact component={Invoices} />

          <Route path="/order" exact component={Order} />
          <Route path="/edit/order/:id" exact component={Order} />
          <Route path="/order/:id" exact component={OrderPage} />
          <Route path="/orders" exact component={OrderList} />

          <Route path="/inventory" exact component={Inventory} />
          <Route path="/inventories" exact component={List} />
          <Route path="/edit/inventory/:id" exact component={Inventory} />
          <Route path="/inventory/:id" exact component={Details} />

 


          <Route path="/customers" exact component={ClientList} />
          <Route path="/customers/:id" exact component={Client} />



          <Route path="/login" exact component={Login} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/sales" exact component={Sales} />
          
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset/:token" exact component={Reset} />
          <Redirect exact from="/new-invoice" to="/invoice" />

        </Switch>

      </div>

        <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
