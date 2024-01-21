import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { toast } from 'react-toastify'
import { ref, set } from 'firebase/database'
import { db } from '../../Firebase'

const AddTask = (props: any) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [inputValue, setInputValue] = useState('')
	const { v4: uuidv4 } = require('uuid')

	useEffect(() => {
		if (props.editedTask) {
			setInputValue(props.editedTask.value)
		}
	}, [props.editedTask])

	const addText = (e: any) => {
		setInputValue(e.target.value)
	}

	const validation = () => {
		setErrorMessage('')
		if (inputValue.trim() === '') {
			setErrorMessage('Pole nie może być puste')
			return 'Error'
		}
		return null
	}

	const addToFirebase = () => {
		const id = uuidv4()
		set(ref(db, `/${id}`), {
			id: id,
			value: inputValue,
		})
	}

	const addNewTask = () => {
		const isError = validation()
		if (isError !== null) return

		const newTask = {
			id: uuidv4(),
			value: inputValue,
			isCompleted: false,
		}

		// Add the task to Firebase
		addToFirebase()

		// Update the local state with the new task
		props.addTask(newTask)

		// Clear the input value
		setInputValue('')

		// Show notification
		showNotify()
	}

	const editExistingTask = () => {
		const isError = validation()
		if (isError !== null) return

		// Edit the task in Firebase
		props.editTask(props.editedTask.id, inputValue)

		// Clear the input value
		setInputValue('')

		// Show notification
		showNotify()
	}

	const showNotify = () => {
		toast.success('Added new task')
	}

	return (
		<div className="flex flex-col items-center space-y-4 p-4 border-b-2 ">
			<TextField
				className="w-98 bg-[#fff] rounded-xl overflow-hidden"
				value={inputValue}
				onChange={addText}
				id="filled-basic"
				label="Write your task"
				variant="filled"
			/>
			{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

			<Button
				className=""
				onClick={() => {
					addNewTask()
					addToFirebase()
				}}
				variant="contained">
				{props.btnTitle}
			</Button>
		</div>
	)
}

export default AddTask
