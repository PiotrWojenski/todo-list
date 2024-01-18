import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { toast } from 'react-toastify'
import { ref, set } from 'firebase/database'
import { db } from '../../Firebase'

const AddTask = (props: any) => {
	const [errorMessage, setErrorMassage] = useState('')
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
		setErrorMassage('')
		if (inputValue.trim() === '') {
			setErrorMassage('Pole nie może być puste')
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
		console.log(newTask)
		props.addTask(newTask)
		addToFirebase()
		setInputValue('')
		showNotify()
	}
	const editExistingTask = () => {
		const isError = validation()
		if (isError !== null) return
		props.editTask(props.editedTask.id, inputValue)
		setInputValue('')
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

			<Button className="" onClick={props.editedTask ? editExistingTask : addNewTask} variant="contained">
				{props.btnTitle}
			</Button>
			<button onClick={addToFirebase}>add to firebase</button>
		</div>
	)
}

export default AddTask
