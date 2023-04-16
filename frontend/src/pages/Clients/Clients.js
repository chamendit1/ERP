import React, { useEffect} from 'react'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Table from './components/Table'
import CircularProgress from '@mui/material/CircularProgress';

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
  useEffect(() => {
    dispatch(getClientsByUser({ search: user?.result?._id }));
  },[location, dispatch])

  // console.log(user?.result?._id)

  // console.log(useSelector(state => state))

  if(isLoading) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <CircularProgress />
      </div>
  }


  // if(clients.length === 0) {
  //   return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
  //     {/* <NoData /> */}
  //     <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>
  //       No customers yet. Click the plus icon to add customer
  //     </p>
  
  //   </div>
  // }


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