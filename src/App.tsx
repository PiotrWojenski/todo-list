import React, { useContext, useState } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'
import TasksList from './components/TasksList'
import TasksInfo from './components/TasksInfo'
import DarkMode from './components/DarkMode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DarkModeContext } from './context/DarkModeContext'

function App() {
	const [tasks, setTasks] = useState<any>([])
	const [editMode, setEditMode] = useState(false)
	const [currentEditTask, setCurrentEditTask] = useState<any>(null)
	const { isDarkMode } = useContext(DarkModeContext)

	const taskHandler = (task: any) => {
		setTasks([...tasks, task])
	}

	const removeTask = (id: string) => {
		const updatedTasks = tasks.filter((task: any) => task.id !== id)
		setTasks(updatedTasks)
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
			/>
			<TasksList
				changeEditMode={changeEditMode}
				tasksList={tasks}
				removeTask={removeTask}
				completeTask={completeTask}
			/>
			<TasksInfo tasks={tasks} />
			<ToastContainer />
		</div>
	)
}

export default App
