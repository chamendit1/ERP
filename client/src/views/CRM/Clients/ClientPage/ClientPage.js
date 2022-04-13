 /* eslint-disable */
import React, { useState, useEffect} from 'react'
import { getClient } from '../../../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clientState } from '../../../../initialState'

import { Box, Container, Grid} from '@material-ui/core';

import Client from '../components/Client'
import Invoicesbyid from '../components/Invoicesbyid'
import SideBar from '../components/SideBar'

const ClientPage = () => {
  
    const dispatch = useDispatch()
    //const user = JSON.parse(localStorage.getItem('profile'))
    const { id } = useParams()
    const {client} = useSelector((state) => state.clients)
    const [ClientData, setClientData] = useState(clientState)
  useEffect(() => {
    dispatch(getClient(id));
  },[id])

 
  useEffect(() => {
    if(client) {
        //Automatically set the default invoice values as the ones in the invoice to be updated
        setClientData(client)
    }
}, [client])


    return (
        <div>
          <SideBar/>
            <Client
                id={id}
                client={client}
            />
            <Invoicesbyid 
              id={id}
            />
        </div>
    )
  }
  
export default ClientPage