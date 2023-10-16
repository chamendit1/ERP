import pool from '../db.js'

export const getClient = async (req, res) => { 
    const { id } = req.params;
    try {
        const client = await pool.query(
            "SELECT * From clients WHERE client_id = $1", [id]
        );
        
        res.status(200).json(client.rows[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 export const getClients = async (req, res) => {
     try {
         const allClients = await pool.query(
            "SELECT * From clients"
         );
        res.status(200).json(allClients.rows)

     } catch (error) {
         res.status(409).json(error.message)
    }
}

export const createClient = async (req, res) => {
    const client = req.body
    // console.log(client)
    try {
        const newClient = await pool.query(
            "INSERT INTO clients (name, phone, email, address) values ($1, $2, $3 , $4) returning *", 
            [client.name, client.phone, client.email, client.address]
        );
        res.status(201).json(newClient)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params
    const client = req.body
    // console.log(client)

    try {
        const updatedClient = await pool.query(
            "UPDATE clients SET name = $1, phone = $2, email = $3, address = $4 where client_id = $5 returning *",
            [client.name, client.phone, client.email, client.address, client.client_id]
        );
        res.status(201).json(updatedClient)
    } catch (error) {
        res.status(409).json(error.message)
    }
}


export const deleteClient = async (req, res) => {
    const { id } = req.params
    try {
        const client = await pool.query(
            "DELETE From clients WHERE client_id = $1", [id]
        );
        
        res.status(200).json(client.rows[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getClientByUser = async (req, res) => {
//     const {searchQuery} = req.query;

//     try {
//         const clients = await pool.find({ creator: searchQuery });
//         // const invoices = await InvoiceModel.find().where('creator').in(searchQuery);

//         res.status(200).json({ data: clients });
//     } catch (error) {    
//         res.status(404).json({ message: error.message });
//     }
// }



// export const createClient = async (req, res) => {

//     const client = req.body

//     const newClient = new pool({...client, createdAt: new Date().toISOString() })

//     try {
//         await newClient.save()
//         res.status(201).json(newClient)
//     } catch (error) {
//         res.status(409).json(error.message)
//     }
// }




// export const getClientsByUser = async (req, res) => {
//     const { searchQuery } = req.query;

//     try {
//         const clients = await pool.find({ userId: searchQuery });

//         res.json({ data: clients });
//     } catch (error) {    
//         res.status(404).json({ message: error.message });
//     }
// }