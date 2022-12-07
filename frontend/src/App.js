import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients'
import Orders from './pages/Orders/Orders'
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Client-list" element={<Clients/>}/>
        <Route path="/Order-list" element={<Orders/>}/>


        <Route path="/login" element={<Login/>} />
        <Route path="/forgot" element={<Orders/>} />
        <Route path="/reset/:token" element={<Orders/>} />
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
