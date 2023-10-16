import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: process.env.REACT_APP_API})
const API2 = axios.create({ baseURL: process.env.REACT_APP_API2})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchColumn =(id) => API.get(`/column/${id}`)
export const fetchColumns =() => API.get('/column')
export const addColumn =( board ) => API.post('/column', board)
export const updateColumn = (id, updatedColumn) => API.patch(`/column/${id}`, updatedColumn)
export const deleteColumn =(id) => API.delete(`/column/${id}`)

export const fetchBoard =(id) => API.get(`/board/${id}`)
export const fetchBoards =() => API.get('/board')
export const addBoard =( board ) => API.post('/board', board)
export const updateBoard = (id, updatedBoard) => API.patch(`/board/${id}`, updatedBoard)
export const deleteBoard =(id) => API.delete(`/board/${id}`)


export const fetchTransactions =() => API.get('/Transaction')
export const fetchTransaction =(id) => API.get(`/Transaction/${id}`)
export const fetchTransactionsByClient = (id) => API.get(`/Transactions/clients/${id}`);

export const addTransaction =( Transaction ) => API.post('/Transaction', Transaction)
export const updateTransaction = (id, updatedTransaction) => API.patch(`/Transaction/${id}`, updatedTransaction)
export const deleteTransaction =(id) => API.delete(`/Transaction/${id}`)



export const addOrder =( order ) => API.post('/order', order)
export const fetchOrders =() => API.get('/order')
export const fetchOrder =(id) => API.get(`/order/${id}`)
// export const updateOrder = (id, updatedOrder) => API.patch(`/orders/${id}`, updatedOrder)
// export const deleteOrder =(id) => API.delete(`/orders/${id}`)

// export const fetchOrdersByClient = (id) => API.get(`/order/${id}`);




export const fetchInventories =() => API.get('/inventories')
export const fetchInventory =(id) => API.get(`/Inventories/${id}`)
export const fetchInventoriesByClient = (id) => API.get(`/inventories/clients/${id}`);

export const addInventory =( inventory ) => API.post('/inventories', inventory)
export const updateInventory = (id, updatedInventory) => API.patch(`/inventories/${id}`, updatedInventory)
export const deleteInventory =(id) => API.delete(`/inventories/${id}`)






export const fetchProducts =() => API.get('/products')
export const fetchProduct =(id) => API.get(`/products/${id}`)

export const addProduct =( product ) => API2.post('/products', product)
export const updateProduct= (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct)
export const deleteProduct =(id) => API.delete(`/products/${id}`)






export const fetchInvoices =() => API2.get('/invoices')
export const fetchInvoice =(id) => API2.get(`/invoices/${id}`)
export const fetchInvoicesByClient = (id) => API.get(`/invoices/clients/${id}`);

export const addInvoice =( invoice ) => API2.post('/invoices', invoice)
export const updateInvoice = (id, updatedInvoice) => API.patch(`/invoices/${id}`, updatedInvoice)
export const deleteInvoice =(id) => API.delete(`/invoices/${id}`)
//export const fetchInvoicesByUser = (searchQuery) => API.get(`/invoices/invoices?searchQuery=${searchQuery.search}`);



export const fetchClient = (id) => API2.get(`/clients/${id}`);
export const fetchClients = () => API2.get('/clients');
export const addClient =( client ) => API2.post('/clients', client)
export const updateClient = (id, updatedClient) => API2.patch(`/clients/${id}`, updatedClient)
export const deleteClient =(id) => API2.delete(`/clients/${id}`)
// export const fetchClientsByUser = (searchQuery) => API.get(`/clients?searchQuery=${searchQuery.search}`);


export const signIn =(formData)=> API.post('/users/signin', formData)
export const signUp =(formData)=> API.post('/users/signup', formData)
export const update = (id, formData) => API.post(`/users/${id}`, formData)
export const forgot = (formData) => API.post('/users/forgot', formData);
export const reset = (formData) => API.post('/users/reset', formData);
export const fetchUsers = () => API.get('/users/users');


export const fetchProfilesBySearch = (searchQuery) => API.get(`/profiles/search?searchQuery=${searchQuery.search || searchQuery.year || 'none'}`);
export const fetchProfile = (id) => API.get(`/profiles/${id}`)
export const fetchProfiles = () => API.get('/profiles');
export const fetchProfilesByUser = (searchQuery) => API.get(`/profiles?searchQuery=${searchQuery.search}`)
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);