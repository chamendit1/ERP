import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getInvoices } from '../../actions/invoiceActions';

import Kanban from './Kanban'

const Dashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const rows = useSelector(state => state.invoices.invoices)
  const isLoading = useSelector(state => state.invoices.isLoading)

  useEffect(() => {
      dispatch(getInvoices());
  }, [dispatch]);

  if(!user) {
    navigate('/login')
  }
  // console.log(useSelector(state => state))

  return (
    <div><Kanban data={rows}/></div>
  )
}

export default Dashboard