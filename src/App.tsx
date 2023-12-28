import React, { useState } from 'react'
import './App.css'
import AddTask from './components/addTasks/AddTask'

function App() {
	const [tasks, setTasks] = useState<any>([])

	const taskHandler = (task: any) => {
		setTasks([...tasks, task])
	}
	console.log(tasks)

	return (
		<div>
			<AddTask addTask={taskHandler} />
		</div>
	)
}

export default App
