 /* eslint-disable */
 import React, { useState, useEffect} from 'react'
 import ClientTable from '../components/ClientTable'
 import AddClient from '../components/AddClient'
 import { getClientsByUser } from '../../../../actions/clientActions'
 import { useDispatch, useSelector } from 'react-redux'
 import { useLocation, useHistory } from 'react-router-dom'
 import { Container } from '@material-ui/core'
 import NoData from '../../../../components/svgIcons/NoData'
 import Spinner from '../../../../components/Spinner/Spinner'

 import './ClientListPage.css'
import Subheader from '../../../../components/Subheader/Subheader'
 
 
 const ClientListPage = () => {
 
     const history = useHistory()
     const location = useLocation()
     const [open, setOpen] = useState(false)
     const [currentId, setCurrentId] = useState(null)
     const dispatch = useDispatch()
     const user = JSON.parse(localStorage.getItem('profile'))
     const {clients} = useSelector((state) => state.clients)
     const isLoading = useSelector(state => state.clients.isLoading)
     // const clients = []
 
     
     // useEffect(() => {
     // }, [currentId, dispatch]);
     
 //     useEffect(() => {
 //         dispatch(getClients(1));
 //         // dispatch(getClientsByUser({userId : user?.result?._id}));
 //         // dispatch(getClientsByUser({ search :user?.result?._id, tags: tags.join(',') }));
 //     },[location]
 // )
 
 useEffect(() => {
     dispatch(getClientsByUser({ search: user?.result?._id || user?.result?.googleId }));
   },[location, dispatch])
 
   if(!user) {
     history.push('/login')
   }
 
   
   if(isLoading) {
     return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
         <Spinner />
     </div>
   }
 
   if(clients.length === 0) {
     return  (
       <div>
          <button  
            className='addclient'
            onClick={() => setOpen(true)}>New Client</button>
          <AddClient 
              open={open} 
              setOpen={setOpen}
              currentId={currentId}
              setCurrentId={setCurrentId}
          />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
          <NoData />
          <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>
        </div>
       </div>

     )


   }
 
     return (
         <div>
              <button  
                  className='addclient'
                  onClick={() => setOpen(true)}
              >New Client</button>
             <AddClient 
                 open={open} 
                 setOpen={setOpen}
                 currentId={currentId}
                 setCurrentId={setCurrentId}
             />
             <ClientTable
                 open={open} 
                 setOpen={setOpen}
                 currentId={currentId}
                 setCurrentId={setCurrentId}
                 clients={clients}
             />
         </div>
     )
 }
 
 export default ClientListPage
 