import React, { useState, useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Table from './components/Table'

const headCells = [

  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Full Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phonenumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    disablePadding: false,
    label: 'Edit',
  },
  {
    disablePadding: false,
    label: 'Delete',
  },
];

const Clients = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const location = useLocation()
  // const navigate = useNavigate()
  const {clients} = useSelector((state) => state.clients)
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)


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
        open={open} 
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
        rows={clients}
        head={headCells}
      />
    </>

  )
}

export default Clients