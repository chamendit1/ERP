import React from 'react'
import { Container, Box, Paper, Button } from '@material-ui/core'
import { getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useState, useEffect  } from 'react'
import ProductTable from '../../components/Table/ProductTable'
import NoData from '../../components/svgIcons/NoData'
import Spinner from '../../components/Spinner/Spinner'


const Products = () => {
  
  //Get Clients from Backend
  const { products } = useSelector((state) => state.products)
  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('profile'))


useEffect(() => {
  dispatch(getProducts());
},[location, dispatch])

if(!user) {
  history.push('/login')
}


if(products.length === 0) {
return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
  <NoData />
<p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>

</div>
}
// Handle Click and Link to be standardize
console.log(products)
  return (
    <div>
        <Container style={{width: '90%'}} >
            <Box sx={{m: 3}}>
                <Paper>
                    Products
                    <Button>
                      
                    </Button>
                </Paper>
                <ProductTable
                    open={open} 
                    setOpen={setOpen}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    clients={products}
                />
            </Box>
        </Container>
    </div>
  )
}

export default Products