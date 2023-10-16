
export const initialState = {
    items: [
        {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],

    client : [
        {name: '', email: '', phone: '', address: ''}
    ],
    total: 0,
    notes: '',
    rates: '',
    vat: 0,
    currency: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    orderStatus: '0',
    type: 'Invoice',
    creator: '',
    owner: '',
}

export const transactionState = {
    items: [
        {itemName: '', unitPrice: '', quantity: '', discount: ''},
    ],

}
export const orderItemState = {
  items: [{name: '', price: '', quantity: '',amount : ''},],

}



export const clientState = {
    name: 'PT Tunyun',
    email: 'sales@tunyun.com',
    phone: '0812392837',
    address1: 'Jl Jaya 22',
    address2: 'No.3 F2/23',
    city: 'Kuching',
    state: 'NSW',
    zip: '11829',
    country: 'Indonesia',
    type: 'Client',
}

export const initialStateOrder = {
    items: [
        {itemName: '', quantity: ''},
    ],
    notes: '',
    orderNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Order',
    creator: '',
    owner: '',
}

export const initialStateInventory = {
    items: [
        {itemName: '', quantity: ''},
    ],
    notes: '',
    inventoryNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Inventory',
    creator: '',
}
export const initialStateProduct = {
    itemName: '',
    price: '',
    notes: '',
    inventoryNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Product',
    creator: '',
    owner: '',
}

export const taks = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    },
  ]
  const currentDate = new Date();
  export const initialTasks  = [
    
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "Party Time",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
  ]

  export function getStartEndDateForProject(tasks, projectId) {
    const projectTasks = tasks.filter(t => t.project === projectId)
    let start = projectTasks[0].start
    let end = projectTasks[0].end
  
    for (let i = 0; i < projectTasks.length; i++) {
      const task = projectTasks[i]
      if (start.getTime() > task.start.getTime()) {
        start = task.start
      }
      if (end.getTime() < task.end.getTime()) {
        end = task.end
      }
    }
    return [start, end]
  }