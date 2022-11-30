import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchInvoices =() => API.get('/getInvoices')
export const fetchInvoice =(id) => API.get(`/getInvoices/${id}`)
export const fetchInvoicesByClient = (id) => API.get(`/getInvoices/clients/${id}`);
export const addInvoice =( invoice ) => API.post('/getInvoices', invoice)
export const updateInvoice = (id, updatedInvoice) => API.patch(`/getInvoices/${id}`, updatedInvoice)
export const deleteInvoice =(id) => API.delete(`/getInvoices/${id}`)
//export const fetchInvoicesByUser = (searchQuery) => API.get(`/invoices/invoices?searchQuery=${searchQuery.search}`);

export const fetchOrders =() => API.get('/getOrders')
export const fetchOrder =(id) => API.get(`/getOrders/${id}`)
// export const fetchOrdersByClient = (id) => API.get(`/getOrders/${id}`);
export const addOrder =( order ) => API.post('/getOrders', order)
// export const updateOrder = (id, updatedOrder) => API.patch(`/getOrderss/${id}`, updatedOrder)
// export const deleteOrder =(id) => API.delete(`/getOrderss/${id}`)


export const fetchClient = (id) => API.get(`/getClients/${id}`);
//export const fetchClients = (page) => API.get(`/getClients?page=${page}`);
export const addClient =( client ) => API.post('/getClients', client)
export const updateClient = (id, updatedClient) => API.patch(`/getClients/${id}`, updatedClient)
export const deleteClient =(id) => API.delete(`/getClients/${id}`)
export const fetchClientsByUser = (searchQuery) => API.get(`/getClients?searchQuery=${searchQuery.search}`);


export const signIn =(formData)=> API.post('/getUsers/signin', formData)
export const signUp =(formData)=> API.post('/getUsers/signup', formData)
export const forgot = (formData) => API.post('/getUsers/forgot', formData);
export const reset = (formData) => API.post('/getUsers/reset', formData);

export const fetchProfilesBySearch = (searchQuery) => API.get(`/getProfiles/search?searchQuery=${searchQuery.search || searchQuery.year || 'none'}`);
export const fetchProfile = (id) => API.get(`/getProfiles/${id}`)
export const fetchProfiles = () => API.get('/getProfiles');
export const fetchProfilesByUser = (searchQuery) => API.get(`/getProfiles?searchQuery=${searchQuery.search}`)
export const createProfile = (newProfile) => API.post('/getProfiles', newProfile);
export const updateProfile = (id, updatedProfile) => API.patch(`/getProfiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/getProfiles/${id}`);

// Inactive
export const fetchInventories =() => API.get('/inventories')
export const fetchInventory =(id) => API.get(`/Inventories/${id}`)
export const fetchInventoriesByClient = (id) => API.get(`/inventories/clients/${id}`);
export const addInventory =( inventory ) => API.post('/inventories', inventory)
export const updateInventory = (id, updatedInventory) => API.patch(`/inventories/${id}`, updatedInventory)
export const deleteInventory =(id) => API.delete(`/inventories/${id}`)

export const fetchProducts =() => API.get('/products')
export const fetchProduct =(id) => API.get(`/products/${id}`)
export const addProduct =( product ) => API.post('/products', product)
export const updateProduct= (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct)
export const deleteProduct =(id) => API.delete(`/products/${id}`)
