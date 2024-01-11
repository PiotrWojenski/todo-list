import React, { useState } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'
import TasksList from './components/TasksList'
import TasksInfo from './components/TasksInfo'
import DarkMode from './components/DarkMode'
import useDarkMode from './hooks/useDarkMode'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// DarkMode, edit

function App() {
	const [tasks, setTasks] = useState<any>([])
	const { isDarkMode } = useDarkMode()
	const [editMode, setEditMode] = useState(false)
	const [editTask, setEditTask] = useState<any>(null)

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

	const changeEditMode = (id: string) => {
		setEditMode(prev => !prev)
		const editedTask = tasks.find((task: any) => task.id === id)
		setEditTask(editedTask)
	}

	return (
		<div className={isDarkMode ? 'darkMode' : 'lightMode'}>
			<DarkMode />
			{editMode ? (
				<AddTask editedTask={editTask} btnTitle="Edit task" addTask={taskHandler} />
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
