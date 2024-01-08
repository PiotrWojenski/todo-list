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
	}

	console.log(inputValue)

	return (
		<div className=" p-3 flex flex-col items-center w-full">
			<TextField
				className="w-98"
				value={inputValue}
				onChange={addText}
				id="outlined-basic"
				label="Write your task"
				variant="outlined"
			/>

			{/* <button className=" bg-sky-500 rounded w-36 " >
				Add task
			</button> */}

			<Button className="" onClick={addNewTask} variant="contained">
				Contained
			</Button>
		</div>
	)
}

export default AddTask
