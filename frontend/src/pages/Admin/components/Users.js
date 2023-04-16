import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../../actions/profile';
import ProfileCard from '../../../components/Card/ProfileCard';
import { getUsers } from '../../../actions/auth';

const Users = () => {
    const { profiles } = useSelector((state) => state.profiles)
    // const location = useLocation()
    const { authDatas } = useSelector((state) => state.auth)
    const { authData } = useSelector((state) => state.auth)
    const user = JSON.parse(localStorage.getItem('profile'))
console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [datas, setDatas] = useState([{ access: {CRM: '', Accounting:''}}])
    // const isLoading = useSelector(state => state.invoices.isLoading)
    const location = useLocation()
    useEffect(() => {
      dispatch(getUsers())
    },[dispatch, location, authData])

    useEffect(() => {
      if (authDatas !== null)
        setDatas(authDatas)
    },[authDatas])

    console.log(useSelector((state) => state.auth))

    // const openUser = (id) => {
    //   navigate(`/User/${id}`)
    // }
    // If Empty
  // console.log(useSelector((state) => state.auth))
  return (
    <Grid container spacing={2} padding={'1rem 0rem'}>
      {datas.map((data) => { 
        // console.log(data)
        return (
          <Grid item xs={6}>
            <ProfileCard 
            name={data.name} 
            access={data.access} 
            email={data.email}
            role={data.role}
            data={data}
            id={data._id}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Users