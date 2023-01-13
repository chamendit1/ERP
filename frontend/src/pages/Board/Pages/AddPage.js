import { useSelect } from '@mui/base';
import { Accordion, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { createColumn, updateColumn } from '../../actions/column';
import { updateBoard, getBoard } from '../../../actions/board';

const data = [
	{
		id: 0,
		name: 'Table',
		// icon: <AssessmentIcon className='dashboardIcon' fontSize='large'/>,
		text: <Typography>Table</Typography>,
	},
	{
		id: 1,
		name: 'Kanban',
		// icon: <DescriptionIcon className='dashboardIcon' fontSize='large'/>,
		text: <Typography>Kanban</Typography>,
	},
	{
		id: 2,
		name: 'List',
		// icon: <PeopleAltIcon className='dashboardIcon' fontSize='large'/>,
		text: <Typography>List</Typography>,
	},
]

const AddPage = (props) => {
    const { setOpen, open, boardId } = props
	const dispatch = useDispatch()
	const [boardData, setBoardData] = useState({pages:[]})
	const board = useSelector(state => state.board.board)
	const [page, setPage] = useState('')

	useEffect(() => {
		dispatch(getBoard(boardId))
  	}, [dispatch]);

	useEffect(() => {
		// setBoardData({...boardData, pages: [...boardData.pages, page]})
		setBoardData(board)
  	}, [board]);

	const handleSubmit =()=> {
		dispatch(updateBoard(boardId,{...boardData, pages: [...boardData.pages, page]}))
		handleClose()
  	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = () => {
		setOpen(false);
	};


	// console.log(page)
	function Container1(props) {
        const value = props.value;
        return value.map((dat, index) => (
            <Grid display={'flex'} className="CrmDashboardItem" item xs={2} sm={4} md={4} key={index} to={dat.to}>
              <Button 
			  	id={dat.name}
			  	onClick={() => setPage(dat.name)} 
				className='CrmDashboardBox' 
				style={{
					display: 'flex',
					flexDirection: 'column', 
					alignItems: 'center', 
					ustifyContent: 'center'
					}}>
                
				
				{/* {dat.icon} */}
                {dat.text}
              </Button>
            </Grid>
    ))}

	// console.log(boardData)

  return (
    <>
		<form>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>
					<Typography>Create Page</Typography>
				</DialogTitle>
				<DialogContent dividers>
					<Grid container>
						<Grid item container alignItems={"stretch"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 12, md: 12 }} >
							<Container1 value={data}/>
						</Grid>
					</Grid>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleSubmit} variant="contained">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</form>
	</>
  )
}

export default AddPage