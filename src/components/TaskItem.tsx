import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

const TaskItem = (props: any) => {
	return (
		<li className="border border-solid border-black rounded-md p-2 m-2 overflow-hidden bg-gray-200">
			<h2 className={props.taskInfo.isCompleted ? 'line-through' : ''}>{props.taskInfo.value}</h2>
			<DeleteForeverIcon onClick={() => props.removeTask(props.taskInfo.id)} className="cursor-pointer" />
			<input onClick={() => props.completeTask(props.taskInfo.id)} type="checkbox" />
			<EditIcon onClick={() => props.changeEditMode(props.taskInfo.id)} className="cursor-pointer" />
		</li>
	)
}

export default TaskItem
