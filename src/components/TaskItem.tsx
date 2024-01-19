import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import { ref, remove, update } from 'firebase/database'
import { db } from '../Firebase'

const TaskItem = (props: any) => {
	const deleteTaskFirebase = (id: string) => {
		remove(ref(db, `/${id}`))
	}

	const editTaskFirebase = (id: string, newValue: string) => {
		update(ref(db, `/${id}`), {
			value: newValue,
		})
	}
	return (
		<li
			className={
				props.taskInfo.isCompleted
					? 'border border-solid border-black rounded-md p-2 m-2 overflow-hidden bg-green-400 flex justify-between items-center'
					: 'border border-solid border-black rounded-md p-2 m-2 overflow-hidden bg-gray-200 flex justify-between items-center'
			}>
			<h2 className={props.taskInfo.isCompleted ? 'line-through' : ''}>{props.taskInfo.value}</h2>
			<div className="flex space-x-2">
				<Tooltip title="Delete Task" arrow>
					<DeleteForeverIcon
						onClick={() => props.removeTask(props.taskInfo.id)}
						className="cursor-pointer hover:text-red-500"
					/>
				</Tooltip>
				<Tooltip title="Complete Task" arrow>
					<input onClick={() => props.completeTask(props.taskInfo.id)} type="checkbox" />
				</Tooltip>
				<Tooltip title="Edit Task" arrow>
					<EditIcon
						onClick={() => props.changeEditMode(props.taskInfo.id)}
						className="cursor-pointer hover:text-green-600"
					/>
				</Tooltip>
			</div>
		</li>
	)
}

export default TaskItem
