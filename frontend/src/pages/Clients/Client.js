import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clientState } from '../../initialState'
import { getClient } from '../../actions/clientActions'


const Client = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  //const user = JSON.parse(localStorage.getItem('profile'))
  const [ClientData, setClientData] = useState(clientState)
  const {client} = useSelector((state) => state.clients)

  useEffect(() => {
    dispatch(getClient(id));
  },[id])
  console.log(client)

  useEffect(() => {
      if(client) {
          setClientData(client)
      }
  }, [client])

  return (
    <div>Client {id}</div>
  )
}

export default Client