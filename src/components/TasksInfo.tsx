import React from 'react'
const TasksInfo = (props: any) => {
	const tasksCompleted = props.tasks.filter((task: any) => task.isCompleted === true)
	return (
		<div className="flex flex-col justify-center items-center ">
			<h2>Tasks: {props.tasks.length}</h2>
			<h2>Tasks completed: {tasksCompleted.length}</h2>
		</div>
	)
}

export default TasksInfo
