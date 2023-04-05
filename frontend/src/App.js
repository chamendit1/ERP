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
import Admin from "./pages/Admin/Admin";
import RequireAuth from "./components/Auth/RequireAuth";
import Settings from './components/Settings/Settings'
import Users from "./pages/Admin/components/Users";
import User from "./pages/Admin/components/User";
import Typography from "./utils/Typography/Typography";
import Layouts from "./components/Layouts/index";
// import Board from "./pages/Board/Board";
// import Boards from "./pages/Board/Boards";
import Board from "./pages/Board";

function App() {




  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/forgot" element={<Orders/>} />
          <Route path="/reset/:token" element={<Orders/>} /> */}

          <Route path="/Dashboard" element={<Dashboard/>}/>
          {/* <Route path="/Board/*" element={<Board/>} /> */}
          {/* <Route path="/Board/:id" element={<Board/>} /> */}
          <Route path="/Typography" element={<Typography/>} />
          <Route path="/Layouts" element={<Layouts/>} />

          <Route element={<RequireAuth allowedRoles={['CRM']} />}>
            <Route path="/CRM/*" element={<CRM/>}/>
            <Route path="/Client/:id" element={<Client/>} />
            <Route path="/Order/:id" element={<Order/>} />
            {/* <Route path="/sales" element={<Sales/>} /> */}
          </Route>

          <Route element={<RequireAuth allowedRoles={['Accounting']} />}>
            {/* <Route path="/Accounting" element={<Accounting/>}/> */}
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/user/:id" element={<User/>} />
          {/* </Route> */}

          <Route path="/settings" element={<Settings/>}/>


          
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
