import React, { useState } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'
import TasksList from './components/TasksList'
import TasksInfo from './components/TasksInfo'
import DarkMode from './components/DarkMode'

function App() {
	const [tasks, setTasks] = useState<any>([])
	const [isDarkMode, setIsDarkMode] = useState(false)

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
	console.log(tasks)

	const toggleDarkMode = () => {
		setIsDarkMode(prevState => !prevState)
	}
	console.log(isDarkMode)

	return (
		<div>
			<DarkMode toggleDarkMode={toggleDarkMode} darkMode={isDarkMode} />
			<AddTask addTask={taskHandler} />
			<TasksList tasksList={tasks} removeTask={removeTask} completeTask={completeTask} />
			<TasksInfo tasks={tasks} />
		</div>
	)
}

export default App
