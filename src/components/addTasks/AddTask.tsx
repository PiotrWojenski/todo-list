import React, { useState } from 'react'

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
		<div className="flex">
			<input
				className="  border border-solid border-3 border-black rounded-lg flex justify-center items-center"
				value={inputValue}
				onChange={addText}
				type="text"
			/>
			<button className="bg-sky-500 rounded " onClick={addNewTask}>
				Add task
			</button>
		</div>
	)
}

export default AddTask
