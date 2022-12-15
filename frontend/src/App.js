import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients'
import Orders from './pages/Orders/Orders'
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Client from './pages/Clients/Client';
import Order from "./pages/Orders/Order";

import Accounting from './pages/Accounting/index'
import CRM from "./pages/CRM";
import LayoutNav from "./components/Layout/LayoutNav";
import Sales from './pages/Sales'

function App() {
  return (
    <BrowserRouter>
      <LayoutNav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot" element={<Orders/>} />
          <Route path="/reset/:token" element={<Orders/>} />
        

        <Route path="/crm/*" element={<CRM/>}/>
  {/*   <Route path="/client-list" element={<Clients/>}/>
        <Route path="/order-list" element={<Orders/>}/> */}
        <Route path="sales" element={<Sales/>} />
        <Route path="/client/:id" element={<Client/>} />
        <Route path="/order/:id" element={<Order/>} />
        <Route path="/Accounting" element={<Accounting/>}/>
        </Routes>
      </LayoutNav>
    </BrowserRouter>
  );
}

export default App;
