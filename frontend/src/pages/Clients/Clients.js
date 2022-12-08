import React, { useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Table from './components/Table'

const headCells = [

  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'phonenumber',
    numeric: true,
    label: 'Phone',
  },
  {
    label: 'Edit',
  },
  {
    label: 'Delete',
  },
];

const Clients = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const location = useLocation()
  const {clients} = useSelector((state) => state.clients)

  useEffect(() => {
    dispatch(getClientsByUser({ search: user?.result?._id }));
  },[location, dispatch])


  console.log(clients)

  if(clients.length === 0) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
      {/* <NoData /> */}
    <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>
  
    </div>
  }

  return (
    <>
      <Table
        rows={clients}
        head={headCells}
      />
    </>

  )
}

export default Clients