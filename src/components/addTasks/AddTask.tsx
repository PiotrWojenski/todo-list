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
		<div>
			<input value={inputValue} onChange={addText} type="text" />
			<button onClick={addNewTask}>Add task</button>
		</div>
	)
}

export default AddTask
