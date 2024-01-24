/* eslint-disable @typescript-eslint/no-unused-vars */

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

			return id
		} catch (error) {
			console.error('Error adding task to Firebase:', error)
			throw error
		}
	}

	const fetchAndUpdateTasks = async () => {
		try {
			const response = await axios.get('https://todolist2-dfa46-default-rtdb.firebaseio.com/.json')

			if (response.data) {
				const data = Object.values(response.data)
				props.setTasks(data)
			} else {
				props.setTasks([])
			}
		} catch (error) {
			console.error('Error fetching tasks from Firebase:', error)
		}
	}

	const addNewTask = async () => {
		const isError = validation()
		if (isError !== null) return

		try {
			const id = await addToFirebase()
			await fetchAndUpdateTasks()
			setInputValue('')
			showNotify()
		} catch (error) {
			console.error('Error adding new task:', error)
		}
	}

	const editExistingTask = async () => {
		const isError = validation()
		if (isError !== null) return

		try {
			await props.editTask(props.editedTask.id, inputValue)
			props.setEditedTask(null)
			setInputValue('')

			await fetchAndUpdateTasks()
			showNotify()
		} catch (error) {
			console.error('Error editing task:', error)
		}
	}

	const showNotify = () => {
		toast.success('Task added')
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
				{props.editedTask ? 'Edit task' : 'ADD NEW TASK'}
			</Button>
		</div>
	)
}

export default AddTask
