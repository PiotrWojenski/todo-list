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
	}

	const changeEditMode = (id: string) => {
		setEditMode(prev => !prev)
		const editedTask = tasks.find((task: any) => task.id === id)
		setCurrentEditTask(editedTask)
	}

	return (
		<div className={`${isDarkMode ? 'darkMode' : 'lightMode'} h-screen`}>
			<DarkMode />
			{editMode ? (
				<AddTask editedTask={currentEditTask} btnTitle="Edit task" addTask={taskHandler} editTask={editTask} />
			) : (
				<AddTask btnTitle="ADD NEW TASK" addTask={taskHandler} />
			)}
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
