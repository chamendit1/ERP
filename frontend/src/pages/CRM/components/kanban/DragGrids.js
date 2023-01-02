import React, {useState} from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragCard from './DragCard'
import { padding } from '@mui/system'

const DragGrids = ({column, tasks}) => {
  return (
      
      
      
      <Grid item xs sx={{height: 'auto'}}>
        
        <Box className="kanbancolumn">
          <Typography>{column.title}</Typography>
          <Droppable droppableId={column.id}>
            {(droppableProvided, droppableSnapshot) => (
                <Grid className="droppable"  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                  {tasks.map((task, index) => {
                      return (
                        <Draggable key={task._id} draggableId={`${task._id}`} index={index}>
                          {(draggableProvided, draggableSnapshot) => (
                            <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                                <DragCard data={task} />
                            </div>
                          )}
                        </Draggable>
                      );
                  })}
                </Grid>
            )}
          </Droppable>
        </Box>
      </Grid>
  )
}

export default DragGrids