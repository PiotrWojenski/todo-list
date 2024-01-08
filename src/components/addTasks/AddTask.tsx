import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddTask = (props: any) => {
	const [inputValue, setInputValue] = useState('')
	const { v4: uuidv4 } = require('uuid')

	const addText = (e: any) => {
		setInputValue(e.target.value)
	}
	const addNewTask = () => {
		const newTask = {
			id: uuidv4(),
			value: inputValue,
			isCompleted: false,
		}
		console.log(newTask)
		props.addTask(newTask)
		setInputValue('')
	}

	console.log(inputValue)

	return (
		<div className="flex flex-col items-center space-y-4 p-4 border-b-2">
			<TextField
				className="w-98"
				value={inputValue}
				onChange={addText}
				id="outlined-basic"
				label="Write your task"
				variant="outlined"
			/>

			<Button className="" onClick={addNewTask} variant="contained">
				Add new task
			</Button>
		</div>
	)
}

export default AddTask
