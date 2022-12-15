import React, {useState} from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragCard from './DragCard'

const DragGrids = ({column, tasks}) => {
  return (
      <Grid className="kanbancolumn" item xs sx={{height: '80vh'}}>
      <Typography>{column.title}</Typography>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
            <Grid className="droppable" style={{ height: '100%', border: '1px solid black'}}  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
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
      </Grid>
  )
}

export default DragGrids