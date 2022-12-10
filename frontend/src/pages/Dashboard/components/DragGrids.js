import React, {useState} from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const DragGrids = ({column, tasks}) => {

  // Data = column Name, Data, Size

  return (
    <Grid item xs={3} sm={3} xl={3} sx={{m: 3}} style={{
      border: '1px solid black',
      height: '50vh'
      }}>
      <Typography>{column.title}</Typography>


      
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
            <Grid style={{ height: '100%'}} className="characters" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                          {task.content}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </Grid>
        )}
      </Droppable>
      
    </Grid>
  )
}

export default DragGrids