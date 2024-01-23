import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { toast } from 'react-toastify'
import { ref, set } from 'firebase/database'
import axios from 'axios'
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
			setErrorMessage('Task name cannot be empty')
			return 'Error'
		}
		return null
	}

	const addToFirebase = async () => {
		try {
			const id = uuidv4()

			await set(ref(db, `/${id}`), {
				id: id,
				value: inputValue,
				isCompleted: false,
			})

			const response = await axios.get('https://todolist2-dfa46-default-rtdb.firebaseio.com/.json')
			if (response.data) {
				const data = Object.values(response.data)
				props.setTasks(data)
			} else {
				props.setTasks([])
			}

			console.log('Task added to Firebase')
		} catch (error) {
			console.error('Error adding task to Firebase:', error)
		}
	}

	const addNewTask = async () => {
		const isError = validation()
		if (isError !== null) return

		await addToFirebase()

		setInputValue('')
		showNotify()
	}

	const editExistingTask = () => {
		const isError = validation()
		if (isError !== null) return

		props.editTask(props.editedTask.id, inputValue)

		props.setEditedTask(null)

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

			<Button
				className=""
				onClick={() => {
					if (props.editedTask) {
						editExistingTask()
					} else {
						addNewTask()
					}
				}}
				variant="contained">
				{props.btnTitle}
			</Button>
		</div>
	)
}

export default AddTask
