import React, { useContext, useState, useEffect } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'
import TasksList from './components/TasksList'
import TasksInfo from './components/TasksInfo'
import DarkMode from './components/DarkMode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DarkModeContext } from './context/DarkModeContext'
import { ref, remove, set } from 'firebase/database'
import { db } from './Firebase'

function App() {
	const [tasks, setTasks] = useState<any>([])
	const [editMode, setEditMode] = useState(false)
	const [currentEditTask, setCurrentEditTask] = useState<any>(null)
	const { isDarkMode } = useContext(DarkModeContext)

	useEffect(() => {
		getTasks()
	}, [])

	const getTasks = async () => {
		try {
			const response = await fetchTasksFromFirebase()
			setTasks(response)
		} catch (error) {
			console.error('Error fetching tasks:', error)
		}
	}

	const fetchTasksFromFirebase = async () => {
		try {
			const response = await fetch('https://todolist2-dfa46-default-rtdb.firebaseio.com/.json')
			const data = await response.json()
			if (data) {
				return Object.values(data)
			}
			return []
		} catch (error) {
			throw new Error('Error fetching tasks from Firebase: ' + error)
		}
	}

	const taskHandler = (task: any) => {
		setTasks([...tasks, task])
	}

	const removeTask = async (id: string) => {
		try {
			await deleteTaskFirebase(id)

			const updatedTasks = tasks.filter((task: any) => task.id !== id)
			setTasks(updatedTasks)
		} catch (error) {
			console.error('Error removing task:', error)
		}
	}

	const deleteTaskFirebase = async (id: string) => {
		try {
			await remove(ref(db, `/${id}`))
			console.log('Task removed from Firebase')
		} catch (error) {
			console.error('Error removing task from Firebase:', error)
		}
	}

	const completeTask = (id: string) => {
		setTasks(
			tasks.map((task: any) => {
				if (task.id === id) {
					return { ...task, isCompleted: !task.isCompleted }
				} else {
					return task
				}
			})
		)
	}

	const editTask = (id: string, newValue: string) => {
		setTasks(
			tasks.map((task: any) => {
				if (task.id === id) {
					return { ...task, value: newValue }
				} else {
					return task
				}
			})
		)
		setEditMode(false)
	}

	const changeEditMode = (id: string) => {
		setEditMode(prevEditMode => !prevEditMode)
		const editedTask = tasks.find((task: any) => task.id === id)
		setCurrentEditTask(editedTask)
	}

	const setEditedTask = (editedTask: any) => {
		setCurrentEditTask(editedTask)
	}

	return (
		<div className={`${isDarkMode ? 'darkMode' : 'lightMode'} h-screen`}>
			<DarkMode />
			<AddTask
				editedTask={currentEditTask}
				btnTitle={editMode ? 'Edit task' : 'ADD NEW TASK'}
				addTask={taskHandler}
				editTask={editTask}
				setEditedTask={setEditedTask}
				setTasks={setTasks}
			/>
			<TasksList
				changeEditMode={changeEditMode}
				tasksList={tasks}
				removeTask={removeTask}
				completeTask={completeTask}
				setTasks={setTasks}
			/>
			<TasksInfo tasks={tasks} />
			<ToastContainer />
		</div>
	)
}

export default App
