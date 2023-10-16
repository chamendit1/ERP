import pool from '../db.js'



export const createOrderItem = async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const newData = await pool.query(
            "INSERT INTO orderitem (name, price,quantity) values ($1, $2, $3) returning *", 
            [
                data.items[0].itemName, 
                data.items[0].unitPrice,
                data.items[0].quantity
            ]
        );
        console.log(newData.rows[0])
        res.status(201).json(newData.rows[0])
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const getOrderItem = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await pool.query(
            "SELECT * From orderitem WHERE client_id = $1", [id]
        );
        
        res.status(200).json(data.rows[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 export const getOrderItems = async (req, res) => {
     try {
         const allData = await pool.query(
            "SELECT * From orderitem"
         );
        res.status(200).json(allData.rows)

     } catch (error) {
         res.status(409).json(error.message)
    }
}