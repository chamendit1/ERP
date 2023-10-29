import React, {useState, useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Table from './components/Table'
import CircularProgress from '@mui/material/CircularProgress';
import AddClient from './components/AddClient'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { clientState } from '../../initialState'


const headCells = [

  {
    id: 'name',
    type: 'main',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'email',
    type: 'main',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'phonenumber',
    type: 'main',
    numeric: true,
    label: 'Phone',
  },
  {
    id: 'edit',
    type: '',
    label: 'Edit',
  },
  {
    id: 'delete',
    type: '',
    label: 'Delete',
  },
];

const Clients = () => {

  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const location = useLocation()
  const {clients} = useSelector((state) => state.clients)
  const isLoading = useSelector(state => state.clients.isLoading)
  const [open, setOpen] = useState(false)

  console.log(open)

  useEffect(() => {
    dispatch(getClientsByUser({ search: user?.result?._id }));
  },[location, dispatch])

  if(isLoading) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <CircularProgress />
      </div>
  }

  // Need to add + button
  

  if(clients.length === 0) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
              <AddClient setOpen={setOpen} open={open} />
              
              <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>
                No customers yet. Click the plus icon to add customer
                <IconButton onClick={() => setOpen((prev) => !prev) }>
                  <AddCircleOutlineIcon />
                </IconButton>
              </p>
    </div>
  }


  return (
    <>
      <Table
        data={clients}
        header={headCells}
        rowsState={clientState}
      />
    </>

  )
}

export default Clients