import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'

const TaskItem = (props: any) => {
	return (
		<li className="border border-solid border-black rounded-md p-2 m-2 overflow-hidden bg-gray-200">
			<h2 className={props.taskInfo.isCompleted ? 'line-through' : ''}>{props.taskInfo.value}</h2>
			<Tooltip title="Delete Task" arrow>
				<DeleteForeverIcon
					onClick={() => props.removeTask(props.taskInfo.id)}
					className="cursor-pointer hover:text-red-500"
				/>
			</Tooltip>
			<Tooltip title="Complete Task" arrow>
				<input onClick={() => props.completeTask(props.taskInfo.id)} type="checkbox" title="completed" />
			</Tooltip>
			<Tooltip title="Edit Task" arrow>
				<EditIcon
					onClick={() => props.changeEditMode(props.taskInfo.id)}
					className="cursor-pointer hover:text-green-600"
				/>
			</Tooltip>
		</li>
	)
}

export default TaskItem
