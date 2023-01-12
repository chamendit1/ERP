import { Grid } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Board from './Board'
import Boards from './Boards'
import './Board.css'

const Index = () => {
  return (
    <>
        <Grid container className='MainBoard'>
            <Grid item xs={2} border={'1px solid black'}>
                <Boards/>
            </Grid>
            <Grid item xs={10} border={'1px solid black'}>
            <Routes>
                <Route path="/:id/*" element={<Board/>} />
            </Routes>
            </Grid>
        </Grid>
    </>
  )
}

export default Index