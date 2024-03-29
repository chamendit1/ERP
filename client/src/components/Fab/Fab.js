import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddClient from '../../pages/Client/AddClient';
import AddOrder from '../../pages/Order/AddOrder';
import AddProducts from '../../pages/Product/AddProducts';


const FabButton = () => {

  const location = useLocation()
  const mainButtonStyles = {backgroundColor: '#1976D2'}
  const [open, setOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)

  // if(location.pathname === '/invoice') return null

    return (
        <div>
           <AddClient setOpen={setOpen} open={open} />
           <AddOrder setOpen={setOrderOpen} open={orderOpen} />
           <AddProducts setOpen={setProductOpen} open={productOpen} />
          <Fab
            mainButtonStyles={mainButtonStyles}
            icon={ <AddIcon />}
            alwaysShowTitle={true}
          >

            {location.pathname !== '/invoice' && (
              <Action
                  text="New Invoice"
                  onClick={() => window.location.href='/invoice'}
                >
                  <CreateIcon />
              </Action>
            )}

            <Action
                text="New Customer"
                onClick={() => setOpen((prev) => !prev)}
              >
                <PersonAddIcon />
            </Action>

            <Action
                text="New Order"
                onClick={() => setOrderOpen((prev) => !prev)}
              >
                <PersonAddIcon />
            </Action>
            <Action
                text="New Product"
                onClick={() => setProductOpen((prev) => !prev)}
              >
                <PersonAddIcon />
            </Action>

            <Action
                text="New Inventory"
                onClick={() => window.location.href='/inventory'}
              >
                <PersonAddIcon />
            </Action>

          </Fab>
        </div>
    )
}

export default FabButton
