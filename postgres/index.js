import express from 'express'
import cors from 'cors'
import pool from './db.js'
import { createTodo } from './controllers/todo.js'
import { createClient, deleteClient, getClient, getClients, updateClient } from './controllers/client.js';
import { createOrder, getClientOrders, getOrders } from './controllers/order.js';
import { createOrderItem, getOrderItems } from './controllers/orderitem.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body



    app.post("/todos", createTodo);
    app.post("/clients",createClient);
    app.get("/clients",getClients)
    app.get("/clients/:id",getClient)
    app.patch("/clients/:id",updateClient);
    app.delete("/clients/:id",deleteClient);

    app.post("/invoices", createOrder);
    app.get("/invoices", getClientOrders)


    app.post("/products", createOrderItem)
    app.get("/products", getOrderItems)







const PORT = 5002

app.get('/', (req, res) => {
    res.send('Postgres SERVER IS RUNNING')
})
    
app.listen(PORT, () => {
    console.log("server has started on port 5002");
});

pool.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }})