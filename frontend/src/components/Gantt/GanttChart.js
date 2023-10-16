import React, { useEffect, useState } from 'react';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { ViewSwitcher } from "./components/ViewSwitcher";
import {  getStartEndDateForProject } from '../../initialState';
import "gantt-task-react/dist/index.css";
import { initialTasks } from '../../Data';

const GanttChart = () => {
  const [view, setView] = React.useState(ViewMode.Day)
  const [tasks, setTasks] = React.useState(initialTasks)
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
 
  const handleTaskChange = task => {
    console.log("On date change Id:" + task.id)
    let newTasks = tasks.map(t => (t.id === task.id ? task : t))
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project)
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)]
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end }
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        )
      }
    }
    setTasks(newTasks)
  }

  const handleTaskDelete = task => {
    const conf = window.confirm("Are you sure about " + task.name + " ?")
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id))
    }
    return conf
  }

  const handleProgressChange = async task => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)))
    console.log("On progress change Id:" + task.id)
  }

  const handleDblClick = task => {
    alert("On Double Click event Id:" + task.id)
  }

  const handleClick = task => {
    console.log("On Click event Id:" + task.id)
  }

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"))
  }

  const handleExpanderClick = task => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)))
    console.log("On expander click Id:" + task.id)
  }

  console.log(tasks)
  return (
    <>
      <ViewSwitcher
          onViewModeChange={viewMode => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
       <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
      />
    </>
  )
}

export default GanttChart