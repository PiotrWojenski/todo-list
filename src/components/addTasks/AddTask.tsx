import React, { useState } from 'react'

const AddTask = (props: any) => {
	const [inputValue, setInputValue] = useState('')
	const { v4: uuidv4 } = require('uuid')

	const addText = (e: any) => {
		setInputValue(e.target.value)
	}

	const addTask = () => {
		if (inputValue.trim() === '') {
			return
		}
		const task = {
			id: uuidv4(),
			value: inputValue,
			isCompleted: false,
		}
		console.log(task)
		props.addNewTask(task)
		setInputValue('')
	}

	return (
		<div className="flex flex-row justify-center  h-1/2 bg-blue-400  ">
			<div className="flex">
				<input
					className="  p-3 m-2 border-2 border-solid border-blue-800 rounded-xl"
					value={inputValue}
					onChange={addText}
					type="text"
				/>
			</div>
			<div className="flex">
				<button className="  p-2 m-2 border-solid border-2  border-blue-800 rounded-md" onClick={addTask}>
					Add Task
				</button>
			</div>
		</div>
	)
}

export default AddTask
