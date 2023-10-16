import React from 'react'
import Table from './components/Table'

const Employees = () => {

    const columns = [
        { id: 'id', type: 'main', numeric: false, label: 'ID'},
        { id: 'firstName', type: 'main', numeric: false, label: 'First Name'},
        { id: 'lastName', type: 'main', numeric: false, label: 'Last Name'  },
        { id: 'position', type: 'main', numeric: false, label: 'Position'  }

    ]

    const data = [
        { 
            id: 2131,
            firstName: 'Chandra',
            lastName: 'Aditya',
            birthDate: '',
            address: '',
            email:'',
            mobile: '',
            gender: '',
            position: 'Big Boss',
            hireDate: '',
            access: [],
            salary: 0,
        }
    ]

  return (
    <div>
        <Table rows={data} head={columns}/>
    </div>
  )
}

export default Employees