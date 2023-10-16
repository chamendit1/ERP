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
import Employees from "./pages/Employees/Employees";
import Employee from "./pages/Employees/Employee";
import BoardComponent from "./components/Board/Board";
import Kanban from "./pages/CRM/components/kanban/Kanban";
import GanttChart from "./components/Gantt/GanttChart";
import ClientLayout from "./components/Layout/ClientLayout";
import Todo from "./pages/Todo";

function App() {
  // const user = JSON.parse(localStorage.getItem('profile'))
  // console.log(user)




  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/forgot" element={<Orders/>} />
          <Route path="/reset/:token" element={<Orders/>} /> */}

          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Board/*" element={<Board/>} />
          <Route path="/Typography" element={<Typography/>} />
          <Route path="/Layouts" element={<Layouts/>} />

          <Route element={<RequireAuth allowedRoles={'CRM'} />}>
            <Route path="/CRM/*" element={<CRM/>}/>
            <Route path="/Client/:id/*" element={<Client/>} />
            <Route path="/Order/:id" element={<Order/>} />
            {/* <Route path="/sales" element={<Sales/>} /> */}
          </Route>
          {/* <Route path="/Employees" element={<Employees/>} />
          <Route path="/Employee/:id" element={<Employee/>} /> */}

          {/* <Route element={<RequireAuth allowedRoles={['Accounting']} />}> */}
            {/* <Route path="/Accounting" element={<Accounting/>}/> */}
          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/ClientLayout" element={<ClientLayout/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/user/:id" element={<User/>} />
            <Route path="/Gantt" element={<GanttChart/>} />
          {/* </Route> */}

          <Route path="/settings" element={<Settings/>}/>
          {/* <Route path="/Board" element={<BoardComponent/>}/> */}
          <Route path="/todo" element={<Todo/>} />


          
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
