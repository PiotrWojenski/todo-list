import React from 'react'
import TaskItem from './TaskItem'

const TasksList = (props: any) => {
	return (
		<div className=" p-4">
			<div className="w-2/3 mx-auto ">
				<ul className="break-words ">
					{props.tasksList.map((item: any) => {
						return (
							<TaskItem key={item.id} taskInfo={item} removeTask={props.removeTask} completeTask={props.completeTask} />
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default TasksList
