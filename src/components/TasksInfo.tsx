import React from 'react'

const TasksInfo = (props: any) => {
	const tasksCompleted = props.tasks.filter((task: any) => task.isCompleted === true)
	return (
		<div className="flex flex-col justify-center items-center p-4 md:p-8 lg:p-12">
			<h2 className="text-xl md:text-2xl lg:text-3xl">Tasks: {props.tasks.length}</h2>
			<h2 className="text-xl md:text-2xl lg:text-3xl">Tasks completed: {tasksCompleted.length}</h2>
		</div>
	)
}

export default TasksInfo
