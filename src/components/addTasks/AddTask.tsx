import React, { useState } from 'react'

const AddTask = () => {
	const [inputValue, setInputValue] = useState('')

	const addText = (e: any) => {
		setInputValue(e.target.value)
	}

	const addTask = () => {
		console.log(inputValue)
	}

	return (
		<div className="d-flex justify-center">
			<div>
				<input
					className=" flex-1 p-2 m-2 border-2 border-solid border-blue-800 rounded-xl"
					value={inputValue}
					onChange={addText}
					type="text"
				/>
			</div>
			<div>
				<button className=" flex-1 p-2 m-2 border-solid border-2  border-blue-800 rounded-md" onClick={addTask}>
					Add Task
				</button>
			</div>
		</div>
	)
}

export default AddTask
