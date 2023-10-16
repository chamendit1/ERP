export const KanbanColumn = {
    columns: {
      "0": {
        id: "0",
        title: "Progress",
        taskId:[0],
      },
      "1": {
        id: "1",
        title: "Manufacturing Order",
        taskId:[],
      },
      "2": {
        id: "2",
        title: "Delivery",
        taskId:[],
      },
      "3": {
        id: "3",
        title: "Order Delivered",
        taskId:[],
      },
      "4": {
        id: "4",
        title: "Tagih",
        taskId:[],
      },
    },
    columnOrder: ["0", "1", "2", "3", "4"],
  };

export const Task = [
  {
    _id: "0",
    title: "Eat",
    orderStatus: 0,
  },
]

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
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
  //   name: "Research",
  //   id: "Task 1",
  //   progress: 25,
  //   dependencies: ["Task 0"],
  //   type: "task",
  //   project: "ProjectSample",
  //   displayOrder: 3,
  // },
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
  //   name: "Discussion with team",
  //   id: "Task 2",
  //   progress: 10,
  //   dependencies: ["Task 1"],
  //   type: "task",
  //   project: "ProjectSample",
  //   displayOrder: 4,
  // },
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
  //   name: "Developing",
  //   id: "Task 3",
  //   progress: 2,
  //   dependencies: ["Task 2"],
  //   type: "task",
  //   project: "ProjectSample",
  //   displayOrder: 5,
  // },
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
  //   name: "Review",
  //   id: "Task 4",
  //   type: "task",
  //   progress: 70,
  //   dependencies: ["Task 2"],
  //   project: "ProjectSample",
  //   displayOrder: 6,
  // },
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
  //   name: "Release",
  //   id: "Task 6",
  //   progress: currentDate.getMonth(),
  //   type: "milestone",
  //   dependencies: ["Task 4"],
  //   project: "ProjectSample",
  //   displayOrder: 7,
  // },
  // {
  //   start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
  //   end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
  //   name: "Party Time",
  //   id: "Task 9",
  //   progress: 0,
  //   isDisabled: true,
  //   type: "task",
  // },
  {
      
    start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    end: new Date(currentDate.getFullYear(),currentDate.getMonth(),2,),
    name: "Boss",
    id: "Task 10",
    progress: 100,
    type: "task",
    // project: "",
    // displayOrder: 4,
    client: {
          _id: "642fcad73b1578695d338158",
          name: "1ss",
          email: "12",
          phone: "1",
          address: "1"
      },
      creator: [
          "642e88740065cd4f866771f0"
      ],
      owner: [
          "642fcad73b1578695d338158"
      ],
      createdAt: "2023-04-17T05:54:38.700Z",
      _id: "643cdf89a77e77bf6632d599",
      items: [
          {
              _id: "643cdf89a77e77bf6632d59a",
              itemName: "1111",
              unitPrice: "111",
              quantity: "1111",
              discount: ""
          }
      ],
      total: 123321,
      notes: "",
      rates: "0",
      vat: 0,
      currency: "IDR",
      invoiceNumber: "8775",
      status: "Unpaid",
      orderStatus: "63ccbb64c872ba0cd29dfedb",
      type: "Invoice",
      subTotal: 123321,
      dueDate: "2023-04-24T05:56:19.071Z",
      paymentRecords: [],
      __v: 0,
  }
]


