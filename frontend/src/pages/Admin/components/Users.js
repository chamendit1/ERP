import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../../actions/profile';
import ProfileCard from '../../../components/Card/ProfileCard';

const Users = () => {
    const { profiles } = useSelector((state) => state.profiles)
    // const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();

  
    useEffect(() => {
      dispatch(getProfiles())
    },[])

    const openUser = (id) => {
      navigate(`/User/${id}`)
    }
    // If Empty
  
  return (
    <Grid container spacing={2} padding={'1rem 0rem'}>
      {profiles.map((data) => { 
        console.log(data)
        return (
          <Grid item xs={3}>
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