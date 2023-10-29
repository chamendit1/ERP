import React from 'react'
import Table from './Table'
import { clientTable } from '../../tableState'

const index = () => {
  return (
    <>
        <Table rowsState={clientTable}/>
    </>
  )
}

export default index