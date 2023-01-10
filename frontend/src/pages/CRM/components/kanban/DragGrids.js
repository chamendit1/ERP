import React, {useState} from 'react'
import { Card, Grid, Box, Avatar, Typography } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragCard from './DragCard'
import { padding } from '@mui/system'

const DragGrids = ({column, tasks}) => {
  // console.log(column)
  // console.log(tasks)
  return (
      <Grid item xs sx={{height: 'auto'}}>
        <Grid container className="kanbanColumn" direction="column">

          <Grid item className="kanbanTitleContainer" xs={0}>
            <p className="kanbanTitle">{column.label}</p>
          </Grid>

          <Grid item className="droppableContainer" xs>
            <Droppable className="droppable" droppableId={String(column.id)}>
              {(droppableProvided, droppableSnapshot) => (
                  <Grid className="droppableGrid"  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                    {tasks.map((task, index) => {
                      // console.log(task)
                        return (

                          <Draggable key={task._id} draggableId={task._id} index={index}>
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

          {/* <Grid item className="kanbanTitleContainer" xs={0}>
            <p className="kanbanTitle">Add Task</p>
          </Grid> */}
          
        </Grid>
      </Grid>
  )
}

export default DragGrids