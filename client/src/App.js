import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import Home from './components/Home/Home';
import Invoice from './components/Invoice/Invoice';
import Invoices from './components/Invoices/Invoices';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails'
import ClientList from './components/Clients/ClientList'
import Client from './components/Client/Client'
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'
import Sales from './components/Sales/Sales'


import Manufacturing from './components/Manufacturing/Manufacturing';

import Inventory from './pages/Inventory/Inventory';
import Details from './pages/Inventory/Details';
import List from './pages/Inventory/List';

import Order from './pages/Manufacturing/Orders/Order';
import OrderDetails from './pages/Manufacturing/Orders/OrderDetails';
import OrderList from './pages/Manufacturing/Orders/OrderList';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <div>
      <BrowserRouter>
      <SnackbarProvider>
     {user && <NavBar />} 
      <Header />
      <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/invoice" exact component={Invoice} />
          <Route path="/edit/invoice/:id" exact component={Invoice} />
          <Route path="/invoice/:id" exact component={InvoiceDetails} />
          <Route path="/invoices" exact component={Invoices} />

          <Route path="/order" exact component={Order} />
          <Route path="/edit/order/:id" exact component={Order} />
          <Route path="/order/:id" exact component={OrderDetails} />
          <Route path="/orders" exact component={OrderList} />

          <Route path="/inventory" exact component={Inventory} />
          <Route path="/inventories" exact component={List} />
          <Route path="/edit/inventory/:id" exact component={Inventory} />
          <Route path="/inventory/:id" exact component={Details} />

          <Route path="/manufacturing" exact component={Manufacturing} />
 


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
        <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
