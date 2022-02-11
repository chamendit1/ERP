
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
    ownwe: '',
}


export const clientState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Client',
}
