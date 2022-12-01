import React from 'react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'



import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import Dashboard from './pages/Dashboard';
import Settings from './components/Settings/Settings';
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'

import Home from './pages/Home/Home';
import Client from './pages/Client/Client';
import Clients from './pages/Client/Clients'  	
import Product from './pages/Product/Product';
import Products from './pages/Product/Products';
import Invoice from './pages/Invoice';
import Orders from './pages/Order/Orders';
import Order from './pages/Order/Order';
import Morder from './pages/Morder';
import psqlOrders from './psql/Orders'
import psqlOrder from './psql/Order'
import Layout from './components/Layout';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
      <BrowserRouter>
        <SnackbarProvider>
            {user && <NavBar />}
            <Header />
            <Layout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/psql" exact component={psqlOrders} />
                <Route path="/psql/:id" exact component={psqlOrder} />

                <Route path="/clients" exact component={Clients} />
                <Route path="/client/:id" exact component={Client} />
                <Route path="/edit/client/:id" exact component={Client} />
                
                <Route path="/order/:id" exact component={Order} />
                <Route path="/orders" exact component={Orders} />

                <Route path="/invoice/:id" exact component={Invoice} />
                <Route path="/manufacturing/:id" exact component={Morder} />


                <Route path="/product" exact component={Product} />
                <Route path="/products" exact component={Products} />
                
                <Route path="/login" exact component={Login} />
                <Route path="/settings" exact component={Settings} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/forgot" exact component={Forgot} />
                <Route path="/reset/:token" exact component={Reset} />
                <Redirect exact from="/new-invoice" to="/invoice" />
                
              </Switch>
              </Layout>
              <Footer /> 
        </SnackbarProvider>
      </BrowserRouter>
  );
}

export default App;

/*
         
*/