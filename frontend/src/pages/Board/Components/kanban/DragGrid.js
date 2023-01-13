import { Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DragCard from './DragCard';
import EditIcon from '@mui/icons-material/Edit';

const DragGrid = (props) => {
    const { order, column, index, handleEditCol } = props;
    
    return (				
        <Grid item xs key={index}>
            <Grid container className="kanbanColumn" direction="column">
                <Grid item className="kanbanTitleContainer" xs={0} padding={'1rem'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>{column.label}</Typography>
                    <Button onClick={() => handleEditCol(column)}><EditIcon fontSize='small'/></Button>
                </Grid>

                <Grid item className="droppableContainer" xs>
                    <Droppable droppableId={String(column._id)}>
                    {(droppableProvided, droppableSnapshot) => (
                        <Grid className="droppableGrid"  {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                            {order
                            .sort((a, b) => (a - b))
                            .map((invoice) => (
                                <Draggable key={invoice._id} draggableId={invoice._id} index={index}>
                                    {(draggableProvided, draggableSnapshot) => (
                                        <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                                            <DragCard data={invoice} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </Grid>
                )}
                    </Droppable>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DragGrid