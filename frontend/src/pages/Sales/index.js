import React, { useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import Table from './components/Table'
import OrderTable from './components/OrderTable'
import DynamicTable from './components/DynamicTable'

const headCell = [
  // {
  //   id: 'ID',
  //   numeric: false,
  //   label: 'ID',
  // },
  {
    id: 'Date',
    numeric: true,
    label: 'Date',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Customer',
  },
  {
    id: 'due',
    numeric: true,
    label: 'Due Date',
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount',
  },
  // {
  //   label: 'Edit',
  // },
  // {
  //   label: 'Delete',
  // },
];



const rows = [
  {
    client: {
        _id: '',
        address: '',
        email: '',
        name: 'sfdfdf',
        phone: '',
      },
    id: '',
    createdAt: '',
    items: [
      {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],
    orderStatus: '',
    status: '',
    dueData: '',
    total: '',
    invoiceNumber: '1',
  },
  {
    client: {
        _id: '',
        address: '',
        email: '',
        name: '3213',
        phone: '',
      },
    id: '',
    createdAt: '',
    items: [
      {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],
    orderStatus: '',
    status: '',
    dueData: '',
    total: '',
    invoiceNumber: '',
  },
]


const headCells = [

  {
    id: 'name',
    type: 'main',
    numeric: false,
    label: 'Name',
    display: '',
  },
  {
    id: 'email',
    type: 'main',
    numeric: false,
    label: 'Email',
    display: '',
  },
  {
    id: 'phonenumber',
    type: 'main',
    numeric: true,
    label: 'Phone',
    display: '',
  },
  {
    id: 'edit',
    type: '',
    label: 'Edit',
    display: '',
  },
  {
    id: 'delete',
    type: '',
    label: 'Delete',
    display: '',
  },
];

const clients = [
  {
    _id: '1',
    address: '',
    createdAt: '',
    email: '',
    name: '',
    phone: '',
  },
  {
    _id: '2',
    address: '',
    createdAt: '',
    email: '',
    name: '',
    phone: '',
  },
  {
    _id: '3',
    address: '',
    createdAt: '',
    email: '',
    name: '',
    phone: '',
  },

]
const Index = () => {

  return (
    <div>
      Prototype
      {/* <Table
        rows={clients}
        head={headCells}
      />

      <OrderTable 
        rows={rows}
        head={headCell}
      /> */}

      <DynamicTable         
        rows={clients}
        head={headCells}
        />
    </div>
  )
}

export default Index