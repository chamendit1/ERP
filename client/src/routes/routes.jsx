import {  Route, Switch, Redirect } from 'react-router-dom'

import Home from '../components/Home/Home';
import Invoice from '../components/Invoice/Invoice';
import Invoices from '../components/Invoices/Invoices';
import InvoiceDetails from '../components/InvoiceDetails/InvoiceDetails'
import Order from '../components/Order/Order';
import Orders from '../components/Orders/Orders';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import ClientList from '../components/Clients/ClientList'
import Client from '../components/Client/Client'
import Login from '../components/Login/Login'
import Dashboard from '../components/Dashboard/Dashboard';

import Settings from '../components/Settings/Settings';
import Forgot from '../components/Password/Forgot'
import Reset from '../components/Password/Reset'
import Sales from '../components/Sales/Sales'

import Inventory from '../components/Inventory/Inventory';
import Inventories from '../components/Inventory/Inventories'
import InventoryDetails from '../components/Inventory/InventoryDetails'
import Manufacturing from '../components/Manufacturing/Manufacturing';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/invoice" exact component={Invoice} />
                <Route path="/edit/invoice/:id" exact component={Invoice} />
                <Route path="/invoice/:id" exact component={InvoiceDetails} />
                <Route path="/invoices" exact component={Invoices} />

                <Route path="/order" exact component={Order} />
                <Route path="/edit/order/:id" exact component={Order} />
                <Route path="/order/:id" exact component={OrderDetails} />
                <Route path="/orders" exact component={Orders} />

                <Route path="/inventory" exact component={Inventory} />
                <Route path="/inventories" exact component={Inventories} />
                <Route path="/edit/inventory/:id" exact component={Inventory} />
                <Route path="/inventory/:id" exact component={InventoryDetails} />

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
        </div>

    )
}

export default Routes
