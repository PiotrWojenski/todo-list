import React, { useContext, useState, useEffect } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'
import TasksList from './components/TasksList'
import TasksInfo from './components/TasksInfo'
import DarkMode from './components/DarkMode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DarkModeContext } from './context/DarkModeContext'
import { ref, remove, set, update } from 'firebase/database'
import { db } from './Firebase'

interface Task {
	id: string
	value: string
	isCompleted: boolean
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [editMode, setEditMode] = useState(false)
	const [currentEditTask, setCurrentEditTask] = useState<Task | null>(null)
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
				return Object.values(data) as Task[]
			}
			return []
		} catch (error) {
			throw new Error('Error fetching tasks from Firebase: ' + error)
		}
	}

	const taskHandler = (task: Task) => {
		setTasks([...tasks, task])
	}

	const removeTask = async (id: string) => {
		try {
			await deleteTaskFirebase(id)

			const updatedTasks = tasks.filter(task => task.id !== id)
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

	const completeTask = async (id: string) => {
		try {
			setTasks(prevTasks =>
				prevTasks.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
			)

			await updateTaskInFirebase(id, { isCompleted: true })
		} catch (error) {
			console.error('Error completing task:', error)
		}
	}

	const editTask = async (id: string, newValue: string) => {
		try {
			// Update the task locally
			setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, value: newValue } : task)))

			await updateTaskInFirebase(id, { value: newValue })
		} catch (error) {
			console.error('Error editing task:', error)
		}
	}

	const updateTaskInFirebase = async (id: string, updates: Partial<Task>) => {
		try {
			await update(ref(db, `/${id}`), updates)
			console.log('Task updated in Firebase')
		} catch (error) {
			console.error('Error updating task in Firebase:', error)
			throw error
		}
	}

	const changeEditMode = (id: string) => {
		setEditMode(prevEditMode => !prevEditMode)
		const editedTask = tasks.find(task => task.id === id)
		setCurrentEditTask(editedTask || null)
	}

	const setEditedTask = (editedTask: Task | null) => {
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
