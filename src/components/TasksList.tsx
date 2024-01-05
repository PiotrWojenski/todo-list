import React from 'react'
import TaskItem from './TaskItem'

const TasksList = (props: any) => {
	return (
		<div>
			<ul>
				{props.tasksList.map((item: any) => {
					return (
						<TaskItem key={item.id} taskInfo={item} removeTask={props.removeTask} completeTask={props.completeTask} />
					)
				})}
			</ul>
		</div>
	)
}

export default TasksList
