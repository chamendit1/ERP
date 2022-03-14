
export const initialState = {
    items: [
        {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],
    total: 0,
    notes: '',
    rates: '',
    vat: 0,
    currency: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Invoice',
    creator: '',
    owner: '',
}


export const clientState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Client',
}

export const initialStateOrder = {
    items: [
        {itemName: '', quantity: ''},
    ],
    notes: '',
    orderNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Order',
    creator: '',
    owner: '',
}

export const initialStateInventory = {
    items: [
        {itemName: '', quantity: ''},
    ],
    notes: '',
    inventoryNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Inventory',
    creator: '',
}
