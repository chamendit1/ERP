import express from 'express'
import pool from '../../db.js'
const router = express.Router()

// router.get('/', getClients);
router.get("/", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM customer");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
// router.get('/:id', getClient)
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      const restaurant = await pool.query(
        "select * from customer where customer_id = $1",
        [req.params.id]
      );
      res.json(restaurant.rows);
    } catch (err) {
      console.log(err);
    }
  });
// router.post('/', createClient)
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        // const { name, email, address, company, creator} = req.body;
        // const newTodo = await pool.query(
        // "INSERT INTO customer (name, email, address, company, creator) VALUES($1, $2, $3, $4, $5) RETURNING *",
        // [name, email, address, company, creator]
        // );

        // res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
    });
// router.patch('/:id', updateClient)
// router.delete('/:id', deleteClient)

export default router