import pool from '../db.js'

export const getOrder = async (req, res) => { 
    const { id } = req.params;
    try {
        const data = await pool.query(
            "SELECT * From orders WHERE client_id = $1", [id]
        );
        
        res.status(200).json(data.rows[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 export const getOrders = async (req, res) => {
     try {
         const allData = await pool.query(
            "SELECT * From orders"
         );
         console.log(allData.rows)
        res.status(200).json(allData.rows)

     } catch (error) {
         res.status(409).json(error.message)
    }
}

export const getClientOrders = async (req, res) => {
    try {
        const allData = await pool.query(
           "SELECT * From orders INNER JOIN clients ON orders.client_id = clients.client_id"
        );
        console.log(allData.rows)
       res.status(200).json(allData.rows)

    } catch (error) {
        res.status(409).json(error.message)
   }
}





export const createOrder = async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const newData = await pool.query(
            `INSERT INTO orders (
                client_id,
                orderitem_id,
                status, 
                notes, 
                total,
                vat,
                currency,
                subtotal,
                rates,
                creator,
                duedate
                ) values ($1, $2, $3 , $4, $5, $6, $7, $8, $9, $10, $11) returning *`, 
            [
                data.client.client_id, 
                data.client.client_id, 
                data.orderStatus, 
                data.notes,
                data.total,
                data.vat,
                data.currency,
                data.subtotal,
                data.rates,
                data.creator,
                data.dueDate
            ]
        );
        res.status(201).json(newData)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

// export const updateClient = async (req, res) => {
//     const { id } = req.params
//     const client = req.body
//     console.log(client)

//     try {
//         const updatedClient = await pool.query(
//             "UPDATE clients SET name = $1, phone = $2, email = $3, address = $4 where client_id = $5 returning *",
//             [client.name, client.phone, client.email, client.address, client.client_id]
//         );
//         res.status(201).json(updatedClient)
//     } catch (error) {
//         res.status(409).json(error.message)
//     }
// }


// export const deleteClient = async (req, res) => {
//     const { id } = req.params
//     try {
//         const client = await pool.query(
//             "DELETE From clients WHERE client_id = $1", [id]
//         );
        
//         res.status(200).json(client.rows[0]);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }