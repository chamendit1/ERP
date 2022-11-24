import express from 'express'
const router = express.Router()
import pool from '../../db.js'


//router.get('/:id', getOrder)
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const restaurant = await pool.query(
      "select * from orders where order_id = $1",
      [req.params.id]
    );
    res.json(restaurant.rows);
  } catch (err) {
    console.log(err);
  }
});

//router.get('/', getOrders)
router.get("/", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM orders");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//router.post('/', createOrder)
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const { notes, customer_id, creator } = req.body;
        
        const newTodo = await pool.query(
        "INSERT INTO orders (notes, customer_id, creator) VALUES($1, $2, $3) RETURNING *",
        [notes, customer_id, creator]
        );
        console.log(newTodo)
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
    });

// router.get('/clients/:id', getOrdersByClient)
// router.patch('/:id', updateOrder)
// router.delete('/:id', deleteOrder)





export default router