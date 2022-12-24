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
import Sales from './pages/Sales'
import Navbar from "./components/Navbar";
import Admin from './components/Admin/Admin'
import RequireAuth from "./components/Auth/RequireAuth";

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>}/>
          <Route path="/forgot" element={<Orders/>} />
          <Route path="/reset/:token" element={<Orders/>} />

          <Route path="/dashboard" element={<Dashboard/>}/>


  

          <Route element={<RequireAuth allowedRoles={['CRM']} />}>
            <Route path="/crm/*" element={<CRM/>}/>
            <Route path="/client/:id" element={<Client/>} />
            <Route path="/order/:id" element={<Order/>} />
            <Route path="sales" element={<Sales/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['Accounting']} />}>
            <Route path="/Accounting" element={<Accounting/>}/>
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
            <Route path="/Admin" element={<Admin/>}/>
          {/* </Route> */}


          
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
